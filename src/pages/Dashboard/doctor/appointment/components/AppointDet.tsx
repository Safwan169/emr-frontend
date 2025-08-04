import React from "react";
import { X } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: string;
  gender: string;
  reason: string;
  dateTime: string;
}

const AppointDet: React.FC = () => {
  const patient: Patient = {
    id: "#35534635",
    name: "Salil Chakma",
    age: "99 Years",
    gender: "Male",
    reason: "Blood pressure check and medication review",
    dateTime: "2025-01-16 at 09:00",
  };

  return (
    <div className="w-full h-auto rounded-lg bg-white">
      <div className="py-5 px-5">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Appointment details - {patient.name}
          </h1>
          <X className="cursor-pointer" />
        </div>

        {/* Basic Info */}
        <div className="mt-5 w-full h-auto border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Basic Information
          </h2>
          <hr className="mb-4 border-gray-200" />

          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-xs text-gray-500">Patient ID</p>
              <p className="text-sm font-medium">{patient.id}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm font-medium">{patient.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm font-medium">{patient.age}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm font-medium">{patient.gender}</p>
            </div>

            <div className="col-span-1">
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm font-medium">{patient.reason}</p>
            </div>

            <div className="col-span-1">
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="text-sm font-medium">{patient.dateTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointDet;
