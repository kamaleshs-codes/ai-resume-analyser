export interface ResumePersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ResumeExperience {
  company: string;
  position: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
}

export interface ResumeProject {
  name: string;
  description?: string;
  technologies: string[];
  projectUrl?: string;
}

export interface CreateResumeRequest {
  title: string;
  personalInfo: ResumePersonalInfo;
  professionalSummary?: string;
  skills?: string[];
  education?: ResumeEducation[];
  experience?: ResumeExperience[];
  projects?: ResumeProject[];
  template?: string;
}

export interface UpdateResumeRequest {
  title?: string;
  personalInfo?: Partial<ResumePersonalInfo>;
  professionalSummary?: string;
  skills?: string[];
  education?: ResumeEducation[];
  experience?: ResumeExperience[];
  projects?: ResumeProject[];
  template?: string;
}

export interface Resume extends CreateResumeRequest {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
