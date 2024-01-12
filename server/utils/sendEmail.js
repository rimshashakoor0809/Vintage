const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")

const sendEmail = async (subject, to, from, replyTo, template, data) => {
    // Create Email Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 60000
    })

    const handlerBarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./views"),
            defaultLayout: false
        },
        viewPath: path.resolve("./views"),
        extName: ".handlebars"

    }
    transporter.use("compile", hbs(handlerBarOptions));
    // Options for sending email
    const options = {
        from,
        to,
        replyTo,
        subject,
        template,
        context: { ...data }

    }

    // Send Email
    try {
        const info = await transporter.sendMail(options);
        console.log("Message Information:", info);
        if (info) {
            return { success: true, info };
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: true, error };
    }
}

module.exports = sendEmail;
