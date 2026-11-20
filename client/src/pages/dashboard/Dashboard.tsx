import { useNavigate } from "react-router-dom";
import { FaChartLine, FaFileAlt, FaFolderOpen, FaGlobe } from "react-icons/fa";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import SectionTitle from "../../components/dashboard/SectionTitle";
import FeatureCard from "../../components/dashboard/FeatureCard";
import resumeTemplatesImage from "../../assets/images/resumetemplates.png";
import StatsCard from "../../components/dashboard/StatsCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import Button from "../../components/ui/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      title: "Resume Updated",
      description: "Software Engineer Resume edited successfully.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Portfolio Generated",
      description: "Professional portfolio website generated.",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "ATS Analysis",
      description: "Resume scored 86% ATS compatibility.",
      time: "2 days ago",
    },
  ];

  return (
    <>
      {/* Welcome */}
      <WelcomeBanner />

      {/* Quick Actions */}
      <SectionTitle
        title='Quick Actions'
        description="Choose where you'd like to begin."
      />

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        <FeatureCard
          title='Resume Builder'
          description='Create professional ATS-friendly resumes with AI assistance.'
          icon={<FaFileAlt size={26} />}
          buttonText='Open Builder'
          onClick={() => navigate("/resume-builder")}
        />

        <FeatureCard
          title='Resume Analyzer'
          description='Analyze your resume and improve ATS compatibility.'
          icon={<FaChartLine size={26} />}
          buttonText='Analyze Resume'
          onClick={() => {}}
        />

        <FeatureCard
          title='Portfolio Generator'
          description='Generate a professional portfolio website from your resume.'
          icon={<FaGlobe size={26} />}
          buttonText='Generate Portfolio'
          onClick={() => {}}
        />

        <FeatureCard
          title='My Resumes'
          description='Manage, edit and download all of your saved resumes.'
          icon={<FaFolderOpen size={26} />}
          buttonText='View Resumes'
          onClick={() => navigate("/my-resumes")}
        />
      </div>

      {/* Resume Templates */}
      <div className='mt-12 overflow-hidden rounded-2xl border border-border bg-canvas shadow-card'>
        <div className='flex min-h-[260px] flex-col items-center justify-between lg:flex-row'>
          {/* Left Content - 60% */}
          <div className='z-10 flex w-full flex-col items-start justify-center px-6 py-8 sm:px-10 lg:w-[60%]'>
            <div className='flex items-center gap-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary'>
                <FaFileAlt size={24} />
              </div>

              <h2 className='text-2xl font-bold text-text sm:text-3xl'>
                Resume Templates
              </h2>
            </div>

            <p className='mt-4 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base'>
              Explore professionally designed templates and choose the perfect
              layout to build your next standout resume.
            </p>

            <Button
              onClick={() => navigate("/resume-templates")}
              className='!w-fit mt-6 flex items-center gap-3 px-6 py-3'>
              Browse Templates
            </Button>

            <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-text-muted sm:text-sm'>
              <span className='flex items-center gap-2'>
                <span className='text-success'>✓</span>4 Stunning Designs
              </span>

              <span className='flex items-center gap-2'>
                <span className='text-primary'>✧</span>
                Preview Before Using
              </span>

              <span className='flex items-center gap-2'>
                <span className='text-success'>✓</span>
                ATS Optimized
              </span>
            </div>
          </div>

          {/* Right Content - 40% */}
          <div className='flex min-h-[260px] w-full items-center justify-center px-3 py-5 lg:w-[40%] lg:pr-20'>
            <img
              src={resumeTemplatesImage}
              alt='Resume templates preview'
              className='h-[230px] w-[490px] max-w-none rounded-2xl object-fill shadow-glow'
            />
          </div>
        </div>
      </div>

      {/* Statistics and Recent Activity */}
      <div className='mt-12 flex justify-between'>
        {/* Left Column - Statistics */}
        <div className='w-1/3'>
          <SectionTitle
            title='Statistics'
            description='A quick overview of your ResumePilot AI activity.'
          />
          <div className='flex flex-col gap-5'>
            <StatsCard
              title='Resumes Created'
              value={5}
              icon={<FaFileAlt size={24} />}
            />
            <StatsCard
              title='ATS Analyses'
              value={8}
              icon={<FaChartLine size={24} />}
            />
            <StatsCard
              title='Portfolio Sites'
              value={2}
              icon={<FaGlobe size={24} />}
            />
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div className='w-1/2'>
          <SectionTitle
            title='Recent Activity'
            description='Your latest activities in ResumePilot AI.'
          />
          <RecentActivity activities={activities} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
