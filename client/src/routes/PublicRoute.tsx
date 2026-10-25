import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { loading, isAuthenticated } = useAuth();

  // Wait until authentication is verified
  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background'>
        <p className='text-text-muted'>Loading...</p>
      </div>
    );
  }

  // Already logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  // Not authenticated
  return <>{children}</>;
};

export default PublicRoute;
