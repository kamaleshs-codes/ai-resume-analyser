import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
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
            <Login />
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
