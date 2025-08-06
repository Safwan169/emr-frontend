import React from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { Appointment } from "../../../../../types/global";
import { useGetAllDoctorsQuery } from "../../../../../redux/features/doctor/doctorApi";

const AppointmentsList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllDoctorsQuery(null);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !data) return <p className="text-center text-red-500">Failed to load</p>;

  // Transform API data into Appointment[]
  const appointments: Appointment[] = data?.data?.map((doctor: any) => ({
    id: String(doctor.id),
    doctorName: `${doctor.user?.first_name || ""} ${doctor.user?.last_name || ""}`.trim(),
    department: doctor.specialization || "Unknown",
    visitType: "Physical", // Hardcoded or use logic if available
    date: new Date(doctor.created_at).toLocaleDateString(), // Format as needed
    time: new Date(doctor.created_at).toLocaleTimeString(), // Format as needed
    room: "Room 101", // Hardcoded (change if data available)
    rating: doctor.rating || 0,
    experience: doctor.years_of_experience || 0,
    imageUrl: doctor?.user?.profile_image?.file_URL || "",
  })) || [];

  return (
    <div className="space-y-4">
      {appointments.length > 0 ? (
        appointments.map((appt) => (
          <DoctorAppointmentCard key={appt.id} data={appt} />
        ))
      ) : (
        <p className="text-center">No doctor available</p>
      )}
    </div>
  );
};

export default AppointmentsList;
