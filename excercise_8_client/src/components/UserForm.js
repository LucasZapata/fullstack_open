import { useMutation } from "@apollo/client"
import React, {useState, useEffect} from "react"
import { LOGIN } from "../queries"



const UserForm = ({setToken, show}) => {
    const [username, setUsername] = useState('LhZ')
    const [password, setPassword] = useState('password')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => console.log(error.graphQLErrors[0].message)
    })

    useEffect(() => {
        if (!result.data)
            return
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('user-token', token)
    }, [result.data])

    const submitLogin = (event) => {
        event.preventDefault()
        login({variables: {username, password}})
        console.log(result)
    }
    if (!show) return null

    return (
        <div>
            <form onSubmit={submitLogin}>
                <input value={username} onChange={({target}) => setUsername(target.value)}/><br/>
                <input value={password} onChange={({target}) => setPassword(target.value)}/><br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

}

export default UserForm
