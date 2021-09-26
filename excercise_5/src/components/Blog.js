import React, { useState } from 'react'

const Blog = ({ blog, onLike, onDelete }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }

    const [buttonText, setButtonText] = useState('show')

    const toggleData = () => {
        setVisible(!visible)
        setButtonText(buttonText === 'show' ? 'hide':'show')
    }

    const addLike = () => {
        const update = Object.assign({}, blog)
        update.likes = update.likes + 1
        console.log(onLike)
        onLike(update)
    }

    const onDeleteClick = () => onDelete(blog)

    return(
        <div style={blogStyle} className='blogData'>
            {blog.title} {blog.author}
            <button onClick={toggleData}>{buttonText}</button>
            <div style={showWhenVisible} className='hiddenContent'>
                <p>{blog.url} </p>
                <p>{blog.likes}
                    <button onClick={addLike} className='likeButton'>Like</button></p>
                <p><button onClick={onDeleteClick}>Delete</button></p>
            </div>
        </div>
    )}

export default Blog