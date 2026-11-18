import type { CreateResumeRequest, Resume } from "../../types/resume.types";
import type { ReactNode } from 'react';

type ResumeData = CreateResumeRequest | Resume;

interface ResumeTemplateRendererProps {
  resume: ResumeData;
}

const formatDate = (date?: string) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const contactItems = (resume: ResumeData) => {
  const { personalInfo } = resume;

  return [personalInfo.email, personalInfo.phone, personalInfo.location].filter(
    Boolean,
  );
};

const links = (
  resume: ResumeData,
): { label: string; url: string }[] => {
  const { personalInfo } = resume;

  return [
    personalInfo.linkedin && {
      label: 'LinkedIn',
      url: personalInfo.linkedin,
    },
    personalInfo.github && {
      label: 'GitHub',
      url: personalInfo.github,
    },
    personalInfo.website && {
      label: 'Portfolio',
      url: personalInfo.website,
    },
  ].filter(
    (item): item is { label: string; url: string } => Boolean(item),
  );
};

const SectionHeading = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2
    className={`mb-3 border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900 ${className}`}>
    {children}
  </h2>
);

const ResumeSections = ({
  resume,
  accent = "gray",
}: {
  resume: ResumeData;
  accent?: "gray" | "indigo" | "white";
}) => {
  const headingColor =
    accent === "indigo"
      ? "text-indigo-700"
      : accent === "white"
        ? "text-white"
        : "text-gray-900";

  const borderColor =
    accent === "white" ? "border-slate-500" : "border-gray-300";

  return (
    <div className='space-y-6'>
      {resume.professionalSummary && (
        <section>
          <SectionHeading className={`${headingColor} ${borderColor}`}>
            Professional Summary
          </SectionHeading>
          <p className='whitespace-pre-line text-sm leading-6 text-gray-700'>
            {resume.professionalSummary}
          </p>
        </section>
      )}

      {resume.experience?.length > 0 && (
        <section>
          <SectionHeading className={`${headingColor} ${borderColor}`}>
            Work Experience
          </SectionHeading>

          <div className='space-y-5'>
            {resume.experience.map((item, index) => (
              <div key={`${item.company}-${index}`}>
                <div className='flex flex-wrap justify-between gap-1'>
                  <h3 className='text-sm font-semibold text-gray-900'>
                    {item.position}
                  </h3>

                  <span className='text-xs text-gray-500'>
                    {formatDate(item.startDate)}
                    {item.startDate && " – "}
                    {item.currentlyWorking
                      ? "Present"
                      : formatDate(item.endDate)}
                  </span>
                </div>

                <p className='mt-1 text-sm font-medium text-gray-600'>
                  {item.company}
                  {item.location && ` | ${item.location}`}
                </p>

                {item.description && (
                  <p className='mt-2 whitespace-pre-line text-sm leading-6 text-gray-700'>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education?.length > 0 && (
        <section>
          <SectionHeading className={`${headingColor} ${borderColor}`}>
            Education
          </SectionHeading>

          <div className='space-y-4'>
            {resume.education.map((item, index) => (
              <div key={`${item.institution}-${index}`}>
                <div className='flex flex-wrap justify-between gap-1'>
                  <h3 className='text-sm font-semibold text-gray-900'>
                    {item.degree}
                    {item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                  </h3>

                  <span className='text-xs text-gray-500'>
                    {formatDate(item.startDate)}
                    {item.startDate && " – "}
                    {formatDate(item.endDate)}
                  </span>
                </div>

                <p className='mt-1 text-sm text-gray-600'>{item.institution}</p>

                {item.description && (
                  <p className='mt-1 text-sm leading-5 text-gray-700'>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.projects?.length > 0 && (
        <section>
          <SectionHeading className={`${headingColor} ${borderColor}`}>
            Projects
          </SectionHeading>

          <div className='space-y-4'>
            {resume.projects.map((item, index) => (
              <div key={`${item.name}-${index}`}>
                <h3 className='text-sm font-semibold text-gray-900'>
                  {item.name}
                </h3>

                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-xs text-indigo-700 hover:underline'>
                    View Project
                  </a>
                )}

                {item.description && (
                  <p className='mt-1 whitespace-pre-line text-sm leading-6 text-gray-700'>
                    {item.description}
                  </p>
                )}

                {item.technologies?.length > 0 && (
                  <p className='mt-1 text-xs text-gray-500'>
                    <span className='font-semibold'>Technologies:</span>{" "}
                    {item.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills?.length > 0 && (
        <section>
          <SectionHeading className={`${headingColor} ${borderColor}`}>
            Technical Skills
          </SectionHeading>

          <div className='flex flex-wrap gap-2'>
            {resume.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className='rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-700'>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ClassicTemplate = ({ resume }: ResumeTemplateRendererProps) => {
  const { personalInfo } = resume;

  return (
    <article className='min-h-[1123px] bg-white px-8 py-10 text-gray-800 sm:px-12'>
      <header className='mb-8 border-b-2 border-gray-800 pb-6 text-center'>
        <h1 className='text-3xl font-bold uppercase tracking-wide text-gray-900'>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <p className='mt-2 text-base font-medium text-gray-600'>
          {resume.title}
        </p>

        <p className='mt-4 text-xs leading-6 text-gray-600'>
          {contactItems(resume).join(" | ")}
        </p>

        <div className='mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs'>
          {links(resume).map((item) => (
            <a
              key={item.label}
              href={item.url}
              target='_blank'
              rel='noreferrer'
              className='text-blue-700 hover:underline'>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <ResumeSections resume={resume} />
    </article>
  );
};

const ModernTemplate = ({ resume }: ResumeTemplateRendererProps) => {
  const { personalInfo } = resume;

  return (
    <article className='min-h-[1123px] bg-white px-8 py-10 text-gray-800 sm:px-12'>
      <header className='mb-9 border-l-4 border-indigo-600 py-2 pl-5'>
        <p className='mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600'>
          {resume.title}
        </p>

        <h1 className='text-3xl font-bold tracking-tight text-gray-950'>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <p className='mt-3 text-xs leading-6 text-gray-500'>
          {contactItems(resume).join("  •  ")}
        </p>

        <div className='mt-2 flex flex-wrap gap-4 text-xs'>
          {links(resume).map((item) => (
            <a
              key={item.label}
              href={item.url}
              target='_blank'
              rel='noreferrer'
              className='font-medium text-indigo-700 hover:underline'>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <ResumeSections resume={resume} accent='indigo' />
    </article>
  );
};

const ProfessionalTemplate = ({ resume }: ResumeTemplateRendererProps) => {
  const { personalInfo } = resume;

  return (
    <article className='grid min-h-[1123px] grid-cols-[34%_66%] bg-white text-gray-800'>
      <aside className='bg-slate-800 px-5 py-9 text-white sm:px-7'>
        <h1 className='break-words text-2xl font-bold leading-tight'>
          {personalInfo.firstName}
          <br />
          {personalInfo.lastName}
        </h1>

        <p className='mt-3 text-xs leading-5 text-slate-300'>{resume.title}</p>

        <div className='mt-7 space-y-2 break-words text-xs leading-5 text-slate-200'>
          {contactItems(resume).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>

        <div className='mt-7 space-y-2'>
          <h2 className='border-b border-slate-500 pb-2 text-xs font-bold uppercase tracking-wider'>
            Links
          </h2>

          {links(resume).map((item) => (
            <a
              key={item.label}
              href={item.url}
              target='_blank'
              rel='noreferrer'
              className='block break-all text-xs text-slate-200 hover:underline'>
              {item.label}
            </a>
          ))}
        </div>

        {resume.skills?.length > 0 && (
          <div className='mt-7'>
            <h2 className='mb-3 border-b border-slate-500 pb-2 text-xs font-bold uppercase tracking-wider'>
              Skills
            </h2>

            <ul className='space-y-2 text-xs text-slate-200'>
              {resume.skills.map((skill, index) => (
                <li key={`${skill}-${index}`}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className='min-w-0 px-5 py-9 sm:px-8'>
        <ResumeSections resume={resume} />
      </main>
    </article>
  );
};

const MinimalTemplate = ({ resume }: ResumeTemplateRendererProps) => {
  const { personalInfo } = resume;

  return (
    <article className='min-h-[1123px] bg-white px-9 py-14 text-gray-800 sm:px-14'>
      <header className='mb-10'>
        <h1 className='text-3xl font-light tracking-wide text-gray-950'>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <p className='mt-2 text-xs uppercase tracking-[0.18em] text-gray-500'>
          {resume.title}
        </p>

        <div className='mt-5 space-y-1 text-xs text-gray-500'>
          <p>{contactItems(resume).join("  ·  ")}</p>

          <div className='flex flex-wrap gap-x-4 gap-y-1'>
            {links(resume).map((item) => (
              <a
                key={item.label}
                href={item.url}
                target='_blank'
                rel='noreferrer'
                className='text-gray-600 underline underline-offset-2'>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <ResumeSections resume={resume} />
    </article>
  );
};

const ResumeTemplateRenderer = ({ resume }: ResumeTemplateRendererProps) => {
  switch (resume.template) {
    case "modern":
      return <ModernTemplate resume={resume} />;

    case "professional":
      return <ProfessionalTemplate resume={resume} />;

    case "minimal":
      return <MinimalTemplate resume={resume} />;

    case "classic":
    default:
      return <ClassicTemplate resume={resume} />;
  }
};

export default ResumeTemplateRenderer;
