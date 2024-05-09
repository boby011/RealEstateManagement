import React, { useState, useEffect } from 'react';
import './REM.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

//  useEffect(() => {
  
//   const user = localStorage.getItem('id');
//   const type = localStorage.getItem('userType');
//   if (user) {
//     if (type === 'user') {
//       navigate('/userpage');
//     } else if (type === 'agency') {
//       navigate('/agencypage');
   
//     }
//   } else if (data.email === 'admin@gmail.com' && data.password === 'admin') {
//     navigate('/adminpage');
//   }
// }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (data.email === 'admin@gmail.com' && data.password === 'admin') {
        window.alert('Admin Login Success');
        localStorage.setItem('email', data.email);
        navigate('/adminpage');
      } else {
        let response = await axios.post(`http://localhost:4000/login`, data);
        console.log(response.data);
        if(response.data.status){
         
          localStorage.setItem('id', response.data.data._id);
          localStorage.setItem('userType', response.data.data.roles);
          if (response.data.data.roles === 'agency' && response.data.data.status) {
            window.alert('Agency Login Success');
            navigate('/agencypage/agencyprofile');
          }
          if (response.data.data.roles === 'tenant') {
            window.alert('User Login Success');
            navigate('/userpage/userprofile');
          }

        }
      }
    } catch (e) {
      console.error('Login error:', e);
      if (e.response && e.response.status === 401) {
        window.alert('Invalid email or password');
      } else {
        window.alert('Login Failed');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center' }}>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Email" name="email" onChange={handleChange} required />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password</a>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};