import type { CreateResumeRequest } from "../../src/types/resume.types";

export const sampleResume: CreateResumeRequest = {
  title: "Full Stack Web Developer",
  template: "classic",

  personalInfo: {
    firstName: "Kamalesh",
    lastName: "S",
    email: "kamalesh@example.com",
    phone: "+91 98765 43210",
    location: "Chennai, Tamil Nadu",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
    website: "https://example.com",
  },

  professionalSummary:
    "Full Stack Web Developer skilled in React, TypeScript, Node.js, Express, and MongoDB. Experienced in developing responsive web applications and REST APIs.",

  experience: [
    {
      position: "Frontend Developer Intern",
      company: "Example Technologies",
      location: "Chennai",
      startDate: "2025-06-01",
      endDate: "2025-09-01",
      currentlyWorking: false,
      description:
        "Developed responsive user interfaces using React and Tailwind CSS. Integrated REST APIs and improved application usability.",
    },
  ],

  education: [
    {
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      institution: "Sri Sankara Arts and Science College",
      startDate: "2024-06-01",
      endDate: "2026-04-01",
      description: "CGPA: 8.2",
    },
  ],

  projects: [
    {
      name: "ResumePilot AI",
      projectUrl: "https://github.com/example/resumepilot-ai",
      description:
        "Developing an AI-powered resume builder and analyser with customizable templates.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    },
  ],

  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
  ],
};
