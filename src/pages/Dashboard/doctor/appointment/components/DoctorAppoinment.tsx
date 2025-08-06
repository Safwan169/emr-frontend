import React from "react";
import { CalendarDays, Link, Phone } from "lucide-react";
import { useGetSpecificPatientsForDoctorQuery } from "../../../../../redux/features/doctor/doctorApi";
import {Link as RouterLink} from "react-router-dom";
// Define the appointment type
interface Appointment {
  doctorName: string;
  status: "Pending" | "Confirmed" | "Completed" | "Canceled";
  consultationTime: string;
  reason: string;
  notes: string;
  contact: string;
}

// Define type for status color mapping
const statusColors: Record<Appointment["status"], string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Canceled: "bg-red-100 text-red-700",
};

const DoctorAppoinment: React.FC = () => {
  const appointments: Appointment[] = [
    {
      doctorName: "Sabit",
      status: "Confirmed",
      consultationTime: "10:30 AM - consultation",
      reason: "Fever & Headache",
      notes: "Bring previous reports",
      contact: "+880 1234-567890",
    },
    {
      doctorName: "Sumon",
      status: "Pending",
      consultationTime: "12:00 PM - consultation",
      reason: "Routine Checkup",
      notes: "Discuss medication",
      contact: "+880 9876-543210",
    },
    {
      doctorName: "Koushik",
      status: "Completed",
      consultationTime: "2:00 PM - consultation",
      reason: "Chest Pain",
      notes: "ECG & Blood Test",
      contact: "+880 1122-334455",
    },
    {
      doctorName: "Bitto",
      status: "Completed",
      consultationTime: "2:00 PM - consultation",
      reason: "Chest Pain",
      notes: "ECG & Blood Test",
      contact: "+880 1122-334455",
    },
    {
      doctorName: "Safwan",
      status: "Completed",
      consultationTime: "2:00 PM - consultation",
      reason: "Chest Pain",
      notes: "ECG & Blood Test",
      contact: "+880 1122-334455",
    },
  ];

  const {userId}=JSON.parse(localStorage.getItem("profileInfo") || "{}");
  const {data}=useGetSpecificPatientsForDoctorQuery(userId);
  console.log(data,'this si for patient doct  patient list');

  return (
    <div className="w-full h-auto bg-white">
      <div className="py-5 px-5">
        <h1 className="text-xl font-bold">Appointment</h1>

        {/* Top bar */}
        <div className="mt-5 w-full border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:space-x-5 gap-3">
            <div className="border border-gray-200 w-full sm:w-52 h-12 rounded-md flex items-center px-3 space-x-2 bg-white">
              <CalendarDays className="w-5 h-5" />
              <span className="text-gray-700 font-medium">
                {new Date().toDateString()}
              </span>
            </div>
            <div className="border border-gray-200 w-full sm:w-52 h-12 rounded-md flex items-center justify-center bg-white">
              <span className="text-[#1C3BA4] font-medium">
                {appointments.length} Appointments Upcoming
              </span>
            </div>
          </div>
          <div>
            <button className="w-full sm:w-auto px-3 py-2 bg-[#1C3BA4] text-white rounded-md">
              + Create Appointment
            </button>
          </div>
        </div>

        {/* Appointment cards */}
        <div className="border border-gray-200 grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 w-full h-auto mt-2 p-4 bg-gray-50 rounded-lg  flex-wrap gap-4 justify-center">
          {appointments.map((ap, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg bg-white p-4 flex flex-col justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{data?.name}</h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-md font-medium ${statusColors[ap.status]}`}
                  >
                    {ap.status}
                  </span>
                </div>
                <p className="text-gray-400">
                  {ap.consultationTime.split("-")[0]} -{" "}
                  <span className="text-blue-600 font-semibold">
                    {ap.consultationTime.split("-")[1]}
                  </span>
                </p>
                <div className="space-y-3">
                  <p className="text-gray-400">
                    Reason:
                    <br />
                    <span className="text-gray-800 font-semibold">{ap.reason}</span>
                  </p>
                  <p className="text-gray-400">
                    Notes:
                    <br />
                    <span className="text-gray-800 font-semibold">{ap.notes}</span>
                  </p>
                  <p className="text-gray-400">
                    Contact:
                    <br />
                    <span className="text-gray-800 font-semibold">{data?.contact|| "N/A"}</span>
                  </p>
                </div>
              </div>
               <RouterLink  to={`/doctor/appoinment-details`}>
              <div className="flex items-center space-x-2 mt-4">

                <button className="flex-1 py-2 bg-[#1C3BA4] text-white rounded-md">
                  Start Consultation
                </button>
                <button className="p-2 bg-gray-300 text-gray-800 rounded-md">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
               </RouterLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppoinment;
