import React, { useState, useEffect } from "react";
import PatientDashboard from "./patient/patientDashboard/PatientDashboard";
import DoctorDashboard from "./doctor/dashboard/DoctorDashboard";
import Dashboard from "./admin/components/Dashboard";
import DoctorMan from "./admin/components/DoctorMan";
import DoctorProfile from "./admin/components/DoctorProfile";
import InventoryDashboard from "./admin/components/InventoryDashboard";
import MedicineInventory from "./admin/components/MedicineInventory";
import MedRec from "./admin/components/MedRec";
import PatientList from "./admin/components/PatientList";
import PatientProfile from "./admin/components/PatientProfile";
import PatientStat from "./doctor/patient/component/PatientStat";

interface UserProfile {
  role_name?: "patient" | "doctor" | string;
}

const CenterDashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const profileString = localStorage.getItem("profileInfo");
      if (profileString) {
        const profile: UserProfile = JSON.parse(profileString);
        setUserRole(profile.role_name || null);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error parsing profileInfo from localStorage:", error);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (userRole === "patient") {
    return <PatientDashboard />;
  }

  if (userRole === "doctor") {
    return <DoctorDashboard />;
  }

  if (userRole === "super_admin") {
    return <Dashboard />;
  }
  return <div>no role found</div>;

  console.log(userRole, "this is user role");
};

export default CenterDashboard;
