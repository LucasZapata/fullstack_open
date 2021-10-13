import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadBlogs, deleteBlog, updateBlog, addComment, getComments } from '../reducers/blogReducer'


const Blog = () => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        margin:28,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5

    }

    const [comment,setComment] = useState('')

    const writeComment = (event) => {
        setComment(event.target.value)
    }

    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

    console.log(blog)

    const dispatch = useDispatch()
    useEffect(async() => {
        await dispatch(loadBlogs())
        await dispatch(getComments(id))
    }, [])

    const [buttonText, setButtonText] = useState('show')

    const addBlog = (blogData) => {
        dispatch(addBlog(blogData))
    }
    
    const addLike = () => {
        dispatch(updateBlog(blog))
    }

    const onDeleteClick = () => {
        if (window.confirm(`delete ${blog.name}`)){
            dispatch(deleteBlog(blog))
        }
    }

    const submitComment = (event) => {
        dispatch(addComment(id, comment))
        event.preventDefault()
        dispatch(getComments(id))
    }

    if (!blog) return(<div></div>)

    return(
        <div style={blogStyle} className='blogData'>
            <b>{blog.title}</b>, by {blog.author}
            <p>{blog.url} </p>
            <p>Likes: {blog.likes} <br/><br/>
            <button onClick={addLike} className='likeButton'>Like</button>{'\u00A0'}{'\u00A0'}{'\u00A0'}
            <button onClick={onDeleteClick}>Delete</button></p>
            {blog.comments && <ul>
                {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>}
            <form onSubmit={submitComment}>
                <input id='commentText' value = {comment} onChange = {writeComment} />
                <button type='onSubmit' id='submitCommentButton'>Send comment</button>
            </form>
        </div>
    )}

export default Blog