// src/pages/Dashboard/doctor/dashboard/components/CreateSlot.tsx
import React, { useState } from "react";
import { usePostDoctorAvailabilityMutation } from "../../../../../pages/Dashboard/doctor/dashboard/api/dashboardApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateSlotProps {
  children: React.ReactNode; // Button or any trigger
}

const weekdaysOptions = [
  { value: "monday", label: "Monday", short: "MON" },
  { value: "tuesday", label: "Tuesday", short: "TUE" },
  { value: "wednesday", label: "Wednesday", short: "WED" },
  { value: "thursday", label: "Thursday", short: "THU" },
  { value: "friday", label: "Friday", short: "FRI" },
  { value: "saturday", label: "Saturday", short: "SAT" },
  { value: "sunday", label: "Sunday", short: "SUN" },
];

const CreateSlot: React.FC<CreateSlotProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);

  const [postAvailability, { isLoading }] = usePostDoctorAvailabilityMutation();

  const profileInfo = localStorage.getItem("profileInfo");
  const { userId = "" } = profileInfo ? JSON.parse(profileInfo) : {};

  const handleCheckboxChange = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDays.length) {
      toast.error("Please select at least one weekday!");
      return;
    }
    if (!startTime || !endTime) {
      toast.error("Please provide start and end time!");
      return;
    }

    try {
      await postAvailability({
        doctorId: userId,
        data: {
          weekdays: selectedDays,
          start_time: startTime,
          end_time: endTime,
          slot_duration_minutes: duration,
        },
      }).unwrap();

      toast.success("Slot created successfully!");
      
      setOpen(false);
      setSelectedDays([]);
      setStartTime("");
      setEndTime("");
      setDuration(30);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create slot.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
    setDuration(30);
  };

  return (
    <>
      {/* ToastContainer - Same style as ResetPassword */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Trigger */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
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
                  Create Availability Slot
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">
                  Configure your appointment availability
                </p>
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

            {/* Form Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Weekdays Selection */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-[#1C3BA4] to-[#2563eb] rounded-full"></div>
                    <label className="text-base sm:text-lg font-semibold text-slate-800">
                      Available Days
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                    {weekdaysOptions.map((day) => (
                      <label 
                        key={day.value} 
                        className={`relative flex flex-col items-center p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 
                                  cursor-pointer transition-all duration-200 group hover:shadow-md
                                  ${selectedDays.includes(day.value)
                                    ? 'border-[#1C3BA4] bg-gradient-to-b from-[#1C3BA4]/5 to-[#2563eb]/5 shadow-sm'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDays.includes(day.value)}
                          onChange={() => handleCheckboxChange(day.value)}
                          className="sr-only"
                        />
                        
                        {/* Custom checkbox */}
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mb-1 sm:mb-2 transition-all duration-200
                                       ${selectedDays.includes(day.value)
                                         ? 'border-[#1C3BA4] bg-[#1C3BA4]'
                                         : 'border-slate-300 group-hover:border-slate-400'
                                       }`}>
                          {selectedDays.includes(day.value) && (
                            <svg 
                              className="w-2 h-2 sm:w-3 sm:h-3 text-white m-0.5" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        
                        <span className={`text-xs font-bold mb-0.5 sm:mb-1 transition-colors duration-200
                                        ${selectedDays.includes(day.value) 
                                          ? 'text-[#1C3BA4]' 
                                          : 'text-slate-500'
                                        }`}>
                          {day.short}
                        </span>
                        <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-200
                                        ${selectedDays.includes(day.value) 
                                          ? 'text-slate-700' 
                                          : 'text-slate-500'
                                        }`}>
                          {day.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800">Time Configuration</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Start Time */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <label className="text-xs sm:text-sm font-semibold text-slate-700">Start Time</label>
                        </div>
                        <span className="text-[10px] sm:text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                          Session Begin
                        </span>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-emerald-300 group-focus-within:border-emerald-500 group-focus-within:shadow-lg group-focus-within:shadow-emerald-500/10">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-12 sm:w-14 sm:h-16 bg-gradient-to-b from-emerald-50 to-green-50 border-r border-slate-200">
                              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 0M12 7v5l3 3" />
                              </svg>
                            </div>
                            <input
                              type="time"
                              value={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                              className="flex-1 px-3 py-3 sm:px-4 sm:py-4 text-base sm:text-lg font-semibold text-slate-700 
                                       bg-transparent border-none outline-none
                                       placeholder:text-slate-400"
                              style={{
                                colorScheme: 'light'
                              }}
                            />
                          </div>
                          
                          {/* Time format indicator */}
                          <div className="px-3 sm:px-4 pb-1 sm:pb-2">
                            <div className="flex items-center justify-between text-[10px] sm:text-xs">
                              <span className="text-slate-500">Format: HH:MM</span>
                              {startTime && (
                                <span className="text-emerald-600 font-medium">
                                  {new Date(`2000-01-01T${startTime}`).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* End Time */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-rose-100 to-red-100 rounded-lg">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                          </div>
                          <label className="text-xs sm:text-sm font-semibold text-slate-700">End Time</label>
                        </div>
                        <span className="text-[10px] sm:text-xs text-rose-600 font-medium bg-rose-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                          Session End
                        </span>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-red-400/20 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-rose-300 group-focus-within:border-rose-500 group-focus-within:shadow-lg group-focus-within:shadow-rose-500/10">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-12 sm:w-14 sm:h-16 bg-gradient-to-b from-rose-50 to-red-50 border-r border-slate-200">
                              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                              </svg>
                            </div>
                            <input
                              type="time"
                              value={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                              className="flex-1 px-3 py-3 sm:px-4 sm:py-4 text-base sm:text-lg font-semibold text-slate-700 
                                       bg-transparent border-none outline-none
                                       placeholder:text-slate-400"
                              style={{
                                colorScheme: 'light'
                              }}
                            />
                          </div>
                          
                          {/* Time format indicator */}
                          <div className="px-3 sm:px-4 pb-1 sm:pb-2">
                            <div className="flex items-center justify-between text-[10px] sm:text-xs">
                              <span className="text-slate-500">Format: HH:MM</span>
                              {endTime && (
                                <span className="text-rose-600 font-medium">
                                  {new Date(`2000-01-01T${endTime}`).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duration Indicator */}
                  {startTime && endTime && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700">Total Session Duration</span>
                        </div>
                        <span className="text-base sm:text-lg font-bold text-blue-600">
                          {(() => {
                            const start = new Date(`2000-01-01T${startTime}`);
                            const end = new Date(`2000-01-01T${endTime}`);
                            const diffMs = end.getTime() - start.getTime();
                            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                            return `${diffHours}h ${diffMinutes}m`;
                          })()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Slot Duration */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full"></div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-700">Slot Duration</label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      min={5}
                      max={180}
                      step={5}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-slate-200 rounded-lg sm:rounded-xl
                               focus:border-[#1C3BA4] focus:ring-4 focus:ring-[#1C3BA4]/10
                               transition-all duration-200 bg-white text-slate-700
                               font-medium text-base sm:text-lg"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-xs sm:text-sm font-medium">
                      minutes
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration for each appointment slot (5-180 minutes)
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 
                             rounded-lg sm:rounded-xl font-semibold transition-all duration-200
                             hover:shadow-md transform hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-[#1C3BA4] to-[#2563eb] 
                             hover:from-[#162f7a] hover:to-[#1d4ed8] text-white rounded-lg sm:rounded-xl 
                             font-semibold transition-all duration-200 disabled:opacity-50 
                             disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 
                             active:scale-95 flex items-center space-x-1 sm:space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Create Slot</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateSlot;