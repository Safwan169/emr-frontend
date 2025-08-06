import { CalendarDays, Clock } from 'lucide-react';
import React from 'react';
import { useAppSelector } from '../../../../../redux/hooks';

const SelectedTimeAndDate = () => {
  const { selectedDoctor } = useAppSelector((state) => state.booking);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date selected";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",   // e.g. Thursday
      month: "long",     // e.g. July
      day: "numeric",    // e.g. 31
      year: "numeric"    // e.g. 2025
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-gray-700 text-sm font-medium mb-4">
        Selected Date & Time
      </h3>

      {/* Date Row */}
      <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 mb-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <CalendarDays className="text-blue-600 w-5 h-5" />
        </div>
        <p className="text-sm text-gray-700 font-medium">
          {selectedDoctor?.date ? formatDate(selectedDoctor.date) : "Select a date"}
        </p>
      </div>

      {/* Time Row */}
      <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <Clock className="text-blue-600 w-5 h-5" />
        </div>
        <p className="text-sm text-gray-700 font-medium">
          {selectedDoctor?.timeSlot || "Select a time"}
        </p>
      </div>
    </div>
  );
};

export default SelectedTimeAndDate;
