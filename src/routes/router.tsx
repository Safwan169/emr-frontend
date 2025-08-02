import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DoctorDashboard from "../pages/Dashboard/doctor/DoctorDashboard";
import PatientDashboard from "../pages/Dashboard/patient/PatientDashboard";
import ForgotPassword from "../pages/login/ForgotPassword";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound/NotFound";
import Register from "../pages/register/Register";
import AppointmentRoute from "./AppointmentRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout pageTitle="Dashboard" />,
    children: [
      ...AppointmentRoute,
      // patient dashboard
      {
        path: "/",
        element: <PatientDashboard />,
      },
      // doctor dashboard
      {
        path: "/dashboard/doctor",
        element: <DoctorDashboard />,
      },
      // login
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      // register
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
