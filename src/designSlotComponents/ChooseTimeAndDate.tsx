import { useState } from "react";
import NeedHelp from "./components/NeedHelp";
import SelectedDoctorCard from "./components/SelectedDoctorCard";
import TimeSlotPicker from "./components/TimeSlotPicker";

const ChooseTimeAndDate = () => {
  const [appointmentType, setAppointmentType] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Appointment Type:", appointmentType);
    console.log("Reason:", reason);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-5">
      <div className="md:col-span-2">
        <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-medium mb-4">Appointment Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Appointment Types <span className="text-red-500">*</span>
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Appointment types</option>
                <option value="consultation">Consultation</option>
                <option value="followup">Follow-up</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Reason for Visits{" "}
                <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter your reason"
                className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1C3BA4] text-white py-2 rounded-md hover:bg-blue-800 transition"
            >
              Continue
            </button>
          </form>
        </div>
        <div className="mt-4">
          <TimeSlotPicker />
        </div>
      </div>
      <div className="md:col-span-1 space-y-5">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Selected Doctor Section */}
          <SelectedDoctorCard />
        </div>

        {/* Need Help Section */}
        <NeedHelp />
      </div>
    </div>
  );
};

export default ChooseTimeAndDate;
