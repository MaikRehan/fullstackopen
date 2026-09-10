import {useState, useEffect} from 'react'
import Blog from './components/Blog.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login'
import Togglable from './components/Togglable.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login";
import BlogView from "./components/Blogview";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setNotification] = useState(null)
    const [messageType, setMessageType] = useState('notification')

    useEffect(() => {
        async function fetchData() {
            const blogs = await blogService.getAll()
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        }

        fetchData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const navigate = useNavigate()

    const Notification = ({message, messageType}) => {
        if (!message) return null

        return (<div className={messageType}>
            {message}
        </div>)
    }

    const handleLogin = async event => {
        event
            .preventDefault()

        try {
            const user = await loginService.login({username, password})

            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            navigate('/')

        } catch {
            setNotification('wrong credentials')
            setMessageType('error')
            setTimeout(() => {
                setNotification(null)
                setMessageType('notification')

            }, 2000)
        }
    }

    const loginForm = () => (<form onSubmit={handleLogin}>
        <div>
            <label>
                username
                <input
                    type="text"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </label>
        </div>
        <div>
            <label>
                password
                <input
                    type="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
            </label>
        </div>
        <button type="submit">login</button>
    </form>)

    const logout = async () => {
        setUser(null)
        window.localStorage.removeItem('loggedNoteAppUser')
    }

    const renderBlogs = () => {
        return (<div>
            <h2>blogs</h2>
            <div>
                {blogs.map(blog => <Blog
                    key={blog.id}
                    blog={blog}
                    addLikeToBlog={addLikeToBlog}
                    deleteBlog={deleteBlog}
                    showDeleteButton={showDeleteButton}
                >
                </Blog>)}
            </div>
        </div>)
    }

    const createBlogForm = () => {
        return (
            <div>
                <h2>create new</h2>
                <NewBlogForm
                    createBlog={createBlog}
                />
            </div>
        )}

        const createBlog = (newBlog) => {
            blogService.create(newBlog)
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
                    setNotification(`a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`)
                    setTimeout(() => setNotification(null), 2000)
                    navigate('/')
                })
                .catch(() => {
                    setNotification('Can not add new blog post')
                    setMessageType('error')
                    setTimeout(() => setNotification(null), 2000)
                })
        }

        const addLikeToBlog = async (blog) => {

            try {
                const updatedBlog = await blogService.addLikeToBlog(blog)
                setBlogs(blogs
                    .map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
                    .sort((a, b) => b.likes - a.likes))

                setNotification(`added like to blog' '${blog.title}'`)
                setTimeout(() => setNotification(null), 2000)
            } catch {
                setNotification('Can not add like to blog post')
                setMessageType('error')
                setTimeout(() => setNotification(null), 2000)
            }
        }

        const showDeleteButton = (blog) => {
            if (user === null) {
                return false
            }
            if (blog.user.username === user.username) {
                return true
            }
        }

        const deleteBlog = async (id) => {
            const blogToBeDeleted = blogs.find(blog => blog.id === id)
            console.log(blogToBeDeleted)
            console.log(user)
            if (user.username !== blogToBeDeleted.user.username) {
                setNotification('This blog was not written by you and therefore can not be deleted')
                setMessageType('error')
                setTimeout(() => setNotification(null), 2000)
                return
            }

            if (window.confirm('Are you sure you want to delete this entry?')) {
                try {
                    await blogService.removeBlog(id)
                    setBlogs(blogs
                        .filter(blog => blog.id !== id)
                        .sort((a, b) => b.likes - a.likes))
                    navigate('/')
                } catch {
                    setNotification('Can not delete blog post')
                    setMessageType('error')
                    setTimeout(() => setNotification(null), 2000)
                }
            }
        }

        const padding = {
            padding: 5
        }

        return (

            <div>
                <Notification message={errorMessage} messageType={messageType} />
                <div>
                    <Link style={padding} to="/">blogs</Link>
                    {!user && (<Link style={padding} to="/login">login</Link>)}
                    {user && (
                        <button className="logout"
                                onClick={() => logout()}>logout
                        </button>)}
                    {user && (
                    <Link style={padding} to="/createBlog">createBlog</Link>
                    )}
                </div>
                <Routes>
                    <Route path="/blogs/:id" element={
                                                  <BlogView
                                                     blogs={blogs}
                                                     user={user}
                                                     addLikeToBlog={addLikeToBlog}
                                                     deleteBlog={deleteBlog}
                                                     showDeleteButton={showDeleteButton}
                                                 />
                                             }/>
                    <Route path="/" element={renderBlogs()}/>
                    <Route path="/login" element={
                                              <Login
                                                 user={user}
                                                 loginForm={loginForm}
                                             />}
                    />
                    <Route path="/createBlog" element={createBlogForm()}/>
                </Routes>
            </div>)
    }

    export default App