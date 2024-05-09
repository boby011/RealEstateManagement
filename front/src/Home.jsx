import React from 'react';
import homeBackground from './home4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './REM.css';

export const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${homeBackground})` }}>
      <div className="homecontent">
        <div className="social-icons">
          <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
        <h1 className="main-heading">KANNUR AND KOZHIKODE PROPERTIES FOR RENT</h1>
        <h2 className="sub-heading">Find the Perfect Home</h2>
        <div className="message-icon">
          <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
        </div>
      </div>
    </div>
  );
};
