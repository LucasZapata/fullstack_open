import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch} from "react-router-dom"
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import UserPanel from './components/UserPanel'
import { verify } from './reducers/userReducer'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import Navbar from './components/NavBar'
import styled from 'styled-components'

const App = () => {
    const dispatch = useDispatch()
    let message = useSelector(state => state.notification)
    useEffect(() => dispatch(verify()), [dispatch])

    const StyledNavbar = styled.div`
        background: LightSlateGrey;
        padding-bottom:1.5em;
        padding-top:1.5em;
        padding-left:0.5em;
         `
    const Page = styled.div`
        background: WhiteSmoke;
        padding-bottom: 5em`
    
    return (
        <Page>
            <StyledNavbar>
            <Navbar/>
            </StyledNavbar>
            <p>{message}</p>
            <Switch>
                <Route path = {'/userlist/:id'}>
                    <UserInfo/>
                </Route>
                <Route path = {'/userlist'}>
                    <UserList/>
                </Route>
                <Route path = {'/blog/:id'}>
                    <Blog/>
                </Route>
                <Route path = {'a'}>
                </Route>
                <Route path = {'/'}>
                    <BlogList/>
                </Route>
            </Switch>
        </Page>
    )
}

export default App