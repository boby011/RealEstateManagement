import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AgencyBookedProperty = () => {
    const [bookings, setBookings] = useState([]);
    const agencyId = localStorage.getItem('id'); // Assuming agency ID is stored in localStorage
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Fetch bookings for the logged-in agency
                const response = await axios.get(`http://localhost:4000/bookings/agency/${agencyId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
    
        fetchBookings();
    }, [agencyId]);
    return (
        <div className="booked-property-container">
            <h2>Booked Properties</h2>
            {bookings.map(booking => (
                <div className="booked-property" key={booking._id}>
                    <p>Property: {booking.propertyId.title}</p>
                    <p>Applicant Name: {booking.applicantName}</p>
                    <p>Applicant Phone No.: {booking.applicantPhoneNumber}</p>
                    <p>Check-in Date: {booking.checkin}</p>
                    <p>Check-out Date: {booking.checkout}</p>
                    {/* Add more booking details as needed */}
                </div>
            ))}
        </div>
    );
};



