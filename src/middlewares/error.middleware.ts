import type { NextFunction, Request, Response } from "express";
import { env } from "../../config/env";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err.message;
  const method = req?.method;
  const stackTrace =
    env.NODE_ENV === "development" ? err?.stack : "An Error Occured";
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    message,
    method,
    stackTrace,
    statusCode,
  });
  next();
};
