const config = {
    port: process.env.PORT,
    env: process.env.ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiry: process.env.JWT_EXPIRY,
    req_url_local: process.env.REQ_URL_LOCAL,
    req_url_prod: process.env.REQ_URL_PROD,
    mongo_url: process.env.MONGO_URL,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_is_secure: process.env.SMTP_IS_SECURE,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS,
    smtp_email: process.env.SMTP_EMAIL
};

module.exports = config;