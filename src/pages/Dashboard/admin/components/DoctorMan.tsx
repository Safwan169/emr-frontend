import React, { useState, ChangeEvent } from "react";
import { Search, Star, Mail, Phone, Users, Pencil } from "lucide-react";

interface Doctor {
  name: string;
  specialization: string;
  status: string;
  rating: number;
  experience: number;
  patients: number;
  email: string;
  phone: string;
  image: string;
}

const DoctorMan: React.FC = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("All Specialities");

  const specialities: string[] = [
    "All Specialities",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
  ];

  const doctors: Doctor[] = [
    {
      name: "Dr. Salil Chakma",
      specialization: "Orthopedic Surgery",
      status: "On leave",
      rating: 4.7,
      experience: 15,
      patients: 157,
      email: "sarah.johnson@starsmartz.net",
      phone: "+0000000000000",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Salil Chakma",
      specialization: "Orthopedic Surgery",
      status: "On leave",
      rating: 4.7,
      experience: 15,
      patients: 157,
      email: "sarah.johnson@starsmartz.net",
      phone: "+0000000000000",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Salil Chakma",
      specialization: "Orthopedic Surgery",
      status: "On leave",
      rating: 4.7,
      experience: 15,
      patients: 157,
      email: "sarah.johnson@starsmartz.net",
      phone: "+0000000000000",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const filteredDoctors: Doctor[] =
    selectedSpeciality === "All Specialities"
      ? doctors
      : doctors.filter((doc) => doc.specialization === selectedSpeciality);

  const availableCount = doctors.filter((doc) => doc.status === "Available").length;
  const busyCount = doctors.filter((doc) => doc.status === "Busy").length;
  const leaveCount = doctors.filter((doc) => doc.status === "On leave").length;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpeciality(e.target.value);
  };

  return (
    <div className="w-full h-auto py-5 px-3 sm:px-5">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800 mb-4">Doctor Management</h1>

      {/* Search & Filter Bar */}
      <div className="w-full py-5 px-4  bg-white ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
          {/* Search Bar + Status Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="flex items-center border border-gray-200 w-full sm:w-64 rounded-md px-3 py-2 bg-gray-50">
              <Search className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Dynamic Status Info */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="text-green-700 font-bold">
                {availableCount} Doctors Available
              </span>
              <span className="text-yellow-500 font-bold">
                {busyCount} Doctors Busy
              </span>
              <span className="text-red-500 font-bold">
                {leaveCount} Doctors On Leave
              </span>
            </div>
          </div>

          {/* Speciality Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={selectedSpeciality}
              onChange={handleSelectChange}
              className="w-full border border-gray-200  px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {specialities.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctor List Cards */}
      <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map((doc, index) => (
          <div
            key={index}
            className="w-full rounded-xl p-5 bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-start gap-4"
          >
            {/* Profile Image */}
            <img
              src={doc.image}
              alt={doc.name}
              className="w-16 h-16 rounded-full object-cover  mx-auto sm:mx-0"
            />

            {/* Details Section */}
            <div className="flex flex-col flex-1 text-center sm:text-left">
              {/* Name + Status */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                <div>
                  <h2 className="text-base font-bold text-gray-900">{doc.name}</h2>
                  <p className="text-xs font-semibold text-blue-900">{doc.specialization}</p>
                </div>
                {doc.status && (
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium self-center sm:self-auto ${
                      doc.status === "On leave"
                        ? "bg-red-100 text-red-600"
                        : doc.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                )}
              </div>

              {/* Info Section */}
              <div className="flex justify-center sm:justify-start items-center gap-2 text-sm text-gray-600 mb-1">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span>{doc.rating}</span>
                <span className="text-gray-400">|</span>
                <span>{doc.experience} Years Exp.</span>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap-2 text-sm text-gray-600 mb-1">
                <Users className="w-4 h-4" />
                <span>{doc.patients} Patients</span>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap-2 text-sm text-gray-600 mb-1 break-all">
                <Mail className="w-4 h-4" />
                <span>{doc.email}</span>
              </div>
              <div className="flex justify-center sm:justify-start items-center gap-2 text-sm text-gray-600 mb-3 break-all">
                <Phone className="w-4 h-4" />
                <span>{doc.phone}</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button className="flex-1 px-4 py-2 rounded-md bg-blue-900 text-white text-xs font-semibold">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 flex items-center justify-center gap-1">
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredDoctors.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No doctors found</div>
            <div className="text-gray-500 text-sm">
              Try selecting a different speciality
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorMan;
