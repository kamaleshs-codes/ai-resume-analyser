import bcrypt from "bcryptjs";
import User from "../../user/models/User.js";
import { RegisterRequestBody } from "../validators/register.validator.js";
import { AppError } from "../../../utils/AppError.js";
import { LoginRequestBody } from "../validators/login.validator.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";
import { AuthenticatedUser } from "../interfaces/authenticated-user.interface.ts.js";

export const registerUserService = async (data: RegisterRequestBody) => {
  const { firstName, lastName, username, email, password } = data;

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
  });

  if (existingUser) {
    if (existingUser.email === normalizedEmail) {
      throw new AppError(409, "Email is already registered.");
    }

    if (existingUser.username === normalizedUsername) {
      throw new AppError(409, "Username already exists.");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser;

  try {
    newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new AppError(409, "Email or username is already registered.");
    }

    throw error;
  }

  return {
    id: newUser._id.toString(),
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    username: newUser.username,
    email: newUser.email,
  };
};

export const loginUserService = async (data: LoginRequestBody) => {
  const { identifier, password } = data;

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    throw new AppError(401, "Invalid Username/Email or Password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid Username/Email or Password");
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
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
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
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
};
