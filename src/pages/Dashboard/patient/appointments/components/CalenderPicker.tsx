import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { addDate } from "../../../../../redux/features/appoinment/appoinmentSlice";

interface CalenderPickerProps {
  onDateSelect: (date: string) => void; // callback to parent
  disabledDates?: string[]; // future feature
}

const CalenderPicker: React.FC<CalenderPickerProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const dispatch = useAppDispatch();
  const handleDateClick = (day: number | null) => {
    if (!day) return;

    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(fullDate);
    dispatch(
      addDate(
        fullDate
      )

    )
    onDateSelect(fullDate); 
  };

  return (
    <div className="rounded-2xl bg-white w-full flex flex-col p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
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

          const isSelected = selectedDate === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-2 m-1 rounded-lg flex items-center justify-center
                ${day ? "cursor-pointer" : ""}
                ${isSelected ? "bg-[#1C3BA4] text-white" : isToday ? "border border-[#1C3BA4]" : "hover:bg-blue-100"}
              `}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalenderPicker;
