const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const {userExtractor} = require("../utils/middleware");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const user = request.user
    const blog = new Blog(request.body)
    blog.user = user._id

    if(blog.title === undefined){
        return response.status(400).json({ error: 'title missing' })
    }
    if(blog.url === undefined){
        return response.status(400).json({ error: 'url missing' })
    }
    if(blog.likes === undefined){
        blog.likes = 0
    }

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedSavedBlog = await Blog.findById(savedBlog.id)
        .populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedSavedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user && blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(400).json({ error: 'user not authorized to delete this blog' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).end()
    }

    if(blog.likes === undefined){
        blog.likes = 0
    } else {
        blog.likes = likes
    }

    const updatedBlog = await blog.save()
    const savedBlog = await Blog.findById(updatedBlog.id)
        .populate('user', { username: 1, name: 1 })
    response.status(200).json(savedBlog)
})

module.exports = blogsRouter