import React, { useState, ChangeEvent } from "react";
import { Eye, Pencil, Trash2, Search } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  ageGender: string;
  contact: string;
  email: string;
  doctor: string;
  condition: string;
  status: keyof typeof statusColors;
  image: string;
}

const initialPatients: Patient[] = [
  {
    id: "#9647",
    name: "Mashrukh Khan",
    ageGender: "28 Years, Female",
    contact: "+1-234-567-8901",
    email: "emily.davis@email.com",
    doctor: "Dr. Smith",
    condition: "Hypertension",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "#9648",
    name: "Mashrukh Khan",
    ageGender: "28 Years, Female",
    contact: "+1-234-567-8901",
    email: "emily.davis@email.com",
    doctor: "Dr. Smith",
    condition: "Diabetes Type 2",
    status: "Follow-up",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "#9649",
    name: "Mashrukh Khan",
    ageGender: "28 Years, Female",
    contact: "+1-234-567-8901",
    email: "emily.davis@email.com",
    doctor: "Dr. Smith",
    condition: "Knee Replacement Recovery",
    status: "In Treatment",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-600",
  "Follow-up": "bg-orange-100 text-orange-600",
  "In Treatment": "bg-blue-100 text-blue-600",
  Recovered: "bg-gray-100 text-gray-600",
  Critical: "bg-red-100 text-red-600",
} as const;

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<keyof typeof statusColors | "All">("All");

  const handleDelete = (index: number) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as keyof typeof statusColors | "All");
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-gray-800 mb-3">Patient List</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
        <div className="flex items-center w-full sm:w-64 border border-gray-200 rounded-md px-3 py-2 bg-gray-50">
          <Search className="text-gray-500 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="w-full sm:w-48 border border-gray-200 px-3 py-2 rounded-md bg-gray-50 cursor-pointer text-sm"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Follow-up">Follow-up</option>
          <option value="In Treatment">In Treatment</option>
          <option value="Recovered">Recovered</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-blue-50 text-gray-700 text-sm border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">SL</th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">ID</th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">Patient Name</th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">Contact</th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">Assigned Doctor</th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">Condition</th>
              <th className="py-3 px-4 text-left font-semibold border-r border-gray-200">Status</th>
              <th className="py-3 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <React.Fragment key={patient.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-r border-gray-200">{index + 1}</td>
                    <td className="py-3 px-4 border-r border-gray-200">{patient.id}</td>
                    <td className="py-3 px-4 flex items-center gap-3 border-r border-gray-200">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.ageGender}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 border-r border-gray-200">
                      <p>{patient.contact}</p>
                      <p className="text-xs text-gray-500">{patient.email}</p>
                    </td>
                    <td className="py-3 px-4 border-r border-gray-200">{patient.doctor}</td>
                    <td className="py-3 px-4 border-r border-gray-200">{patient.condition}</td>
                    <td className="py-3 px-4 border-r border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[patient.status]}`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-3 text-gray-600">
                      <button className="hover:text-blue-600" aria-label={`View ${patient.name}`}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="hover:text-yellow-600" aria-label={`Edit ${patient.name}`}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="hover:text-red-600"
                        aria-label={`Delete ${patient.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {index !== filteredPatients.length - 1 && (
                    <tr>
                      <td colSpan={8} className="border-b border-gray-200"></td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400 italic">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => (
            <div
              key={patient.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={patient.image}
                  alt={patient.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.ageGender}</p>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">ID: </span> {patient.id}
                </p>
                <p>
                  <span className="font-medium">Contact: </span> {patient.contact}
                </p>
                <p>
                  <span className="font-medium">Email: </span> {patient.email}
                </p>
                <p>
                  <span className="font-medium">Doctor: </span> {patient.doctor}
                </p>
                <p>
                  <span className="font-medium">Condition: </span> {patient.condition}
                </p>
                <p>
                  <span className="font-medium">Status: </span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}
                  >
                    {patient.status}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex gap-5 text-gray-600 justify-end">
                <button className="hover:text-blue-600" aria-label="View patient">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="hover:text-yellow-600" aria-label="Edit patient">
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="hover:text-red-600"
                  aria-label="Delete patient"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-400 italic">No patients found</p>
        )}
      </div>
    </div>
  );
};

export default PatientList;
