import { Types } from "mongoose";
import Resume from "../models/Resume.js";
import type { CreateResumeInput } from "../validators/resume.validator.js";
import type { UpdateResumeInput } from "../validators/resume.validator.js";

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

export const updateResumeService = async (
  userId: string,
  resumeId: string,
  updateData: UpdateResumeInput,
) => {
  if (!Types.ObjectId.isValid(resumeId)) {
    return null;
  }
  const updateFields: Record<string, unknown> = {};
  // Convert nested personalInfo fields into dotted paths.
  for (const [key, value] of Object.entries(updateData)) {
    if (
      key === "personalInfo" &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      for (const [field, fieldValue] of Object.entries(value)) {
        updateFields[`personalInfo.${field}`] = fieldValue;
      }
    } else {
      updateFields[key] = value;
    }
  }
  const updatedResume = await Resume.findOneAndUpdate(
    {
      _id: resumeId,
      userId: new Types.ObjectId(userId),
    },
    {
      $set: updateFields,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return updatedResume;
};

export const deleteResumeService = async (userId: string, resumeId: string) => {
  if (!Types.ObjectId.isValid(resumeId)) {
    return null;
  }
  const deletedResume = await Resume.findOneAndDelete({
    _id: resumeId,
    userId: new Types.ObjectId(userId),
  });
  return deletedResume;
};
