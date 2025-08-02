import { useState } from "react";

export default function TimeSlotPicker() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: false, booked: true },
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: true, booked: false },
    { time: "03:30 PM", available: true, booked: false },
  ];

  const handleSlotClick = (index: any, slot: any) => {
    if (slot.available && !slot.booked) {
      setSelectedSlot(index);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Available Time Slots
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleSlotClick(index, slot)}
            disabled={slot.booked || !slot.available}
            className={`
              px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${
                slot.booked
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : slot.available
                  ? selectedSlot === index
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span className="font-medium">{slot.time}</span>
              {slot.booked && (
                <span className="text-xs text-gray-400 mt-1">Booked</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
