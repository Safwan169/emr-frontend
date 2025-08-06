import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../redux/hooks";

export default function AppointmentConfirmation() {
  const { selectedDoctor, appointmentDetails } = useAppSelector((state) => state.booking);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not selected";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // Thursday
      day: "numeric",  // 31
      month: "long",   // July
      year: "numeric"  // 2025
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-5 rounded-lg shadow-lg">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#1C3BA4] rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
        Appointment Confirmed!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-800 text-center mb-8">
        Your appointment has been successfully booked.
      </p>

      {/* Appointment Details */}
      <div className="bg-[#E2E9FF] rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Appointment Details
        </h2>

        <div className="grid grid-cols-2 text-[16px] gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[16px] font-bold text-gray-700">Doctor Name:</p>
            <p className="text-[16px] font-normal text-gray-900">
              {selectedDoctor?.name || "Not selected"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-700">Date:</p>
            <p className="text-gray-900">
              {selectedDoctor?.date ? formatDate(selectedDoctor.date) : "Not selected"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-700">Time:</p>
            <p className="text-gray-900">{selectedDoctor?.timeSlot || "Not selected"}</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-700">Type:</p>
            <p className="text-gray-900">
              {appointmentDetails.appointmentType || "Not selected"}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-5 font-semibold">
        <Link
          to={"/appointments"}
          className="w-full text-center bg-[#1C3BA4] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Another
        </Link>

        <Link
          to={"/"}
          className="w-full bg-gray-100 text-center text-gray-700 py-3 px-4 border-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          View Appointment
        </Link>
      </div>
    </div>
  );
}
