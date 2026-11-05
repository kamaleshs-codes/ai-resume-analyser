import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaSave,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import FormField from "../../components/ui/FormFields";

import {
  createResumeApi,
  getResumeByIdApi,
  updateResumeApi,
} from "../../api/resume.api";

import type {
  CreateResumeRequest,
  ResumePersonalInfo,
  ResumeEducation,
  ResumeExperience,
  ResumeProject,
} from "../../types/resume.types";

interface ResumeFormData {
  title: string;
  personalInfo: ResumePersonalInfo;
  professionalSummary: string;
  skills: string[];
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
}

const initialFormData: ResumeFormData = {
  title: "",
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  professionalSummary: "",
  skills: [],
  education: [],
  experience: [],
  projects: [],
};

const ResumeBuilder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");

  // Load an existing resume when editing.
  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      try {
        setLoading(true);
        setError("");

        const resume = await getResumeByIdApi(id);

        setFormData({
          title: resume.title ?? "",
          personalInfo: {
            firstName: resume.personalInfo?.firstName ?? "",
            lastName: resume.personalInfo?.lastName ?? "",
            email: resume.personalInfo?.email ?? "",
            phone: resume.personalInfo?.phone ?? "",
            location: resume.personalInfo?.location ?? "",
            linkedin: resume.personalInfo?.linkedin ?? "",
            github: resume.personalInfo?.github ?? "",
            website: resume.personalInfo?.website ?? "",
          },
          professionalSummary: resume.professionalSummary ?? "",
          skills: resume.skills ?? [],
          education: resume.education ?? [],
          experience: resume.experience ?? [],
          projects: resume.projects ?? [],
        });
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Unable to load resume."
            : "Something went wrong while loading the resume.",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchResume();
  }, [id]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      professionalSummary: e.target.value,
    }));
  };

  // Add a new skill
  const addSkill = () => {
    const newSkill = skillInput.trim();
    if (!newSkill) return;
    setFormData((prev) => {
      const alreadyExists = prev.skills.some(
        (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
      );
      if (alreadyExists) return prev;
      return {
        ...prev,
        skills: [...prev.skills, newSkill],
      };
    });
    setSkillInput("");
  };
  // Remove a skill
  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Education handlers
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateEducation = (
    index: number,
    field: keyof ResumeEducation,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Experience handlers
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (
    index: number,
    field: keyof ResumeExperience,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Project handlers
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          description: "",
          technologies: [],
          projectUrl: "",
        },
      ],
    }));
  };

  const updateProject = (
    index: number,
    field: keyof ResumeProject,
    value: string | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const resumeData: CreateResumeRequest = {
        title: formData.title.trim(),
        personalInfo: formData.personalInfo,
        professionalSummary: formData.professionalSummary.trim(),

        skills: formData.skills.map((skill) => skill.trim()).filter(Boolean),

        education: formData.education
          .filter((item) => item.institution.trim() && item.degree.trim())
          .map((item) => ({
            ...item,
            institution: item.institution.trim(),
            degree: item.degree.trim(),
          })),

        experience: formData.experience
          .filter((item) => item.company.trim() && item.position.trim())
          .map((item) => ({
            ...item,
            company: item.company.trim(),
            position: item.position.trim(),
            endDate: item.currentlyWorking ? "" : item.endDate,
          })),

        projects: formData.projects
          .filter((item) => item.name.trim())
          .map((item) => ({
            ...item,
            name: item.name.trim(),
            technologies: item.technologies.filter((technology) =>
              technology.trim(),
            ),
          })),
      };

      if (id) {
        await updateResumeApi(id, resumeData);
      } else {
        await createResumeApi(resumeData);
      }

      navigate("/my-resumes");
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Unable to save resume."
          : "Something went wrong while saving the resume.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <p className='text-center text-text-muted'>Loading resume...</p>
      </Card>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text'>
            {id ? "Edit Resume" : "Create Resume"}
          </h1>
          <p className='mt-2 text-text-muted'>
            Enter your professional details to build your resume.
          </p>
        </div>

        <Button
          type='button'
          onClick={() => navigate("/my-resumes")}
          className='!w-fit flex items-center justify-center gap-2'>
          <FaArrowLeft />
          Back to Resumes
        </Button>
      </div>

      {error && (
        <div className='rounded-xl border border-error/40 bg-error/10 p-4 text-error'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Top Form Layout */}
        <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-2'>
          {/* LEFT COLUMN */}
          <div className='space-y-6'>
            {/* Resume Information */}
            <Card>
              <h2 className='mb-6 text-xl font-semibold text-text'>
                Resume Information
              </h2>

              <FormField label='Resume Title' htmlFor='title'>
                <Input
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder='e.g. Full Stack Developer Resume'
                  required
                />
              </FormField>
            </Card>

            {/* Professional Summary */}
            <Card>
              <h2 className='mb-6 text-xl font-semibold text-text'>
                Professional Summary
              </h2>

              <FormField label='Summary' htmlFor='professionalSummary'>
                <textarea
                  id='professionalSummary'
                  name='professionalSummary'
                  value={formData.professionalSummary}
                  onChange={handleSummaryChange}
                  rows={5}
                  placeholder='Write a short professional summary...'
                  className='w-full resize-y rounded-xl border border-border bg-canvas px-4 py-3 text-text placeholder:text-text-muted outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20'
                />
              </FormField>
            </Card>

            {/* Technical Skills */}
            <Card>
              <h2 className='mb-2 text-xl font-semibold text-text'>
                Technical Skills
              </h2>
              <p className='mb-6 text-sm text-text-muted'>
                Add your technical skills individually.
              </p>
              <FormField label='Skills' htmlFor='skills'>
                {/* Skill Input */}
                <div className='flex items-center gap-2'>
                  <div className='min-w-0 flex-1'>
                    <Input
                      id='skills'
                      name='skills'
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder='Enter a skill (e.g. React)'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={addSkill}
                    disabled={!skillInput.trim()}
                    aria-label='Add skill'
                    className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-text-btn transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40'>
                    <FaArrowRight size={16} />
                  </button>
                </div>
              </FormField>
              {/* Added Skill Labels */}
              {formData.skills.length > 0 && (
                <div className='mt-5 flex flex-wrap gap-2'>
                  {formData.skills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className='flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-text'>
                      <span>{skill}</span>
                      <button
                        type='button'
                        onClick={() => removeSkill(index)}
                        aria-label={`Remove ${skill}`}
                        className='flex items-center justify-center text-text-muted transition-colors hover:text-error'>
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {formData.skills.length === 0 && (
                <p className='mt-4 text-xs text-text-muted'>
                  No skills added yet.
                </p>
              )}
            </Card>
          </div>

          {/* RIGHT COLUMN - PERSONAL INFORMATION */}
          <Card>
            <h2 className='mb-6 text-xl font-semibold text-text'>
              Personal Information
            </h2>

            <div className='grid grid-cols-1 gap-5'>
              <FormField label='First Name' htmlFor='firstName'>
                <Input
                  id='firstName'
                  name='firstName'
                  value={formData.personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  placeholder='First name'
                  required
                />
              </FormField>

              <FormField label='Last Name' htmlFor='lastName'>
                <Input
                  id='lastName'
                  name='lastName'
                  value={formData.personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  placeholder='Last name'
                  required
                />
              </FormField>

              <FormField label='Email Address' htmlFor='email'>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  placeholder='your@email.com'
                  required
                />
              </FormField>

              <FormField label='Phone Number' htmlFor='phone'>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={formData.personalInfo.phone ?? ""}
                  onChange={handlePersonalInfoChange}
                  placeholder='Phone number'
                />
              </FormField>

              <FormField label='Location' htmlFor='location'>
                <Input
                  id='location'
                  name='location'
                  value={formData.personalInfo.location ?? ""}
                  onChange={handlePersonalInfoChange}
                  placeholder='City, Country'
                />
              </FormField>

              <FormField label='LinkedIn Profile' htmlFor='linkedin'>
                <Input
                  id='linkedin'
                  name='linkedin'
                  value={formData.personalInfo.linkedin ?? ""}
                  onChange={handlePersonalInfoChange}
                  placeholder='LinkedIn URL'
                />
              </FormField>

              <FormField label='GitHub Profile' htmlFor='github'>
                <Input
                  id='github'
                  name='github'
                  value={formData.personalInfo.github ?? ""}
                  onChange={handlePersonalInfoChange}
                  placeholder='GitHub URL'
                />
              </FormField>
              <FormField label='Personal Website' htmlFor='website'>
                <Input
                  id='website'
                  name='website'
                  value={formData.personalInfo.website ?? ""}
                  onChange={handlePersonalInfoChange}
                  placeholder='Portfolio URL'
                />
              </FormField>
            </div>
          </Card>
        </div>

        <Card>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
            <div>
              <h2 className='text-xl font-semibold text-text'>Education</h2>
              <p className='mt-1 text-sm text-text-muted'>
                Add your academic qualifications.
              </p>
            </div>

            <Button
              type='button'
              onClick={addEducation}
              className='!w-fit px-4'>
              + Add Education
            </Button>
          </div>

          <div className='space-y-6'>
            {formData.education.map((item, index) => (
              <div
                key={index}
                className='space-y-5 rounded-xl border border-border bg-background p-5'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold text-text'>
                    Education #{index + 1}
                  </h3>

                  <button
                    type='button'
                    onClick={() => removeEducation(index)}
                    aria-label={`Delete education ${index + 1}`}
                    title='Delete Education'
                    className='flex items-center justify-center rounded-lg p-2 text-text-muted transition-colors hover:bg-error/10 hover:text-error'>
                    <FaTrash size={14} />
                  </button>
                </div>

                <div className='grid gap-5 md:grid-cols-2'>
                  <FormField
                    label='Institution'
                    htmlFor={`institution-${index}`}>
                    <Input
                      id={`institution-${index}`}
                      value={item.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      placeholder='College or University'
                    />
                  </FormField>

                  <FormField label='Degree' htmlFor={`degree-${index}`}>
                    <Input
                      id={`degree-${index}`}
                      value={item.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      placeholder='MSc Computer Science'
                    />
                  </FormField>

                  <FormField label='Field of Study' htmlFor={`field-${index}`}>
                    <Input
                      id={`field-${index}`}
                      value={item.fieldOfStudy ?? ""}
                      onChange={(e) =>
                        updateEducation(index, "fieldOfStudy", e.target.value)
                      }
                      placeholder='Computer Science'
                    />
                  </FormField>

                  <FormField
                    label='Start Date'
                    htmlFor={`education-start-${index}`}>
                    <Input
                      id={`education-start-${index}`}
                      type='date'
                      value={item.startDate ?? ""}
                      onChange={(e) =>
                        updateEducation(index, "startDate", e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label='End Date'
                    htmlFor={`education-end-${index}`}>
                    <Input
                      id={`education-end-${index}`}
                      type='date'
                      value={item.endDate ?? ""}
                      onChange={(e) =>
                        updateEducation(index, "endDate", e.target.value)
                      }
                    />
                  </FormField>
                </div>

                <FormField
                  label='Description'
                  htmlFor={`education-description-${index}`}>
                  <textarea
                    id={`education-description-${index}`}
                    value={item.description ?? ""}
                    onChange={(e) =>
                      updateEducation(index, "description", e.target.value)
                    }
                    rows={3}
                    placeholder='Achievements, coursework or academic highlights...'
                    className='w-full rounded-xl border border-border bg-canvas px-4 py-3 text-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20'
                  />
                </FormField>
              </div>
            ))}
          </div>

          {formData.education.length === 0 && (
            <p className='rounded-xl border border-dashed border-border py-8 text-center text-sm text-text-muted'>
              No education details added yet.
            </p>
          )}
        </Card>

        <Card>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
            <div>
              <h2 className='text-xl font-semibold text-text'>
                Work Experience
              </h2>
              <p className='mt-1 text-sm text-text-muted'>
                Add your professional experience and internships.
              </p>
            </div>

            <Button
              type='button'
              onClick={addExperience}
              className='!w-fit px-4'>
              + Add Experience
            </Button>
          </div>

          <div className='space-y-6'>
            {formData.experience.map((item, index) => (
              <div
                key={index}
                className='space-y-5 rounded-xl border border-border bg-background p-5'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold text-text'>
                    Experience #{index + 1}
                  </h3>

                  <button
                    type='button'
                    onClick={() => removeExperience(index)}
                    aria-label={`Delete experience ${index + 1}`}
                    title='Delete Experience'
                    className='flex items-center justify-center rounded-lg p-2 text-text-muted transition-colors hover:bg-error/10 hover:text-error'>
                    <FaTrash size={14} />
                  </button>
                </div>

                <div className='grid gap-5 md:grid-cols-2'>
                  <FormField label='Company' htmlFor={`company-${index}`}>
                    <Input
                      id={`company-${index}`}
                      value={item.company}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      placeholder='Company name'
                    />
                  </FormField>

                  <FormField label='Position' htmlFor={`position-${index}`}>
                    <Input
                      id={`position-${index}`}
                      value={item.position}
                      onChange={(e) =>
                        updateExperience(index, "position", e.target.value)
                      }
                      placeholder='Full Stack Developer Intern'
                    />
                  </FormField>

                  <FormField
                    label='Location'
                    htmlFor={`experience-location-${index}`}>
                    <Input
                      id={`experience-location-${index}`}
                      value={item.location ?? ""}
                      onChange={(e) =>
                        updateExperience(index, "location", e.target.value)
                      }
                      placeholder='Chennai'
                    />
                  </FormField>

                  <FormField
                    label='Start Date'
                    htmlFor={`experience-start-${index}`}>
                    <Input
                      id={`experience-start-${index}`}
                      type='date'
                      value={item.startDate ?? ""}
                      onChange={(e) =>
                        updateExperience(index, "startDate", e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label='End Date'
                    htmlFor={`experience-end-${index}`}>
                    <Input
                      id={`experience-end-${index}`}
                      type='date'
                      value={item.endDate ?? ""}
                      disabled={item.currentlyWorking}
                      onChange={(e) =>
                        updateExperience(index, "endDate", e.target.value)
                      }
                    />
                  </FormField>
                </div>

                <label className='flex items-center gap-3 text-sm text-text'>
                  <input
                    type='checkbox'
                    checked={item.currentlyWorking ?? false}
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "currentlyWorking",
                        e.target.checked,
                      )
                    }
                    className='h-4 w-4 accent-accent'
                  />
                  I currently work here
                </label>

                <FormField
                  label='Responsibilities and Achievements'
                  htmlFor={`experience-description-${index}`}>
                  <textarea
                    id={`experience-description-${index}`}
                    value={item.description ?? ""}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    rows={4}
                    placeholder='Describe your responsibilities, contributions and achievements...'
                    className='w-full rounded-xl border border-border bg-canvas px-4 py-3 text-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20'
                  />
                </FormField>
              </div>
            ))}
          </div>

          {formData.experience.length === 0 && (
            <p className='rounded-xl border border-dashed border-border py-8 text-center text-sm text-text-muted'>
              No work experience added yet.
            </p>
          )}
        </Card>

        <Card>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
            <div>
              <h2 className='text-xl font-semibold text-text'>Projects</h2>
              <p className='mt-1 text-sm text-text-muted'>
                Showcase your technical projects and applications.
              </p>
            </div>

            <Button type='button' onClick={addProject} className='!w-fit px-4'>
              + Add Project
            </Button>
          </div>

          <div className='space-y-6'>
            {formData.projects.map((item, index) => (
              <div
                key={index}
                className='space-y-5 rounded-xl border border-border bg-background p-5'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold text-text'>
                    Project #{index + 1}
                  </h3>

                  <button
                    type='button'
                    onClick={() => removeProject(index)}
                    aria-label={`Delete project ${index + 1}`}
                    title='Delete Project'
                    className='flex items-center justify-center rounded-lg p-2 text-text-muted transition-colors hover:bg-error/10 hover:text-error'>
                    <FaTrash size={14} />
                  </button>
                </div>

                <FormField
                  label='Project Name'
                  htmlFor={`project-name-${index}`}>
                  <Input
                    id={`project-name-${index}`}
                    value={item.name}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    placeholder='ResumePilot AI'
                  />
                </FormField>

                <FormField
                  label='Project Description'
                  htmlFor={`project-description-${index}`}>
                  <textarea
                    id={`project-description-${index}`}
                    value={item.description ?? ""}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    rows={4}
                    placeholder='Explain the purpose, features and functionality of your project...'
                    className='w-full rounded-xl border border-border bg-canvas px-4 py-3 text-text outline-none focus:border-accent focus:ring-2 focus:ring-accent/20'
                  />
                </FormField>

                <FormField
                  label='Technologies'
                  htmlFor={`project-technologies-${index}`}>
                  <Input
                    id={`project-technologies-${index}`}
                    value={item.technologies.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        index,
                        "technologies",
                        e.target.value
                          .split(",")
                          .map((technology) => technology.trim()),
                      )
                    }
                    placeholder='React, TypeScript, Node.js, MongoDB'
                  />
                </FormField>

                <FormField label='Project URL' htmlFor={`project-url-${index}`}>
                  <Input
                    id={`project-url-${index}`}
                    type='url'
                    value={item.projectUrl ?? ""}
                    onChange={(e) =>
                      updateProject(index, "projectUrl", e.target.value)
                    }
                    placeholder='https://github.com/username/project'
                  />
                </FormField>
              </div>
            ))}
          </div>

          {formData.projects.length === 0 && (
            <p className='rounded-xl border border-dashed border-border py-8 text-center text-sm text-text-muted'>
              No projects added yet.
            </p>
          )}
        </Card>

        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={saving}
            className='flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 sm:!w-fit sm:min-w-[160px]'>
            <FaSave />
            {saving ? "Saving..." : id ? "Update Resume" : "Save Resume"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResumeBuilder;
