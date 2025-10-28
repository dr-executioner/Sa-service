import sgMail from "@sendgrid/mail";
import { Request, Response } from "express";
import config from "../config/config";

sgMail.setApiKey(config.sendGridApi);

export async function emailer(req: Request, res: Response): Promise<void> {
  try {
    const { text, email } = req.body;

    if (!text || !email) {
      res.status(400).json({ error: "Text and email are required" });
      return;
    }

    const msg = {
      to: "b.aarjya@gmail.com", 
      from: config.mailId,
      replyTo: email || undefined,
      subject: "New Fruitful Contact Form Message 🚀",
      text: `From: ${email}\nMessage: ${text}`,
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Message:</strong> ${text}</p>`,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
    return;
  } catch (error: any) {
    console.error("Email error:", error.response?.body || error);
    res.status(500).json({ error: "Failed to send email" });
    return;
  }
}
