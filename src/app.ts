import express, { type Request, type Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ApiResponse } from "../utils/ApiResponse";
import { authRoute } from "./modules/auth/auth.route";
import session from "express-session";
import { env } from "../config/env.config";
import { RedisStore } from "connect-redis";
import { RedisClient } from "redis";
import cookieParser from 'cookie-parser'
const app = express();
const prefixURI = "/api/v1";

app.use(express.json());
app.use(cookieParser())
app.use(
  session({
    store: new RedisStore({
      client: RedisClient,
      prefix: "sess:",
      ttl: 86400,
    }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "kudiFlow",
    cookie: {
      httpOnly: true, // Prevents client-side JS from reading cookie (XSS protecenv.NODE_ENV === "production", // Requires HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
      sameSite: "lax", // CSRF mitigation
    },
  }),
);

app.get("/health-check", (req: Request, res: Response) => {
  ApiResponse(res, 200, "Application up and running");
});

app.use(`${prefixURI}/auth`, authRoute);

app.use((_req: Request, res: Response) => {
  ApiResponse(res, 404, "The route you are looking for is not found");
});
app.use(errorMiddleware);
export default app;
