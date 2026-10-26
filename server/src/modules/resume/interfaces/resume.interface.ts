import type { Types } from "mongoose";

export interface IResume {
  userId: Types.ObjectId;
  title: string;

  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };

  professionalSummary: string;
  skills: string[];

  education: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];

  experience: {
    company: string;
    position: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking?: boolean;
    description?: string;
  }[];

  projects: {
    name: string;
    description?: string;
    technologies: string[];
    projectUrl?: string;
  }[];

  template: string;
}
