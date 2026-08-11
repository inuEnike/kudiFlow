import pg from "postgres";
import { env } from "./env.config";
import { logger } from "../utils/logger";
import { ErrorLogger } from "../utils/logger.error";

export const db = pg(env.DATABASE_URI, {
  onnotice: (notice) => {
    logger.debug(notice.message);
  },
});
export const connectDB = async () => {
  try {
    await db`SELECT 1`;
    logger.info("connected to postgres 🥰");
  } catch (error) {
    ErrorLogger(error);
    process.exit(1);
  }
}