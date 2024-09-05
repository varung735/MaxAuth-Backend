const userModel = require('./users.model');
const asyncHandler = require('../../utils/programming/asyncHandler');
const CustomError = require('../../utils/error/customError');
const sendMail = require('../../utils/mail_service/sendMail');
const mail_verification_template = require('../../utils/mail_templates/mail_verification_template');
const consoleFonts = require('../../utils/error/consoleFonts');
const env_config = require('../../configurations/env_config');

module.exports = {
    Login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if(!email || !password) {
            throw new CustomError('Email or Password Cannot be Missing', 404);
        }

        const user = await userModel.findOne({ email }).select('+password');

        if(user === null) {
            throw new CustomError('User Not Found', 404);
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(isPasswordMatch) {
            let token = await user.generateJwtToken();
            user.password = undefined;

            res.status(200).json({
                success: true,
                message: 'User LoggedIn Successfully',
                token,
                user
            });
        }
        else{
            throw new CustomError('Invalid Credentials', 403);
        }
    }),
    Signup: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            throw new CustomError('Name, Email or Password Cannot be Missing', 404);
        }

        const user = await userModel.create({
            name,
            email,
            password
        });

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'User Signed Up Successfully',
            user
        });
    }),
    SendEmailVerificationLink: asyncHandler(async (req, res) => {
        const { email } = req.body;

        if(!email) {
            throw new CustomError('Email is Missing', 404);
        }

        const user = await userModel.findOne({ email });

        if(user === null) {
            throw new CustomError('User not Found', 404);
        }

        const token = await user.generateVerifyEmailToken();
        const otp = await user.generateVerifyEmailOtp();

        user.verifyEmailToken = token;
        user.verifyEmailOtp = otp;

        await user.save({ validateBeforeSave: false });

        try {
            const link = `${env_config.env === 'LOCAL' ? env_config.req_url_local : env_config.req_url_prod}/users/verify/email?token=${token}`;
            const template = mail_verification_template(user.name, link, otp);
    
            await sendMail({
                to: email,
                subject: 'Verify Your Email',
                html: template
            });
    
            res.status(200).json({
                success: true,
                message: 'Mail Sent Successfully'
            });
        } catch (error) {
            user.verifyEmailToken = undefined;
            user.verifyEmailOtp = undefined;
            user.verifyEmailExpiry = undefined;

            await user.save({ validateBeforeSave: false });

            console.log(consoleFonts.error(error.message));
            console.log(error);
            throw new CustomError(error.message, 500);
        }
    }),
    VerifyEmail: asyncHandler(async (req, res) => {
        const { token, otp } = req.query;

        if(!token || !otp) {
            throw new CustomError('Token or OTP is missing', 404);
        }

        const user = await userModel.findOne({ verifyEmailToken: token, verifyEmailExpiry: { $gt: Date.now() } });

        if(user === null) {
            throw new CustomError('Token Invalid or Expired', 403);
        }
        
        if(user.verifyEmailOtp !== parseInt(otp)) {
            console.log(user.verifyEmailOtp);
            throw new CustomError('Invalid OTP', 403);
        }
        else {
            user.isEmailVerified = true;
            user.verifyEmailToken = undefined;
            user.verifyEmailOtp = undefined;
            user.verifyEmailExpiry = undefined;

            await user.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
                message: 'Email Verified Successfully'
            });
        }
    }),
    SendForgotPasswordLink: asyncHandler(async (req, res) => {
        const { email } = req.body;

        if(!email) {
            throw new CustomError('Email is Missing', 404);
        }

        const user = await userModel.findOne({ email });

        if(user === null) {
            throw new CustomError('User not Found', 404);
        }

        const token = user.generateForgetPassToken();
        const otp = user.generateForgetPassOtp();

        user.forgetPasswordToken = token;
        user.forgetPasswordOtp = otp;

        await user.save({ validateBeforeSave: false });

        try {
            const link = `${env_config.env === 'LOCAL' ? env_config.req_url_local : env_config.req_url_prod}/users/reset/password?token=${token}`;
            const template = mail_verification_template(user.name, link, otp);

            await sendMail({
                to: email,
                subject: 'Reset Your Password',
                html: template
            });

            res.status(200).json({
                success: true,
                message: 'Reset Password Link Sent Successfully'
            });
        } catch (error) {
            user.forgetPasswordToken = undefined;
            user.forgetPasswordOtp = undefined;
            user.forgetPasswordExpiry = undefined;

            await user.save({ validateBeforeSave: false });

            console.log(consoleFonts.error(error.message));
            console.log(error);
            throw new CustomError('Cannot Send Forget Password Link', 500);
        }
    }),
    ResetPassword: asyncHandler(async (req, res) => {
        const { token, otp } = req.query;
        const { password } = req.body;

        if(!token) {
            throw new CustomError('Token is Missing', 404);
        }

        if(!token || !otp || !password) {
            throw new CustomError('One of the fields is Missing', 404);
        }
        
        const user = await userModel.findOne({
            forgetPasswordToken: token,
            forgetPasswordExpiry: { $gt: Date.now() }
        });

        if(user === null){
            throw new CustomError('Token Invalid or Expired', 403);
        }

        if(user.forgetPasswordOtp !== parseInt(otp)) {
            throw new CustomError('Otp is Invalid', 403);
        }
        else {
            user.forgetPasswordToken = undefined;
            user.forgetPasswordOtp = undefined;
            user.forgetPasswordExpiry = undefined;
            user.password = password;

            await user.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
                message: 'Password Reset Successfully'
            });
        }
    })
}