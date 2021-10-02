const reducer = (state='', action) => {
    if (action.type === 'UPDATE_FILTER')
        return action.filter
    else
        return ''
}

export const changeFilter = (filter) => {
    return{type:'UPDATE_FILTER', filter:filter.toLowerCase()}
}

export default reducer