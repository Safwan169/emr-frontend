// import {
//   CalendarDays,
//   Clock,
//   IndianRupee,
//   Star,
//   Stethoscope,
// } from "lucide-react";
// import NeedHelp from "./components/NeedHelp";
// import SelectedDoctorCard from "./components/SelectedDoctorCard";
// import TimeSlotPicker from "./components/TimeSlotPicker";

// const AppointmentDetails = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-5">
//       <div className="md:col-span-2">
//         {/*  */}

//         <div className="mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">
//           <h3 className="text-gray-700 text-sm font-bold">
//             Available Time Slots
//           </h3>

//           {/* Doctor Info */}
//           <div className="flex items-center bg-blue-50 p-4 rounded-lg">
//             <img
//               src="https://randomuser.me/api/portraits/men/45.jpg"
//               alt="Doctor"
//               className="w-14 h-14 rounded-full object-cover mr-4"
//             />
//             <div>
//               <h4 className="text-md font-semibold text-gray-800">
//                 Dr. Salil Chakma
//               </h4>
//               <p className="text-sm text-blue-600">Orthopedic Surgery</p>
//               <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
//                 <Star className="w-4 h-4 text-yellow-500" />
//                 <span>4.7</span> • <span>15 Years Experience</span>
//               </div>
//             </div>
//           </div>

//           {/* Appointment Details */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
//               <CalendarDays className="text-blue-600 w-5 h-5 mt-1" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Monday, 26 July 2025
//                 </p>
//                 <p className="text-xs text-gray-500">Appointments Date</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
//               <Clock className="text-blue-600 w-5 h-5 mt-1" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   08:00 - 12:00 PM
//                 </p>
//                 <p className="text-xs text-gray-500">Appointments Time</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
//               <Stethoscope className="text-blue-600 w-5 h-5 mt-1" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Consultation
//                 </p>
//                 <p className="text-xs text-gray-500">Appointments Type</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
//               <IndianRupee className="text-blue-600 w-5 h-5 mt-1" />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">৳ 300.00</p>
//                 <p className="text-xs text-gray-500">Consultation Fee</p>
//               </div>
//             </div>
//           </div>

//           {/* Total */}
//           <div className="border-t pt-4 flex justify-between items-center">
//             <p className="text-sm font-semibold text-gray-800">Total Amount</p>
//             <p className="text-lg font-bold text-gray-800">৳ 300.00</p>
//           </div>
//           <p className="text-xs text-gray-500">
//             Lorem ipsum dolor sit amet consectetur. Cras id vitae consequat
//             ultrices.
//           </p>

//           {/* Button */}
//           <button className="w-full bg-[#1C3BA4] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
//             Confirm Appointment
//           </button>

//           {/* Footer text */}
//           <p className="text-center text-[11px] text-gray-500 mt-2">
//             By confirming, you agree to our terms and conditions. <br />
//             You will receive a confirmation email shortly.
//           </p>
//         </div>
//         <div className="mt-4">
//           <TimeSlotPicker />
//         </div>
//       </div>
//       <div className="md:col-span-1 space-y-5">
//         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
//           {/* Selected Doctor Section */}
//           <SelectedDoctorCard />
//         </div>

//         <div>
//           <div className="mx-auto bg-white rounded-xl shadow-md p-4">
//             <h3 className="text-gray-700 text-sm font-medium mb-4">
//               Selected Date & Time
//             </h3>

//             {/* Date Row */}
//             <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 mb-3">
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <CalendarDays className="text-blue-600 w-5 h-5" />
//               </div>
//               <p className="text-sm text-gray-700 font-medium">
//                 Thursday, July 31, 2025
//               </p>
//             </div>

//             {/* Time Row */}
//             <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <Clock className="text-blue-600 w-5 h-5" />
//               </div>
//               <p className="text-sm text-gray-700 font-medium">09:00 AM</p>
//             </div>
//           </div>
//         </div>

//         {/* Need Help Section */}
//         <NeedHelp />
//       </div>
//     </div>
//   );
// };

// export default AppointmentDetails;

import {
  CalendarDays,
  Clock,
  IndianRupee,
  Star,
  Stethoscope,
} from "lucide-react";
import NeedHelp from "./components/NeedHelp";
import SelectedDoctorCard from "./components/SelectedDoctorCard";
import TimeSlotPicker from "./components/TimeSlotPicker";

const AppointmentDetails = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-10 py-6">
      {/* Left Content */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
          <h3 className="text-gray-700 text-sm font-bold">
            Available Time Slots
          </h3>

          {/* Doctor Info */}
          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Doctor"
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="text-md font-semibold text-gray-800">
                Dr. Salil Chakma
              </h4>
              <p className="text-sm text-blue-600">Orthopedic Surgery</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.7</span> • <span>15 Years Experience</span>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
              <CalendarDays className="text-blue-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Monday, 26 July 2025
                </p>
                <p className="text-xs text-gray-500">Appointments Date</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
              <Clock className="text-blue-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  08:00 - 12:00 PM
                </p>
                <p className="text-xs text-gray-500">Appointments Time</p>
              </div>
            </div>

            {/* Type */}
            <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
              <Stethoscope className="text-blue-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Consultation
                </p>
                <p className="text-xs text-gray-500">Appointments Type</p>
              </div>
            </div>

            {/* Fee */}
            <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
              <IndianRupee className="text-blue-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">৳ 300.00</p>
                <p className="text-xs text-gray-500">Consultation Fee</p>
              </div>
            </div>
          </div>

          {/* Total & Confirm */}
          <div className="border-t pt-4 flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-800">Total Amount</p>
            <p className="text-lg font-bold text-gray-800">৳ 300.00</p>
          </div>
          <p className="text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Cras id vitae consequat
            ultrices.
          </p>

          <button className="w-full bg-[#1C3BA4] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
            Confirm Appointment
          </button>

          <p className="text-center text-[11px] text-gray-500 mt-2">
            By confirming, you agree to our terms and conditions. <br />
            You will receive a confirmation email shortly.
          </p>
        </div>

        {/* Time Slot Picker */}
        <div className="mt-4">
          <TimeSlotPicker />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="md:col-span-1 space-y-5">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <SelectedDoctorCard />
        </div>

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
              Thursday, July 31, 2025
            </p>
          </div>

          {/* Time Row */}
          <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="text-blue-600 w-5 h-5" />
            </div>
            <p className="text-sm text-gray-700 font-medium">09:00 AM</p>
          </div>
        </div>

        {/* Need Help */}
        <NeedHelp />
      </div>
    </div>
  );
};

export default AppointmentDetails;
