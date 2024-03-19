import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between h-20 px-10 py-5 bg-gray-50'>
        <h1>Jonasi Deetens</h1>
        <ul className='flex items-center'>
            <NavLink to="/" className="link" activeClassName='active'>Home</NavLink>
            <NavLink to="/courses" className="link" activeClassName='active'>Courses</NavLink>
        </ul>
        <button className='px-4 flex items-center'><NavLink exact to="/login" className="text-neutral-50 hover:text-neutral-50" activeClassName=''>Login</NavLink></button>
    </nav>
  )
}

export default Navbar