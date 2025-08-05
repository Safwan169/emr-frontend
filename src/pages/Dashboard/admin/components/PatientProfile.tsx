import React from "react";
import { X, Eye, Download, Printer } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: string;
  gender: string;
  reason: string;
  dateTime: string;
  email: string;
  phone: string;
  insurance: string;
  insuranceId: string;
}

interface History {
  condition: string;
  status: string;
  details: string[];
}

interface Report {
  testName: string;
  date: string;
  details: string[];
}

interface Prescription {
  name: string;
  date: string;
  notes: string[];
}

const PatientProfile: React.FC = () => {
  const patient: Patient = {
    id: "#35534635",
    name: "Salil Chakma",
    age: "99 Years",
    gender: "Male",
    reason: "Blood pressure check and medication review",
    dateTime: "2025-01-16 at 09:00",
    email: "salil.chakma@example.com",
    phone: "+880 1234-567890",
    insurance: "HealthPlus Gold",
    insuranceId: "HPG-987654321",
  };

  const histories: History[] = [
    {
      condition: "Hypertension",
      status: "On Treatment",
      details: [
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
      ],
    },
    {
      condition: "Previous Visits",
      status: "Stable",
      details: [
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
      ],
    },
    {
      condition: "Allergies & Sensitivity",
      status: "Under Control",
      details: [
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
      ],
    },
    {
      condition: "High Cholesterol",
      status: "Monitoring",
      details: [
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
        "Medication ongoing, regular check-ups",
      ],
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "On Treatment":
        return "bg-yellow-100 text-yellow-700";
      case "Stable":
        return "bg-green-100 text-green-700";
      case "Monitoring":
        return "bg-blue-100 text-blue-700";
      case "Under Control":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const reports: Report[] = [
    {
      testName: "Complete Blood Count (CBC)",
      date: "2025-01-10",
      details: ["Follow-up after 6 months"],
    },
    {
      testName: "Blood Sugar Test",
      date: "2025-01-05",
      details: ["Diet plan provided"],
    },
    {
      testName: "Liver Function Test (LFT)",
      date: "2025-01-15",
      details: ["Recheck recommended in 3 months"],
    },
    {
      testName: "Urine Test",
      date: "2025-01-08",
      details: ["Routine check-up complete"],
    },
  ];

  const prescriptions: Prescription[] = [
    {
      name: "Prescription #001",
      date: "2025-02-10",
      notes: [
        "Take 1 tablet of Paracetamol twice daily",
        "Avoid spicy food",
        "Follow-up in 2 weeks",
      ],
    },
    {
      name: "Prescription #002",
      date: "2025-01-28",
      notes: [
        "Apply antibiotic ointment twice daily",
        "Keep wound clean and dry",
        "Change dressing every day",
      ],
    },
    {
      name: "Prescription #003",
      date: "2025-01-15",
      notes: [
        "Use inhaler as needed",
        "Monitor breathing daily",
        "Schedule check-up after 1 month",
      ],
    },
    {
      name: "Prescription #004",
      date: "2025-01-05",
      notes: [
        "Take vitamin D supplement once daily",
        "Get 15 minutes sunlight exposure",
        "Repeat blood test after 3 months",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-5 px-5 space-y-10">
      {/* Patient Detail Section */}
      <div className="w-full h-auto rounded-lg bg-white p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Patient Detail - {patient.name}</h1>
          <X className="cursor-pointer" />
        </div>

        <div className="w-full h-auto border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Basic Information</h2>
          <hr className="mb-4 border-gray-200" />
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-xs text-gray-500">Patient ID</p>
              <p className="text-sm font-medium">{patient.id}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm font-medium">{patient.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm font-medium">{patient.age}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm font-medium">{patient.gender}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium">{patient.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Mobile Number</p>
              <p className="text-sm font-medium">{patient.phone}</p>
            </div>

            <div className="col-span-1">
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm font-medium">{patient.reason}</p>
            </div>

            <div className="col-span-1">
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="text-sm font-medium">{patient.dateTime}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Insurance</p>
              <p className="text-sm font-medium">{patient.insurance}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Insurance ID</p>
              <p className="text-sm font-medium">{patient.insuranceId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical History Section */}
      <div className="w-full h-auto py-5 px-5 bg-white border border-gray-200 rounded-lg">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Medical History</h1>
        <hr className="mb-5 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {histories.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-gray-900">{item.condition}</h2>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700">
                {item.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Reports Section */}
      <div className="w-full h-auto py-5 px-5 bg-white rounded-lg border border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Lab Reports</h1>
        <hr className="mb-5 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map((report, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-gray-900">{report.testName}</h2>
                <p className="text-xs text-gray-500">{report.date}</p>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700 mb-3">
                {report.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="w-[130px] py-1.5 rounded-md bg-gray-200 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-100">
                  <Eye className="w-4 h-4" /> View
                </button>
                <button className="w-[140px] py-1.5 rounded-md bg-gray-200 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-100">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescriptions Section */}
      <div className="w-full h-auto py-5 px-5 bg-white rounded-lg border border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Prescriptions</h1>
        <hr className="mb-5 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
          {prescriptions.map((prescription, index) => (
            <div
              key={index}
              className="max-w-[527px] rounded-xl border border-gray-200 bg-white p-5 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-gray-900">{prescription.name}</h2>
                <p className="text-xs text-gray-500">{prescription.date}</p>
              </div>

              {/* Notes */}
              <div className="space-y-2 text-sm text-gray-700 mb-3">
                {prescription.notes.map((note, idx) => (
                  <p key={idx}>{note}</p>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="w-[145px] py-1.5 rounded-md bg-gray-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 flex items-center justify-center gap-1.5">
                  <Eye className="w-4 h-4" /> View
                </button>
                <button className="w-[180px] py-1.5 rounded-md bg-gray-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 flex items-center justify-center gap-1.5">
                  <Printer className="w-4 h-4" /> Print Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
