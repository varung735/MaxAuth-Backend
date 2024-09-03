const express = require('express');
const usersController = require('./users.controller');

const userRouter = express.Router();

userRouter.post('/login', usersController.Login);
userRouter.post('/signup', usersController.Signup);

module.exports = userRouter;