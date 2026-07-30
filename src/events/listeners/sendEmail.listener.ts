import { transporter } from "../../../config/nodemailer.config";
import { EmailService } from "../../services/email/email.service";
import { EventBus } from "../event";
import { EVENT_TYPES } from "../event.types";

const emailService = new EmailService(transporter);

EventBus.on(
  EVENT_TYPES.SEND_TOKEN_EMAIL,
  async ({ email, token }: { email: string; token: string }) => {
    await emailService.sendToken(email, token);
  },
);

EventBus.on(
  EVENT_TYPES.SEND_WELCOME_EMAIL,
  async ({
    email,
    first_name,
    last_name,
  }: {
    email: string;
    first_name: string;
    last_name: string;
  }) => {
    await emailService.sendWelcomeEmail(email, first_name, last_name);
  },
);

EventBus.on(
  EVENT_TYPES.SEND_LOGIN_OTP,
  async ({ email, otp }: { email: string; otp: string }) => {
    console.log("from the listener", otp);

    await emailService.sendToken(email, otp);
  },
);
