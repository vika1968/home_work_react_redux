import React from 'react'
import {NavLink, Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className='nav'>
        <Link to="/">Home</Link>
        <Link to="/breeds">Breeds</Link>
        <Link to="/contact">Contact us</Link>
    </nav>
  )
}

export default Navbar