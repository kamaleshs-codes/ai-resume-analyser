import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

import {
  getResumeTemplate,
  DEFAULT_RESUME_TEMPLATE,
} from "../../constants/resumeTemplates";

import { sampleResume } from "../../constants/sampleResume";
import ResumeTemplateRenderer from "../../components/resume-templates/ResumeTemplateRenderer";
import Button from "../../components/ui/Button";

const ResumeTemplatePreview = () => {
  const navigate = useNavigate();
  const { templateId } = useParams<{ templateId: string }>();

  // Get the selected template
  const selectedTemplate = getResumeTemplate(
    templateId || DEFAULT_RESUME_TEMPLATE,
  );

  // Apply the selected template to shared sample resume data
  const previewResume = {
    ...sampleResume,
    template: selectedTemplate.id,
  };

  // Navigate to the resume builder with the selected template
  const handleUseTemplate = () => {
    navigate("/resume-builder", {
      state: {
        selectedTemplate: selectedTemplate.id,
      },
    });
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <Button
            type='button'
            onClick={() => navigate("/resume-templates")}
            className='!mb-3 !w-fit !bg-transparent !px-0 !py-0 !text-sm !text-text-muted !shadow-none hover:!bg-transparent hover:!translate-y-0 hover:!text-text active:!scale-100'>
            <span className='flex items-center gap-2'>
              <FaArrowLeft size={12} />
              Back to Templates
            </span>
          </Button>

          <h1 className='text-2xl font-bold text-text sm:text-3xl'>
            {selectedTemplate.name} Template
          </h1>

          <p className='mt-2 text-sm text-text-muted'>
            Preview this design using sample resume information.
          </p>
        </div>

        <Button
          type='button'
          onClick={handleUseTemplate}
          className='!w-fit flex items-center justify-center gap-2 px-5 py-3 text-sm'>
          <FaCheck size={13} />
          Use This Template
        </Button>
      </div>

      {/* Full Resume Preview */}
      <div className='overflow-x-auto rounded-xl border border-border bg-canvas p-4 shadow-card sm:p-8'>
        <div className='mx-auto w-full min-w-[600px] max-w-[794px] overflow-hidden shadow-xl'>
          <ResumeTemplateRenderer resume={previewResume} />
        </div>
      </div>

      {/* Preview Note */}
      <p className='text-center text-xs text-text-muted'>
        This is sample content for demonstration. Your own information will
        replace it when you use this template.
      </p>
    </div>
  );
};

export default ResumeTemplatePreview;
