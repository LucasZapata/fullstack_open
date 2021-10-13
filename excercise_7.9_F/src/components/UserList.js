import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer'

const UserList = () => {
    const dispatch = useDispatch()
    useEffect(() => dispatch(getUsers()),[])
    const userlist = useSelector(state => state.users)
    userlist.map(user => console.log(user.name))
    return (
        <div>
            <table>
                <tr>
                    <th>User</th>
                    <th>Blogs</th>
                </tr>
                {userlist.map(user => 
                    <tr>
                        <td><Link to = {`/userlist/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default UserList