import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Droplets,
  FileText,
  FlaskConical,
  LogOut,
  Users,
  Wind,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const TotalVisit = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const cardData = [
    { title: "Total Visits", content: "1,245", icon: Users },
    { title: "Prescription", content: "20", icon: FileText },
    { title: "Upcoming Appointment", content: "230", icon: CalendarDays },
    { title: "Lab Report", content: "320", icon: FlaskConical },
    { title: "Cancelled Appointments", content: "12", icon: XCircle },
    { title: "Discharged Today", content: "4:50pm", icon: LogOut },
  ];

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = new Date();

  // Fake weather data (can connect to API later)
  const weather = {
    city: "Dhaka",
    temperature: 32,
    condition: "Sunny",
    humidity: 62,
    wind: 14,
  };

  return (
    <div className="flex flex-col lg:flex-row px-6 gap-6 items-stretch">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 rounded-2xl py-5 px-5 shadow-2xl flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {cardData.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="h-[156px] flex flex-col justify-between rounded-[12px] p-6 bg-white shadow-md w-full"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-blue-500 w-6 h-6" />
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                </div>
                <p className="text-gray-600 text-3xl font-bold">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex">
        <div className="shadow-2xl rounded-2xl bg-white w-full flex flex-col p-6">
          {/* Weather Widget */}
          <div className="bg-gray-200 text-blue-900 p-4 rounded-2xl mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">{weather.city}</h2>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="capitalize">{weather.condition}</p>
            </div>
            <div className="flex gap-6 mt-3 sm:mt-0">
              <div className="flex items-center gap-1">
                <Droplets className="w-5 h-5" />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-5 h-5" />
                <span>{weather.wind} km/h</span>
              </div>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="flex justify-between  items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-600">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 text-center flex-1">
            {daysArray.map((day, index) => {
              const isToday =
                day &&
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <div
                  key={index}
                  className={`p-2 m-1 rounded-lg flex items-center justify-center
                    ${day ? "cursor-pointer" : ""}
                    ${isToday ? "bg-blue-800 text-white" : "hover:bg-blue-100"}
                  `}
                >
                  {day || ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalVisit;
