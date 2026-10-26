import { model, Schema } from "mongoose";
import type { IResume } from "../interfaces/resume.interface.js";

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    personalInfo: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
      location: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      website: { type: String, trim: true },
    },

    professionalSummary: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: [
        {
          institution: { type: String, required: true, trim: true },
          degree: { type: String, required: true, trim: true },
          fieldOfStudy: { type: String, trim: true },
          startDate: { type: String, trim: true },
          endDate: { type: String, trim: true },
          description: { type: String, trim: true },
        },
      ],
      default: [],
    },

    experience: {
      type: [
        {
          company: { type: String, required: true, trim: true },
          position: { type: String, required: true, trim: true },
          location: { type: String, trim: true },
          startDate: { type: String, trim: true },
          endDate: { type: String, trim: true },
          currentlyWorking: { type: Boolean, default: false },
          description: { type: String, trim: true },
        },
      ],
      default: [],
    },

    projects: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          description: { type: String, trim: true },
          technologies: { type: [String], default: [] },
          projectUrl: { type: String, trim: true },
        },
      ],
      default: [],
    },

    template: {
      type: String,
      default: "professional",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Resume = model<IResume>("Resume", resumeSchema);

export default Resume;
