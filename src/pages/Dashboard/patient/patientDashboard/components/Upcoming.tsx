
import React from "react";

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
      <div className="w-full bg-white max-h-[450px] overflow-y-auto  rounded-2xl  p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
          {" "}
          Upcoming Appointments
        </h2>

        <div className="space-y-4">
          {upcomingAppointments.map((appt, index) => (
            <div
              key={index}
              className="relative p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-lg transition flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <img
                src={appt.image}
                alt={appt.patientName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-blue-900 border-b border-gray-300 pb-1 text-sm sm:text-base">
                  {appt.patientName}
                </p>
                <p className="text-sm ">{appt.doctor}</p>
                <p className="text-lg  font-bold mt-1">
                  {appt.date} at {appt.time}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`absolute top-2 right-2 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                  statusColors[appt.status]
                }`}
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
