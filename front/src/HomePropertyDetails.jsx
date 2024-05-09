import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import './REM.css';

export const HomePropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});
  
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/propertydetails/${id}`);
                console.log(response.data);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };
        fetchData();
    }, [id]);

    console.log('Property:', property);
    
  
    return (
        <section className="property-details-container">
            <div className="details container">
                <h1>{property.title}</h1>
                <img src={`http://localhost:4000/uploads/${property.image}`} alt="" />
                <div className="content">{property.description}</div>
                
            </div>
        </section>
    );
};
