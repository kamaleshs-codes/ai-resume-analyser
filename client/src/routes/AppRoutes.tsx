import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "../pages/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import MyResumes from "../pages/resume/MyResume";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <PublicRoute>
            <AuthPage mode='login' />
          </PublicRoute>
        }
      />

      <Route
        path='/register'
        element={
          <PublicRoute>
            <AuthPage mode='register' />
          </PublicRoute>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/my-resumes' element={<MyResumes />} />
        </Route>
      </Route>

      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
};

export default AppRoutes;
