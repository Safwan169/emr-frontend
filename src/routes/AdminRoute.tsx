import React from "react";
import DoctorMan from "../pages/Dashboard/admin/components/DoctorMan";
import MedRec from "../pages/Dashboard/admin/components/MedRec";
import MedicineInventory from "../pages/Dashboard/admin/components/MedicineInventory";
import PatientProfile from "../pages/Dashboard/admin/components/PatientProfile";
import DoctorProfile from "../pages/Dashboard/admin/components/DoctorProfile";
import PatientList from "../pages/Dashboard/admin/components/PatientList";
import DoctorRegister from "../pages/Dashboard/admin/components/DoctorRegister";
import DoctorProfileCreate from "../pages/Dashboard/admin/components/DoctorProfileCreate";

const AdminRoute = [
  {
    path: "add-doctors",
    element: <DoctorMan />,
  },
  {
    path: "admin/patients",
    element: <PatientList />,
  },
  {
    path: "admin/medical_records",
    element: <MedRec />,
  },
  {
    path: "admin/pharmacy",
    element: <DoctorProfile />,
  },
  {
    path: "doctor/register",
    element: <DoctorRegister />,
  },
  {
    path: "admin/doctor-profile/:user_id",
    element: <DoctorProfileCreate />,
  },
];

export default AdminRoute;
