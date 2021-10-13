import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const UserInfo = () => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(getUsers()),[])
    const id = useParams().id
    const user = useSelector(state => state.users.filter(user => user.id === id))
    console.log(user)
    return (
        <div>
           <ul>
                {user[0] && user[0].blogs.map(blog => <li key={blog.title}>{blog.title}</li>)}
           </ul>
        </div>
    )
}

export default UserInfo