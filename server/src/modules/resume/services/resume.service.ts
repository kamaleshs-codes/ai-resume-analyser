import { Types } from "mongoose";

import Resume from "../models/Resume.js";
import type { CreateResumeInput } from "../validators/resume.validator.js";

export const createResumeService = async (
  userId: string,
  resumeData: CreateResumeInput,
) => {
  const resume = await Resume.create({
    ...resumeData,
    userId: new Types.ObjectId(userId),
  });

  return resume;
};

export const getUserResumesService = async (userId: string) => {
  const resumes = await Resume.find({
    userId: new Types.ObjectId(userId),
  }).sort({ updatedAt: -1 });

  return resumes;
};
<<<<<<< HEAD
=======

export const getResumeByIdService = async (
  userId: string,
  resumeId: string,
) => {
  if (!Types.ObjectId.isValid(resumeId)) {
    return null;
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    userId: new Types.ObjectId(userId),
  });

  return resume;
};
>>>>>>> resume-builder
