const nodemailer = require('nodemailer');

const sendMail = async (email, subject, message) => {
    try {

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "epushisirohms@gmail.com",
                pass: "ajyobbbogthdjgqs"
            }
        })
        return await transport.sendMail({
            from: `Admin <no-reply@some.com>`,
            to: email,
            subject,
            text: message
        })
    }
    catch (err) {
        console.log("MAIL ERROR:", err.message);
    }

    
}

module.exports = sendMail