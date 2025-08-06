import React, { useEffect, useState } from "react";
import AtAGlance from "./components/StatCard";
import PatientTracking from "./components/PatientTracking";
import AppointmentList from "./components/AppointmentList";
import PatientList from "./components/PatientList ";

const DoctorDashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profileInfo");
    if (profile) {
      const { userId } = JSON.parse(profile);
      setUserId(userId);
    }
  }, []);

  if (!userId) return null; // Or a loading spinner

  return (
    <>
      <AtAGlance doctorId={userId} />
      <div className="flex flex-col lg:flex-row w-full gap-4 ">
        <div className="w-full lg:w-1/2">
          <PatientTracking />
        </div>
        <div className="w-full lg:w-1/2">
          <AppointmentList doctorId={userId} />
        </div>
      </div>

      <PatientList doctorId={userId} />
    </>
  );
};

export default DoctorDashboard;
