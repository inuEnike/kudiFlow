import { createClient } from "redis";
import { BadRequest } from "../utils/errors/BadRequest";
import { logger } from "../utils/logger";

export const startRedis = async () => {
  try {
    const client = createClient();

    client.on("ready", () => {
      logger.info("Redis connection is ready");
    });

    client.on("error", (err) => {
      logger.error(err, "Redis connection error");
    });
    await client.connect();
    return client;
  } catch (error) {
    throw new BadRequest("Redis Failed to Start");
  }
};
