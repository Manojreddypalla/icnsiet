/**
 * @file email.js
 * @description This file contains the email sending utility function.
 * @module utils/email
 */

import nodemailer from 'nodemailer';

/**
 * @function sendEmail
 * @description Sends an email using nodemailer.
 * @param {object} options - The email options.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.message - The plain text message of the email.
 */
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
