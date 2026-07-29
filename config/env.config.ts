import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(3340),
  DATABASE_URI: z.url(),
  JWT_SECRET: z
    .string()
    .min(32, "JWT SECRET should be at least 32 characters long"),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SESSION_SECRET: z.string()
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.table(result.error.issues);
  process.exit(1);
}
export const env = result.data;
