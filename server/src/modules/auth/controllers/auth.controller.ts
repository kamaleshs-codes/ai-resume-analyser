import { Request, Response, NextFunction } from "express";
import { RegisterRequestBody } from "../validators/register.validator.js";
import {
  getCurrentUserService,
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";
import { LoginRequestBody } from "../validators/login.validator.js";

export const registerUser = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json({
      success: true,
      message: "Registration successful.",
      data: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await loginUserService(req.body);
    res.status(200).json({
      success: true,
      message: "Login Successful!",
      data: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await getCurrentUserService(req.user!);
    res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};
