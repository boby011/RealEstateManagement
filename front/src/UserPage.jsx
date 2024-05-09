import React from 'react'
import './REM.css';
import { Link, Outlet,useNavigate } from 'react-router-dom';
export const UserPage = () => {
  const navigate=useNavigate()
  const handleClick =()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
    <div className={`nav-wrapper`}>
      <div className='flex'>
        <div className='head'>
          <h2>BEN</h2>
        </div>

        <div className='list'>
        {/* <Link to='/userhome'><span>Home</span></Link> */}
        <Link to='/userpage/userprofile'><span>Profile</span></Link>
        <Link to='/userpage/propertybook'><span>Properties</span></Link>
        <Link to='/userpage/contact'><span>Contact</span></Link>
        <Link to='/'><button className='logoutbtn' onClick={handleClick}>Logout</button> </Link>
        </div>
      </div>
      <Outlet />
    </div>

   
  </>
  )
}
