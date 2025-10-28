import nodemailer from "nodemailer";
import { Request, Response } from "express";
import config from "../config/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // TLS
  auth: {
    user: config.mailId,
    pass: config.password,
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
  logger: true, 
  debug: true,
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer verification failed:", error);
  } else {
    console.log("Nodemailer ready to send emails");
  }
});

export async function emailer(req: Request, res: Response): Promise<void> {
  try {
    const { text, email } = req.body;

    if (!text || !email) {
      res.status(400).json({ error: "Text and email are required" });
      return;
    }

    const mailOptions = {
      from: `"Portfolio Contact" <${config.mailId}>`,
      replyTo: email || null,
      to: config.mailId,
      subject: "New Fruitful Contact Form Message 🚀",
      text: `From: ${email}\nMessage: ${text}`,
      html: `<p><strong>From:</strong> ${email}</p>
             <p><strong>Message:</strong> ${text}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
    return;
  } catch (error: any) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
    return;
  }
}
