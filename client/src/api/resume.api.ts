import api from "./axios";

import type {
  CreateResumeRequest,
  UpdateResumeRequest,
  Resume,
} from "../types/resume.types";

// Create a new resume
export const createResumeApi = async (
  data: CreateResumeRequest,
): Promise<Resume> => {
  const response = await api.post("/resumes", data);
  return response.data.data;
};

// Get all resumes belonging to the logged-in user
export const getUserResumesApi = async (): Promise<Resume[]> => {
  const response = await api.get("/resumes");
  return response.data.data;
};

// Get a single resume by ID
export const getResumeByIdApi = async (resumeId: string): Promise<Resume> => {
  const response = await api.get(`/resumes/${resumeId}`);
  return response.data.data;
};

// Update an existing resume
export const updateResumeApi = async (
  resumeId: string,
  data: UpdateResumeRequest,
): Promise<Resume> => {
  const response = await api.put(`/resumes/${resumeId}`, data);
  return response.data.data;
};

// Delete a resume
export const deleteResumeApi = async (resumeId: string): Promise<Resume> => {
  const response = await api.delete(`/resumes/${resumeId}`);
  return response.data.data;
};
