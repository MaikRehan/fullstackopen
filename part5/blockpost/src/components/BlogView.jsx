import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, addLikeToBlog, deleteBlog, showDeleteButton }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title} — {blog.author}</h2>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                likes {blog.likes}
                <button onClick={() => addLikeToBlog(blog)}>like</button>
            </div>
            <div>added by {blog.user?.name}</div>
            {showDeleteButton(blog) && (
                <button onClick={() => deleteBlog(blog.id)}>delete</button>
            )}
        </div>
    )
}

export default BlogView;