const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env_config = require('../../configurations/env_config');
const generateRandomChars = require('../../utils/random_generation/generateRandomChars');
const generateRandomDigits = require('../../utils/random_generation/generateRandomDigits');

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
            required: [true, 'Password is Required'],
            select: false
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        forgetPasswordToken: String,
        forgetPasswordExpiry: Date,
        forgetPasswordOtp: Number,
        verifyEmailToken: String,
        verifyEmailExpiry: Date,
        verifyEmailOtp: Number
    },
    {
        timestamps: true
    }
);

userModel.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userModel.methods = {
    comparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    generateJwtToken: async function() {
        return await jwt.sign(
            {
                _id: this._id,
                email: this.email,
                isEmailVerified: this.isEmailVerified
            },
            env_config.jwt_secret,
            {
                expiresIn: env_config.jwt_expiry
            }
        );
    },
    generateForgetPassToken: function() {
        const forgetPassToken = generateRandomChars(20);

        this.forgetPasswordToken = forgetPassToken;
        this.forgetPasswordExpiry = Date.now() + 5 * 60 * 1000;

        return forgetPassToken;
    },
    generateVerifyEmailToken: function() {
        const token = generateRandomChars(20);

        this.verifyEmailToken = token;
        this.verifyEmailExpiry = Date.now() + 5 *60 * 1000;

        return token;
    },
    generateVerifyEmailOtp: function() {
        const verifyEmailOtp = generateRandomDigits(6);

        this.verifyEmailOtp = verifyEmailOtp;

        return verifyEmailOtp;
    },
    generateForgetPassOtp: function() {
        const forgetPassOtp = generateRandomDigits(6);

        this.forgetPasswordOtp = forgetPassOtp;

        return forgetPassOtp;
    }
}

module.exports = mongoose.model('User', userModel);