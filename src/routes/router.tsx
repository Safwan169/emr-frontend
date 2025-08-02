import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PatientDashboard from "../pages/Dashboard/patient/patientDashboard/PatientDashboard";
import ForgotPassword from "../pages/login/ForgotPassword";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound/NotFound";
import Register from "../pages/register/Register";
import { isAuthenticated } from "../utils/auth";
import AppointmentRoute from "./AppointmentRoute";

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
    path: "/register",
    element: <Register />,
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
