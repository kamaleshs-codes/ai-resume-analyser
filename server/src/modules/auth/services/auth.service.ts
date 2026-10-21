import bcrypt from "bcryptjs";
import User from "../../user/models/User.js";
import { RegisterRequestBody } from "../validators/register.validator.js";
import { AppError } from "../../../utils/AppError.js";
import { LoginRequestBody } from "../validators/login.validator.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";
import { AuthenticatedUser } from "../interfaces/authenticated-user.interface.ts.js";

export const registerUserService = async (data: RegisterRequestBody) => {
  const { username, email, password } = data;

  // 1. Check whether the email or username is already registered.
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError(409, "Email is already registered.");
    }

    if (existingUser.username === username) {
      throw new AppError(409, "Username already exists.");
    }
  }

  // 2. Hash the password before storing it.
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create the user and handle concurrent duplicate registrations.
  let newUser;

  try {
    newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  } catch (error: unknown) {
    // MongoDB duplicate-key error.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new AppError(409, "Email or username is already registered.");
    }

    // Let the global error handler process unexpected errors.
    throw error;
  }

  // 4. Return safe user details, never the password hash.
  return {
    id: newUser._id.toString(),
    username: newUser.username,
    email: newUser.email,
  };
};

export const loginUserService = async (data: LoginRequestBody) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(401, "Invalid Email or Password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid Email or Password");
  }
  const payload: AuthenticatedUser = {
    id: user._id.toString(),
    email: user.email,
  };
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

export const getCurrentUserService = async (
  authenticatedUser: AuthenticatedUser,
) => {
  const user = await User.findById(authenticatedUser.id);
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
};
