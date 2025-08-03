import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PatientDashboard from "../pages/Dashboard/patient/patientDashboard/PatientDashboard";
import ForgotPassword from "../pages/login/ForgotPassword";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound/NotFound";
import Register from "../pages/register/Register";
import { isAuthenticated } from "../utils/auth";
import AppointmentRoute from "./AppointmentRoute";
import PatientRoute from "./PatientRoute";
import DoctorProfile from "../testComponants/DoctorPatient";
import DoctorRoute from "./DoctorRoute";
import OtpValidation from "../pages/register/OtpValidation";
import LoginOtp from "../pages/login/LoginOtp";

// Private routes under DashboardLayout
const privateRoutes = {
  path: "/",
  element: isAuthenticated() ? (
    <DashboardLayout pageTitle="Dashboard" />
  ) : (
    <Login />
  ),
  children: [
    ...AppointmentRoute,
    ...PatientRoute,
    ...DoctorRoute,
    {
      path: "/",
      element: <PatientDashboard />,
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
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter([privateRoutes, ...publicRoutes]);

export default router;
