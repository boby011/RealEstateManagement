import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './REM.css';

const AgencyDetail = () => {
    const navigate=useNavigate()
   
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        // Fetch all agencies
        axios.get('http://localhost:4000/agency')
            .then(response => {
                setAgencies(response.data);
            })
            .catch(error => {
                console.error('Error fetching agencies:', error);
            });
    }, []);
    const verifyAgencies = async (agencyId,status) => {
        try {
       const response= await axios.put(`http://localhost:4000/agencyverification/${agencyId}`,{status});
       console.log('ddj',response);
       setAgencies(agencies.map(agency => (agency._id === agencyId ? { ...agency, verified: true } : agency)));
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };
    return (
        <>
                 
            <div>
                <h2>Agency Details</h2>
                <table className="agency-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencies.map(agency => (
                            <tr key={agency._id}>
                                <td>{agency.firstName} {agency.lastName}</td>
                                <td>{agency.email}</td>
                                <td>{agency.age}</td>
                                <td>{agency.status ? 'Verified' : 'Not Verified'}</td>
                                <td>
                                    {agency.status ? 'verified' : (
                                        <button className='bg' style={{ color: 'black' }} onClick={() => verifyAgencies(agency._id,true)}>Verify</button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AgencyDetail;
