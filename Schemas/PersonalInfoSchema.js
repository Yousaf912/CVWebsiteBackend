const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Minimum length should be 3'],
        maxlength: [15, 'Name cannot be longer than 15']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        minlength: [3, 'Minimum length should be 3'],
        maxlength: [15, 'Surname cannot be longer than 15']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [3, 'Minimum length should be 3'],
        maxlength: [25, 'Address cannot be longer than 25']
    },
    postalcode: {
        type: Number,
        required: [true, 'Postal code is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        minlength: [3, 'Minimum length should be 3'],
        maxlength: [15, 'Country cannot be longer than 15']
    },
    number: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    facebook: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    description:{
        type: String,
        required:[true,'please describe yourself'],
        maxlength:[210,'discription can not be more than 210']
    },
    secdescription:{
        type: String,
        required:[true,'Description is required'],
        maxlength:[300,'discription can not be more than 300']
    }
});

const personalinfosch = mongoose.model('personalinfo',PersonalInfoSchema);
module.exports = personalinfosch
