import React, { useState } from "react";
import { Eye, Edit, Download, FileText } from "lucide-react";

interface RecordItem {
  id: string;
  date: string;
  status: "completed" | "pending" | "canceled";
  type: string;
  patient: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

const MedRec: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const records: RecordItem[] = [
    {
      id: "MR-001",
      date: "August 22, 2025",
      status: "completed",
      type: "Consultation",
      patient: "Sarah Johnson",
      doctor: "Dr. Smith",
      diagnosis: "Hypertension",
      prescription: "Lisinopril 10mg daily",
      notes:
        "Patient showing good response to medication. Blood pressure stable. Continue low-sodium diet and moderate exercise. Next checkup in 3 months.",
    },
    {
      id: "MR-002",
      date: "August 15, 2025",
      status: "completed",
      type: "Consultation",
      patient: "John Doe",
      doctor: "Dr. Watson",
      diagnosis: "Diabetes",
      prescription: "Metformin 500mg twice daily",
      notes:
        "Blood sugar under control. Continue same dosage and regular exercise. Monitor diet and check sugar levels weekly.",
    },
    {
      id: "MR-003",
      date: "August 10, 2025",
      status: "pending",
      type: "Follow-up",
      patient: "Emily Carter",
      doctor: "Dr. Brown",
      diagnosis: "Asthma",
      prescription: "Inhaler as needed",
      notes:
        "Patient experiences mild wheezing at night. Keep bedroom dust-free and avoid cold triggers. Schedule pulmonary test next visit.",
    },
  ];

  const statusColors: Record<RecordItem["status"], string> = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <div className="w-full p-5">
      {/* Top Bar */}
      <div className="mb-5 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 bg-gray-50 rounded-lg">
        {/* Left Section - Title + Search */}
        <div className="w-full md:w-72 flex flex-col gap-2">
          <h2 className="font-bold text-gray-800 text-lg">Medical Record</h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-12 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right Section - Dropdown + Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto justify-end">
          <select className="border border-gray-200 w-full sm:w-40 h-12 rounded-md px-3 text-gray-700 bg-white focus:outline-none">
            <option>All Types</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Follow-up</option>
          </select>

          <button className="px-3 py-2 bg-blue-900 text-white rounded-md w-full sm:w-auto hover:bg-blue-800 transition">
            + New Record
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {records.map((rec, index) => (
          <div
            key={rec.id}
            className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-800" />
                  <span className="font-semibold">{rec.id}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{rec.date}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium capitalize ${statusColors[rec.status]}`}
                >
                  {rec.status}
                </span>
                <span className="px-2 py-1 text-xs rounded-md font-medium bg-gray-100 text-gray-700">
                  {rec.type}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Patient</p>
                <p className="font-medium">{rec.patient}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Doctor</p>
                <p className="font-medium">{rec.doctor}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Diagnosis</p>
                <p className="font-medium">{rec.diagnosis}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Prescription</p>
                <p className="font-medium break-words">{rec.prescription}</p>
              </div>
            </div>

            {/* Notes with Show More */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Notes</p>
              <p
                className={`text-gray-700 transition-all ${
                  expanded === index ? "" : "line-clamp-2"
                }`}
              >
                {rec.notes}
              </p>
              {rec.notes.length > 80 && (
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-blue-600 text-xs mt-1 hover:underline"
                >
                  {expanded === index ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            {/* Actions - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                <Eye className="w-4 h-4" /> View Details
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200">
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedRec;
