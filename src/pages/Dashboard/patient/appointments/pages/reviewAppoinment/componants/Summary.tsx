import {
  CalendarDays,
  Clock,
  IndianRupee,
  Star,
  Stethoscope,
} from "lucide-react";
import React from "react";
import { useAppSelector } from "../../../../../../../redux/hooks";
import { useBookAppointmentMutation } from "../../../../../../../redux/features/appoinment/appoinmentApi";
import { useNavigate } from "react-router-dom";

const Summary: React.FC = () => {
  const { selectedDoctor, appointmentDetails } = useAppSelector(
    (state) => state.booking
  );

  const {userId} = JSON.parse(localStorage.getItem('profileInfo') || '{}');
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "Select a date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleConfirm = async () => {
    console.log("Selected Doctor:", selectedDoctor);

    if (!selectedDoctor?.slotId || !selectedDoctor?.id) {
      alert("Please select a slot and doctor before confirming.");
      return;
    }

    const payload = {
      slot_id: Number(selectedDoctor.slotId),
      doctor_id: Number(selectedDoctor.id),
      notes: appointmentDetails?.reason || "",
    };


    console.log("Booking Payload:", payload);

    try {

 await bookAppointment({
      patientId: userId,
      slotData: payload,
    }).unwrap();
        navigate("/confirm-appointment"); // ✅ Navigate after success
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="md:col-span-2 mt-2 space-y-6">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
        <h3 className="text-gray-700 text-sm font-bold">
          Appointment Summary
        </h3>

        {/* Doctor Info */}
        <div className="flex items-center bg-blue-50 p-4 rounded-lg">
          <img
            src={selectedDoctor?.imageUrl}
            alt={selectedDoctor?.name || "Doctor"}
            className="w-14 h-14 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="text-md font-semibold text-gray-800">
              {selectedDoctor?.name || "Doctor Name"}
            </h4>
            <p className="text-sm text-blue-600">
              {selectedDoctor?.specialty || "Specialty"}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{selectedDoctor?.rating || "-"}</span> •
              <span>{selectedDoctor?.experience || "-"} Experience</span>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Date */}
          <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
            <CalendarDays className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {selectedDoctor?.date
                  ? formatDate(selectedDoctor.date)
                  : "Not selected"}
              </p>
              <p className="text-xs text-gray-500">Appointment Date</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
            <Clock className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {selectedDoctor?.timeSlot || "Not selected"}
              </p>
              <p className="text-xs text-gray-500">Appointment Time</p>
            </div>
          </div>

          {/* Type */}
          <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
            <Stethoscope className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {appointmentDetails?.appointmentType || "Not selected"}
              </p>
              <p className="text-xs text-gray-500">Appointment Type</p>
            </div>
          </div>

          {/* Fee */}
          <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
            <IndianRupee className="text-blue-600 w-5 h-5 mt-1" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                ৳ {selectedDoctor?.fee?.toFixed(2) || "0.00"}
              </p>
              <p className="text-xs text-gray-500">Consultation Fee</p>
            </div>
          </div>
        </div>

        {/* Total & Confirm */}
        <div className="border-t pt-4 flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-800">Total Amount</p>
          <p className="text-lg font-bold text-gray-800">
            ৳ {selectedDoctor?.fee?.toFixed(2) || "0.00"}
          </p>
        </div>

        <p className="text-xs text-gray-500">
          Please review the details carefully before confirming. Once confirmed,
          you will receive an email and SMS confirmation with your appointment
          details.
        </p>

        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-[#1C3BA4] mt-3 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {isLoading ? "Confirming..." : "Confirm Appointment"}
        </button>

        <p className="text-center text-[11px] text-gray-500 mt-2">
          By confirming, you agree to our terms and conditions. Payment is due
          at the time of consultation.
        </p>
      </div>
    </div>
  );
};

export default Summary;
