import z from "zod";
import type { AuthRequestDTO } from "./auth.dto";

export const authSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
});
