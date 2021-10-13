import React from "react"
import { Link } from "react-router-dom"
import LoginForm from "./LoginForm"
import styled from 'styled-components'

const StyledNavbar = styled.span`
        background: LightSlateGrey;
        padding-bottom:1.5em;
        padding-top:1.5em;
        padding-left:0.5em;
         `

const Navbar = () => {
    
    return(
        <StyledNavbar>
            <Link to = {'/'}>Home</Link>{'\u00A0'}
            <Link to = {'/userlist'}>Users</Link>
            <LoginForm/>
        </StyledNavbar>
    )
}

export default Navbar