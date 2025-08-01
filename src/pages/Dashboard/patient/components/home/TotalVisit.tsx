import { CalendarDays, FileText, FlaskConical, Users } from "lucide-react"; // Importing icons
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Type for card data
interface CardData {
  title: string;
  content: string;
  icon: React.ElementType;
}

type CalendarValue = Date | [Date, Date];

const TotalVisit: React.FC = () => {
  const cardData: CardData[] = [
    { title: "Total Visits", content: "1,245", icon: Users },
    { title: "Prescription", content: "20", icon: FileText },
    { title: "Upcoming Appointment", content: "230", icon: CalendarDays },
    { title: "Lab Report", content: "320", icon: FlaskConical },
  ];

  const [date, setDate] = useState<CalendarValue>(new Date());

  return (
    <div className="flex flex-col lg:flex-row px-6 gap-6">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 rounded-2xl py-5 px-5 shadow-2xl">
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
      <div className="w-full lg:w-1/2 px-3">
        <div className="px-4 lg:px-10 shadow-2xl space-y-6 py-6 rounded-2xl">
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm mx-auto">
            <Calendar value={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalVisit;
