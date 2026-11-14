import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

import {
  getResumeTemplate,
  DEFAULT_RESUME_TEMPLATE,
} from "../../constants/resumeTemplates";

const sampleResume = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@email.com",
  phone: "+1 234 567 890",
  location: "New York, USA",
  linkedin: "linkedin.com/in/alexmorgan",
  website: "alexmorgan.dev",
  summary:
    "Motivated software developer with experience building responsive web applications and scalable backend services. Passionate about creating user-focused digital solutions and continuously learning new technologies.",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "Git",
  ],
  experience: [
    {
      position: "Full Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2024 – Present",
      description:
        "Developed and maintained responsive web applications using React and Node.js. Built REST APIs, integrated databases, and improved application performance.",
    },
    {
      position: "Frontend Developer Intern",
      company: "Digital Innovations",
      duration: "Jun 2023 – Dec 2023",
      description:
        "Created reusable UI components and implemented responsive interfaces. Collaborated with the development team to improve user experience.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      duration: "2020 – 2024",
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description:
        "Built a full-stack shopping platform with product management, cart functionality, and order processing.",
      technologies: "React, Node.js, MongoDB",
    },
    {
      name: "Task Management App",
      description:
        "Developed a task management application with user authentication and CRUD functionality.",
      technologies: "React, Express.js, MongoDB",
    },
  ],
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className='mb-3 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-wider text-gray-800'>
    {children}
  </h3>
);

