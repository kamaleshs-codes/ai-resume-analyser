import Card from "../ui/Card";
import { useAuth } from "../../hooks/useAuth";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <Card className='mx-auto mb-10 w-full'>
      <div className='space-y-4'>
        <h1 className='text-4xl font-bold text-secondary'>
          Welcome back,{" "}
          <span className='text-primary whitespace-nowrap'>
            {user?.firstName ?? ""} {user?.lastName ?? ""}
          </span>{" "}
          👋
        </h1>

        <p className='text-xl leading-7 text-text'>
          Welcome to ResumePilot AI. Build ATS-friendly resumes, analyze your
          resume, generate professional portfolios, and manage all your career
          documents from one place.
        </p>
      </div>
    </Card>
  );
};

export default WelcomeBanner;
