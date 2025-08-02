import React from "react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";
import { Appointment } from "../../../types/global";

const appointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Salil Chakma",
    department: "Orthopedic Surgery",
    visitType: "Regular Checkup",
    date: "August 22, 2025",
    time: "10:30 AM",
    room: "Room No: 430, Main Building",
    rating: 4.7,
    experience: 15,
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id: "1",
    doctorName: "Dr. Salil Chakma",
    department: "Orthopedic Surgery",
    visitType: "Regular Checkup",
    date: "August 22, 2025",
    time: "10:30 AM",
    room: "Room No: 430, Main Building",
    rating: 4.7,
    experience: 15,
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id: "1",
    doctorName: "Dr. Salil Chakma",
    department: "Orthopedic Surgery",
    visitType: "Regular Checkup",
    date: "August 22, 2025",
    time: "10:30 AM",
    room: "Room No: 430, Main Building",
    rating: 4.7,
    experience: 15,
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  // Add more items here...
];

const AppointmentsList = () => {
  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <DoctorAppointmentCard key={appt.id} data={appt} />
      ))}
    </div>
  );
};

export default AppointmentsList;
