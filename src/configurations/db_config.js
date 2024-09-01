const mongoose = require('mongoose');
const env_config = require('./env_config');

const ConnectToDB = () => {
    mongoose.connect(env_config.mongo_url)
    .then((dbHost) => {console.log(`Connected to DB: ${dbHost.connection.host}`)})
    .catch((error) => {
        console.log(errorMessages.error("Cannot connect to DB."));
        console.log(errorMessages.error(error.message));
        process.exit(1);
    });
}

module.exports = ConnectToDB;