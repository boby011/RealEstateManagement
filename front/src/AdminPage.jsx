import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './REM.css';

export const AdminPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <div className={`nav-wrapper`}>
        <div className='flex'>
          <div className='head'>
            <h2>BEN</h2>
          </div>

          <div className='list'>
            <Link to='/adminpage/propertyhandle'><span>Property Handle</span></Link>

            <Link to='/adminpage/userdetails'><span>Users</span></Link>
            <Link to='/adminpage/agencydetails'><span>Agencies</span></Link>
            <Link to='/'><button className='logoutbtn' onClick={handleClick}>Logout</button></Link>
          </div>
        </div>
        <Outlet />
      </div>

    </>
  );
};
