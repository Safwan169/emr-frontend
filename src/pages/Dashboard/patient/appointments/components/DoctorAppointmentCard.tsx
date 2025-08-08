import { Calendar, Clock, MapPin, Star } from "lucide-react";
import React from "react";
import { Appointment } from "../../../../../types/global";

interface Props {
  data: Appointment;
}

const DoctorAppointmentCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm w-full hover:shadow-md transition bg-white">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        {/* Doctor Image */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}${data.imageUrl}`}
            alt={data.doctorName}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>

        {/* Doctor Info */}
        <div className="w-full space-y-2">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
            <h2 className="font-semibold text-lg text-center sm:text-left">{data.doctorName}</h2>
            <button className="bg-green-100 text-green-600 font-semibold px-4 py-1 rounded-md text-sm hover:bg-green-200 w-max self-center sm:self-auto">
              Confirm
            </button>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-[#1C3BA4] font-bold text-sm">{data.department}</p>
            <p className="text-gray-600 text-sm">{data.visitType}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mt-2">
            <div className="space-y-1">
              <div className="flex items-center font-bold gap-1">
                <Calendar className="text-gray-500" size={16} />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="text-gray-500" size={16} />
                <span>{data.room}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="text-gray-500" size={16} />
                <span>{data.time}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} />
                <span>{data.rating}</span>
                <span className="text-gray-600 ml-1">
                  <span className="text-gray-300">|</span> {data.experience} Years
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
