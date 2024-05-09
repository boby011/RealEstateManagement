import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './REM.css';

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Check if the current location is the home page
  const isHomePage = location.pathname === '/';

  return (
    <div className={`nav-wrapper ${isHomePage ? 'invisible' : ''}`}>
      <div className='flex'>
        <div className='head'>
          <h2>BEN</h2>
        </div>

        <div className='list'>
          <Link to='/'><span>Home</span></Link>
          <Link to='/properties'><span>Properties</span></Link>
          <Link to='/about'><span>About Us</span></Link>
          <Link to='/Login'><span>Login</span></Link>
        
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
