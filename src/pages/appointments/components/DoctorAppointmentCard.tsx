import React from "react";
import { FaStar, FaClock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Appointment } from "../../../types/global";
import { Calendar, Clock, MapPin, Star } from "lucide-react";

interface Props {
  data: Appointment;
}

const DoctorAppointmentCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm flex items-start gap-4 justify-between w-full hover:shadow-md transition">
      <div className="flex w-full  gap-4">
        <img
          src={data.imageUrl}
          alt={data.doctorName}
          className="w-24 h-24 object-cover   rounded-full "
        />
        <div className="w-full">
          <div className="flex justify-between items-center w-full border-b border-gray-200 pb-2">

            <h2 className="font-semibold text-lg">{data.doctorName}</h2>
            <button className="bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-md text-sm hover:bg-green-200">
              Confirm
            </button>
          </div>
          <p className="text-[#1C3BA4] font-bold mt-1 text-sm">{data.department}</p>
          <p className="text-gray-600 text-sm">{data.visitType}</p>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
            <div className="space-y-1">
              <div className="flex items-center font-bold gap-1">
                <Calendar className="text-gray-500" />
                {data.date}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="text-gray-500" />
                {data.room}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="text-gray-500" />
                {data.time}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} />
                {data.rating}
                <span className="text-gray-600 ml-1"><span className="text-gray-300">|</span> {data.experience} Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DoctorAppointmentCard;
