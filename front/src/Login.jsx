import React, { useState } from 'react';
import './REM.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './Urls';

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (data.email === 'admin@gmail.com' && data.password === 'admin') {
        window.alert('Admin Login Success');
        localStorage.setItem('email', data.email);
        navigate('/adminpage');
      } else {
        const response = await axios.post(`${baseUrl}/login`, data);
        console.log(response.data);

        if (response.data.status) {
          localStorage.setItem('id', response.data.data._id);
          localStorage.setItem('userType', response.data.data.roles);

          if (response.data.data.roles === 'agency') {
            window.alert('Agency Login Success');
            navigate('/agencypage/agencyprofile');
          } else if (response.data.data.roles === 'tenant') {
            window.alert('User Login Success');
            navigate('/userpage/userprofile');
          } else {
            window.alert('Login Failed: Role not recognized');
          }
        } else {
          window.alert('Login Failed: Invalid response status');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
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
            <input 
              type="email" 
              placeholder="Email" 
              name="email" 
              onChange={handleChange} 
              value={data.email} 
              required 
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              onChange={handleChange} 
              value={data.password} 
              required 
            />
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