import nodemailer from 'nodemailer';

const sendEmail = async options => {
    // 1) Create a transporter
    // We'll use Mailtrap for development, but you can switch to Gmail, SendGrid, etc.
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'ICNSIET Admin <admin@icnsiet.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: // You can also send HTML content
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
