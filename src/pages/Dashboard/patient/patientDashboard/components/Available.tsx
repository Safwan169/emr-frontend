




import { ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";
import { useGetAllDoctorsQuery } from "../../../../../redux/features/doctor/doctorApi";

interface Doctor {
  specialization: string;
  address: string;
  rating: number;
  years_of_experience: number;
  user: {
    first_name: string;
    last_name: string;
    profile_image: {
      file_URL: string;
    };
    address: string;
  }
}

const Available: React.FC = () => {
  const [selectedSpeciality, setSelectedSpeciality] =
    useState<string>("All Specialities");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const specialities: string[] = [
    "All Specialities",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
  ];

 

  const { data = [] } = useGetAllDoctorsQuery(null)
  // Doctor[]
  const filteredDoctors: Doctor[] =
    selectedSpeciality === "All Specialities"
      ? data.data
      : data?.data.filter((doc: any) => doc.specialization === selectedSpeciality);

  console.log(data, "doctors", filteredDoctors)

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg p-4 bg-white">
      {/* Header with Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl 2xl:text-2xl  font-bold text-gray-800">
          Available Doctors
        </h1>

        {/* Dropdown Button */}
        <div className="relative w-full sm:w-auto min-w-[200px]">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-700"
          >
            <span className="truncate">{selectedSpeciality}</span>
            <ChevronDown
              size={16}
              className={`ml-2 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-60 overflow-y-auto">
              {specialities.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedSpeciality(item);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 hover:text-blue-600 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 sm:gap-6">
        {filteredDoctors?.map((doc, index) => (
          <div
            key={index}
            className="rounded-xl p-4 sm:p-5 bg-white border border-gray-200 flex flex-col"
          >
            {/* Doctor Header */}
            <div className="flex items-start gap-4 mb-4">
              {/* Profile Picture */}
              <img
                src={
                  doc?.user?.profile_image?.file_URL
                    ? `${process.env.REACT_APP_API_BASE_URL}${doc.user.profile_image.file_URL}`
                    : '/profile.jpg'
                }
                alt={doc?.user?.first_name || 'User'}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover flex-shrink-0 border-2 border-gray-100"
              />


              {/* Doctor Basic Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  {doc.user.first_name} {doc.user.last_name}
                </h2>
                <p className="text-blue-600 text-sm sm:text-base font-medium">
                  {doc.specialization}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed truncate">
                  {doc.user.address}
                </p>

                {/* Rating and experience line */}
                <div className="flex items-center gap-3 mt-1">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-sm text-gray-600 font-medium">
                    {doc.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {doc.years_of_experience} years
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-gray-200  text-blue-900 text-sm font-bold">
                Details
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-blue-900 text-white  text-sm font-bold ">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No doctors found</div>
          <div className="text-gray-500 text-sm">
            Try selecting a different speciality
          </div>
        </div>
      )}
    </div>
  );
};

export default Available;


