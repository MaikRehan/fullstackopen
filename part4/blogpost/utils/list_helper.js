const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => {
        return total + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length < 1) {return null}
    return blogs.reduce((favorite, blog) => {
        return blog.likes > favorite.likes ? blog : favorite
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {return null}
    const orderedBlogs = _.groupBy(blogs, 'author')
    const counts = _.map(orderedBlogs, (blogsByAuthor, author) => ({
        author: author,
        blogs: blogsByAuthor.length
    }))
    return _.maxBy(counts, 'blogs')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}