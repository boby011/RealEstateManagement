import React from 'react';
import './REM.css';
import { Link, Outlet, useNavigate, useLocation  } from 'react-router-dom';

export const AgencyPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleClick = () => {
    localStorage.clear();
    navigate('/login');
  };
  const isAgencyProfilePage = location.pathname === '/agencyprofile';

  return (
    <>
      <div className={`nav-wrapper`}>
        <div className='flex'>
          <div className='head'>
            <h2>BEN</h2>
          </div>

          <div className='list'>
            <Link to='/agencypage/agencyprofile'><span>Profile</span></Link>
            <Link to='/agencypage/agencyproperty'><span>Add Properties</span></Link>
            <Link to='/agencypage/agencypropertyview'><span>Your Properties</span></Link>
            <Link to='/agencypage/agencybookedproperty'><span>Booked Properties</span></Link>
            <Link to='/agencypage/contact'><span>Contact</span></Link>
            <Link to='/'><button className='logoutbtn' onClick={handleClick}>Logout</button></Link>
            
          </div>
        </div>
        <Outlet />
      </div>

      {isAgencyProfilePage &&<h1 className='welcome-heading '>Welcome to Your Agency Page</h1> }{/* Add the welcome heading here */}
    </>
  );
};
