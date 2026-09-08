import Togglable from './Togglable.jsx'

const Blog = ({blog, addLikeToBlog, deleteBlog, showDeleteButton}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className="blog"
             style={blogStyle}>
            <div>
                <span>
                    <div className="blogTitle">{blog.title}</div>
                    {' '}
                    <div className="blogAuthor">{blog.author}</div>
                    <Togglable buttonLabel="show">
                        <div className="blogUrl">{blog.url}</div>
                        <div className="blogLikes">
                            likes {blog.likes}
                            <button onClick={() => addLikeToBlog(blog)}>
                                like
                            </button>
                        </div>
                        <div>{blog.user?.name}</div>
                        <div>
                            {showDeleteButton(blog) && (
                                <button onClick={() => deleteBlog(blog.id)}>
                                    delete
                                </button>
                            )}
                        </div>
                    </Togglable>
                </span>
            </div>
        </div>
    )
}

export default Blog