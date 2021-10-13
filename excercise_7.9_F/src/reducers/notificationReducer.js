const reducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return(action.text)
        case 'CLEAR_NOT':
            return null
        default:
            return state;
    }
}

export const showNotification = (text, time = 5) => {
    return dispatch => {
        dispatch({type:'NOTIFICATION', text:text})
        setTimeout(() => dispatch({type:'CLEAR_NOT'}), time*1000)
    }
}

export default reducer