import React, { useState } from 'react'; // Import useState
import './REM.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch

export const Register = () => {
  const [data, setData] = useState(''); // Initialize state using useState
  const dispatch = useDispatch(); // Get the dispatch function
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/register', data);
      toast.success('Registration success');
      setData('');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed');
    }
  }
  

  return (
    <>
      <div className="register-wrapper">
        <div className="register-box">
          <form onSubmit={handlesubmit}> {/* Add onSubmit handler */}
            <h1 style={{ textAlign: 'center' }}>Register</h1>
            <div className="input-box">
              <input type="text" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="input-box">
              <input type="text" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <div className="input-box">
              <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={handleChange} />
            </div>
            <div className="input-box">
              <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={handleChange} />
            </div>
            <div className="input-box">
              <input type="text" className="form-control" name="age" placeholder="Age" onChange={handleChange} />
            </div>
            <div className="input-box">
              <select name="roles" className="form-control" onChange={handleChange}>
                <option value="">Select...</option>
                <option value="tenant">Tenant</option>
                <option value="agency">Agency</option>
              </select>
            </div>
            <button type="submit" className="btn btn-dark mt-3">Register</button>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer for displaying notifications */}
    </>
  );
};
