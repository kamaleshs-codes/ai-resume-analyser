import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "../pages/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout";

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
          <Route path='/home' element={<Home />} />
        </Route>
      </Route>

      <Route path='/' element={<Navigate to='/home' replace />} />
    </Routes>
  );
};

export default AppRoutes;
