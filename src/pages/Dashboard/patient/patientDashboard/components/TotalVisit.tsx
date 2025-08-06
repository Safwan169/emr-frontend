import {
  CalendarDays,
  FileText,
  FlaskConical,
  LogOut,
  Users,
  XCircle,
} from "lucide-react";
import Cleander from "./Cleander";

const TotalVisit = () => {
  const cardData = [
    { title: "Total Visits", content: "2,098", icon: Users },
    { title: "Prescription", content: "20", icon: FileText },
    { title: "Upcoming Appointment", content: "230", icon: CalendarDays },
    { title: "Lab Report", content: "320", icon: FlaskConical },
    
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-3 w-full">
      {/* Left Section */}
      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
        {cardData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl p-5  space-y-4  max-h-[160px]  bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Title */}
              <h2 className="text-base   font-semibold text-gray-600 ">
                {card.title}
              </h2>

              {/* Icon and Value */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded-lg">
                  <Icon className="text-white w-4 h-4" />
                </div>
                <p className="text-gray-900 text-2xl font-bold">
                  {card.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

     
    </div>
  );
};

export default TotalVisit;
