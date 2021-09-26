import React from 'react'

const UserPanel = ({ name, onLogout }) => {
    return(
        <div>
            <p>Logged in as {name}</p>
            <button onClick={onLogout}>Log out</button>
        </div>
    )
}

export default UserPanel