import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
} from "react-icons/fa";

import Button from "../../components/ui/Button";
import {
  createResumeApi,
  getResumeByIdApi,
  updateResumeApi,
} from "../../api/resume.api";
import type { CreateResumeRequest, Resume } from "../../types/resume.types";
import ResumeTemplateRenderer from "../../components/resume-templates/ResumeTemplateRenderer";

interface ResumePreviewLocationState {
  resumeData?: CreateResumeRequest | Resume;
  resumeId?: string | null;
}

type ResumePreviewData = CreateResumeRequest | Resume;

const ResumePreview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const routeState = location.state as ResumePreviewLocationState | null;
  const stateResume = routeState?.resumeData ?? null;

  const [resume, setResume] = useState<ResumePreviewData | null>(stateResume);
  const [loading, setLoading] = useState(!stateResume);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const resumeId = routeState?.resumeId || (id && id !== "new" ? id : null);

  const isExistingResume = Boolean(resumeId);

  // Use the unsaved builder data when available.
  // If the preview route is opened directly, fetch the saved resume by ID.
  useEffect(() => {
    if (stateResume) {
      setResume(stateResume);
      setError("");
      setLoading(false);
      return;
    }

    if (!id || id === "new") {
      setResume(null);
      setError(
        "Resume data is unavailable. Please return to the resume builder and preview it again.",
      );
      setLoading(false);
      return;
    }

    const fetchResume = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getResumeByIdApi(id);
        setResume(data);
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
  }, [id, stateResume]);

  const handleEdit = () => {
    if (!resume) return;

    navigate(
      isExistingResume && resumeId
        ? `/resume-builder/${resumeId}`
        : "/resume-builder",
      {
        state: {
          resumeData: resume,
          resumeId: resumeId ?? null,
        },
      },
    );
  };

  const handleSaveResume = async () => {
    if (!resume || saving) return;

    const actionLabel = isExistingResume ? "update" : "save";
    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabel} this resume?`,
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      setError("");

      // Send only the fields accepted by the resume API.
      // This also avoids sending MongoDB-generated nested _id values.
      const resumeData: CreateResumeRequest = {
        title: resume.title.trim(),
        template: resume.template || "classic",
        personalInfo: {
          firstName: resume.personalInfo.firstName.trim(),
          lastName: resume.personalInfo.lastName.trim(),
          email: resume.personalInfo.email.trim(),
          phone: resume.personalInfo.phone?.trim() || "",
          location: resume.personalInfo.location?.trim() || "",
          linkedin: resume.personalInfo.linkedin?.trim() || "",
          github: resume.personalInfo.github?.trim() || "",
          website: resume.personalInfo.website?.trim() || "",
        },
        professionalSummary: resume.professionalSummary?.trim() || "",
        skills: (resume.skills ?? [])
          .map((skill) => skill.trim())
          .filter(Boolean),
        education: (resume.education ?? []).map((item) => ({
          institution: item.institution.trim(),
          degree: item.degree.trim(),
          fieldOfStudy: item.fieldOfStudy?.trim() || "",
          startDate: item.startDate || "",
          endDate: item.endDate || "",
          description: item.description?.trim() || "",
        })),
        experience: (resume.experience ?? []).map((item) => ({
          company: item.company.trim(),
          position: item.position.trim(),
          location: item.location?.trim() || "",
          startDate: item.startDate || "",
          endDate: item.currentlyWorking ? "" : item.endDate || "",
          currentlyWorking: item.currentlyWorking ?? false,
          description: item.description?.trim() || "",
        })),
        projects: (resume.projects ?? []).map((item) => ({
          name: item.name.trim(),
          description: item.description?.trim() || "",
          technologies: (item.technologies ?? [])
            .map((technology) => technology.trim())
            .filter(Boolean),
          projectUrl: item.projectUrl?.trim() || "",
        })),
      };

      if (isExistingResume && resumeId) {
        await updateResumeApi(resumeId, resumeData);
      } else {
        await createResumeApi(resumeData);
      }

      navigate("/my-resumes");
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || `Unable to ${actionLabel} resume.`
          : `Something went wrong while trying to ${actionLabel} the resume.`,
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-[300px] items-center justify-center'>
        <p className='text-text-muted'>Loading resume preview...</p>
      </div>
    );
  }

  if (error && !resume) {
    return (
      <div className='space-y-5 rounded-xl border border-error/30 bg-error/5 p-6 text-center'>
        <p className='text-error'>{error}</p>

        <Button
          type='button'
          onClick={() => navigate("/my-resumes")}
          className='!w-fit mx-auto'>
          <FaArrowLeft className='mr-2' />
          Back to Resumes
        </Button>
      </div>
    );
  }

  if (!resume) {
    return null;
  }

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text'>Resume Preview</h1>
          <p className='mt-2 text-text-muted'>
            Review your resume before saving it.
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <Button
            type='button'
            onClick={handleEdit}
            className='!w-fit flex items-center justify-center gap-2'>
            <FaEdit />
            Edit Resume
          </Button>

          <Button
            type='button'
            onClick={handleSaveResume}
            disabled={saving}
            className='!w-fit flex items-center justify-center gap-2'>
            <FaSave />
            {saving
              ? isExistingResume
                ? "Updating..."
                : "Saving..."
              : isExistingResume
                ? "Update Resume"
                : "Save Resume"}
          </Button>
        </div>
      </div>

      {error && (
        <div className='rounded-xl border border-error/40 bg-error/10 p-4 text-error'>
          {error}
        </div>
      )}

      {/* Resume Document */}
      {/* Resume Document */}
      <div className='mx-auto w-full max-w-[850px] overflow-hidden rounded-lg bg-white shadow-xl'>
        <ResumeTemplateRenderer resume={resume} />
      </div>
    </div>
  );
};

export default ResumePreview;
