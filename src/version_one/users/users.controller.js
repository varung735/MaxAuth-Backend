const userModel = require('./users.model');
const asyncHandler = require('../../utils/programming/asyncHandler');
const CustomError = require('../../utils/error/customError');
const sendMail = require('../../utils/mail_service/sendMail');
const mail_verification_template = require('../../utils/mail_templates/mail_verification_template');
const consoleFonts = require('../../utils/error/consoleFonts');

module.exports = {
    Login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if(!email || !password) {
            throw new CustomError(404, 'Email or Password Cannot be Missing');
        }

        const user = await userModel.findOne({ email }).select('+password');

        if(user === null) {
            throw new CustomError(404, 'User Not Found');
        }

        const isPasswordMatch = user.comparePassword(user.password);

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
            throw new CustomError(403, 'Invalid Credentials');
        }
    }),
    Signup: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            throw new CustomError(404, 'Name, Email or Password Cannot be Missing');
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
            throw new CustomError(404, 'Email is Missing');
        }

        const user = await userModel.findOne({ email });

        if(user === null) {
            throw new CustomError(404, 'User not Found');
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
            throw new CustomError(500, error.message);
        }
    }),
    VerifyEmail: asyncHandler(async (req, res) => {
        const { token, otp } = req.query;

        if(!token || !otp) {
            throw new CustomError(404, 'Token or OTP is missing');
        }

        const user = await userModel.findOne({ verifyEmailToken: token, verifyEmailExpiry: { $gt: Date.now() } });

        if(user === null) {
            throw new CustomError(404, 'Token Invalid or Expired');
        }

        if(user.verifyEmailOtp !== otp) {
            throw new CustomError(403, 'Invalid OTP');
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
            throw new CustomError(404, 'Email is Missing');
        }

        const user = await userModel.findOne({ email });

        if(user === null) {
            throw new CustomError(404, 'User not Found');
        }

        const token = user.generateForgetPassToken();
        const otp = user.generateForgetPassOtp();

        user.forgetPasswordToken = token;
        user.forgetPasswordOtp = otp;

        await user.save({ validateBeforeSave: false });

        try {
            const link = `${env_config.env === 'LOCAL' ? env_config.req_url_local : env_config.req_url_prod}/users/reset/password?token=${token}`;
            const template = verify_mail_template(user.name, link, otp);

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
            throw new CustomError(500, 'Cannot Send Forget Password Link');
        }
    }),
    ResetPassword: asyncHandler(async (req, res) => {
        const { token, otp } = req.query;
        const { password } = req.body;

        if(!token) {
            throw new CustomError(404, 'Token is Missing');
        }

        if(!token || !otp || !password) {
            throw new CustomError(404, 'One of the fields is Missing');
        }
        
        const user = await userModel.findOne({
            forgetPasswordToken: token,
            forgetPasswordExpiry: { $gt: Date.now() }
        });

        if(user === null){
            throw new CustomError(403, 'Token Invalid or Expired');
        }

        if(user.forgetPasswordOtp !== otp) {
            throw new CustomError(403, 'Otp is Invalid');
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