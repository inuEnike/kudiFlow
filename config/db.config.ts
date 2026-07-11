import pg from "postgres";
import { env } from "./env";
import { logger } from "../utils/logger";
import { ErrorLogger } from "../utils/logger.error";

export const db = pg(env.DATABASE_URI);
export const connectDB = async () => {
  try {
    await db`SELECT 1`;
    logger.info("\nconnected to postgres 🥰");
  } catch (error) {
    ErrorLogger(error);
    process.exit(1);
  }
};
