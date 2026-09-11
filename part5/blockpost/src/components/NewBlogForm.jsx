import {useEffect, useState} from "react";
import {TextField, Button} from '@mui/material'

const NewBlogForm = ({createBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (
        <form onSubmit={addBlog}>
            <div>
                <TextField
                    placeholder="write title here"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    placeholder="author"
                    value={author}
                    onChange={event => setAuthor(event.target.value)}
                />
            </div>
            <div><TextField
                placeholder="URL"
                value={url}
                onChange={event => setUrl(event.target.value)}
            />
            </div>
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
                save
            </Button>
        </form>
    )
}


export default NewBlogForm