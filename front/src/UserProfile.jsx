import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './REM.css'; 
import { baseUrl } from './Urls';

export const UserProfile = () => {
  const [user, setUserData] = useState({
    email:'',
    firstName:'',
    lastName:'',
    age:'',
   
  });

  const id = localStorage.getItem('id');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/userprofile/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);
  
  const handleChange = (event) => {
    setUserData({ ...user, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/updateuserprofile/${id}`, user);
      if (response.data) {
        localStorage.setItem('response', JSON.stringify(response.data));
        window.alert('Profile Updated Successfully');
      } else {
        window.alert('Failed to update');
      }
    } catch (error) {
      console.log('Error updating profile', error);
      window.alert('Failed to Update profile');
    }
  };

  return (
    <div className="agency-profile-container">
      <div className="profile-box">
        <h2 className='ProfileHead'>Your Profile</h2>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Age:</strong> {user.age}</p>
          
        </div>
      </div>
      <div className="update-box">
        <h2>Update Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email" required />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="Enter first name" required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Enter last name" required />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={user.age} onChange={handleChange} placeholder="Enter age" required />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};
