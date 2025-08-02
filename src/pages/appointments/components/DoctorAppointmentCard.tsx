import { Calendar, Clock, MapPin, Star } from "lucide-react";
import React from "react";
import { Appointment } from "../../../types/global";

interface Props {
  data: Appointment;
}

const DoctorAppointmentCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm w-full hover:shadow-md transition bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Doctor Image */}
        <img
          src={data.imageUrl}
          alt={data.doctorName}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full"
        />

        {/* Doctor Info */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
            <h2 className="font-semibold text-lg">{data.doctorName}</h2>
            <button className="bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-md text-sm mt-2 sm:mt-0 hover:bg-green-200">
              Confirm
            </button>
          </div>

          <p className="text-[#1C3BA4] font-bold mt-1 text-sm">
            {data.department}
          </p>
          <p className="text-gray-600 text-sm">{data.visitType}</p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-2 text-sm text-gray-600">
            <div className="space-y-1">
              <div className="flex items-center font-bold gap-1">
                <Calendar className="text-gray-500" size={16} />
                {data.date}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="text-gray-500" size={16} />
                {data.room}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="text-gray-500" size={16} />
                {data.time}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} />
                {data.rating}
                <span className="text-gray-600 ml-1">
                  <span className="text-gray-300">|</span> {data.experience}{" "}
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
