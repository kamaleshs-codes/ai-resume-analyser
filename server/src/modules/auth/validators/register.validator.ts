import { z } from "zod";

export const registerSchema = z.strictObject({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters.")
    .regex(
      /^[a-z][a-z0-9._]*$/,
      "Username must start with a letter and contain only letters, numbers, underscores (_), and dots (.).",
    ),

  email: z.email("Please enter a valid email address.").trim().toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(25, "First name cannot exceed 25 characters.")
    .transform((value) =>
      value
        .toLowerCase()
        .replace(
          /(^|[\s'-])(\p{L})/gu,
          (_, separator, letter) => separator + letter.toUpperCase(),
        ),
    ),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(25, "Last name cannot exceed 25 characters.")
    .transform((value) =>
      value
        .toLowerCase()
        .replace(
          /(^|[\s'-])(\p{L})/gu,
          (_, separator, letter) => separator + letter.toUpperCase(),
        ),
    ),
});

export type RegisterRequestBody = z.infer<typeof registerSchema>;
