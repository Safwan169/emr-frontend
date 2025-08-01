import { Check } from "lucide-react";

export default function AppointmentConfirmation() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
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
      <p className="text-gray-600 text-center mb-8">
        Your appointment has been successfully booked.
      </p>

      {/* Appointment Details */}
      <div className="bg-[#E2E9FF] rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Appointment Details
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-bold text-gray-700 mb-1">Doctor Name:</p>
            <p className="text-gray-900">Salil Chakma</p>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-1">Date:</p>
            <p className="text-gray-900">Thursday, July 31, 2025</p>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-1">Time:</p>
            <p className="text-gray-900">09:30 PM31</p>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-1">Type:</p>
            <p className="text-gray-900">Consultation</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-5">
        <button className="w-full bg-[#1C3BA4] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Book Another
        </button>

        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 border-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          View Appointment
        </button>
      </div>
    </div>
  );
}
