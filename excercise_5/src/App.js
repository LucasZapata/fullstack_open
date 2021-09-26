import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import UserPanel from './components/UserPanel'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState(null)
    const [loggedName, setLoggedName] = useState('')

    const writeUsername = (event) => {setUsername(event.target.value)}
    const writePassword = (event) => {setPassword(event.target.value)}
    const refBlogFormVis = useRef()

    const loadBlogs = () => {
        blogService.getAll().then(blogs =>
        {blogs.sort((a,b) => b.likes - a.likes)
            setBlogs( blogs )
            console.log(blogs)}
        )}

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const loginResponse = await loginService(username, password)
            setUser(loginResponse.data)
            setUsername('')
            setPassword('')
            window.localStorage.setItem('user', JSON.stringify(loginResponse.data))
            setLoggedName(loginResponse.data.name)
            blogService.setToken(loginResponse.data.token)
        }
        catch (exception) {
            setMessage('Wrong or invalid login')
            setTimeout(() => setMessage(''), 5000)
        }
    }

    const logOut = () => {
        setUser(null)
        window.localStorage.removeItem('user')
    }

    useEffect(() => {
        loadBlogs()
        if (window.localStorage.getItem('user')) {
            const auxUser = JSON.parse(window.localStorage.getItem('user'))
            setUser(auxUser)
            blogService.setToken(auxUser.token)
        }
    }, [])

    const addBlog = (blogData) => {
        refBlogFormVis.current.toggleVisibility()
        blogService.postBlog(blogData).then((response) => setBlogs(blogs.concat(response)))
    }

    const likeBlog = async(updatedBlog) => {
        await blogService.updateBlog(updatedBlog)
        loadBlogs()
    }

    const onDeleteBlog = (targetBlog) => {
        if (window.confirm(`delete ${targetBlog.name}`)){
            blogService.deleteBlog(targetBlog).then((response) => {
                console.log('AAAAAAAAAAAAAAA',response)
                if (response)
                    if (response.status === 202)
                        {loadBlogs()}
                setMessage('Wrong or invalid login')
                setTimeout(() => setMessage(''), 5000)
                })
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{message}</p>
            {user!==null && <UserPanel name={loggedName} onLogout={logOut} />}
            <Togglable buttonLabel='add blog' ref={refBlogFormVis}>
                <BlogForm addBlog = {addBlog}/>
            </Togglable>
            {user===null && <LoginForm Username={username} Password={password} onUserChange={writeUsername} onPasswordChange={writePassword} onLogin={handleLogin} />}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} onLike={likeBlog} onDelete={onDeleteBlog} />
            )}
        </div>
    )
}

export default App