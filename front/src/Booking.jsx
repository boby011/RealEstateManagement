import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './REM.css';
import { baseUrl } from './Urls';

export const BookingForm = () => {
    const { id,user } = useParams();
    let userId = localStorage.getItem('id')
    const navigate = useNavigate();
    const [propertyDetails, setPropertyDetails] = useState({
        title: '',
        location: '',
        price: 0
    });

    const [formData, setFormData] = useState({
        checkin: '',
        checkout: '',
        guests: '',
        applicantName: '',
        applicantPhoneNumber: '',
        aadhaarNumber: '',
        driversLicenseId: '',
        alternatePhoneNumber: '',
        maritalStatus: ''
    });
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
                const response = await axios.get(`${baseUrl}/users/${userId}`);
                console.log('User data:', response.data);
                const userData = response.data;
                // Populate form data with user details
                setFormData({
                    ...formData,
                    applicantName: userData.firstName,
                    applicantEmail:userData.email
                    // applicantPhoneNumber: userData.phoneNumber,
                    // Add other fields as needed
                });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserData();
    }, [userId]); // Include userId in the dependency array
    

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/propertydetails/${id}`);
                console.log(response.data);
                setPropertyDetails(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };
        fetchPropertyDetails();
    }, []);

    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormData({ ...formData, [name]:value });
    };

   
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');
        try {
            const response = await axios.post(`${baseUrl}/bookings`, {
                propertyId: id,
                title: propertyDetails.title,
                location:propertyDetails.location,
                checkin: formData.checkin,
                checkout: formData.checkout,
                guests: formData.guests,
                applicantName: formData.applicantName,
                applicantEmail:formData.applicantEmail, 
                applicantPhoneNumber: formData.applicantPhoneNumber,
                aadhaarNumber: formData.aadhaarNumber,
                driversLicenseId: formData.driversLicenseId,
                alternatePhoneNumber: formData.alternatePhoneNumber, 
                agencyId: user,
                userID:userId,
                maritalStatus:formData.maritalStatus
            });
            console.log('Booking successful:', response.data);
            window.alert('Booking successful!');
            navigate('/userpage/propertybook')
            
        } catch (error) {
            console.error('Error booking property:', error);
            window.alert('Booking failed. Please try again.');
           
        }
    };
    return (
        <div className="booking-form-container">
            <h1>Booking Form</h1>
            <h3>Note:
                <ul>
                    <li>On booking the home to be rented will get blocked for 7 days</li>
                    <li>The house owner will contact you within 24 hours</li>
                    <li>An extra Rental form/agreement to be hand filled will be provided</li>
                </ul>
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={propertyDetails.title} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={propertyDetails.location} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" name="price" value={propertyDetails.price} readOnly />
                </div>
                
                <div className="form-group">
                    <label htmlFor="checkin">Check-in Date</label>
                    <input type="date" id="checkin" name="checkin" value={formData.checkin} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="checkout">Check-out Date</label>
                    <input type="date" id="checkout" name="checkout" value={formData.checkout} onChange={handleChange} required />
                </div>
                <h1>Applicant Details</h1>
                <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="applicantName">Applicant Name</label>
                    <input type="text" id="applicantName" name="applicantName" value={formData.applicantName} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="applicantEmail">Applicant Mail ID</label>
                    <input type="text" id="applicantEmail" name="applicantEmail" value={formData.applicantEmail} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="applicantPhoneNumber">Applicant Phone Number</label>
                    <input type="tel" id="applicantPhoneNumber" name="applicantPhoneNumber" pattern="[0-9]{10}" value={formData.applicantPhoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                    <input type="text" id="aadhaarNumber" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="driversLicenseId">Driver's License ID</label>
                    <input type="text" id="driversLicenseId" name="driversLicenseId" value={formData.driversLicenseId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="alternatePhoneNumber">Alternate Phone Number</label>
                    <input type="tel" id="alternatePhoneNumber" name="alternatePhoneNumber" pattern="[0-9]{10}" value={formData.alternatePhoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                </div>
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};
