const mongoose = require('mongoose');
const Customer = require('./customer');


const propertySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: String, // Assuming you're storing the image path
      required: true
    },

    status: {
      type: String,
      enum: ['available', 'rented'],
      default: 'available' // Default status is available
  },
  
    user:{
        type:mongoose.Types.ObjectId,
        ref:Customer
    }
  });
  
  const Property = mongoose.model('Property', propertySchema);
  
  module.exports = Property;