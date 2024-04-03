import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='flex justify-between h-20 z-50 px-10 py-5 absolute top-0 w-full bg-secondaryDark'>
        <h1 className='text-xl lg:text-3xl'>Jonasi Deetens</h1>
        <ul className='hidden lg:flex items-center'>
            <NavLink to="/" className="link" activeClassName='active'>Home</NavLink>
            <NavLink to="/Courses" className="link" activeClassName='active'>Courses</NavLink>
            <NavLink to="/Projects" className="link" activeClassName='active'>Projects</NavLink>
            <NavLink to="/About" className="link" activeClassName='active'>About</NavLink>
            <NavLink to="/CV" className="link" activeClassName='active'>CV</NavLink>
            { isLoggedIn() && <button onClick={logout}>Logout</button> }
        </ul>
        <div className='flex flex-col lg:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)} className='bg-secondaryDark flex w-fit justify-center items-center rounded-md text-3xl active:bg-ctaDark'><i class="fa-solid fa-bars"></i></button>
          <ul className={`${menuOpen ? "flex flex-col bg-secondaryDark " : "hidden "} h-fit w-svw`}>
              <NavLink to="/" className="link" activeClassName='active'>Home</NavLink>
              <NavLink to="/Courses" className="link" activeClassName='active'>Courses</NavLink>
              <NavLink to="/Projects" className="link" activeClassName='active'>Projects</NavLink>
              <NavLink to="/About" className="link" activeClassName='active'>About</NavLink>
              <NavLink to="/CV" className="link" activeClassName='active'>CV</NavLink>
              { isLoggedIn() && <button onClick={logout}>Logout</button> }
          </ul>
        </div>
        {/*button className='px-4 flex items-center'><NavLink exact to="/login" className="text-neutral-50 hover:text-neutral-50" activeClassName=''>Login</NavLink></button>*/}
    </nav>
  )
}

export default Navbar