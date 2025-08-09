



import React, { useState } from "react";
import { Search, Filter, ChevronDown, Eye, MoreVertical } from "lucide-react";
import { useGetPatientsListQuery } from "../api/dashboardApi";

interface Patient {
  user_id: number;
  name: string;
  gender: string;
  age: number;
  appointment_date: string;
  condition: string;
  status: string;
}

interface PatientListProps {
  doctorId: string;
}

const PatientList: React.FC<PatientListProps> = ({ doctorId }) => {
  const { data: patients = [], isLoading, isError } = useGetPatientsListQuery(doctorId);

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Patient List</h2>

        {/* Search & Filter - Mobile First */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patient"
              className="w-full pl-10 pr-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center justify-center gap-2 px-3 py-2.5 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex-1 sm:flex-none">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter</span>
            </button>

            <div className="relative flex-1 sm:flex-none min-w-[120px]">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 md:py-2 pr-8 text-sm text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
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

      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : isError ? (
            <div className="p-4 text-center text-red-500">Failed to load patients</div>
          ) : (
            filteredPatients.map((patient, index) => (
              <div key={patient.user_id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                      checked={selectedPatients.has(patient.user_id)}
                      onChange={(e) => handleSelectPatient(patient.user_id, e.target.checked)}
                    />
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(patient.name)} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                      {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{patient.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <span>{patient.gender}</span>
                        <span>•</span>
                        <span>{patient.age || "N/A"} yrs</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
                
                <div className="mt-3 ml-13 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Condition:</span>
                    <span className="text-sm text-gray-900 font-medium">{patient.condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Appointment:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(patient.appointment_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block">
        {/* Tablet Optimized Scrollable Container */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 lg:px-4 py-3 text-left w-8">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedPatients.size === patients.length && patients.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-2 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">No</th>
                  <th className="px-2 lg:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px] md:min-w-[120px]">Patient</th>
                  <th className="px-2 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16 lg:w-20">Gender</th>
                  <th className="px-2 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12 lg:w-16">Age</th>
                  <th className="px-2 lg:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24 lg:w-32">Date</th>
                  <th className="px-2 lg:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] lg:min-w-[120px]">Condition</th>
                  <th className="px-2 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 lg:w-24">Status</th>
                  <th className="px-2 lg:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td className="px-2 lg:px-4 py-6 text-center text-gray-500" colSpan={9}>
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-sm">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td className="px-2 lg:px-4 py-6 text-center text-red-500 text-sm" colSpan={9}>
                      Failed to load patients
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td className="px-2 lg:px-4 py-6 text-center text-gray-500 text-sm" colSpan={9}>
                      No patients found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <tr key={patient.user_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 lg:px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedPatients.has(patient.user_id)}
                          onChange={(e) => handleSelectPatient(patient.user_id, e.target.checked)}
                        />
                      </td>
                      <td className="px-2 lg:px-3 py-3 text-xs lg:text-sm text-gray-900 font-medium">{index + 1}</td>
                      <td className="px-2 lg:px-4 py-3">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full ${getAvatarColor(patient.name)} flex items-center justify-center text-white text-xs font-medium mr-2 lg:mr-3 flex-shrink-0`}>
                            {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs lg:text-sm font-medium text-gray-900 truncate" title={patient.name}>
                              {patient.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 lg:px-3 py-3 text-xs lg:text-sm text-gray-600">
                        <span className="md:hidden">{patient.gender.charAt(0)}</span>
                        <span className="hidden md:inline">{patient.gender}</span>
                      </td>
                      <td className="px-2 lg:px-3 py-3 text-xs lg:text-sm text-gray-600">{patient.age || "N/A"}</td>
                      <td className="px-2 lg:px-4 py-3 text-xs lg:text-sm text-gray-600">
                        <div className="text-gray-900 font-medium">
                          {new Date(patient.appointment_date).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric"
                          })}
                        </div>
                        <div className="text-xs text-gray-500 hidden lg:block">
                          {new Date(patient.appointment_date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-2 lg:px-4 py-3">
                        <div className="text-xs lg:text-sm text-gray-900 truncate max-w-[80px] lg:max-w-[120px]" title={patient.condition}>
                          {patient.condition}
                        </div>
                      </td>
                      <td className="px-2 lg:px-3 py-3">
                        <span className={`inline-flex px-1.5 lg:px-2 py-0.5 lg:py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                          <span className="md:hidden">{patient.status.charAt(0)}</span>
                          <span className="hidden md:inline">{patient.status}</span>
                        </span>
                      </td>
                      <td className="px-2 lg:px-3 py-3">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye size={14} className="lg:w-4 lg:h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
