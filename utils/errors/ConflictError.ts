import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message = "Email Already Exists") {
    super(message, 409);
  }
}
