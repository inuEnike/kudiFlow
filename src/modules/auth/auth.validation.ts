import z from "zod";

export const authSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const verifySignupSchema = z.object({
  token: z.string(),
  email: z.string(),
});
