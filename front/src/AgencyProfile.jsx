import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './REM.css'; 
import { baseUrl } from './Urls';

export const AgencyProfile = () => {
  const [agency, setAgencyData] = useState({
    email:'',
    firstName:'',
    lastName:'',
    age:'',
    status:''
  });

  const id = localStorage.getItem('id');
  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/agencyprofile/${id}`);
        setAgencyData(response.data);
      } catch (error) {
        console.error('Error fetching agency data:', error);
      }
    };

    fetchAgencyData();
  }, [id]);
  
  const handleChange = (event) => {
    setAgencyData({ ...agency, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/updateagencyprofile/${id}`, agency);
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
          <p><strong>Email:</strong> {agency.email}</p>
          <p><strong>First Name:</strong> {agency.firstName}</p>
          <p><strong>Last Name:</strong> {agency.lastName}</p>
          <p><strong>Age:</strong> {agency.age}</p>
          <p><strong>Status:</strong> {agency.status ? 'Approved' : 'Not Approved'}</p>
        </div>
      </div>
      <div className="update-box">
        <h2>Update Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={agency.email} onChange={handleChange} placeholder="Enter email" required />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={agency.firstName} onChange={handleChange} placeholder="Enter first name" required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={agency.lastName} onChange={handleChange} placeholder="Enter last name" required />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={agency.age} onChange={handleChange} placeholder="Enter age" required />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};
