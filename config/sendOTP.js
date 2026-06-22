import nodemailer from "nodemailer";

const sendOTP = async (email, name, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const logoUrl = "https://yourdomain.com/logo.png";

    const credentialMessage = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f4f4f4;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.08);">

<!-- HEADER -->
<tr>
<td align="center" style="background:linear-gradient(135deg,#FFF8F0,#FFE0B2);padding:40px;border-bottom:4px solid #FF9800;">

<img
src="${logoUrl}"
alt="Japanese KN Institute"
width="120"
style="display:block;margin-bottom:20px;">

<h1 style="margin:0;color:#2C2C2C;font-size:32px;">
OTP Verification
</h1>

<p style="color:#FF8C00;font-size:16px;margin-top:15px;">
Secure Password Reset Request
</p>

</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#2C2C2C;">
Hello ${name},
</h2>

<p style="font-size:16px;line-height:30px;color:#555;">
We received a request to reset your password for your
<strong>Japanese KN Institute</strong> account.
</p>

<p style="font-size:16px;line-height:30px;color:#555;">
Please use the following One-Time Password (OTP) to continue:
</p>

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#FFF8F0;border:2px dashed #FF9800;border-radius:12px;margin:30px 0;">

<tr>
<td align="center" style="padding:30px;">

<p style="
margin:0;
font-size:42px;
font-weight:bold;
letter-spacing:10px;
color:#E65100;
">
${otp}
</p>

</td>
</tr>

</table>

<p style="font-size:15px;color:#444;line-height:28px;">
<b>Important:</b>
</p>

<ul style="color:#555;font-size:15px;line-height:28px;padding-left:20px;">
<li>This OTP is valid for <strong>5 minutes</strong>.</li>
<li>Do not share this OTP with anyone.</li>
<li>If you did not request this, ignore this email.</li>
</ul>

<div style="margin-top:35px;background:#FFF3E0;padding:18px;border-left:5px solid #FF9800;border-radius:8px;">

<p style="margin:0;color:#444;font-size:15px;line-height:28px;">
🔒 Your security is our priority. Japanese KN Institute will never ask for your OTP.
</p>

</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="
background:linear-gradient(135deg,#FFF8F0,#FFE0B2);
padding:40px;
border-top:4px solid #FF9800;
">

<img
src="${logoUrl}"
width="70"
style="display:block;margin-bottom:15px;">

<h3 style="margin:0;color:#2C2C2C;">
Japanese KN Institute
</h3>

<p style="margin-top:10px;color:#555;font-size:14px;line-height:24px;">
Japanese Language Education & Career Guidance
</p>

<p style="margin-top:20px;color:#616161;font-size:13px;">
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
      subject: "🔐 Your OTP Verification Code",
      html: credentialMessage,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

export default sendOTP;