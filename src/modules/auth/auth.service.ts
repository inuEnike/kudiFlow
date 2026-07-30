import type { RedisClientType } from "redis";
import { ConflictError } from "../../../utils/errors/ConflictError";
import {
  compareToken,
  generateToken,
  hashToken,
} from "../../services/token.service";
import type {
  AuthLoginRequestDTO,
  AuthRequestDTO,
  AuthResponseDTO,
} from "./auth.dto";
import { AuthRepository } from "./auth.repository";
import { authSchema, verifySignupSchema } from "./auth.validation";
import { EventBus } from "../../events/event";
import { EVENT_TYPES } from "../../events/event.types";
import { NotFound } from "../../../utils/errors/NotFound";
import { BadRequest } from "../../../utils/errors/BadRequest";

interface IToken {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  tokenHash: string;
}

export class AuthService {
  constructor(
    private service: AuthRepository,
    private redis: RedisClientType,
  ) {}

  signup = async (data: AuthRequestDTO) => {
    // Zod validation

    authSchema.parse(data);

    //check for existing user
    const existingUser = await this.service.findUserByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("User Alredy Exists, Please Login!!");
    }

    // const user = await this.service.createUser(data);

    const token = generateToken();

    const hashedToken = hashToken(token);

    await this.redis.set(
      `verify:${data?.email}`,
      JSON.stringify({
        ...data,
        tokenHash: hashedToken,
      }),
      {
        EX: 60 * 5, // 10 minutes
      },
    );

    EventBus.emit(EVENT_TYPES.SEND_TOKEN_EMAIL, { email: data?.email, token });

    return {
      message: "Verification code sent.",
    };
  };
  verifyAndSaveData = async (token: string, email: string) => {
    verifySignupSchema.parse({ token, email });
    // fetch the token from redis
    const getToken = await this.redis.get(`verify:${email}`);
    if (!getToken) {
      throw new NotFound("Token Invalid or Expired");
    }

    // serialize the token to json format
    const serializedPayload: IToken = JSON.parse(getToken);

    // oya now, hash the incomming token
    const hashedIncomingToken = hashToken(token);

    // check if token matches and compare
    const success = compareToken(
      hashedIncomingToken,
      serializedPayload.tokenHash,
    );

    // cross check
    if (success.approved != true) {
      throw new ConflictError("Invalid or Expired Token");
    }

    const data: AuthResponseDTO = JSON.parse(getToken);

    const user = await this.service.createUser(data);

    EventBus.emit(EVENT_TYPES.SEND_WELCOME_EMAIL, {
      email,
      first_name: data.first_name,
      last_name: data.last_name,
    });

    await this.redis.del(`verify:${email}`);

    await this.service.updateIsVerified(true, email);
    return user;
  };

  login = async (data: AuthLoginRequestDTO) => {
    if (!data.email) {
      throw new BadRequest("Email is required");
    }

    const user = await this.service.findUserByEmail(data.email);

    if (!user) {
      throw new NotFound("User with the email not found");
    }

    const otp = generateToken();
    console.log(otp);

    const hashedIncomingToken = hashToken(otp);

    await this.redis.set(
      `login:${data.email}`,
      JSON.stringify({
        userId: user.id,
        tokenHash: hashedIncomingToken,
      }),
      {
        EX: 5 * 60,
      },
    );

    EventBus.emit(EVENT_TYPES.SEND_LOGIN_OTP, {
      email: data.email,
      otp,
    });

    return {
      message: "Login OTP Code sent",
    };
  };

  verifyLogin = async (email: string, token: string) => {
    let getToken = await this.redis.get(`login:${email}`);
    console.log("token", getToken);
    if (!getToken) {
      throw new NotFound("Token Invalid or Expired");
    }
    let serializePayload = JSON.parse(getToken!);

    const HashedToken = serializePayload.tokenHash;
    const hashedIncomingToken = hashToken(token);

    const success = compareToken(hashedIncomingToken, HashedToken);

    if (success.approved != true) {
      throw new ConflictError("Invalid or Expired Token");
    }

    const user = await this.service.findUserById(serializePayload.userId);

    if (!user) {
      throw new NotFound("User not found");
    }

    await this.redis.del(`login:${email}`);

    return user;
  };
}
