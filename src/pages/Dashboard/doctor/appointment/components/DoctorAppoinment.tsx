import React from "react";
import { CalendarDays, Phone } from "lucide-react";
import { useGetSpecificPatientsForDoctorQuery } from "../../../../../redux/features/doctor/doctorApi";
import { Link as RouterLink } from "react-router-dom";

// Define the appointment type
interface Appointment {
  doctorName: string;
  status: "Pending" | "Confirmed" | "Completed" | "Canceled";
  consultationTime: string;
  reason: string;
  notes: string;
  contact: string;
}

// Status color mapping (if needed)
const statusColors: Record<Appointment["status"], string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Canceled: "bg-red-100 text-red-700",
};

const DoctorAppoinment: React.FC = () => {
  const profileInfo = localStorage.getItem("profileInfo");
  const { userId = "" } = profileInfo ? JSON.parse(profileInfo) : {};

  const { data = [] } = useGetSpecificPatientsForDoctorQuery(userId);
console.log(data)
  return (
    <div className="w-full h-auto bg-white">
      <div className="py-5 px-5">
        {/* Title */}
        <h1 className="text-xl font-bold">Appointment</h1>

        {/* Header Bar */}
        <div className="mt-5 w-full border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 py-3  rounded-lg">
          <div className="flex flex-col sm:flex-row sm:space-x-5 w-full max-w-2xl gap-2">
            <div className="border border-gray-200 w-full justify-center h-12 rounded-md flex items-center px-3 space-x-2 bg-white">
              <CalendarDays className="w-5 h-5" />
              <span className="text-gray-700 font-medium">
                {new Date().toDateString()}
              </span>
            </div>
            <div className=" w-full h-12 rounded-md flex items-center justify-center bg-white">
              <span className="text-[#1C3BA4] px-2 font-medium
              ">
                {data.length} Appointments Upcoming
              </span>
            </div>
          </div>
          <div>
            <button className="w-full sm:w-auto px-3 py-2 bg-[#1C3BA4] text-white rounded-md">
              + Create Appointment
            </button>
          </div>
        </div>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 w-full h-auto mt-4 p-4  rounded-lg">
          {data.length > 0 ? (
            data.map((ap: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg bg-white p-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">{ap?.name}</h2>
                    {/* Uncomment if you plan to show status
                    <span className={`px-3 py-1 text-sm rounded-md font-medium ${statusColors["Pending"]}`}>
                      Pending
                    </span>
                    */}
                  </div>

                  <p className="text-gray-400 flex gap-2">
                    <span className="font-semibold text-gray-500/80">{ap?.slot_time || "N/A"}</span>
                    <span>.</span>
                    <span className=" text-[#1C3BA4]">{ap?.type || "N/A"}</span>
                  </p>

                  <div className="space-y-3">
                    <p className="text-gray-400">
                      Reason:
                      <br />
                      <span className="text-gray-800 font-semibold">
                        {ap?.reason || "N/A"}
                      </span>
                    </p>

                    <p className="text-gray-400">
                      Contact:
                      <br />
                      <span className="text-gray-800 font-semibold">
                        {ap?.contact || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <RouterLink state={ap.user_id} to={`/doctor/appoinment-details`}>
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
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No appointments found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppoinment;
