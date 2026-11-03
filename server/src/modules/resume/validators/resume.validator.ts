import { z } from "zod";

const personalInfoSchema = z.strictObject({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  github: z.string().trim().optional(),
  website: z.string().trim().optional(),
});

const educationSchema = z.strictObject({
  institution: z.string().trim().min(1, "Institution is required"),
  degree: z.string().trim().min(1, "Degree is required"),
  fieldOfStudy: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

const experienceSchema = z.strictObject({
  company: z.string().trim().min(1, "Company is required"),
  position: z.string().trim().min(1, "Position is required"),
  location: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().trim().optional(),
});

const projectSchema = z.strictObject({
  name: z.string().trim().min(1, "Project name is required"),
  description: z.string().trim().optional(),
  technologies: z.array(z.string().trim()).default([]),
  projectUrl: z.string().trim().optional(),
});

export const createResumeSchema = z.strictObject({
  title: z.string().trim().min(1, "Resume title is required"),
  personalInfo: personalInfoSchema,
  professionalSummary: z.string().trim().default(""),
  skills: z.array(z.string().trim()).default([]),
  education: z.array(educationSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  projects: z.array(projectSchema).default([]),
  template: z.string().trim().default("professional"),
});

export const updateResumeSchema = z.strictObject({
  title: z.string().trim().min(1, "Resume title is required").optional(),
  personalInfo: personalInfoSchema.partial().optional(),
  professionalSummary: z.string().trim().optional(),
  skills: z.array(z.string().trim()).optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  template: z.string().trim().optional(),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;
