import Togglable from './Togglable.jsx'
import {Link, Route, useNavigate} from "react-router-dom";

const Blog = ({blog, addLikeToBlog, deleteBlog, showDeleteButton}) => {

    const navigate = useNavigate()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className="blog" style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
                {blog.title} — {blog.author}
            </Link>
        </div>
    )
}

export default Blog