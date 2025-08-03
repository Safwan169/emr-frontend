import { ChevronLeft, ChevronRight, MapPin, User } from "lucide-react";
import { useState } from "react";

// Types
interface SurgicalHistory {
  procedure: string;
  date: string;
  surgeon: string;
  hospital: string;
  complications: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <div className="flex flex-wrap items-center justify-between gap-2 mt-4 px-4 py-2 bg-gray-50 rounded-lg">
    <button
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      Previous
    </button>

    <div className="flex flex-wrap items-center space-x-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <button
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
    >
      Next
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  </div>
);

const SurgicalHistory = () => {
  const surgicalHistory: SurgicalHistory[] = [
    {
      procedure: "Appendectomy",
      date: "01/03/2024",
      surgeon: "Dr. Mridul Babu",
      hospital: "General Hospital",
      complications: "None",
    },
    {
      procedure: "Gallbladder Removal",
      date: "15/06/2023",
      surgeon: "Dr. Mridul Babu",
      hospital: "General Hospital",
      complications: "Minor bleeding",
    },
    {
      procedure: "Hernia Repair",
      date: "22/11/2022",
      surgeon: "Dr. Sarah Wilson",
      hospital: "City Medical Center",
      complications: "None",
    },
    {
      procedure: "Tonsillectomy",
      date: "08/04/2021",
      surgeon: "Dr. James Miller",
      hospital: "Regional Hospital",
      complications: "None",
    },
  ];

  const [surgicalPage, setSurgicalPage] = useState(1);
  const itemsPerPage = 2;

  const getPaginatedData = <T,>(data: T[], currentPage: number): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data: any[]) => Math.ceil(data.length / itemsPerPage);

  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Surgical History
      </h2>
      <div className="space-y-4">
        {getPaginatedData(surgicalHistory, surgicalPage).map(
          (surgery, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900">
                  {surgery.procedure}
                </h3>
                <span className="text-xs sm:text-sm text-gray-500">
                  {surgery.date}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Surgeon: {surgery.surgeon}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-green-500" />
                  <span>Hospital: {surgery.hospital}</span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      surgery.complications === "None"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <span>Complications: {surgery.complications}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Pagination
        currentPage={surgicalPage}
        totalPages={getTotalPages(surgicalHistory)}
        onPageChange={setSurgicalPage}
      />
    </div>
  );
};

export default SurgicalHistory;
