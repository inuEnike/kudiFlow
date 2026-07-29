import nodemailer from "nodemailer";
import { env } from "./env.config";
import { logger } from "../utils/logger";
import { ErrorLogger } from "../utils/logger.error";

export const mailer = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
  try {
    await transporter.verify();
    logger.info("SMTP server is ready.");
  } catch (error) {
    ErrorLogger(error, "An Error occured while creating email transport");
  }
  return transporter;
};
