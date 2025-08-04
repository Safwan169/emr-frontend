import React, { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedPatients, setSelectedPatients] = useState(new Set());

  const patientData = [
    {
      id: 1,
      patientId: "#9647",
      name: "Mashrukh Khan",
      gender: "Female",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Diabetes Type 2",
      status: "Confirmed",
      avatar: "MK",
    },
    {
      id: 2,
      patientId: "#9647",
      name: "Britto Chowdhury",
      gender: "Male",
      age: "41 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Migraine",
      status: "Confirmed",
      avatar: "BC",
    },
    {
      id: 3,
      patientId: "#9647",
      name: "Mohsin Khan",
      gender: "Male",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Heart Disease",
      status: "Improving",
      avatar: "MK",
    },
    {
      id: 4,
      patientId: "#9647",
      name: "Shadman Babu",
      gender: "Male",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Influenza",
      status: "Scheduled",
      avatar: "SB",
    },
    {
      id: 5,
      patientId: "#9647",
      name: "Mashrukh Khan",
      gender: "Female",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Heart Disease",
      status: "Confirmed",
      avatar: "MK",
    },
    {
      id: 6,
      patientId: "#9647",
      name: "Masud Rana",
      gender: "Male",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Influenza",
      status: "Scheduled",
      avatar: "MR",
    },
    {
      id: 7,
      patientId: "#9647",
      name: "Mashrukh Khan",
      gender: "Female",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Diabetes Type 2",
      status: "Scheduled",
      avatar: "MK",
    },
    {
      id: 8,
      patientId: "#9647",
      name: "Mashrukh Khan",
      gender: "Female",
      age: "18 Years",
      appointmentDate: "August 22, 2025 - 10:00 AM",
      condition: "Influenza",
      status: "Improving",
      avatar: "MK",
    },
  ];

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
      setSelectedPatients(new Set(patientData.map((p) => p.id)));
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

  const filteredPatients = patientData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Patient List
        </h2>

        {/* Search and Filter Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patient"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter</span>
            </button>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedPatients.size === patientData.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appointment Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient, index) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedPatients.has(patient.id)}
                    onChange={(e) =>
                      handleSelectPatient(patient.id, e.target.checked)
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {patient.patientId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(
                        patient.name
                      )} flex items-center justify-center text-white text-xs font-medium mr-3`}
                    >
                      {patient.avatar}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {patient.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {patient.appointmentDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {patient.condition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
