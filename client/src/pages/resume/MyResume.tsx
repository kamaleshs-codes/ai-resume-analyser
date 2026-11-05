import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getUserResumesApi, deleteResumeApi } from "../../api/resume.api";
import type { Resume } from "../../types/resume.types";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaTrash,
  FaCalendarAlt,
  FaSyncAlt,
  FaEdit,
} from "react-icons/fa";

const MyResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch all resumes belonging to the authenticated user
  const fetchResumes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUserResumesApi();
      setResumes(data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to retrieve your resumes. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchResumes();
  }, [fetchResumes]);

  // Delete a resume
  const handleDelete = async (resumeId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(resumeId);
      setError("");

      await deleteResumeApi(resumeId);

      setResumes((previousResumes) =>
        previousResumes.filter((resume) => resume._id !== resumeId),
      );
    } catch (error) {
      console.error("Failed to delete resume:", error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to delete this resume. Please try again.",
        );
      } else {
        setError("Something went wrong while deleting the resume.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Format the last updated date
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className='space-y-8'>
      {/* Page Header */}
      <div className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div className=''>
          <h1 className='text-3xl font-bold text-text'>My Resumes</h1>
          <p className='mt-2 text-sm text-text-muted'>
            Manage and organize all your saved resumes.
          </p>
        </div>

        <Button
          type='button'
          onClick={() => void fetchResumes()}
          disabled={loading}
          className='!w-fit min-w-[110px] shrink-0 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50'>
          <FaSyncAlt className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className='rounded-xl border border-error/30 bg-error/10 px-5 py-4 text-sm text-error'>
          <div className='flex items-center justify-between gap-4'>
            <p>{error}</p>

            <button
              type='button'
              onClick={() => void fetchResumes()}
              className='shrink-0 font-semibold underline'>
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {[1, 2, 3].map((item) => (
            <Card key={item} className='animate-pulse space-y-5'>
              <div className='h-5 w-2/3 rounded bg-white/10' />
              <div className='h-4 w-full rounded bg-white/10' />
              <div className='h-4 w-1/2 rounded bg-white/10' />
              <div className='h-10 w-full rounded-xl bg-white/10' />
            </Card>
          ))}
        </div>
      ) : resumes.length === 0 && !error ? (
        /* Empty State */
        <Card className='flex flex-col items-center justify-center py-16 text-center'>
          <div className='mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent'>
            <FaFileAlt size={30} />
          </div>

          <h2 className='text-xl font-semibold text-text'>No Resumes Yet</h2>

          <p className='mt-3 max-w-md text-sm leading-6 text-text-muted'>
            You haven't created any resumes yet. Your saved resumes will appear
            here once you start building them.
          </p>
        </Card>
      ) : (
        /* Resume List */
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {resumes.map((resume) => (
            <Card
              key={resume._id}
              className='flex flex-col gap-5 transition-all duration-200 hover:border-accent/40 hover:shadow-glow'>
              {/* Resume Title */}
              <div className='flex items-start gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent'>
                  <FaFileAlt size={22} />
                </div>

                <div className='min-w-0 flex-1'>
                  <h2 className='truncate text-lg font-semibold text-text'>
                    {resume.title}
                  </h2>

                  <p className='mt-1 text-xs capitalize text-text-muted'>
                    {resume.template || "Professional"} Template
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-text'>
                  {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                </p>

                <p className='truncate text-sm text-text-muted'>
                  {resume.personalInfo.email}
                </p>
              </div>

              {/* Skills */}
              <div>
                <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted'>
                  Skills
                </p>

                <div className='flex flex-wrap gap-2'>
                  {resume.skills && resume.skills.length > 0 ? (
                    resume.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className='rounded-lg border border-border bg-background px-3 py-1 text-xs text-text'>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className='text-xs text-text-muted'>
                      No skills added
                    </span>
                  )}

                  {resume.skills && resume.skills.length > 4 && (
                    <span className='rounded-lg bg-accent/10 px-3 py-1 text-xs text-accent'>
                      +{resume.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Last Updated */}
              <div className='flex items-center gap-2 border-t border-border pt-4 text-xs text-text-muted'>
                <FaCalendarAlt size={13} />

                <span>Updated {formatDate(resume.updatedAt)}</span>
              </div>

              {/* Actions */}
              {/* Actions */}
              <div className='mt-auto flex flex-wrap gap-3'>
                <Button
                  type='button'
                  onClick={() => navigate(`/resume-builder/${resume._id}`)}
                  className='!w-fit min-w-[110px] flex-1 items-center justify-center gap-2'>
                  <FaEdit size={13} />
                  Edit
                </Button>

                <Button
                  type='button'
                  onClick={() => void handleDelete(resume._id)}
                  disabled={deletingId === resume._id}
                  className='!w-fit min-w-[110px] flex-1 items-center justify-center gap-2 bg-error/10 text-error shadow-none hover:bg-error/20 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50'>
                  <FaTrash size={13} />
                  {deletingId === resume._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Resume Count */}
      {!loading && resumes.length > 0 && (
        <p className='text-sm text-text-muted'>
          Showing {resumes.length} {resumes.length === 1 ? "resume" : "resumes"}
        </p>
      )}
    </section>
  );
};

export default MyResumes;
