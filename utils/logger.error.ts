import { logger } from "./logger";
import { env } from "../config/env";

export const ErrorLogger = (error: unknown) => {
  if (error instanceof Error) {
    logger.error({
      name: error.name,
      message: error.message,
      stack: env.NODE_ENV === "development" ? error.stack : "An error occured",
    });
  } else {
    logger.error({
      message: "Unknown error",
      error,
    });
  }
};
