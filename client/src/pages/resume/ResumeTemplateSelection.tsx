import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

import {
  RESUME_TEMPLATES,
  DEFAULT_RESUME_TEMPLATE,
} from "../../constants/resumeTemplates";

const ResumeTemplateSelection = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/resume-templates/${templateId}`);
  };

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <button
            type='button'
            onClick={() => navigate("/dashboard")}
            className='mb-4 flex items-center gap-2 text-sm text-text-muted transition hover:text-text'>
            <FaArrowLeft size={12} />
            Back to Dashboard
          </button>

          <h1 className='text-2xl font-bold text-text sm:text-3xl'>
            Choose Your Resume Template
          </h1>

          <p className='mt-2 text-sm text-text-muted'>
            Select a design that best represents your professional profile. You
            can preview it before entering your details.
          </p>
        </div>
      </div>

      {/* Template Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
        {RESUME_TEMPLATES.map((template) => {
          const isDefault = template.id === DEFAULT_RESUME_TEMPLATE;

          return (
            <div
              key={template.id}
              className='group overflow-hidden rounded-xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/60'>
              {/* Template Thumbnail */}
              <div className='relative flex h-72 items-center justify-center overflow-hidden bg-canvas p-6'>
                <div className='h-full w-44 bg-white p-4 shadow-lg transition duration-300 group-hover:scale-105'>
                  <div className='border-b border-gray-300 pb-3'>
                    <div className='mb-2 h-3 w-24 rounded-sm bg-gray-800' />
                    <div className='h-1.5 w-32 rounded-sm bg-gray-300' />
                  </div>

                  <div className='mt-4 space-y-3'>
                    <div>
                      <div className='mb-2 h-1.5 w-16 rounded-sm bg-gray-700' />
                      <div className='space-y-1'>
                        <div className='h-1 w-full rounded-sm bg-gray-200' />
                        <div className='h-1 w-5/6 rounded-sm bg-gray-200' />
                        <div className='h-1 w-4/6 rounded-sm bg-gray-200' />
                      </div>
                    </div>

                    <div>
                      <div className='mb-2 h-1.5 w-14 rounded-sm bg-gray-700' />
                      <div className='space-y-1'>
                        <div className='h-1 w-full rounded-sm bg-gray-200' />
                        <div className='h-1 w-5/6 rounded-sm bg-gray-200' />
                      </div>
                    </div>

                    <div>
                      <div className='mb-2 h-1.5 w-12 rounded-sm bg-gray-700' />
                      <div className='space-y-1'>
                        <div className='h-1 w-full rounded-sm bg-gray-200' />
                        <div className='h-1 w-4/6 rounded-sm bg-gray-200' />
                      </div>
                    </div>
                  </div>
                </div>

                {isDefault && (
                  <span className='absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white'>
                    Default
                  </span>
                )}
              </div>

              {/* Template Information */}
              <div className='space-y-4 p-5'>
                <div>
                  <div className='flex items-center justify-between gap-3'>
                    <h2 className='text-lg font-semibold text-text'>
                      {template.name}
                    </h2>

                    <span className='rounded-md bg-canvas px-2 py-1 text-xs text-text-muted'>
                      {template.category}
                    </span>
                  </div>

                  <p className='mt-2 min-h-10 text-sm leading-5 text-text-muted'>
                    {template.description}
                  </p>
                </div>

                <button
                  type='button'
                  onClick={() => handleSelectTemplate(template.id)}
                  className='flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90'>
                  Preview Template
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Default Template Information */}
      <div className='flex items-start gap-3 rounded-lg border border-border bg-canvas p-4'>
        <FaCheck className='mt-1 shrink-0 text-accent' size={14} />

        <p className='text-sm text-text-muted'>
          You can continue without choosing a template. The{" "}
          <span className='font-medium text-text'>
            {
              RESUME_TEMPLATES.find(
                (template) => template.id === DEFAULT_RESUME_TEMPLATE,
              )?.name
            }
          </span>{" "}
          template will be selected automatically.
        </p>
      </div>
    </div>
  );
};

export default ResumeTemplateSelection;
