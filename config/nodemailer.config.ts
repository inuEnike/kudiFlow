import nodemailer from "nodemailer";
import { env } from "./env.config";
import { logger } from "../utils/logger";
import { ErrorLogger } from "../utils/logger.error";

export let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});
export const mailer = async () => {
  try {
    await transporter.verify();
    logger.info("SMTP server is ready.");
  } catch (error) {
    ErrorLogger(error, "An Error occured while creating email transport");
  }
  return transporter;
};
