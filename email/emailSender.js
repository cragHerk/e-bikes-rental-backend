const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("E-mail został wysłany pomyślnie.");
  } catch (error) {
    console.error("Błąd podczas wysyłania e-maila:", error);
  }
};

module.exports = { sendEmail };
