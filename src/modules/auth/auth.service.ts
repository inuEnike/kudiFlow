import type { RedisClientType } from "redis";
import { startRedis } from "../../../config/redis.config";
import { ConflictError } from "../../../utils/errors/ConflictError";
import {
  compareToken,
  generateToken,
  hashToken,
} from "../../services/token.service";
import type { AuthRequestDTO, AuthResponseDTO, User } from "./auth.dto";
import { AuthRepository } from "./auth.repository";
import { authSchema } from "./auth.validation";
import { EventBus } from "../../events/event";
import { EVENT_TYPES } from "../../events/event.types";
import { NotFound } from "../../../utils/errors/NotFound";

interface IToken {
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
}
