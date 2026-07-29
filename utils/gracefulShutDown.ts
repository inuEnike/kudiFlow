import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RedisClientType } from "redis";
import { logger } from "./logger";
import { db } from "../config/db.config";

export const gracefulShutDown = async (
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
  redis: Promise<RedisClientType<{}, {}, {}, 3, {}>>,
) => {
  logger.info("\n🛑 Shutting down...");
  server.close(async () => {
    await db.end();
    (await redis).quit();

    logger.info("🛑 \nDatabase connection closed");

    process.exit(0);
  });
};
