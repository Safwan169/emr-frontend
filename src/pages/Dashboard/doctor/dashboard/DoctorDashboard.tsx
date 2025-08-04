import React from "react";
import StatCard from "./components/StatCard";
import PatientTracking from "./components/PatientTracking";
import AppointmentList from "./components/AppointmentList";
import PatientList from "./components/PatientList ";

const DoctorDashboard = () => {
  return (
    <>
      <StatCard />
      <div className="flex flex-row w-full gap-4">
        <PatientTracking />
        <AppointmentList />
      </div>

      <PatientList />
    </>
  );
};

export default DoctorDashboard;
