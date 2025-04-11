import nodemailer from "nodemailer";
import { IUser } from "../interfaces/User";
import { Types } from "mongoose";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "ehabsmh3@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateHtmlContent = (userId: Types.ObjectId) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            padding: 20px 0;
          }
          .email-content {
            margin: 20px 0;
          }
          .email-button {
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .email-footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Hospital Management System</h1>
          </div>
          <div class="email-content">
            <p>
              Thank for becoming one of us! Setup a password
            </p>
            <a href="http://localhost:5173/create-new-password/${userId}" target="_blank" style="cursor: pointer;" class="email-button"
              ><p style="color: white">Create new password</p></a>
          </div>
          <div class="email-footer">
            <p>© 2025 Hospital Management System. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `;
};

export async function sendEmail(to: IUser) {
  const info = await transporter.sendMail({
    from: "Hospital_MS 🏥", // sender address
    to: to.email, // receiver
    subject: "Welcome to the hospital management system", // Subject line
    html: generateHtmlContent(to._id),
  });

  console.log("Message sent: %s", info.messageId);
}
