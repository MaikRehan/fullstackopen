import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    console.log(newObject)
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const addLikeToBlog = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }
    const changedBlog  = { ...blog, likes: blog.likes + 1 }
    const response = await axios.put(`${baseUrl}/${changedBlog.id}`, changedBlog, config)
    return response.data
}


export default { getAll , create, setToken, addLikeToBlog}