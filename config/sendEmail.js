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

    const logoUrl = "https://yourdomain.com/logo.png";

    const thankMessage = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Thank You</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f8;padding:40px 0;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.08);">

<!-- HEADER -->
<tr>
<td align="center"
style="background:linear-gradient(135deg,#FFF8F0,#FFE0B2);padding:40px;border-bottom:4px solid #FF9800;">

<img
src="${logoUrl}"
alt="Japanese KN Institute"
width="120"
style="display:block;margin-bottom:20px;">

<h1 style="color:#2C2C2C;margin:0;font-size:34px;">
Thank You!
</h1>

<p style="color:#FF8C00;font-size:17px;margin-top:15px;">
Your message has been successfully received
</p>

</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:45px;">

<h2 style="color:#2C2C2C;margin-top:0;">
Hello ${firstName} ${lastName || ""},
</h2>

<p style="font-size:16px;line-height:30px;color:#555;">
Thank you for contacting
<strong>Japanese KN Institute.</strong>
</p>

<p style="font-size:16px;line-height:30px;color:#555;">
We sincerely appreciate your interest. Our support team will respond as soon as possible.
</p>

<!-- INFO BOX -->
<table width="100%" cellpadding="0" cellspacing="0"
style="background:#FFF8F0;border-left:5px solid #FF9800;border-radius:10px;margin:30px 0;">

<tr>
<td style="padding:20px;">

<p style="margin:0;font-size:16px;color:#444;line-height:28px;">
📩 <strong>Your inquiry has been submitted successfully.</strong>
<br><br>
Our team is currently reviewing your request.
</p>

</td>
</tr>

</table>

<p style="font-size:16px;line-height:30px;color:#555;">
If you need to provide additional information, simply reply to this email.
</p>

<!-- BUTTON -->
<div style="text-align:center;margin-top:40px;">

<a href="https://yourwebsite.com"
style="
background:#FF9800;
color:#ffffff;
padding:15px 35px;
text-decoration:none;
border-radius:50px;
font-size:16px;
font-weight:bold;
display:inline-block;
">
Visit Our Website
</a>

</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center"
style="background:#FFF3E0;padding:35px;border-top:4px solid #FF9800;">

<img
src="${logoUrl}"
width="70"
style="display:block;margin-bottom:15px;">

<h3 style="color:#2C2C2C;margin:0;">
Japanese KN Institute
</h3>

<p style="color:#555;font-size:14px;line-height:24px;margin-top:12px;">
Japanese Language Education & Career Guidance
</p>

<p style="color:#616161;font-size:13px;margin-top:25px;">
© ${new Date().getFullYear()} NexOra.<br>
All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    const mailOptions = {
      from: `"Japanese KN Institute" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Thank You for Contacting Japanese KN Institute",
      html: thankMessage,
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