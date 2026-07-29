import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "./auth.service";
import type { AuthRequestDTO, VerifyTokenDTO } from "./auth.dto";
import { ApiResponse } from "../../../utils/ApiResponse";

export class AuthController {
  constructor(private controller: AuthService) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: AuthRequestDTO = req.body;
      const user = await this.controller.signup(data);
      // await this.controller.validateTokenAndSaveData("200222", data.email);
      ApiResponse(res, 200, "OTP has been sent to your email", user);
    } catch (error) {
      next(error);
    }
  };

  verifyAndSaveData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, token }: VerifyTokenDTO = req.body;

      const user = await this.controller.verifyAndSaveData(token, email);
      req.session.userId = user?.id.toString();
      ApiResponse(res, 201, "User Verified, you can now signin", user);
    } catch (error) {
      next(error);
    }
  };
}
