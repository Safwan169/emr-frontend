import React from "react";
import AtAGlance from "./components/AtAGlance";
import PatientTracking from "./components/PatientTracking";
import AppointmentList from "./components/AppointmentList";
import PatientList from "./components/PatientList ";

const DoctorDashboard = () => {
  return (
    <>
      <AtAGlance doctorId="4" />
      <div className="flex flex-row w-full gap-4">
        <PatientTracking />
        <AppointmentList />
      </div>

      <PatientList />
    </>
  );
};

export default DoctorDashboard;
