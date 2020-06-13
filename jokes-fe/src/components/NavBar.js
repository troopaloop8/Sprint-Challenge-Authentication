import React from 'react'
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div>
            <Link to={'/'}>Login</Link>
            <Link to={'/register'}>Register</Link>
            <Link to={'/jokes'}>Jokes</Link>
        </div>
    )
}

export default NavBar