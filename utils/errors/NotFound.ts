import { AppError } from "./AppError";

export class NotFound extends AppError {
  constructor(message = "Opps!! Resource not found") {
    super(message, 404);
  }
}
