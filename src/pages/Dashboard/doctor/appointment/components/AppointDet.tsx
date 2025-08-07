import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../../../redux/features/user/userApi";
import { useGetPatientAppointmentsQuery } from "../../../../../redux/features/appoinment/appoinmentApi";

const AppointDet: React.FC = () => {
  const location = useLocation();
  const userId = location?.state || ""; // Safe access

  const { data: userResponse, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
  const user = userResponse?.data;
console.log(user)
  const { data: appointmentResponse = [], isLoading: isAppointmentLoading } =
    useGetPatientAppointmentsQuery(user?.id || "");

  const [appointmentData, setAppointmentData] = useState<any>(null);

  useEffect(() => {
    if (appointmentResponse?.length > 0) {
      setAppointmentData(appointmentResponse[0]); // pick first appointment (or based on condition)
    }
  }, [appointmentResponse]);
console.log(appointmentData)
  // Loading state
  if (isUserLoading || isAppointmentLoading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="w-full h-auto rounded-lg bg-white">
      <div className="py-5 px-5">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Appointment details - {user?.first_name} {user?.last_name}
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
              <p className="text-sm font-medium">{user?.id || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm font-medium">
                {user?.first_name} {user?.last_name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm font-medium">{user?.age || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm font-medium">{user?.gender || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm font-medium">
                {appointmentData?.notes || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="text-sm font-medium">
                {appointmentData?.slot.slot_date} at {appointmentData?.slot.start_time || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointDet;
