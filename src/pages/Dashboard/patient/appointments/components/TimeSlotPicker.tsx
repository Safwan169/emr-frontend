import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAvailableSlotsQuery } from "../../../../../redux/features/appoinment/appoinmentApi";
import { useAppSelector, useAppDispatch } from "../../../../../redux/hooks";
import { setBookingTimeSlot } from "../../../../../redux/features/appoinment/appoinmentSlice";

interface TimeSlotPickerProps {
  selectedDate: string | null;
}

export default function TimeSlotPicker({ selectedDate }: TimeSlotPickerProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const { selectedDoctor } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: slots, isLoading } = useGetAvailableSlotsQuery(selectedDoctor?.id);
  console.log(slots, 'slots', selectedDoctor);
  const availableSlots =
    selectedDate && slots ? slots.available_slots[selectedDate] || [] : [];

  const handleSlotClick = (index: number, slotId: string, slotTime: string) => {
    setSelectedSlot(index);
    dispatch(setBookingTimeSlot({ slotId, timeSlot: slotTime }));

    // Navigate to next page
    navigate("/new-appointment/appoinment-details");
  };


  if (!selectedDate) {
    return (
      <div className="p-6 text-gray-500">
        Please select a date to see available slots.
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Available Time Slots for {selectedDate}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {availableSlots.length > 0 ? (
          availableSlots?.map((slot: any, index: number) =>
         {
          console.log(slot,'slot');
          return    (
            <button
              key={index}
              onClick={() => handleSlotClick(index, slot?.slot_id, slot?.start_time)}
              // disabled={!slot.available || slot.booked}
              className={`px-4 py-3 h-14 rounded-lg text-sm font-medium transition-all duration-200
                ${slot.booked
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : selectedSlot === index
                    ? "bg-[#1C3BA4] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:shadow-sm"
                }
              `}
            >
              <div className="flex flex-col items-center">
                <span className="font-medium">{slot.start_time}</span>
                {slot.booked && (
                  <span className="text-xs text-gray-400">Booked</span>
                )}
              </div>
            </button>
          )
         }
        )
        ) : (
          <p className="text-gray-500 col-span-3">
            No slots available for this date.
          </p>
        )}
      </div>
    </div>
  );
}
