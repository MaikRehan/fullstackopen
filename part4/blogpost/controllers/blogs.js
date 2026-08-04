const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const user = await User.findOne({})
    if (!user) {
        return response.status(400).json({ error: 'no user in database' })
    }

    const blog = new Blog(request.body)
    blog.user = user._id

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

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
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