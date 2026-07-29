import type { Response } from "express";

export const ApiResponse = <T>(
  res: Response,
  code: number,
  message: string,
  data?: T,
  success = true,
) => {
  res.status(code).json({
    success: success,
    status_code: code,
    message,
    data,
  });
};
