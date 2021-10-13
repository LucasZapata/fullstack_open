import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { loadBlogs, addBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    font-weight: bold;
    font-size:19px;
    &:link{color:SteelBlue};
    &:visited{color:LightSteelBlue}`

const StyledList = styled.ul`
    line-height: 1.6;`

const StyledForm = styled.div`
    background:SkyBlue;
    margin-left:2em;
    padding:1em;
    display: inline-block;
    border-style: solid;
    border-color: Teal;`

const BlogList = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)

    const refBlogFormVis = useRef()

    return (
        <div>
            <StyledList>
                {blogs.map(blog =>
                    <li key = {blog.name}>
                        <StyledLink to = {`/blog/${blog.id}`}>'{blog.title}'</StyledLink> | by {blog.author}
                    </li>
                )}
            </StyledList>
            <StyledForm>
                <Togglable buttonLabel='add blog' ref={refBlogFormVis}>
                    <BlogForm addBlog = {addBlog}/>
                </Togglable>
            </StyledForm>
        </div>
    )
}

export default BlogList