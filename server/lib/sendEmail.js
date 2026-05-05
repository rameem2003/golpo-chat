const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  host: process.env.NODEMAILER_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // user: "vivian65@ethereal.email",
    // pass: "teSd29gJ66THzkYV8P",
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
const sendEmail = async (to, subject, html) => {
  const testAccount = await nodemailer.createTestAccount();
  const info = await transporter.sendMail({
    from: `"Velocity Tech Academy" <${testAccount.user}>`,
    to,
    subject,
    html,
  });

  let testUrl = nodemailer.getTestMessageUrl(info); // only for ethereal email
  console.log("Message sent: ", info.messageId);
  console.log("Preview URL: ", testUrl);
};

module.exports = sendEmail;