const ResumeContent = () => (
  <>
    <section className='mb-6'>
      <SectionTitle>Professional Summary</SectionTitle>
      <p className='text-sm leading-6 text-gray-700'>{sampleResume.summary}</p>
    </section>

    <section className='mb-6'>
      <SectionTitle>Work Experience</SectionTitle>
      <div className='space-y-4'>
        {sampleResume.experience.map((item) => (
          <div key={item.company}>
            <div className='flex flex-wrap justify-between gap-1'>
              <h4 className='text-sm font-bold text-gray-900'>
                {item.position}
              </h4>
              <span className='text-xs text-gray-500'>{item.duration}</span>
            </div>
            <p className='mb-1 text-sm font-medium text-gray-600'>
              {item.company}
            </p>
            <p className='text-sm leading-5 text-gray-700'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className='mb-6'>
      <SectionTitle>Education</SectionTitle>
      {sampleResume.education.map((item) => (
        <div key={item.institution}>
          <h4 className='text-sm font-bold text-gray-900'>{item.degree}</h4>
          <div className='flex justify-between gap-2 text-sm text-gray-600'>
            <span>{item.institution}</span>
            <span>{item.duration}</span>
          </div>
        </div>
      ))}
    </section>

    <section className='mb-6'>
      <SectionTitle>Projects</SectionTitle>
      <div className='space-y-3'>
        {sampleResume.projects.map((project) => (
          <div key={project.name}>
            <h4 className='text-sm font-bold text-gray-900'>{project.name}</h4>
            <p className='text-sm leading-5 text-gray-700'>
              {project.description}
            </p>
            <p className='mt-1 text-xs text-gray-500'>{project.technologies}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <SectionTitle>Skills</SectionTitle>
      <div className='flex flex-wrap gap-2'>
        {sampleResume.skills.map((skill) => (
          <span
            key={skill}
            className='rounded bg-gray-100 px-2 py-1 text-xs text-gray-700'>
            {skill}
          </span>
        ))}
      </div>
    </section>
  </>
);

const ResumeTemplatePreview = () => {
  const navigate = useNavigate();
  const { templateId } = useParams<{ templateId: string }>();

  const selectedTemplate = getResumeTemplate(
    templateId || DEFAULT_RESUME_TEMPLATE,
  );

  const handleUseTemplate = () => {
    navigate("/resume-builder", {
      state: {
        selectedTemplate: selectedTemplate.id,
      },
    });
  };

  const renderResume = () => {
    switch (selectedTemplate.id) {
      case "modern":
        return (
          <div className='min-h-[1000px] bg-white p-10 text-gray-800'>
            <header className='mb-8 border-l-4 border-indigo-600 pl-5'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                {sampleResume.firstName} {sampleResume.lastName}
              </h2>
              <p className='mt-2 text-sm font-medium text-indigo-600'>
                Full Stack Developer
              </p>
              <p className='mt-3 text-xs leading-6 text-gray-500'>
                {sampleResume.email} | {sampleResume.phone}
                <br />
                {sampleResume.location} | {sampleResume.linkedin}
                <br />
                {sampleResume.website}
              </p>
            </header>
            <ResumeContent />
          </div>
        );

      case "professional":
        return (
          <div className='grid min-h-[1000px] grid-cols-[34%_66%] bg-white text-gray-800'>
            <aside className='bg-slate-800 p-6 text-white'>
              <h2 className='text-2xl font-bold'>
                {sampleResume.firstName}
                <br />
                {sampleResume.lastName}
              </h2>

              <p className='mt-3 text-xs leading-5 text-slate-300'>
                {sampleResume.email}
                <br />
                {sampleResume.phone}
                <br />
                {sampleResume.location}
                <br />
                {sampleResume.linkedin}
                <br />
                {sampleResume.website}
              </p>

              <div className='mt-8'>
                <h3 className='mb-3 border-b border-slate-500 pb-2 text-sm font-bold uppercase tracking-wider'>
                  Skills
                </h3>
                <ul className='space-y-2 text-xs text-slate-200'>
                  {sampleResume.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <main className='p-7'>
              <div className='mb-7'>
                <p className='text-sm font-semibold uppercase tracking-widest text-slate-500'>
                  Full Stack Developer
                </p>
                <p className='mt-3 text-sm leading-6 text-gray-700'>
                  {sampleResume.summary}
                </p>
              </div>

              <div className='mb-6'>
                <SectionTitle>Work Experience</SectionTitle>
                <div className='space-y-4'>
                  {sampleResume.experience.map((item) => (
                    <div key={item.company}>
                      <h4 className='text-sm font-bold text-gray-900'>
                        {item.position}
                      </h4>
                      <p className='text-xs text-gray-500'>
                        {item.company} | {item.duration}
                      </p>
                      <p className='mt-2 text-sm leading-5 text-gray-700'>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <SectionTitle>Education</SectionTitle>
                {sampleResume.education.map((item) => (
                  <div key={item.institution}>
                    <h4 className='text-sm font-bold text-gray-900'>
                      {item.degree}
                    </h4>
                    <p className='text-xs text-gray-500'>
                      {item.institution} | {item.duration}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <SectionTitle>Projects</SectionTitle>
                <div className='space-y-3'>
                  {sampleResume.projects.map((project) => (
                    <div key={project.name}>
                      <h4 className='text-sm font-bold text-gray-900'>
                        {project.name}
                      </h4>
                      <p className='mt-1 text-sm leading-5 text-gray-700'>
                        {project.description}
                      </p>
                      <p className='mt-1 text-xs text-gray-500'>
                        {project.technologies}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        );

      case "minimal":
        return (
          <div className='min-h-[1000px] bg-white px-12 py-14 text-gray-800'>
            <header className='mb-10 text-center'>
              <h2 className='text-3xl font-light tracking-wide text-gray-900'>
                {sampleResume.firstName} {sampleResume.lastName}
              </h2>
              <p className='mt-3 text-xs tracking-wide text-gray-500'>
                {sampleResume.email} · {sampleResume.phone} ·{" "}
                {sampleResume.location}
              </p>
              <p className='mt-1 text-xs text-gray-500'>
                {sampleResume.linkedin} · {sampleResume.website}
              </p>
            </header>
            <ResumeContent />
          </div>
        );

      default:
        return (
          <div className='min-h-[1000px] bg-white p-10 text-gray-800'>
            <header className='mb-7 border-b-2 border-gray-800 pb-5 text-center'>
              <h2 className='text-3xl font-bold uppercase tracking-wide text-gray-900'>
                {sampleResume.firstName} {sampleResume.lastName}
              </h2>
              <p className='mt-2 text-sm font-semibold text-gray-600'>
                Full Stack Developer
              </p>
              <p className='mt-3 text-xs leading-6 text-gray-500'>
                {sampleResume.email} | {sampleResume.phone} |{" "}
                {sampleResume.location}
                <br />
                {sampleResume.linkedin} | {sampleResume.website}
              </p>
            </header>
            <ResumeContent />
          </div>
        );
    }
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <button
            type='button'
            onClick={() => navigate("/resume-templates")}
            className='mb-3 flex items-center gap-2 text-sm text-text-muted transition hover:text-text'>
            <FaArrowLeft size={12} />
            Back to Templates
          </button>

          <h1 className='text-2xl font-bold text-text sm:text-3xl'>
            {selectedTemplate.name} Template
          </h1>

          <p className='mt-2 text-sm text-text-muted'>
            Preview this design using sample resume information.
          </p>
        </div>

        <button
          type='button'
          onClick={handleUseTemplate}
          className='flex w-fit items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
          <FaCheck size={13} />
          Use This Template
        </button>
      </div>

      {/* Resume Preview */}
      <div className='overflow-x-auto rounded-xl border border-border bg-canvas p-4 shadow-card sm:p-8'>
        <div className='mx-auto w-full min-w-[600px] max-w-[794px] overflow-hidden shadow-xl'>
          {renderResume()}
        </div>
      </div>

      <p className='text-center text-xs text-text-muted'>
        This is sample content for demonstration. Your own information will
        replace it when you use this template.
      </p>
    </div>
  );
};

export default ResumeTemplatePreview;
