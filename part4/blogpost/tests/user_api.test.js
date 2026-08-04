const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require("../models/user");

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

after(async () => {
    await mongoose.connection.close()
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('users are saved correctly', async () => {
    const newUser = {
        username: 'NewUser',
        password: '123',
        name: 'Username',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
    const contents = usersAtEnd.map(user => user.username)
    assert(contents.includes('NewUser'))
})

test('save user returns 400 on invalid username', async () => {
    const newUser = {
        username: 'Ne',
        password: '123',
        name: 'Username',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    const contents = usersAtEnd.map(user => user.username)
    assert(!contents.includes('Ne'))
})

test('save user returns 400 on invalid password', async () => {
    const newUser = {
        username: 'NewUser',
        password: '1',
        name: 'Username',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    const contents = usersAtEnd.map(user => user.username)
    assert(!contents.includes('NewUser'))
})