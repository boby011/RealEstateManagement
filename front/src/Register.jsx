import React, { useState } from 'react'; 
import './REM.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { baseUrl } from './Urls';

export const Register = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    roles: ''
  }); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseUrl}/register`, data);
      toast.success('Registration successful');
      setData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        roles: ''
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.status === 409) {
        toast.error('Email already in use. Please try another email.');
      } else {
        toast.error('Registration failed. Please try again later.');
      }
    }
  }

  return (
    <>
      <div className="register-wrapper">
        <div className="register-box">
          <form onSubmit={handlesubmit}> 
            <h1 style={{ textAlign: 'center' }}>Register</h1>
            <div className="input-box">
              <input 
                type="email" 
                className="form-control" 
                name="email" 
                placeholder="Email" 
                value={data.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="password" 
                className="form-control" 
                name="password" 
                placeholder="Password" 
                value={data.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="text" 
                className="form-control" 
                name="firstName" 
                placeholder="First Name" 
                value={data.firstName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="text" 
                className="form-control" 
                name="lastName" 
                placeholder="Last Name" 
                value={data.lastName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="number" 
                className="form-control" 
                name="age" 
                placeholder="Age" 
                value={data.age} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <select 
                name="roles" 
                className="form-control" 
                value={data.roles} 
                onChange={handleChange} 
                required
              >
                <option value="">Select...</option>
                <option value="tenant">Tenant</option>
                <option value="agency">Agency</option>
              </select>
            </div>
            <button type="submit" className="btn btn-dark mt-3">Register</button>
          </form>
        </div>
      </div>
      <ToastContainer /> 
    </>
  );
};