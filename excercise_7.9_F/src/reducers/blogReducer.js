import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'FILL':
            return sortList(action.data)
        case 'UPDATE':
            return sortList(state.map(blog => blog.id === action.data.id ? action.data : blog))
        case 'LOAD_COMMENTS':
            console.log(action.id)
            return sortList(state.map(blog => blog.id === action.id ? {...blog, comments:action.data} : blog))
        case 'ADD_COMMENT':
            return sortList(state.map(blog => blog.id === action.id ? {...blog, comments:blog.comments.concat(action.data)} : blog))
        case 'DELETE':
            return sortList(state.filter(blog => blog.id !== action.data.id))
        default:
            break;
    }
    return state
    
}

const sortList = (blogList) => {
    return blogList.sort((a,b) => b.likes - a.likes)
}

export const loadBlogs = () =>{
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({type:'FILL', data:blogs})
    }
}

export const addBlog = (blog) =>{
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({type:'ADD', data:blogs})
    }
}

export const updateBlog = (blog) =>{
    return async dispatch => {
        console.log(blog)
        const update = {...blog, likes: blog.likes+1}
        const response = await blogService.updateBlog(update)
        if (response.status === 202){
            dispatch({type:'UPDATE', data:update})
        }
        else dispatch(showNotification(`Like failed`))
    }
}

export const deleteBlog = (blog) =>{
    return async dispatch => {
        const response = await blogService.deleteBlog(blog)
        console.log(String(response))
        if (response.status === 202){
            dispatch({type:'DELETE', data:blog})
            dispatch(showNotification(`Deleted "${blog.title}"`))
        }
        else dispatch(showNotification(`Deleting failed`))
    }
}

export const addComment = (blogId, text) => {
    return async dispatch => {
        const user = window.localStorage.getItem('user')
        if (user){
            const response = await blogService.postComment(blogId, {content:text})
            if (response.status === 201){
                dispatch({type:'ADD_COMMENT',data:text,id:blogId})
                dispatch(showNotification(`Sent comment`))
            }
            else dispatch(showNotification(`Comment failed`))
        }
    }
}

export const getComments = (blogId) => {
    return async dispatch => {
        const comments = await blogService.getComments(blogId)
        console.log('aaaaaaa', comments)
        dispatch({type:'LOAD_COMMENTS', id:blogId, data:comments})
    }
}

export default reducer