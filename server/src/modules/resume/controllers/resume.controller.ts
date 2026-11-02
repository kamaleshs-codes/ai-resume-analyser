import type { Request, Response, NextFunction } from "express";

import {
  createResumeService,
  getUserResumesService,
<<<<<<< HEAD
=======
  getResumeByIdService,
>>>>>>> resume-builder
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
<<<<<<< HEAD

=======
>>>>>>> resume-builder
    if (!userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }
<<<<<<< HEAD

    const resumeData = req.body as CreateResumeInput;

    const resume = await createResumeService(userId, resumeData);

=======
    const resumeData = req.body as CreateResumeInput;
    const resume = await createResumeService(userId, resumeData);
>>>>>>> resume-builder
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
<<<<<<< HEAD

=======
>>>>>>> resume-builder
    if (!userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }
<<<<<<< HEAD

    const resumes = await getUserResumesService(userId);

=======
    const resumes = await getUserResumesService(userId);
>>>>>>> resume-builder
    res.status(200).json({
      message: "Resumes retrieved successfully",
      data: resumes,
    });
  } catch (error) {
    next(error);
  }
};
<<<<<<< HEAD
=======

export const getResumeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const id = req.params.id;
    if (typeof id !== "string") {
      res.status(400).json({
        message: "Invalid resume ID",
      });
      return;
    }
    if (!userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }
    const resume = await getResumeByIdService(userId, id);
    if (!resume) {
      res.status(404).json({
        message: "Resume not found",
      });
      return;
    }
    res.status(200).json({
      message: "Resume retrieved successfully",
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};
>>>>>>> resume-builder
