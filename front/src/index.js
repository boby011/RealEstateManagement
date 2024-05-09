import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './REM.css';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Home } from './Home';
import { Login } from './Login';
import { Provider } from 'react-redux';
import { Register } from './Register';
import { About } from './About';
import { AdminPage } from './AdminPage';
import { UserPage } from './UserPage';
import { AgencyPage } from './AgencyPage';
import { Properties } from './Properties';
import UserDetails from './UserDetails';

import AgencyDetail from './AgencyDetail';
import { AgencyProfile } from './AgencyProfile';
import { AgencyProperty } from './AgencyProperty';
import { Contact } from './Contact';
import { UserProfile } from './UserProfile';
import { PropertyBook } from './PropertyBook';
import { PropertyDetails } from './PropertyDetails';
import { BookingForm } from './Booking';
import { HomePropertyDetails } from './HomePropertyDetails';
import { AgencyYourProperty } from './AgencyYourProperty';
import { AgencyBookedProperty } from './AgencyBookedProperty';
import { PropertyHandle } from './PropertyHandle';
import { PropertyDetailHandle } from './PropertyDetailHandle';
import { AgencyYourPropertyDetail } from './AgencyYourPropertyDetails';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Nav />} >
            <Route index element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/properties' element={<Properties />} />
            <Route path='/homepropertydetails/:id' element={<HomePropertyDetails />} />

          </Route>
          <Route path='/adminpage' element={<AdminPage />}>

            <Route path='userdetails' element={<UserDetails />} />
            <Route path='agencydetails' element={<AgencyDetail />} />
            <Route path='propertyhandle' element={<PropertyHandle />} />
            <Route path='propertydetailhandle/:id' element={<PropertyDetailHandle />} />
          </Route>

          <Route path='/agencypage' element={<AgencyPage />}>
            <Route path='agencyprofile' element={<AgencyProfile />} />
            <Route path='agencyproperty' element={<AgencyProperty />} />
            <Route path='agencypropertyview' element={<AgencyYourProperty />} />
            <Route path='agencyyourpropertydetails/:id' element={<AgencyYourPropertyDetail />} />
            <Route path='agencybookedproperty' element={<AgencyBookedProperty />} />
            <Route path='contact' element={<Contact />} />
          </Route>

          < Route path='/userpage' element={<UserPage />}>
            <Route path='contact' element={<Contact />} />
            <Route path='userprofile' element={<UserProfile />} />
            <Route path='propertybook' element={<PropertyBook />} />
            <Route path='propertydetails/:id' element={<PropertyDetails />} />
            <Route path='propertydetails/booking/:id/:user' element={<BookingForm />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
