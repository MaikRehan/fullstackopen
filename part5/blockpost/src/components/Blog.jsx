import Togglable from "./Togglable.jsx";

const Blog = ({blog, addLikeToBlog, deleteBlog}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <Togglable buttonLabel="show">
                    <div>{blog.url}</div>
                    <div>
                        likes {blog.likes}
                        <button onClick={() => addLikeToBlog(blog)}>
                            like
                        </button>
                    </div>
                    <div>{blog.user?.name}</div>
                    <div>
                        <button onClick={() => deleteBlog(blog.id)}>
                            delete
                        </button>
                    </div>
                </Togglable>
            </div>
        </div>
    )
}

export default Blog