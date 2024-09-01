const express = require('express');
const main_router = express.Router();

const version_one_router = require('./version_one/index');

main_router.use('/v1', version_one_router);

module.exports = main_router;