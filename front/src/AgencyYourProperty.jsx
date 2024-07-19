import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './REM.css';
import { baseUrl } from './Urls';

export const AgencyYourProperty = ({  }) => {
  const [properties, setAgencyProperties] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  useEffect(() => {
    const fetchAgencyProperties = async () => {
      try {
        const response = await axios.get(`${baseUrl}/agencyproperties/${id}`);
        setAgencyProperties(response.data);
      } catch (error) {
        console.error('Error fetching agency properties:', error);
      }
    };

    fetchAgencyProperties();
  }, [id]);

  return (
    <section style={{ marginTop: '150px' }} className='d-flex justify-content-center'>
    <div className='properties'>
      {properties.length > 0 ? (
        <div className='card-container'>
          {properties.map(item => (
            <div key={item._id} className='card'>
              <Card onClick={() => { navigate(`/agencypage/agencyyourpropertydetails/${item._id}`) }}>
                <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} alt="property" width={'200px'} height={'200px'} />
                <Card.Body className="property-details">
                  <Card.Title className='card-title'>
                    <h2>{item.title}</h2>
                  </Card.Title>
                  <Card.Text className='card-content'>
                    <div>{item.description}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>No Properties Found</div>
      )}
    </div>
  </section>
  );
};
