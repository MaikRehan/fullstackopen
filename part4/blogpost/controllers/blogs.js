const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(201).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(blog.likes === undefined){
        blog.likes = 0
    }
    else if(blog.title === undefined){
        return response.status(400).end()
    }
    else if(blog.url === undefined){
        return response.status(400).end()
    }

    const savedBlog = await blog.save()
    response.status(204).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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
    response.status(200).json(updatedBlog)


})

module.exports = blogsRouter