import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_KEY
    }
});

const sendMail = async (to: string, template: string, subject: string) => {
    try {
        const mailContent = await transporter.sendMail({
            from: `ATG-user-Registration <${process.env.USER_EMAIL}>`,
            to: to,
            subject: subject,
            html: template
        });
        return mailContent;
    } catch (error) {
        console.log("Error in sending the mail", error);
        throw error;  // Ensure error is thrown to handle it in caller function
    }
}

export const cryptoNoti = async (userId: string, cryptocurrency: string, comparison: string, targetPrice: string) => {
    try {
        const subject = 'Crypto Alert!';
        const content = `<div>
            <p>Hello ${userId},</p>
            <p>Check the details.</p>
            <p>Alert triggered for user ${userId}: ${cryptocurrency} is ${comparison} ${targetPrice}.</p>
            <p>Regards,<br/>E-Learning</p>
        </div>`;
        const data = await sendMail(userId, content, subject);
        return { success: true, message: "Email sent successfully.", data: data };
    } catch (error) {
        return { success: false, message: "Failed to send email.", error: error };
    }
}