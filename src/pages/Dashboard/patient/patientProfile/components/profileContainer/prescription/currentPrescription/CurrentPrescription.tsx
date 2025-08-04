import { Download, RotateCcw, User } from "lucide-react";
import { useState } from "react";

// Type definitions
interface Prescription {
  id: number;
  name: string;
  prescribedBy: string;
  specialty: string;
  dateIssued: string;
  duration: string;
  dosage: string;
  refillsLeft: string;
  instruction: string;
  status: "Active" | "Completed";
}

interface PrescriptionCardProps {
  prescription: Prescription;
}

const CurrentPrescription: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;

  // Sample prescription data
  const prescriptions: Prescription[] = [
    {
      id: 1,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Active",
    },
    {
      id: 2,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Active",
    },
    {
      id: 3,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Completed",
    },
    {
      id: 4,
      name: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      dateIssued: "01/08/2025",
      duration: "3 months",
      dosage: "Once daily in the morning",
      refillsLeft: "Appendectomy",
      instruction:
        "Take with or without food. Monitor blood pressure regularly.",
      status: "Active",
    },
    {
      id: 5,
      name: "Metformin 500mg",
      prescribedBy: "Dr. John Smith",
      specialty: "Endocrinologist",
      dateIssued: "28/07/2025",
      duration: "6 months",
      dosage: "Twice daily with meals",
      refillsLeft: "2 refills left",
      instruction:
        "Take with food to reduce stomach upset. Monitor blood sugar levels.",
      status: "Active",
    },
    {
      id: 6,
      name: "Atorvastatin 20mg",
      prescribedBy: "Dr. Emily Davis",
      specialty: "Cardiologist",
      dateIssued: "25/07/2025",
      duration: "12 months",
      dosage: "Once daily at bedtime",
      refillsLeft: "5 refills left",
      instruction: "Take at bedtime. Avoid grapefruit juice.",
      status: "Active",
    },
  ];

  // Calculate pagination
  const totalPages: number = Math.ceil(prescriptions.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentPrescriptions: Prescription[] = prescriptions.slice(
    startIndex,
    endIndex
  );

  const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
    prescription,
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
            {prescription.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              prescription.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {prescription.status}
          </span>
          <Download className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      <div className="text-xs sm:text-sm text-gray-600 mb-3">
        <span>Prescribed by </span>
        <span className="text-blue-600 font-medium break-words">
          {prescription.prescribedBy}
        </span>
        <span className="text-blue-600 break-words">
          {" "}
          • {prescription.specialty}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Date Issued</div>
          <div className="text-xs sm:text-sm font-medium">
            {prescription.dateIssued}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Duration</div>
          <div className="text-xs sm:text-sm font-medium">
            {prescription.duration}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Dosage</div>
          <div className="text-xs sm:text-sm font-medium break-words">
            {prescription.dosage}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Refills Left</div>
          <div className="text-xs sm:text-sm font-medium">
            {prescription.refillsLeft}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Instructions</div>
        <div className="text-xs sm:text-sm break-words">
          {prescription.instruction}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm">
          <RotateCcw className="w-4 h-4" />
          <span>Request Refill</span>
        </button>
        <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm">
          <User className="w-4 h-4" />
          <span>Contact Doctor</span>
        </button>
      </div>
    </div>
  );

  const Pagination: React.FC = () => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 px-2 space-y-4 sm:space-y-0">
      <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
        Showing {startIndex + 1} to {Math.min(endIndex, prescriptions.length)}{" "}
        of {prescriptions.length} prescriptions
      </div>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Current Chronic Conditions
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {currentPrescriptions.map((prescription) => (
          <PrescriptionCard key={prescription.id} prescription={prescription} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default CurrentPrescription;
