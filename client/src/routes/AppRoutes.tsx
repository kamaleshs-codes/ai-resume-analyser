import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "../pages/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import HomeLayout from "../layouts/HomeLayout";
import Dashboard from "../pages/dashboard/Dashboard";

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
        <Route element={<HomeLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Route>

      <Route path='/' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
};

export default AppRoutes;
