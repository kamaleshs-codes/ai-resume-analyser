import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

import {
  RESUME_TEMPLATES,
  DEFAULT_RESUME_TEMPLATE,
} from "../../constants/resumeTemplates";

import { sampleResume } from "../..//constants/sampleResume";
import ResumeTemplateRenderer from "../../components/resume-templates/ResumeTemplateRenderer";
import Button from "../../components/ui/Button";

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
          <Button
            type='button'
            onClick={() => navigate("/dashboard")}
            className='!w-fit !mb-4 !bg-transparent !px-0 !py-0 !text-sm !text-text-muted !shadow-none hover:!bg-transparent hover:!translate-y-0 hover:!text-text active:!scale-100'>
            <span className='flex items-center gap-2'>
              <FaArrowLeft size={12} />
              Back to Dashboard
            </span>
          </Button>

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

          const previewResume = {
            ...sampleResume,
            template: template.id,
          };

          return (
            <div
              key={template.id}
              className='group overflow-hidden rounded-xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/60'>
              {/* Actual Resume Template Preview */}
              <div className='relative h-72 overflow-hidden bg-canvas'>
                <div className='absolute left-1/2 top-3 w-[794px] origin-top -translate-x-1/2 scale-[0.42] select-none pointer-events-none'>
                  <ResumeTemplateRenderer resume={previewResume} />
                </div>

                {isDefault && (
                  <span className='absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-canvas shadow-card'>
                    Default
                  </span>
                )}
              </div>

              {/* Template Information */}
              <div className='space-y-4 p-5'>
                <div>
                  <h2 className='text-lg font-semibold text-text'>
                    {template.name}
                  </h2>

                  <p className='mt-2 min-h-10 text-sm leading-5 text-text-muted'>
                    {template.description}
                  </p>
                </div>

                <Button
                  type='button'
                  onClick={() => handleSelectTemplate(template.id)}
                  className='flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm'>
                  Preview Template
                  <FaArrowRight size={12} />
                </Button>
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
