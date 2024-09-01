const express = require('express');
const userRouter = require('./users/user.router');

const version_one_router = express.Router();

version_one_router.use('/users', userRouter);

module.exports = version_one_router;