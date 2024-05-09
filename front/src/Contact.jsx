// ContactPage.jsx

import React from 'react';
import './REM.css'; // Import your CSS styles if necessary

export const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-info-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, feel free to contact us:</p>
        <div className="contact-info">
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Street, City, Country</p>
        </div>
      </div>
      <div className="contact-form-container">
        <h2>Send a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
