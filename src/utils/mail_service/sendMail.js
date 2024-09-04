const transporter = require('../../configurations/nodeMailer_config');
const env_config = require('../../configurations/env_config');

const sendMail = async (options) => {
    const message = {
        from: env_config.smtp_user,
        to: options.email,
        subject: options.subject,
        html: options.html
    };
    
    await transporter.sendMail(message);
}

module.exports = sendMail;