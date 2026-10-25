import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Username or email is required")
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

export type LoginRequestBody = z.infer<typeof loginSchema>;
