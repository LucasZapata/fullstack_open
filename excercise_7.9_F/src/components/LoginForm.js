import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/userReducer'


const LoginForm = () => {
    const dispatch = useDispatch()
    
    const onLogin = (event) =>{
        event.preventDefault()
        dispatch(loginAction(event.target.username.value, event.target.password.value))
    }

    let user = useSelector(state => state.user)

    const logOut = () =>{
        dispatch(logoutAction())
    }

    if (user.name)
        return(
            <span>
                Logged in as {user.name}
                <button onClick={logOut}>Log out</button>
            </span>
            )
    else
        return(
            <form onSubmit={onLogin} id='loginForm'>
                username <input type='text' id='username'/>{'\u00A0'}
                password <input type='text' id='password'/>
                <button type='submit' id='loginButton'>login</button>
            </form>
        )
}

export default LoginForm