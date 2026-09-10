import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, user, addLikeToBlog, deleteBlog, showDeleteButton }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    if (!blog) return null

    return (
        <div className="blog">
            <h2>{blog.title} — {blog.author}</h2>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                <span className="blogLikes">likes {blog.likes}</span>
                {user && <button onClick={() => addLikeToBlog(blog)}>like</button>}
            </div>
            <div>added by {blog.user?.name}</div>
            {showDeleteButton(blog) && (
                <button onClick={() => deleteBlog(blog.id)}>delete</button>
            )}
        </div>
    )
}

export default BlogView;