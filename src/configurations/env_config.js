const config = {
    port: process.env.PORT,
    env: process.env.ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiry: process.env.JWT_EXPIRY,
    req_url_local: process.env.REQ_URL_LOCAL,
    req_url_prod: process.env.REQ_URL_PROD,
    mongo_url: process.env.MONGO_URL
};

module.exports = config;