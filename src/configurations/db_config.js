const mongoose = require('mongoose');
const env_config = require('./env_config');
const consoleFonts = require('../utils/error/consoleFonts');

const ConnectToDB = () => {
    mongoose.connect(env_config.mongo_url)
    .then((dbHost) => {console.log(`Connected to DB: ${dbHost.connection.host}`)})
    .catch((error) => {
        console.log(consoleFonts.error("Cannot connect to DB."));
        console.log(consoleFonts.error(error.message));
        process.exit(1);
    });
}
const db = mongoose.connection;

module.exports = { ConnectToDB, db };