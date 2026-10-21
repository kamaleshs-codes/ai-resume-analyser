import { z } from "zod";

export const registerSchema = z.strictObject({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username cannot exceed 10 characters."),

  email: z.email("Please enter a valid email address.").trim().toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
});

export type RegisterRequestBody = z.infer<typeof registerSchema>;
