// Navbar.jsx
import React from 'react'
 // Adjust path as needed
 import LogoutButton from './Logoutbutton'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-amber-500 text-white py-3 px-6'>
      <span className='font-bold text-2xl'>iTask</span>
      <LogoutButton/>
      
    </nav>
  )
}

export default Navbar

