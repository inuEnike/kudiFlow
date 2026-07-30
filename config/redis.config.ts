import { createClient } from "redis";
import { logger } from "../utils/logger";

export const client = createClient();

client.on("ready", () => {
  logger.info("Redis connection is ready");
});
client.on("error", (err) => {
  logger.error(err, "Redis connection error");
});

export async function startRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}
