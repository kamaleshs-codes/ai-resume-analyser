import type { Request, Response, NextFunction } from "express";

import {
  createResumeService,
  getUserResumesService,
} from "../services/resume.service.js";
import type { CreateResumeInput } from "../validators/resume.validator.js";

export const createResumeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // The authenticated user ID should be attached by auth middleware.
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const resumeData = req.body as CreateResumeInput;

    const resume = await createResumeService(userId, resumeData);

    res.status(201).json({
      message: "Resume created successfully",
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserResumesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const resumes = await getUserResumesService(userId);

    res.status(200).json({
      message: "Resumes retrieved successfully",
      data: resumes,
    });
  } catch (error) {
    next(error);
  }
};
