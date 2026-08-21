import { useState, useEffect } from 'react'
import Blog from './components/Blog.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login'
import Togglable from "./components/Togglable.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";
import blog from "./components/Blog.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setNotification] = useState(null)
    const [messageType, setMessageType] = useState('notification')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [newBlog, setNewBlog] = useState('')


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
           // blogService.setToken(user.token)
        }
    }, [])

    const Notification = ({ message , messageType}) => {
        if (message === null) {
            return null
        }

        return (
            <div className={messageType}>
                {message}
            </div>
        )
    }

    const handleLogin = async event => {    event
        .preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            setNotification('wrong credentials')
            setMessageType('error')
            setTimeout(() => {
                setNotification(null)
                setMessageType('notification')

            }, 2000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button type="submit">login</button>
        </form>
    )

    const logout = async () => {
        setUser(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }

    const toggleLoginAndNoteForm = () => {
        if (user === null) {
            return (
                <div>
                    <h2>Log in to application</h2>
                    {loginForm()}
                </div>
            )
        }

        return (
            <div>
                <h2>blogs</h2>

                {user &&
                    (
                    <div>
                        <p>{user.name} logged in</p>
                        <button onClick={() => logout()}>logout</button>
                        {blogs.map(blog =>
                            <Blog
                                  key={blog.id}
                                  blog={blog}
                                  addLikeToBlog={addLikeToBlog}
                            >
                            </Blog>
                        )}
                        <h2>create new</h2>
                        <Togglable buttonLabel="show">
                            <NewBlogForm
                                handleSubmit={createBlog}
                                handleTitleChange={({target}) => setTitle(target.value)}
                                handleAuthorChange={({target}) => setAuthor(target.value)}
                                handleUrlChange={({target}) => setUrl(target.value)}
                                title={title}
                                author={author}
                                url={url}
                            />
                        </Togglable>
                    </div>
                )}
            </div>
        )
    }

    const createBlog = event => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        blogService.create(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog('')
                setTitle('')
                setAuthor('')
                setUrl('')
                setNotification(`a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`)
                setTimeout(() => setNotification(null), 2000)
            })
            .catch(error => {
                setNotification(`Can not add new blog post`)
                setMessageType('error')
            })
    }

    const addLikeToBlog = async (blog)  => {

        try {
            const updatedBlog =  await blogService.addLikeToBlog(blog)
            setBlogs(blogs.map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog)))
            setNotification(`added like to blog' '${blog.title}'`)
            setTimeout(() => setNotification(null), 2000)
        } catch{
            setNotification(`Can not add like to blog post`)
            setMessageType('error')
            setTimeout(() => setNotification(null), 2000)
        }



    }

    return (
        <div>
            <Notification message={errorMessage} messageType={messageType} />
            {toggleLoginAndNoteForm()}
        </div>
    )
}

export default App