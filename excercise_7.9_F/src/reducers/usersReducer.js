import { useDispatch } from 'react-redux'
import usersService from '../services/users'

const reducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_USERS':
            return(action.data)
        default:
            return state
    }
}

export const getUsers = () => {
    return async dispatch => {
        const data = await usersService.getList()
        dispatch({type:'GET_USERS', data:data})
    } 
}

export default reducer