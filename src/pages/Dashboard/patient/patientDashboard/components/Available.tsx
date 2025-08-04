// import { ChevronDown, Star } from "lucide-react";
// import React, { useState } from "react";

// interface Doctor {
//   name: string;
//   specialization: string;
//   address: string;
//   rating: number;
//   image: string;
// }

// const Available: React.FC = () => {
//   const [selectedSpeciality, setSelectedSpeciality] =
//     useState<string>("All Specialities");
//   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

//   const specialities: string[] = [
//     "All Specialities",
//     "Cardiologist",
//     "Dermatologist",
//     "Neurologist",
//     "Orthopedic",
//   ];

//   const doctors: Doctor[] = [
//     {
//       name: "Dr. Sarah Johnson",
//       specialization: "Cardiologist",
//       address: "Dhaka Medical, Dhaka",
//       rating: 4.5,
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       name: "Dr. Alex Carter",
//       specialization: "Dermatologist",
//       address: "Square Hospital, Dhaka",
//       rating: 4.8,
//       image: "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//     {
//       name: "Dr. Emily Brown",
//       specialization: "Neurologist",
//       address: "Apollo Hospital, Dhaka",
//       rating: 4.7,
//       image: "https://randomuser.me/api/portraits/women/47.jpg",
//     },
//     {
//       name: "Dr. James Wilson",
//       specialization: "Orthopedic",
//       address: "United Hospital, Dhaka",
//       rating: 4.6,
//       image: "https://randomuser.me/api/portraits/men/49.jpg",
//     },
//   ];

//   const filteredDoctors: Doctor[] =
//     selectedSpeciality === "All Specialities"
//       ? doctors
//       : doctors.filter((doc) => doc.specialization === selectedSpeciality);

//   return (
//     <div className="w-full max-w-4xl mx-auto rounded-2xl py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8  bg-white">
//       {/* Header with Dropdown */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
//           Available Doctors
//         </h1>

//         {/* Dropdown Button */}
//         <div className="relative w-full sm:w-auto min-w-[200px]">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-700"
//           >
//             <span className="truncate">{selectedSpeciality}</span>
//             <ChevronDown
//               size={16}
//               className={`ml-2 flex-shrink-0 transition-transform duration-200 ${
//                 dropdownOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {dropdownOpen && (
//             <ul className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-60 overflow-y-auto">
//               {specialities.map((item, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     setSelectedSpeciality(item);
//                     setDropdownOpen(false);
//                   }}
//                   className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 hover:text-blue-600 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Doctor Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 sm:gap-6">
//         {filteredDoctors.map((doc, index) => (
//           <div
//             key={index}
//             className="rounded-xl p-4 sm:p-5 bg-white border border-gray-200 flex flex-col"
//           >
//             {/* Doctor Header */}
//             <div className="flex items-start gap-4 mb-4">
//               {/* Profile Picture */}
//               <img
//                 src={doc.image}
//                 alt={doc.name}
//                 className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover flex-shrink-0 border-2 border-gray-100"
//               />

//               {/* Doctor Basic Info */}
//               <div className="flex-1 min-w-0">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
//                   {doc.name}
//                 </h2>
//                 <p className="text-blue-600 text-sm sm:text-base font-medium">
//                   {doc.specialization}
//                 </p>

//                 {/* Rating */}
//                 <div className="flex items-center mt-2">
//                   <div className="flex">
//                     {[...Array(1)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < Math.floor(doc.rating)
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                         fill={
//                           i < Math.floor(doc.rating) ? "currentColor" : "none"
//                         }
//                       />
//                     ))}
//                   </div>
//                   <span className="ml-2 text-sm text-gray-600 font-medium">
//                     {doc.rating}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="mb-4">
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 {doc.address}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 mt-auto">
//               <button className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium">
//                 Cancel
//               </button>
//               <button className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredDoctors.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-lg mb-2">No doctors found</div>
//           <div className="text-gray-500 text-sm">
//             Try selecting a different speciality
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Available;




import { ChevronDown, Star } from "lucide-react";
import React, { useState } from "react";

interface Doctor {
  name: string;
  specialization: string;
  address: string;
  rating: number;
  experience: number;
  image: string;
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

  const doctors: Doctor[] = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      address: "Dhaka Medical, Dhaka",
      rating: 4.5,
      experience: 10,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Alex Carter",
      specialization: "Dermatologist",
      address: "Square Hospital, Dhaka",
      rating: 4.8,
      experience: 8,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Dr. Emily Brown",
      specialization: "Neurologist",
      address: "Apollo Hospital, Dhaka",
      rating: 4.7,
      experience: 12,
      image: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      name: "Dr. James Wilson",
      specialization: "Orthopedic",
      address: "United Hospital, Dhaka",
      rating: 4.6,
      experience: 15,
      image: "https://randomuser.me/api/portraits/men/49.jpg",
    },
  ];

  const filteredDoctors: Doctor[] =
    selectedSpeciality === "All Specialities"
      ? doctors
      : doctors.filter((doc) => doc.specialization === selectedSpeciality);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 bg-white">
      {/* Header with Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
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
              className={`ml-2 flex-shrink-0 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredDoctors.map((doc, index) => (
          <div
            key={index}
            className="rounded-xl p-4 sm:p-5 bg-white border border-gray-200 flex flex-col"
          >
            {/* Doctor Header */}
            <div className="flex items-start gap-4 mb-4">
              {/* Profile Picture */}
              <img
                src={doc.image}
                alt={doc.name}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover flex-shrink-0 border-2 border-gray-100"
              />

              {/* Doctor Basic Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  {doc.name}
                </h2>
                <p className="text-blue-600 text-sm sm:text-base font-medium">
                  {doc.specialization}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed truncate">
                  {doc.address}
                </p>

                {/* Rating and experience line */}
                <div className="flex items-center gap-3 mt-1">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-sm text-gray-600 font-medium">
                    {doc.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {doc.experience} years 
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
      {filteredDoctors.length === 0 && (
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


