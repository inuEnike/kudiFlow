import app from "./app";
import { connectDB, db } from "../config/db.config";
import { env } from "../config/env";
import { logger } from "../utils/logger";

const PORT = env.PORT;

const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT);
  logger.info(`\nServer don start successfuly on PORT ${PORT} 💥 `);

  process.on("SIGINT", async () => {
    logger.info("\n🛑 Shutting down...");
    server.close(async () => {
      await db.end();

      logger.info("🛑 \nDatabase connection closed");

      process.exit(0);
    });
  });
};

startServer();
