const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    for (let user of testHelper.users) {
        let userObject = new User(user)
        await userObject.save()
    }
})

describe('Adding a new user', async () => {
    test('should result in an error when password or username is less than 3 characters', async () => {
        const indavidPass = await api
            .post('/api/users')
            .send({ ...testHelper.testUser, password: "ko" })
            .expect(400)

        let usersAtEnd = await testHelper.usersInDb()
        assert.strictEqual(usersAtEnd.length, testHelper.users.length)
        assert(indavidPass.body.error.includes('password must be at least 3 characters long'))

        const invalidUser = await api
            .post('/api/users')
            .send({ ...testHelper.testUser, username: "ko" })
            .expect(400)

        usersAtEnd = await testHelper.usersInDb()
        assert.strictEqual(usersAtEnd.length, testHelper.users.length)
        assert(invalidUser.body.error.includes('is shorter than the minimum allowed length (3)'))
    })
})

after(async () => {
    await mongoose.connection.close()
})