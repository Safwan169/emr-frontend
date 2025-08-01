import React from "react";
import { CalendarDays } from "lucide-react";

// Define the Appointment type
interface Appointment {
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Canceled";
  image: string;
}

// Status colors type
type StatusColors = {
  [key in Appointment["status"]]: string;
};

const Upcoming: React.FC = () => {
  const upcomingAppointments: Appointment[] = [
    {
      patientName: "John Doe",
      doctor: "Dr. Sarah Johnson",
      date: "Aug 3, 2025",
      time: "10:30 AM",
      status: "Confirmed",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      patientName: "Jane Smith",
      doctor: "Dr. Emily Brown",
      date: "Aug 5, 2025",
      time: "02:00 PM",
      status: "Pending",
      image: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      patientName: "Robert Wilson",
      doctor: "Dr. James Wilson",
      date: "Aug 6, 2025",
      time: "11:00 AM",
      status: "Canceled",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
  ];

  const statusColors: StatusColors = {
    Confirmed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Canceled: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Right Section: Upcoming Appointments */}
      <div className="w-full lg:w-1/2 bg-white border rounded-2xl shadow-2xl p-5">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarDays className="text-blue-600" /> Upcoming Appointments
        </h2>

        <div className="space-y-4">
          {upcomingAppointments.map((appt, index) => (
            <div
              key={index}
              className="relative p-4 rounded-lg shadow-xl hover:shadow-lg transition flex items-center gap-4"
            >
              <img
                src={appt.image}
                alt={appt.patientName}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* Patient Name with border line */}
                <p className="font-semibold text-blue-900 border-b border-gray-300 pb-1">
                  {appt.patientName}
                </p>
                <p className="text-sm text-gray-600">{appt.doctor}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {appt.date} at {appt.time}
                </p>
              </div>

              {/* Status badge positioned above the line on the right */}
              <span
                className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[appt.status]}`}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
