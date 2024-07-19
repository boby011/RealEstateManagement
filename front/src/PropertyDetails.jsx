import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import './REM.css';
import { baseUrl } from './Urls';

export const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/propertydetails/${id}`);
                console.log(response.data);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };
        fetchData();
    }, [id]);

    console.log('Property:', property);

    const handleBookingClick = () => {
        // Navigate to the booking page
        navigate(`/userpage/propertydetails/booking/${id}/${property?.user}`);
    }

    return (
        <>
            <section className="property-details-container" >
                <div className="details container">
                    <h1>{property.title}</h1>
                    <h2>{property.location}</h2>
                    <img src={`${baseUrl}/uploads/${property.image}`} alt="" />
                    <div className="content">{property.description}</div>
                    {property.status === 'rented' ? (
                        <p>Status: Booked</p>
                    ) : (
                        <button className="booking-button" onClick={handleBookingClick}>Book Now</button>
                    )}
                </div>
            </section>
        </>
    );
};
