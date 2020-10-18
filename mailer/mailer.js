const nodeMailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'flavio53@ethereal.email',
        pass: 'UfVA9YfxVq3hDayKdY'
    }
};

module.exports = nodeMailer.createTransport(mailConfig);