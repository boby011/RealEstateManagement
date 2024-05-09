const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT
const Customer = require('./models/customer');
const Property = require('./models/property');
const Booking = require('./models/booking')
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const { reset } = require('nodemon');
// const Agency = require("./models/agency");
// const verifytoken = require('./models/verifytoken');
// const path = require('path');
// const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/REM')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const saltrounds = 10; // Define saltrounds here

app.use(express.json());
app.use(cors());


// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename uploaded file to avoid naming conflicts
    }
  });
  const upload = multer({ storage: storage });
app.post('/register', async (req, res) => {
    try {
       
        const { email, password, firstName, lastName, age, roles } = req.body;

      
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        if(req.body.roles === 'agency'){
        const newCustomer = new Customer({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            age,
            roles,
            status:false
        });

       
        await newCustomer.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    }else{
        
            const newCustomer = new Customer({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                age,
                roles,
                status:true
            });
             // Save the new user document to the database
        await newCustomer.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// backend.js
// backend.js

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the provided email
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid email or password',status:false });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' ,status:false});
        }



        // Respond with user ID and user type
        res.status(200).json({ data:customer,status:true });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error',status:false });
    }
});

/*bbb */

// Add routes to fetch all users and agencies
app.get('/users', async (req, res) => {
    try {
        const users = await Customer.find({ roles: 'tenant' });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/:userId', async (req, res) => {
  try {
      // Extract user ID from request parameters
      const { userId } = req.params;

      // Fetch user details from the database based on user ID
      const user = await Customer.findById(userId);

      if (!user) {
          // If user is not found, return a 404 Not Found response
          return res.status(404).json({ message: 'User not found' });
      }

      // If user is found, return the user details
      res.json(user);
  } catch (error) {
      // If an error occurs during the process, return a 500 Internal Server Error response
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/agency', async (req, res) => {
    try {
        const agency = await Customer.find({ roles: 'agency' });
        res.status(200).json(agency);
    } catch (error) {
        console.error('Error fetching agencies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/agencyverification/:agencyid', async (req, res) => {
    try {
      const agencyid = req.params.agencyid;;
      const agency = await Customer.findByIdAndUpdate(agencyid, {$set:{status:req.body.status }}, { new: true });
      res.json(agency);
    } catch (error) {
      console.error('Error verifying user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  });

  app.get('/agencyprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const agency = await Customer.findById(id);
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        res.json(agency);
    } catch (error) {
        console.error('Error fetching agency:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/updateagencyprofile/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { ...rest } = req.body;
  
      // if (password) {
      //   const hashedPassword = await bcrypt.hash(password, saltrounds);
      //   rest.password = hashedPassword;
      // }
  
      const updatedProfile = await Customer.findByIdAndUpdate(id, rest, { new: true });
  
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/addproperty', upload.single('image'), async (req, res) => {
    try {
      // Extract data from request body
      const { title, description, price, location,user } = req.body;
      // Extract file path of uploaded image
      const imagePath = req.file ? req.file.filename : '';
      // Create a new Property instance
      const newProperty = new Property({
        title: title,
        description: description,
        price: price,
        location: location,
        image: imagePath,
        status: 'available',
        user:user
      });
      // Save the property to the database
      const savedProperty = await newProperty.save();
      // Send response with success message and saved property data
      res.json({ message: 'Property added successfully', property: savedProperty });
    } catch (error) {
      console.error('Error adding property:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/agencyproperties/:id', async (req, res) => {
    try {
        // Get agency ID from query parameters
        const id = req.params.id;

        // Fetch properties belonging to the agency with the provided ID
        const properties = await Property.find({ user: id });
        res.json(properties);
    } catch (error) {
        console.error('Error fetching agency properties:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

  app.use('/uploads', express.static('uploads'));
  
  app.get('/properties', async (req, res) => {
    try {
      let properties = await Property.find();
      if (properties.length > 0) {
        const formattedProperties = properties.map(property => {
          return {
            _id: property._id,
            title: property.title,
            description: property.description,
            image: property.image ? property.image : null,
            location:property.location,
            price:property.price,
            // Assuming you have a user field in your Property schema
            user: property.user
          };
        });
        res.json(formattedProperties);
      } else {
        res.json({ result: 'No Properties Found' });
      }
    } catch (error) {
      console.error('Error retrieving properties:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // Route for fetching properties, optionally filtered by location
  app.get('/propertiessearch', async (req, res) => {
    try {
      const { location } = req.query; // Extract location query parameter
      
      // If location is provided, filter properties based on it; otherwise, fetch all properties
      const properties = location ? 
        await Property.find({ location: { $regex: new RegExp(location, "i") } }) :
        await Property.find();
      
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.delete('/propertydetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Find the property by ID and delete it
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        // Delete bookings associated with the deleted property
        await Booking.deleteMany({ propertyId: id });
        res.json({ message: 'Property and associated bookings deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/agencyprofile/:id', async (req, res) => {
  try {
      const user = req.params.id;
      const agency = await Property.findById(user);
      if (!user) {
          return res.status(404).json({ message: 'Agency not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching agency:', error);
      res.status(500).json({ error: 'Server error' });
  }
});
  app.get('/userprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Customer.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching agency:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/updateuserprofile/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { password, ...rest } = req.body;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        rest.password = hashedPassword;
      }
  
      const updatedProfile = await Customer.findByIdAndUpdate(id, rest, { new: true });
  
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  
app.get('/propertydetails/:id', async (req, res) => {
  try {
      const property = await Property.findById(req.params.id);
      if (!property) {
          return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
  } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/bookings', async (req, res) => {
  try {
      
      const { checkin, checkout, guests, applicantName, applicantPhoneNumber, aadhaarNumber,driversLicenseId, alternatePhoneNumber, maritalStatus, agencyId,propertyId,userID,status} = req.body;

      
      const newBooking = new Booking({
          checkin,
          checkout,
          guests,
          applicantName,
          applicantPhoneNumber,
          aadhaarNumber,
          driversLicenseId,
          alternatePhoneNumber,
          maritalStatus,
          agencyId,
          userID,
          propertyId,
          status
      });

     
      const savedBooking = await newBooking.save();
      const updatedProperty = await Property.findByIdAndUpdate(propertyId, { status: 'rented' }, { new: true });
     
      res.json({ message: 'Booking successful', booking: savedBooking,updatedProperty });
  } catch (error) {
      console.error('Error making booking:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/bookings/agency/:agencyId', async (req, res) => {
  try {
    const { agencyId } = req.params;

    // Assuming you have a field `agencyId` in your Booking schema to store the agency's ID
    const bookings = await Booking.find({ agencyId }).populate('propertyId', 'title');

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// app.post('/register', async (req, res) => {
//     try {
        
//         const { email, password, firstName, lastName, age, roles } = req.body;

       
//         const existingAgency = await Agency.findOne({ email });
//         if (existingAgency) {
//             return res.status(409).json({ message: 'Email already registered' });
//         }

//         // Hash the password before storing it in the database
//         const hashedPassword = await bcrypt.hash(password, saltrounds);

//         // Create a new user document
//         const newAgency = new Agency({
//             email,
//             password: hashedPassword,
//             firstName,
//             lastName,
//             age,
//             roles
//         });

//         // Save the new user document to the database
//         await newAgency.save();

//         // Respond with a success message
//         res.status(201).json({ message: 'Agent registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if the email exists in either Customer or Agency collection
//         const user = await Customer.findOne({ email }) || await Agency.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Compare the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

//         // Respond with token and user type
//         res.status(200).json({
//             token,
//             userType: user instanceof Customer ? 'customer' : 'agency' // Determine user type
//         });
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
