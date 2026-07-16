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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}