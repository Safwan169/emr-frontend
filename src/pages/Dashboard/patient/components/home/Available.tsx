import React, { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

interface Doctor {
  name: string;
  specialization: string;
  address: string;
  rating: number;
  image: string;
}

const Available: React.FC = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("All Specialities");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const specialities: string[] = [
    "All Specialities",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
  ];

  const doctors: Doctor[] = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      address: "Dhaka Medical, Dhaka",
      rating: 4.5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Alex Carter",
      specialization: "Dermatologist",
      address: "Square Hospital, Dhaka",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Dr. Emily Brown",
      specialization: "Neurologist",
      address: "Apollo Hospital, Dhaka",
      rating: 4.7,
      image: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      name: "Dr. James Wilson",
      specialization: "Orthopedic",
      address: "United Hospital, Dhaka",
      rating: 4.6,
      image: "https://randomuser.me/api/portraits/men/49.jpg",
    },
  ];

  const filteredDoctors: Doctor[] =
    selectedSpeciality === "All Specialities"
      ? doctors
      : doctors.filter((doc) => doc.specialization === selectedSpeciality);

  return (
    <div className="w-full lg:w-1/2 rounded-2xl py-5 px-5 shadow-2xl">
      {/* Header with Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h1 className="text-xl font-bold">Available Doctors</h1>

        {/* Dropdown Button */}
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between sm:justify-center w-full sm:w-auto gap-2 px-4 py-2 rounded-lg bg-gray-300 shadow hover:bg-gray-100"
          >
            {selectedSpeciality}
            <ChevronDown size={16} />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-full sm:w-40 bg-white rounded-lg shadow-lg z-10">
              {specialities.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedSpeciality(item);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredDoctors.map((doc, index) => (
          <div
            key={index}
            className="rounded-xl p-4 bg-white shadow-2xl flex flex-col sm:flex-row items-start gap-4"
          >
            {/* Profile Picture */}
            <img
              src={doc.image}
              alt={doc.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* Doctor Info */}
            <div className="flex flex-col flex-1 w-full">
              <h2 className="text-lg font-semibold">{doc.name}</h2>
              <p className="text-gray-600 text-sm">{doc.specialization}</p>

              {/* Rating */}
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(doc.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < Math.floor(doc.rating) ? "yellow" : "none"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{doc.rating}</span>
              </div>

              <p className="text-gray-500 text-xs mt-1">{doc.address}</p>

              {/* Buttons - Always Left & Bigger */}
              <div className="flex gap-4 mt-4">
                <button className="px-6 py-2 rounded-lg bg-gray-300 text-blue-600 hover:bg-gray-400">
                  Cancel
                </button>
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Available;
