const mongoose = require('mongoose');



const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    roles: {
        type: String,
        enum: ['tenant','agency'],
        required: true
    },
    status:{
        type:Boolean,
      
    }
});


const Customer = mongoose.model('Customer', customerSchema);


module.exports = Customer;
