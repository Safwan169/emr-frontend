import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Types
interface ChronicCondition {
  condition: string;
  status: string;
  statusColor: string;
  diagnosed: string;
  treatingPhysician: string;
  lastUpdated: string;
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

const ChronicConditions = () => {
  const chronicConditions: ChronicCondition[] = [
    {
      condition: "Type 2 Diabetes",
      status: "Well Controlled",
      statusColor: "bg-green-100 text-green-800",
      diagnosed: "01/08/2025",
      treatingPhysician: "Dr. Sahil Khan",
      lastUpdated: "26/07/2025",
    },
    {
      condition: "Hypertension",
      status: "Unstable",
      statusColor: "bg-red-100 text-red-800",
      diagnosed: "01/08/2025",
      treatingPhysician: "Dr. Sahil Khan",
      lastUpdated: "26/07/2025",
    },
    {
      condition: "High Cholesterol",
      status: "Improving",
      statusColor: "bg-blue-100 text-blue-800",
      diagnosed: "01/08/2025",
      treatingPhysician: "Dr. Sahil Khan",
      lastUpdated: "26/07/2025",
    },
    {
      condition: "Asthma",
      status: "Well Controlled",
      statusColor: "bg-green-100 text-green-800",
      diagnosed: "15/03/2020",
      treatingPhysician: "Dr. Sarah Johnson",
      lastUpdated: "20/07/2025",
    },
    {
      condition: "Anxiety Disorder",
      status: "Unstable",
      statusColor: "bg-red-100 text-red-800",
      diagnosed: "10/12/2023",
      treatingPhysician: "Dr. Michael Brown",
      lastUpdated: "25/07/2025",
    },
  ];

  const [chronicPage, setChronicPage] = useState(1);
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
        Current Chronic Conditions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {getPaginatedData(chronicConditions, chronicPage).map(
          (condition, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold text-gray-900">
                  {condition.condition}
                </h3>
                <span
                  className={`text-xs sm:text-sm font-medium py-1 px-3 rounded-full ${condition.statusColor}`}
                >
                  {condition.status}
                </span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span>Diagnosed: {condition.diagnosed}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span>Treating Physician: {condition.treatingPhysician}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span>Last Updated: {condition.lastUpdated}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Pagination
        currentPage={chronicPage}
        totalPages={getTotalPages(chronicConditions)}
        onPageChange={setChronicPage}
      />
    </div>
  );
};

export default ChronicConditions;
