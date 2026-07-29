import fs from "node:fs/promises";
import path from "node:path";
import { db } from "../config/db.config";
import { logger } from "../utils/logger";

async function createMigrationTable() {
  await db`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    );
  `;

  logger.info("Migration table is ready.");
}

async function getMigrationFiles() {
  const migrationsPath = path.join(process.cwd(), "migrations");

  const files = await fs.readdir(migrationsPath);

  return files.filter((file) => file.endsWith(".sql")).sort();
}

async function getExecutedMigrations() {
  const rows = await db`
    SELECT filename
    FROM migrations;
  `;

  return rows.map((row) => row.filename);
}

async function runPendingMigrations(files: string[], executed: string[]) {
  const pending = files.filter((file) => !executed.includes(file));

  if (pending.length === 0) {
    logger.info("No pending migrations.");
    return;
  }

  const migrationsPath = path.join(process.cwd(), "migrations");

  for (const file of pending) {
    logger.info(`Running migration: ${file}`);

    const filePath = path.join(migrationsPath, file);
    const sql = await fs.readFile(filePath, "utf8");

    try {
      await db.begin(async (tx) => {
        // Execute the migration SQL
        await tx.unsafe(sql);

        // Record the migration
        await tx`
          INSERT INTO migrations (filename)
          VALUES (${file});
        `;
      });

      logger.info(`Migration completed: ${file}`);
    } catch (error) {
      logger.error(`Migration failed: ${file}`);
      throw error;
    }
  }
}

export async function migrate() {
  try {
    logger.info("Checking migrations...");

    await createMigrationTable();

    const files = await getMigrationFiles();

    const executed = await getExecutedMigrations();

    await runPendingMigrations(files, executed);

    logger.info("All migrations completed successfully.");
  } catch (error) {
    logger.error("Migration process failed.");
    throw error;
  }
}
