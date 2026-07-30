import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { otpEmailTemplate } from "./templates/otpEmail.template";
import { signupSuccessEmail } from "./templates/successfulSignup.template";

export class EmailService {
  constructor(
    private mail: nodemailer.Transporter<
      SMTPTransport.SentMessageInfo,
      SMTPTransport.Options
    >,
  ) {}

  sendToken = async (email: string, token: string) => {
    await this.mail.sendMail({
      from: `"Imperium Team" <imperium.dev01@gmail.com>`,
      to: email,
      subject: "Your Signup Verification Code",
      html: otpEmailTemplate(token, "KudiFlow Inc."),
    });
  };
  sendWelcomeEmail = async (
    email: string,
    first_name: string,
    last_name: string,
  ) => {
    const full_name = first_name + " " + last_name;
    await this.mail.sendMail({
      from: `"Imperium Team" <imperium.dev01@gmail.com>`,
      to: email,
      subject: `Welcome to Your Imperium Tech!`,
      html: signupSuccessEmail(
        full_name,
        "Imperium Tech",
        "https://inugeorge.vercel.app",
      ),
    });
  };
}
