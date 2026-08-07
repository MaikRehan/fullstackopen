const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token
let authorizedUser

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
    authorizedUser = await helper.createAuthorizedUser()
    token = await helper.loginUser(api)

    await Blog.deleteMany({})
    // Blogs gehören dem eingeloggten User, damit der Ownership-Check beim Löschen greift
    await Blog.insertMany(
        helper.initialBlogs.map(blog => ({ ...blog, user: authorizedUser._id }))
    )
})

after(async () => {
    await mongoose.connection.close()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(blog => blog.title)
    assert(contents.includes('TestBlog'))
})

test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
        title: 'TestBlog',
        author: 'Test Author',
        url: 'TestURL',
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('defaults likes to 0 if property is missing from request', async () => {
    const newBlog = {
        title: 'TestBlog',
        author: 'Test Author',
        url: 'TestURL',
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

test('bad request 400 upon creating new blog with missing title', async () => {
    const newBlog = {
        author: 'Test Author',
        url: 'TestURL',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('bad request 400 upon creating new blog with missing url', async () => {
    const newBlog = {
        title: 'TestBlog',
        author: 'Test Author',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(blog => blog.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('deleting fails with status code 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('update amount of likes of existing blogs with given id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const likesAtStart = blogToUpdate.likes //save initial likes
    blogToUpdate.likes = likesAtStart + 1   // set to strictly different amount
    const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(result.body.likes, likesAtStart + 1)
})