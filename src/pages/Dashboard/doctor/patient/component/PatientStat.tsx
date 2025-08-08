// import React, { useState } from "react";
// import { Search, Filter, ChevronDown, Eye, Edit } from "lucide-react";
// import { useGetPatientsListQuery } from "../../dashboard/api/dashboardApi";

// interface Patient {
//   user_id: number;
//   name: string;
//   gender: string;
//   age: number;
//   appointment_date: string;
//   condition: string;
//   status: string;
// }



// const PatientStat: React.FC = () => {
//   const {userId}=JSON.parse(localStorage.getItem("profileInfo")||"{}")
//   const { data: patients = [], isLoading, isError } = useGetPatientsListQuery(userId);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("Status");
//   const [selectedPatients, setSelectedPatients] = useState(new Set<number>());

//   const getStatusColor = (status: string): string => {
//     switch (status.toLowerCase()) {
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       case "scheduled":
//         return "bg-blue-100 text-blue-800";
//       case "improving":
//         return "bg-orange-100 text-orange-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAvatarColor = (name: string): string => {
//     const colors = [
//       "bg-purple-500",
//       "bg-blue-500",
//       "bg-green-500",
//       "bg-orange-500",
//       "bg-pink-500",
//       "bg-indigo-500",
//     ];
//     const index = name.length % colors.length;
//     return colors[index];
//   };

//   const handleSelectAll = (checked: boolean): void => {
//     if (checked) {
//       setSelectedPatients(new Set(patients.map((p) => p.user_id)));
//     } else {
//       setSelectedPatients(new Set());
//     }
//   };

//   const handleSelectPatient = (patientId: number, checked: boolean): void => {
//     const newSelected = new Set(selectedPatients);
//     if (checked) {
//       newSelected.add(patientId);
//     } else {
//       newSelected.delete(patientId);
//     }
//     setSelectedPatients(newSelected);
//   };

//   const filteredPatients = patients.filter((patient) => {
//     const matchesSearch =
//       patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       selectedStatus === "Status" ||
//       patient.status.toLowerCase() === selectedStatus.toLowerCase();
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient List</h2>

//         {/* Search & Filter */}
//         <div className="flex items-center justify-between gap-4">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search patient"
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <Filter className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-600">Filter</span>
//             </button>

