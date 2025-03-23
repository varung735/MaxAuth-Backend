const express = require('express');
const reachUsController = require('./reach_us.controller');

const reachUsRouter = express.Router();

reachUsRouter.post('/send', reachUsController.sendQuery);

module.exports = reachUsRouter;