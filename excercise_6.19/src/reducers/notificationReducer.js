let timeoutF = ''

const reducer = (state = '', action) => {
    console.log(action)
    switch (action.type) {
        case 'NOTIFICATION':
            return(action.text)
        case 'CLEAR_NOT':
            return null
        default:
            return state;
    }
}

export const showNotification = (text, time) => {
    return async dispatch => {
        dispatch({type:'NOTIFICATION', text:text})
        if (timeoutF !== '') clearTimeout(timeoutF)
        timeoutF = setTimeout(() => dispatch({type:'CLEAR_NOT'}), time*1000)
    }
}

export default reducer