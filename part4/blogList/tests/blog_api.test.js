const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const userForToken = {
    username: testHelper.users[0].username,
    id: testHelper.users[0]._id,
  }

const token = 'Bearer '.concat(jwt.sign(userForToken, process.env.SECRET))
const saltRounds = 10

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    for (let user of testHelper.users) {
        let userObject = new User(user)
        userObject.passwordHash = await bcrypt.hash(user.password, saltRounds)
        await userObject.save()
    }
    for (let blog of testHelper.blogs) {
        let blogObject = new Blog({ ...blog, user: testHelper.users[0]._id })
        const user = await User.findOne({ username: testHelper.users[0].username })
        const savedBlog = await blogObject.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    }
  })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, testHelper.blogs.length)
})

test('unique identified is named id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id && !(response.body[0]._id))
})

test('POST request successfully creates a new blog post', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(testHelper.listWithOneBlog[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await testHelper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length + 1)

    const contents = blogsAtEnd.map(k => k.title)
    assert(contents.includes('Go To Statement Considered Harmful, test edition'))
})

test('If likes property is missing, it default to 0', async () => {
    await api   
        .post('/api/blogs')
        .set('Authorization', token)
        .send(testHelper.noLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await testHelper.blogsInDb()
    assert((blogsAtEnd.find(k => k.title === 'Like property missing')).likes === 0)
})

test('If title or url is missing backend responds with status code 400', async () => {
    await api   
        .post('/api/blogs')
        .set('Authorization', token)
        .send(testHelper.noTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api   
        .post('/api/blogs')
        .set('Authorization', token)
        .send(testHelper.noUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

describe('Deleting ', async () => {
    test('a blog with an existing id works', async () => {
        const id = testHelper.blogs[0]._id

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', token)
            .expect(204)
        
        const blogsAtEnd = await testHelper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length - 1)
        assert(!(blogsAtEnd.find(k => k.id === id)))
    })

    test('a non existing blog leads to status code 400', async () => {
        const id = 123
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', token)
            .expect(400)
            
        const blogsAtEnd = await testHelper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length)
    })
})

describe('Updating', async () => {
    test('a blog with an existing id works', async () => {
        const id = testHelper.blogs[0]._id
        const updatedBlog = { ...testHelper.blogs[0], title: "updated title" }

        await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await testHelper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length)
        assert((blogsAtEnd.find(k => k.title === "updated title")))
    })

    test('a non existing blog leads to status code 400', async () => {
        const id = 123
        const updatedBlog = { ...testHelper.blogs[0], title: "updated title" }

        await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(400)
        
        const blogsAtEnd = await testHelper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length)
        assert(!(blogsAtEnd.find(k => k.title === "updated title")))
    })
})

test('Adding a blog fails with status code 401 if a token is not provided', async () => {
    await api
        .post('/api/blogs')
        .send(testHelper.listWithOneBlog[0])
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await testHelper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length)

    const contents = blogsAtEnd.map(k => k.title)
    assert(!(contents.includes('Go To Statement Considered Harmful, test edition')))
})


after(async () => {
    await mongoose.connection.close()
})