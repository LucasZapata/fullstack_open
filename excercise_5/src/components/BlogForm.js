import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => setTitle(event.target.value)
    const handleAuthorChange = (event) => setAuthor(event.target.value)
    const handleUrlChange = (event) => setUrl(event.target.value)

    const newBlog = (event) => {
        event.preventDefault()
        addBlog({ title:title,
            author:author,
            url:url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={newBlog}>
                <div>
                Title <input value={title} onChange={handleTitleChange} id='titleForm'/>
                </div>
                <div>
                Author <input value={author} onChange={handleAuthorChange} id='authorForm'/>
                </div>
                <div>
                URL <input value={url} onChange={handleUrlChange} id='urlForm'/>
                </div>
                <button type='onSubmit' id='submitBlogButton'>Submit</button>
            </form>
        </div>
    )}

export default BlogForm