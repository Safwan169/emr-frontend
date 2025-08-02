import { useState } from "react";
import { Link } from "react-router-dom";


const DetailForm = () => {
  const [appointmentType, setAppointmentType] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Appointment Type:", appointmentType);
    console.log("Reason:", reason);
  };

  return (
    <div className="  w-full mt-3 ">
      <div className="md:col-span-2">
        <div className=" mx-auto  p-4 bg-white rounded-[16px]   ">
          <h2 className="text-lg font-bold mb-4">Appointment Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4 border border-gray-100/70 rounded-2xl p-4 ">
            <div className="space-y-3">
              <label className="block text-base font-bold text-[16px] ">
                Appointment Types <span className="text-red-500">*</span>
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full border border-gray-200/70 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Appointment types</option>
                <option value="consultation">Consultation</option>
                <option value="followup">Follow-up</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-[16px] font-bold mb-1">
                Reason for Visits{" "}
                <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter your reason"
                className="w-full border border-gray-200/70 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Link to={'/new-appointment/reviewAppointment'}>


              <button
                type="submit"
                className="w-full bg-[#1C3BA4] font-bold text-white py-2 rounded-md hover:bg-blue-800 transition"
              >
                Continue
              </button>
            </Link>
          </form>
        </div>
        <div className="mt-4">
        </div>
      </div>

    </div>
  );
};

export default DetailForm;
