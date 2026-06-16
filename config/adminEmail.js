import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS, // Gmail App Password
  },
});

/**
 * Common Email Sender Function
 */
const sendEmail = async (email, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject,
      html: message,
    });

    console.log("Email sent successfully:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

export default {
  sendEmail,
};

export { sendEmail };