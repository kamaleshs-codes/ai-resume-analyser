import { FaChartLine, FaFileAlt, FaFolderOpen, FaGlobe } from "react-icons/fa";

import WelcomeBanner from "../../components/home/WelcomeBanner";
import SectionTitle from "../../components/home/SectionTitle";
import FeatureCard from "../../components/home/FeatureCard";
import StatsCard from "../../components/home/StatsCard";
import RecentActivity from "../../components/home/RecentActivity";

const Dashboard = () => {
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
          onClick={() => {}}
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
          onClick={() => {}}
        />
      </div>

      {/* Statistics */}
      <div className='mt-12'>
        <SectionTitle
          title='Statistics'
          description='A quick overview of your ResumePilot AI activity.'
        />

        <div className='grid gap-6 md:grid-cols-3'>
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

      {/* Recent Activity */}
      <div className='mt-12'>
        <SectionTitle
          title='Recent Activity'
          description='Your latest activities in ResumePilot AI.'
        />

        <RecentActivity activities={activities} />
      </div>
    </>
  );
};

export default Dashboard;
