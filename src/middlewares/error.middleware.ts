import type { NextFunction, Request, Response } from "express";
import { env } from "../../config/env.config";
import { AppError } from "../../utils/errors/AppError";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      method: req.method,
      stack: env.NODE_ENV === "development" ? err.stack : undefined,
      statusCode: err.statusCode,
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      message: err.message,
      method: req.method,
      stack: env.NODE_ENV === "development" ? err.stack : undefined,
      statusCode: 400,
      errors: err.issues,
    });
  }
};
