import {useParams} from 'react-router-dom'
import {Button} from '@mui/material'

const BlogView = ({blogs, user, addLikeToBlog, deleteBlog, showDeleteButton}) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    if (!blog) return null

    return (
        <div className="blog">
            <h2>{blog.title} — {blog.author}</h2>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                <span className="blogLikes">likes {blog.likes}</span>
                {user && <Button
                    variant="contained"
                    style={{marginTop: 10, background: 'blue'}}
                    onClick={() => addLikeToBlog(blog)}>
                    like
                </Button>}
            </div>
            <div>added by {blog.user?.name}</div>
            {showDeleteButton(blog) && (
                <Button
                    variant="contained"
                    style={{marginTop: 10, background: 'red'}}
                    onClick={() => deleteBlog(blog.id)}>
                    delete
                </Button>
            )}
        </div>
    )
}

export default BlogView;