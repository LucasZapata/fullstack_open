import loginService from "../services/login"
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'


const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            window.localStorage.setItem('user', action.data)
            blogService.setToken(action.data.token)
            return(action.data)
        case 'LOGOUT':
            window.localStorage.removeItem('user')
            return {}
        default:
            break;
    }
    return state
}

export const loginAction = (username, password) => {
    return async dispatch => { 
        try{
            const loginResponse = await loginService(username, password)
            console.log(loginResponse)
            dispatch({type:'LOGIN', data:loginResponse})
            dispatch(showNotification('Logged in', 5))
        }
        catch (e) {
            console.error(e, e.stack)
            dispatch(showNotification('Wrong or invalid login', 5))
        }
    }
}

export const verify = () => {
    return dispatch => {
        const data = window.localStorage.getItem('user')
        if (data) 
            dispatch({type:'LOGIN', data:data})
    }
}

export const logoutAction = () => {
    return dispatch => {
        dispatch({type:'LOGOUT'})
    }
}

export default reducer