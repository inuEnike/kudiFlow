import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "./auth.service";
import type {
  AuthLoginRequestDTO,
  AuthRequestDTO,
  AuthResponseDTO,
  VerifyTokenDTO,
} from "./auth.dto";
import { ApiResponse } from "../../../utils/ApiResponse";
import { NotFound } from "../../../utils/errors/NotFound";

export class AuthController {
  constructor(private controller: AuthService) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: AuthRequestDTO = req.body;
      const user = await this.controller.signup(data);
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
      if (!user) {
        throw new NotFound("User not found");
      }
      const userResponse: AuthResponseDTO = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        is_verified: user.is_verified,
        created_at: user.created_at,
      };
      ApiResponse(res, 201, "User Verified, you can now signin", userResponse);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: AuthLoginRequestDTO = req.body;

      const response = await this.controller.login(data);

      ApiResponse(res, 200, response.message);
    } catch (error) {
      next(error);
    }
  };

  verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, token }: VerifyTokenDTO = req.body;
      const user = await this.controller.verifyLogin(email, token);
      if (!user) {
        throw new NotFound("User not found");
      }
      req.session.userId = user?.id.toString();
      ApiResponse(
        res,
        200,
        "User Verified, you can now proceed to the dashboard",
      );
    } catch (error) {
      next(error);
    }
  };
}
