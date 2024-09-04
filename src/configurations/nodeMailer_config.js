const nodeMailer = require('nodemailer');
const env_config = require('../configurations/env_config');

const transport = nodeMailer.createTransport({
    host: env_config.smtp_host,
    port: env_config.smtp_port,
    secure: env_config.smtp_is_secure,
    auth: {
        user: env_config.smtp_user,
        pass: env_config.smtp_pass,
    },
});

module.exports = transport;