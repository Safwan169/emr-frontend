// src/pages/Dashboard/doctor/dashboard/components/ViewSlot.tsx
import React, { useState, useEffect } from "react";
import { useGetAllAvailableSlotsQuery } from "../../../../../pages/Dashboard/doctor/dashboard/api/dashboardApi";
import { toast } from "react-toastify";

interface ViewSlotProps {
  children: React.ReactNode;
}

const ViewSlot: React.FC<ViewSlotProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const profileInfo = localStorage.getItem("profileInfo");
  const { userId = "" } = profileInfo ? JSON.parse(profileInfo) : {};

  // Using the hook from your API with updated types
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useGetAllAvailableSlotsQuery(userId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Extract slots from response
  const slots = response?.slots || {};
  const availability = response?.availability;
  const doctor = response?.doctor;

  // Sort dates chronologically
  const sortedDates = Object.keys(slots).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  // Format time to AM/PM
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Refresh data when modal opens
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  return (
    <>
      {/* Trigger */}
      <div onClick={handleOpen} className="cursor-pointer">
        {children}
      </div>

      {/* Modal Backdrop & Container */}
      {open && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 
                     backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto
                     opacity-0 scale-95 transition-all duration-300"
          style={{
            opacity: 1,
            transform: 'scale(1)',
            animation: 'fadeIn 0.3s ease-out forwards'
          }}
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative
                       transform transition-all duration-300 scale-100 my-8
                       border border-slate-200/50 overflow-hidden max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-[#1C3BA4] to-[#2563eb] p-6 sm:p-8 text-white relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                                   linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              ></div>
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 tracking-tight">
                  View Available Slots
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">
                  {doctor?.name && `${doctor.name}'s `}
                  {isLoading || isFetching ? "Loading slots..." :
                    `${Object.values(slots).flat().length} available slots found`}
                </p>
                {availability && (
                  <div className="mt-2 text-xs sm:text-sm text-blue-200">
                    <p>Working Hours: {formatTime(availability.working_hours.start_time)} - {formatTime(availability.working_hours.end_time)}</p>
                    <p>Slot Duration: {availability.working_hours.slot_duration} minutes</p>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 z-50 rounded-full 
                          bg-white/20 hover:bg-white/30 transition-all duration-200
                          flex items-center justify-center group"
              >
                <svg

                  className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {isLoading || isFetching ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : isError ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 text-rose-500">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-1">Failed to load slots</h3>
                  <p className="text-slate-500 text-sm">Please try again later</p>
                  <button
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : !response?.success || Object.keys(slots).length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 text-blue-500">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-1">No available slots found</h3>
                  <p className="text-slate-500 text-sm">Create new slots to start accepting appointments</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedDates.map((date) => {
                    const dateSlots = slots[date];
                    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

                    return (
                      <div key={date} className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-slate-200 shadow-sm">
                                <span className="text-sm font-bold text-blue-600">
                                  {new Date(date).getDate()}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-slate-800">
                                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </h3>
                                <p className="text-xs text-slate-500">
                                  {dayName}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {dateSlots.length} {dateSlots.length === 1 ? 'slot' : 'slots'}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white p-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {dateSlots.map((slot) => (
                              <div
                                key={slot.slot_id}
                                className={`p-2 rounded-lg text-center text-sm font-medium border
                                          ${slot.is_booked
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  }`}
                              >
                                {formatTime(slot.start_time)}
                                {slot.is_booked && (
                                  <span className="block text-[10px] text-rose-500 mt-1">Booked</span>
                                )}
                                {slot.status && (
                                  <span className="block text-[10px] text-slate-500 mt-1">{slot.status}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-slate-600">
                  {!isLoading && !isError && !isFetching && response?.success && (
                    <>
                      Showing {Object.values(slots).flat().length} slots across {sortedDates.length} {sortedDates.length === 1 ? 'day' : 'days'}
                    </>
                  )}
                </p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-[#1C3BA4] to-[#2563eb] 
                           text-white rounded-lg font-medium transition-all duration-200
                           hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSlot;