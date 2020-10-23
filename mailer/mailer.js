const nodeMailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;
if (process.env.NODE_ENV === 'production') {
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    mailConfig = sgTransport(options);
} else {
    if (process.env.NODE_ENV === 'staging') {
        console.log('XXXXXXXXX');
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET
            }
        }
        mailConfig = sgTransport(options);
    } else {
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ethereal_user,
                pass: process.env.ethereal_pwd
            }
        };
    }
}

// const mailConfig = {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'flavio53@ethereal.email',
//         pass: 'UfVA9YfxVq3hDayKdY'
//     }
// };

module.exports = nodeMailer.createTransport(mailConfig);