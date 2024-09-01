require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const env_config = require('./src/configurations/env_config');
const ConnectToDB = require('./src/configurations/db_config');
const main_router = require('./src/index');
const app = express();

let req_url = env_config.env == "LOCAL" ? env_config.req_url_local : env_config.req_url_prod;

app.use(cors({
    credentials: true,
    origin: req_url
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectToDB();

app.use('/api', main_router);

module.exports = app;