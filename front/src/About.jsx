import React, { useEffect } from 'react';
import './REM.css'; // Import CSS file for styling

export const About = () => {
  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('about-page');

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);
  return (
    <div className='about-out'>
      <h4 className='about-mainsub'>more than a team.....</h4>
      <h1 className='about-mainhead'>familia</h1>
      <div className="about-container">
        <h2 className="about-heading">About Us</h2> {/* Add heading */}
        <div className="about-content">
          <p>
            BEN Homes is one of the fastest-growing property management companies in Kerala. We offer the finest and most professional team to execute a vast variety of property management services in and around Kottayam. Our services are ideal, especially for NRI owners of houses, villas, flats & apartments, commercial property, and agricultural property. Some of our services are limited to Kottayam town and surroundings, while others are available throughout Kerala. Please check with us for our services in your area.
          </p>
          <p>
            Our Property Management Services include:
          </p>
          <ul>
            <li>Rent Management - Short Term & Long Term Rentals</li>
            <li>Tenant Screening & Management Services</li>
            <li>Marketing Property for Sale, Rent, or Lease</li>
            <li>Plot / Property Monitoring</li>
            <li>Housekeeping - General Cleaning and Deep Cleaning</li>
            <li>General Pest Control</li>
            <li>Building Maintenance & Repairs (Plumbing, Electrical, Painting, Carpentry, Masonry)</li>
            <li>Home Appliances Maintenance and Repairs</li>
          </ul>
          <p>
            Short-term and long-term rental services include inventory check, Rental / Lease Agreement, Rent Collection, Regular Property Inspection, and Tax and Utility Bill Payments (Property Tax & Land Tax Payment, Flat Maintenance fees payments, Electricity Bill Payment, Water Bill Payment, etc). Free rental listing is provided for our clients through our website. Inventory checks are conducted upon arrival and exit of tenants. Assistance in Inventory Check is provided during possession and vacating, and periodic inspections are conducted.
          </p>
          <p>
            Plot monitoring: Regular monitoring of your property is conducted, and updates are provided. Periodic property inspections are conducted to check the condition of the property, both interior and exterior. Exterior checks are done monthly, and interior checks are done quarterly. A Property Inspection report is sent after each inspection.
          </p>
          <p>
            Assistance in Payment of Property-related Bills: Utility bill payments and property tax payments are managed, and reminders are sent before the due dates. Receipts are maintained and can be provided upon request.
          </p>
          <p>
            Assistance in Repairs and Maintenance: Tenants can request maintenance work, and a physical visit will be made to assess the work.
          </p>
        </div>
      </div>
    </div>
  );
};
