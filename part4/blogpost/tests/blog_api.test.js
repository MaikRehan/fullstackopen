const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

after(async () => {
    await mongoose.connection.close()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs identifier is named id and not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
        assert.ok(blog.id)
        assert.strictEqual(blog._id, undefined)
    })
})

test('blogs are saved correctly', async () => {
    const newBlog = {
        title: 'TestBlog',
        author: 'Test Author',
        url: 'TestURL',
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(blog => blog.title)
    assert(contents.includes('TestBlog'))
})

// ...