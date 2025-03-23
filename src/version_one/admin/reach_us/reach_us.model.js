const mongoose = require('mongoose');

const reachUsModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is Required']
        },
        email: {
            type: String,
            required: [true, 'Email is Required'],
            unique: [true, 'Email should be Unique']
        },
        phone: {
            type: Number,
            required: [true, 'Phone is Required'],
            unique: [true, 'Phone Number shoulbe be Unique'],
            min: [10, 'Phone Number should be of 10 digits.']
        },
        message: {
            type: String,
            required: [true, 'Message is Required']
        }
    },
    {
        timestamps: true
    }
);

module.exports = new mongoose.model('Reachus', reachUsModel);