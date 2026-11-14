export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description:
      "A traditional single-column layout with a clean, ATS-friendly structure.",
    category: "Traditional",
  },
  {
    id: "modern",
    name: "Modern",
    description:
      "A contemporary design with refined typography and subtle accent colors.",
    category: "Modern",
  },
  {
    id: "professional",
    name: "Professional",
    description:
      "A structured two-column layout for presenting your professional details.",
    category: "Professional",
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "A simple and spacious design focused on readability and essential information.",
    category: "Minimal",
  },
];

export const DEFAULT_RESUME_TEMPLATE = "classic";

export const getResumeTemplate = (templateId?: string): ResumeTemplate => {
  return (
    RESUME_TEMPLATES.find((template) => template.id === templateId) ??
    RESUME_TEMPLATES.find(
      (template) => template.id === DEFAULT_RESUME_TEMPLATE,
    )!
  );
};
