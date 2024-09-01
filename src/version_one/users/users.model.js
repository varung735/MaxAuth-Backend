const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is Required']
        },
        email: {
            type: String,
            required: [true, 'Email is Required'],
            unique: [true, 'Email Already Exists']
        },
        password: {
            type: String,
            required: [true, 'Password is Required']
        }
    },
    {
        timestamps: true
    }
);

userModel.methods = {

}

module.exports = mongoose.model('User', userModel);