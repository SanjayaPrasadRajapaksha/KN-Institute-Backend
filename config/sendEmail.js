import nodemailer from "nodemailer";

const sendEmail = async (email, firstName, lastName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const thankMessage = `
<div style="font-family: Arial, sans-serif; background:#f4f7fc; padding:40px;">
  <div style="max-width:600px; margin:auto; background:#fff; border-radius:15px; overflow:hidden; box-shadow:0 5px 20px rgba(0,0,0,0.1);">

    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:35px; text-align:center;">
      <h1 style="color:#fff; margin:0;">🎉 Thank You, ${firstName}!</h1>
      <p style="color:#e0e7ff; margin-top:10px;">
        We have successfully received your message.
      </p>
    </div>

    <div style="padding:35px;">
      <h2 style="color:#333;">
        Hello ${firstName},
      </h2>

      <p style="font-size:16px; color:#555; line-height:1.8;">
        Thank you for contacting us. We appreciate your interest and our team will get back to you as soon as possible.
      </p>

      <div style="background:#f8fafc; border-left:5px solid #2563eb; padding:20px; margin:25px 0; border-radius:8px;">
        <p style="margin:0; color:#444;">
          📩 Your inquiry has been successfully submitted and is currently being reviewed by our support team.
        </p>
      </div>

      <p style="font-size:16px; color:#555; line-height:1.8;">
        If you have any additional information or questions, simply reply to this email.
      </p>
    </div>

    <div style="background:#f8fafc; padding:20px; text-align:center; color:#777;">
      Best Regards,<br>
      <strong>Japanese KN Institute</strong><br><br>
      © ${new Date().getFullYear()} NexOra. All rights reserved.
    </div>

  </div>
</div>
`;

    const mailOptions = {
      from: `"Japanese KN Institute" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Thank You for Contacting Us!",
      html: thankMessage, // Use html instead of text
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;