//             <div className="relative">
//               <select
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//               >
//                 <option>Status</option>
//                 <option>Confirmed</option>
//                 <option>Scheduled</option>
//                 <option>Improving</option>
//               </select>
//               <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-6 py-3 text-left">
//                 <input
//                   type="checkbox"
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   checked={selectedPatients.size === patients.length}
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                 />
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {isLoading ? (
//               <tr><td className="px-6 py-4" colSpan={9}>Loading...</td></tr>
//             ) : isError ? (
//               <tr><td className="px-6 py-4 text-red-500" colSpan={9}>Failed to load patients</td></tr>
//             ) : (
//               filteredPatients.map((patient, index) => (
//                 <tr key={patient.user_id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       checked={selectedPatients.has(patient.user_id)}
//                       onChange={(e) => handleSelectPatient(patient.user_id, e.target.checked)}
//                     />
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className={`w-8 h-8 rounded-full ${getAvatarColor(patient.name)} flex items-center justify-center text-white text-xs font-medium mr-3`}>
//                         {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
//                       </div>
//                       <div className="text-sm font-medium text-gray-900">
//                         {patient.name}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{patient.age || "N/A"}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {new Date(patient.appointment_date).toLocaleString("en-US", {
//                       dateStyle: "medium",
//                       timeStyle: "short",
//                     })}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{patient.condition}</td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
//                       {patient.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-3">
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <Eye className="w-5 h-5" />
//                       </button>
//                       <button className="text-green-600 hover:text-green-800">
//                         <Edit className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PatientStat;


import React, { useState } from "react";
import { Search, Filter, ChevronDown, Eye, Edit, MoreVertical } from "lucide-react";
import { useGetPatientsListQuery } from "../../dashboard/api/dashboardApi";

interface Patient {
  user_id: number;
  name: string;
  gender: string;
  age: number;
  appointment_date: string;
  condition: string;
  status: string;
}

const PatientStat: React.FC = () => {
  const {userId}=JSON.parse(localStorage.getItem("profileInfo")||"{}")
  const { data: patients = [], isLoading, isError } = useGetPatientsListQuery(userId);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedPatients, setSelectedPatients] = useState(new Set<number>());

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "improving":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedPatients(new Set(patients.map((p) => p.user_id)));
    } else {
      setSelectedPatients(new Set());
    }
  };

  const handleSelectPatient = (patientId: number, checked: boolean): void => {
    const newSelected = new Set(selectedPatients);
    if (checked) {
      newSelected.add(patientId);
    } else {
      newSelected.delete(patientId);
    }
    setSelectedPatients(newSelected);
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "Status" ||
      patient.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Mobile Card Component
  const PatientCard = ({ patient, index }: { patient: Patient; index: number }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
            checked={selectedPatients.has(patient.user_id)}
            onChange={(e) => handleSelectPatient(patient.user_id, e.target.checked)}
          />
          <div className={`w-10 h-10 rounded-full ${getAvatarColor(patient.name)} flex items-center justify-center text-white text-sm font-medium`}>
            {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
            <p className="text-xs text-gray-500">#{index + 1}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-800 p-1">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800 p-1">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-gray-500 block">Gender</span>
          <span className="text-gray-900">{patient.gender}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Age</span>
          <span className="text-gray-900">{patient.age || "N/A"}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Condition</span>
          <span className="text-gray-900 truncate">{patient.condition}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Status</span>
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
            {patient.status}
          </span>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <span className="text-gray-500 text-xs block">Appointment</span>
        <span className="text-gray-900 text-sm">
          {new Date(patient.appointment_date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Patient List</h2>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patient"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 hidden xs:inline">Filter</span>
            </button>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-xs sm:text-sm text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[80px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>Status</option>
                <option>Confirmed</option>
                <option>Scheduled</option>
                <option>Improving</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      )}
      
      {isError && (
        <div className="p-6 text-center text-red-500">Failed to load patients</div>
      )}

      {/* Mobile View (Cards) - Hidden on tablet and desktop */}
      <div className="block md:hidden">
        {!isLoading && !isError && (
          <>
            {/* Select All for Mobile */}
            <div className="p-4 border-b border-gray-200 flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                checked={selectedPatients.size === patients.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
            
            <div className="p-4 space-y-3">
              {filteredPatients.map((patient, index) => (
                <PatientCard key={patient.user_id} patient={patient} index={index} />
              ))}
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">No patients found</div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Tablet and Desktop View (Table) */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedPatients.size === patients.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Gender</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Age</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Condition</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!isLoading && !isError && filteredPatients.map((patient, index) => (
                <tr key={patient.user_id} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedPatients.has(patient.user_id)}
                      onChange={(e) => handleSelectPatient(patient.user_id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(patient.name)} flex items-center justify-center text-white text-xs font-medium mr-3`}>
                        {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </div>
                        {/* Show additional info on tablet when columns are hidden */}
                        <div className="lg:hidden text-xs text-gray-500">
                          {patient.gender} • {patient.age || "N/A"} years
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{patient.gender}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{patient.age || "N/A"}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-600">
                    <div className="xl:hidden">
                      {new Date(patient.appointment_date).toLocaleDateString("en-US", { dateStyle: "short" })}
                    </div>
                    <div className="hidden xl:block">
                      {new Date(patient.appointment_date).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    <div className="max-w-32 truncate" title={patient.condition}>
                      {patient.condition}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                    {/* Show condition on smaller screens */}
                    <div className="xl:hidden text-xs text-gray-500 mt-1 truncate max-w-24" title={patient.condition}>
                      {patient.condition}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && !isError && filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 lg:px-6 py-8 text-center text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientStat;