const express = require('express');
const usersController = require('./users.controller');

const userRouter = express.Router();

userRouter.post('/login', usersController.Login);
userRouter.post('/signup', usersController.Signup);
userRouter.post('/verify/email/send_token', usersController.SendEmailVerificationToken);
userRouter.get('/verify/email', usersController.VerifyEmail);
userRouter.post('/reset/password/send_token', usersController.SendForgotPasswordToken);
userRouter.post('/reset/password', usersController.ResetPassword);

module.exports = userRouter;