
const mongoose = require('mongoose');
const Property = require('./property');

const bookingSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        // required: true
    }, 
    userID:{
        type: mongoose.Schema.Types.ObjectId,
    },
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
      
        // required: true
    },
    checkin: {
        type: Date,
        // required: true
    },
    checkout: {
        type: Date,
        // required: true
    },
    guests: {
        type: Number,
        // required: true
    },
    applicantName: {
        type: String,
        // required: true
    },
    applicantPhoneNumber: {
        type: Number,
        // required: true
    },
    aadhaarNumber: {
        type: Number,
        // required: true
    },
    driversLicenseId: {
        type: String,
        // required: true
    },
    alternatePhoneNumber: {
        type: Number,
        // required: true
    },
    maritalStatus: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
        // required: true
    }
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
