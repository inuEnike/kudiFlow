import app from "./app";
import { connectDB } from "../config/db.config";
import { env } from "../config/env.config";
import { logger } from "../utils/logger";
import { migrate } from "../migrations/migrate";
import { mailer } from "../config/nodemailer.config";
import "./events/listeners";

import { startRedis } from "../config/redis.config";
import { gracefulShutDown } from "../utils/gracefulShutDown";
const PORT: number = env.PORT;

const startServer = async (): Promise<void> => {
  await connectDB();
  await migrate();
  await mailer();
  const redis = startRedis();
  const server = app.listen(PORT);

  logger.info(`Server don start successfully on PORT ${PORT}  `);

  process.on("SIGINT", async () => {
    await gracefulShutDown(server, redis);
  });
  process.on("SIGTERM", async () => {
    await gracefulShutDown(server, redis);
  });
};

startServer();
