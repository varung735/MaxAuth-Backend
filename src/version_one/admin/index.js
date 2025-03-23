const express = require('express');
const reachUsRouter = require('./reach_us/reach_us.router');

const adminRouter = express.Router();

adminRouter.use('/reach', reachUsRouter);

module.exports = adminRouter;