import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './REM.css';

export const AgencyYourPropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/propertydetails/${id}`);
            setProperty(response.data);
        } catch (error) {
            console.error('Error fetching property:', error);
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
        <section className="property-details-container">
            <div className="details container">
                <h1>{property.title}</h1>
                <img src={`http://localhost:4000/uploads/${property.image}`} alt="" />
                <div className="content">{property.description}</div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </section>
    );
};
