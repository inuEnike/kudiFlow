import { logger } from "./logger";
import { env } from "../config/env.config";

export const ErrorLogger = (
  error?: string | unknown,
  customMessage?: string,
) => {
  if (error instanceof Error) {
    logger.error({
      name: error.name,
      message: error.message,
      stack: env.NODE_ENV === "development" ? error.stack : "An error occured",
      customMessage,
    });
  } else {
    logger.error({
      message: "Unknown error",
      error,
      customMessage,
    });
  }
};
