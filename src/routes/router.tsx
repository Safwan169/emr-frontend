import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DoctorDashboard from "../pages/Dashboard/doctor/dashboard/DoctorDashboard";
import PatientDashboard from "../pages/Dashboard/patient/patientDashboard/PatientDashboard";
import ForgotPassword from "../pages/login/ForgotPassword";
import Login from "../pages/login/Login";
import LoginOtp from "../pages/login/LoginOtp";
import NotFound from "../pages/notfound/NotFound";
import OtpValidation from "../pages/register/OtpValidation";
import Register from "../pages/register/Register";
import { isAuthenticated } from "../utils/auth";
import AppointmentRoute from "./AppointmentRoute";
import DoctorRoute from "./DoctorRoute";
import PatientRoute from "./PatientRoute";
import CenterDashboard from "../pages/Dashboard/CenterDashboard";
import VerifyForgotPasswordOtp from "../pages/login/VerifyForgotPasswordOtp";
import ResetPassword from "../pages/login/ResetPassword";

// Private routes under DashboardLayout
const privateRoutes = {
  path: "/",
  element: isAuthenticated() ?  (
    <DashboardLayout/>
  ) : (
 <Navigate to="/login" replace  />
  ),
  children: [
    ...AppointmentRoute,
    ...PatientRoute,
    ...DoctorRoute,
    {
      path: "/",
      element: <CenterDashboard />,
    },
  ],
};

// Public routes (no layout)
const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login-otp",
    element: <LoginOtp />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/otp-validation",
    element: <OtpValidation />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-forgot-password-otp",
    element: <VerifyForgotPasswordOtp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/doctor-dashboard",
    element: <DoctorDashboard />,
  },
];

const router = createBrowserRouter([privateRoutes, ...publicRoutes]);

export default router;
