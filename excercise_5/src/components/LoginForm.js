import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ Username, Password, onUserChange, onPasswordChange, onLogin }) => {
    return(
        <form onSubmit={onLogin} id='loginForm'>
            <div>username
                <input type='text' value={Username} id='username'
                    onChange={onUserChange} />
            </div>
            <div>password
                <input type='text' value={Password} id='password'
                    onChange={onPasswordChange} />
            </div>
            <button type='submit' id='loginButton'>login</button>
        </form>
    )
}

LoginForm.propTypes = {
    Username:PropTypes.string.isRequired,
    Password:PropTypes.string.isRequired,
    onUserChange:PropTypes.func.isRequired,
    onPasswordChange:PropTypes.func.isRequired,
    onLogin:PropTypes.func.isRequired
}

export default LoginForm