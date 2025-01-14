const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of testHelper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
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
        .send(testHelper.noLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await testHelper.blogsInDb()
    assert((blogsAtEnd.find(k => k.title === 'Like property missing')).likes === 0)
})

test('If title or url is missing backend responds with status code 400', async () => {
    await api   
        .post('/api/blogs')
        .send(testHelper.noTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api   
        .post('/api/blogs')
        .send(testHelper.noUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})