const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailToClient = async (emailClientInfo) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailClientInfo.email,
      subject: emailClientInfo.subject,
      html: emailClientInfo.html,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    };

    await transporter.sendMail(mailOptions);
    console.log("E-mail został wysłany pomyślnie.");
  } catch (error) {
    console.error("Błąd podczas wysyłania e-maila:", error);
  }
};

module.exports = { sendEmailToClient };
