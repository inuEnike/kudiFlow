import { Router } from "express";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { startRedis } from "../../../config/redis.config";
import { db } from "../../../config/db.config";
import { AuthController } from "./auth.controller";

const redis = await startRedis();

export const authRoute = Router();

const repo = new AuthRepository(db);
const service = new AuthService(repo, redis);
const controller = new AuthController(service);
authRoute
  .post("/signup", controller.signup)
  .post("/verify", controller.verifyAndSaveData);
