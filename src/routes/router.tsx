import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DoctorDashboard from "../pages/Dashboard/doctor/DoctorDashboard";
import PatientDashboard from "../pages/Dashboard/patient/PatientDashboard";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound/NotFound";
import Register from "../pages/register/Register";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
  element: <DashboardLayout pageTitle="Dashboard" />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // doctor dashboard
      {
        path: "/dashboard/doctor",
        element: <DoctorDashboard />,
      },
      // patient dashboard
      {
        path: "/dashboard/patient",
        element: <PatientDashboard />,
      },
      // login
      {
        path: "/login",
        element: <Login />,
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
