import React from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { Appointment } from "../../../../../types/global";
import { useGetAllDoctorsQuery } from "../../../../../redux/features/doctor/doctorApi";

const AppointmentsList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllDoctorsQuery(null);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !data) return <p className="text-center text-red-500">Failed to load</p>;

  const appointments: Appointment[] =
    data?.data?.map((doctor: any) => ({
      id: String(doctor.id),
      doctorName: `${doctor.user?.first_name || ""} ${doctor.user?.last_name || ""}`.trim(),
      department: doctor.specialization || "Unknown",
      visitType: "Physical",
      date: new Date(doctor.created_at).toLocaleDateString(),
      time: new Date(doctor.created_at).toLocaleTimeString(),
      room: "Room 101",
      rating: doctor.rating || 0,
      experience: doctor.years_of_experience || 0,
      imageUrl: doctor?.user?.profile_image?.file_URL || "",
    })) || [];

  return (
    <div className="space-y-4 w-full ">
      {appointments.length > 0 ? (
        appointments.map((appt) => (
          <DoctorAppointmentCard key={appt.id} data={appt} />
        ))
      ) : (
        <p className="text-center text-gray-500">No doctor available</p>
      )}
    </div>
  );
};

export default AppointmentsList;
