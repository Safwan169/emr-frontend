import {
  CalendarDays,
  FileText,
  FlaskConical,
  LogOut,
  Users,
  XCircle,
} from "lucide-react";
import Cleander from "./Cleander";
import { useGetPatientAppointmentsQuery } from "../../../../../redux/features/appoinment/appoinmentApi";
import { useEffect } from "react";
import { useGetUserPreviousLabReportQuery, useGetUserPreviousPrescreptionQuery } from "../../../../../redux/features/user/userApi";

const TotalVisit = () => {




  const {userId}=JSON.parse(localStorage.getItem('profileInfo')||'{}')

  const {data=[]}=useGetPatientAppointmentsQuery(userId)
const {data:patientData=[]}=useGetUserPreviousPrescreptionQuery(userId)
console.log(patientData,'patientData')
const {data:previousLabReport=[]}=useGetUserPreviousLabReportQuery(userId)
  console.log(previousLabReport,'previousLabReport')
  let cardData = [
    { title: "Total Appoinments", content: data?.length || 0, icon: Users },
    { title: "Previous Prescription", content: patientData?.total_previous_prescription || 0, icon: FileText },
    { title: "Upcoming Appointment", content: "0", icon: CalendarDays },
    { title: "Previous Lab Report", content: previousLabReport?.total_previous_lab_report
 || 0, icon: FlaskConical },
    
  ];
  console.log(data.length,'user appoinment')
  console.log(cardData[0],'cardData')

  return (
    <div className="flex flex-col xl:flex-row gap-3 w-full">
      {/* Left Section */}
      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-3">
        {cardData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl p-5  space-y-4  max-h-[160px]  bg-white "
            >
              {/* Title */}
              <h2 className="text-base   font-semibold text-gray-600 ">
                {card.title}
              </h2>

              {/* Icon and Value */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded-lg">
                  <Icon className="text-white w-4 h-4" />
                </div>
                <p className="text-gray-900 text-2xl font-bold">
                  {card.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

     
    </div>
  );
};

export default TotalVisit;
