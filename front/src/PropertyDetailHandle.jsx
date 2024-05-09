import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './REM.css';

export const PropertyDetailHandle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const [user, setAgency] = useState({});

    const fetchData = async () => {
        try {
            const propertyResponse = await axios.get(`http://localhost:4000/propertydetails/${id}`);
            setProperty(propertyResponse.data);

            // Check if property.user exists before fetching agency details
            if (propertyResponse.data.user) {
                const agencyResponse = await axios.get(`http://localhost:4000/agencyprofile/${propertyResponse.data.user}`);
                setAgency(agencyResponse.data);
            } else {
                console.error('No agency details found for this property');
            }
        } catch (error) {
            console.error('Error fetching property or agency:', error);
        }
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/propertydetails/${id}`);
            navigate('/adminpage/propertyhandle');
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
      


            <div className="property-details-handle-container">
                <div className="details ">
                    <img src={`http://localhost:4000/uploads/${property.image}`} alt="" />
                    <div className="content">
                        <h1>{property.title}</h1>
                        <div>{property.description}</div>
                    </div>
                    <div className="agency-details">
                        <h2>Agency Details</h2>
                        <p>Name: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div className="delete-button">
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>


       
    );
};
