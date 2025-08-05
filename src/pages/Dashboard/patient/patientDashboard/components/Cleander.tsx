import { ChevronLeft, ChevronRight, Droplets, Wind, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Cleander: React.FC<{ weatherComponent: boolean }> = ({weatherComponent}) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weather, setWeather] = useState<any>(null);
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayRef = useRef<HTMLDivElement | null>(null);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // ✅ Fetch Weather Data for Dhaka
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  // ✅ Scroll to Today
  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [currentDate]);

  return (
    <div className="w-full    max-w-2xl">
      {/* Weather Widget */}
     {
      weatherComponent &&  <div className={` bg-white p-5 rounded-xl  mb-3`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-700">Dhaka</h2>
            <p className="text-blue-900 text-xl font-semibold">
              {today.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-500 text-sm">
              {today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} |{" "}
              {today.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
          </div>
          <div className="flex flex-col items-end">
            {weather ? (
              <>
                <div className="flex items-center text-yellow-500 text-2xl">
                  <Sun className="w-6 h-6 mr-1" /> {weather.temperature}°C
                </div>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-4 h-4" /> {weather.windspeed} km/h
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-4 h-4" /> Wind
                  </span>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
     }

      {/* Calendar Section */}
      <div className="bg-white   p-5 rounded-xl ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-gray-700">
            {monthNames[month]}, {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Horizontal Scrollable Dates */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <div
                  key={day}
                  ref={isToday ? todayRef : null}
                  className={`flex flex-col items-center min-w-[80px] h-[80px] justify-center cursor-pointer transition 
                  ${
                    isToday
                      ? "bg-blue-800 text-white"
                      : "bg-gray-50 hover:bg-blue-100"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="text-xl font-bold">{day}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cleander;
