import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Types
interface ImmunizationHistory {
  vaccine: string;
  date: string;
  dose: string;
  provider: string;
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

const ImmunizationHistory = () => {
  const immunizationHistory: ImmunizationHistory[] = [
    {
      vaccine: "COVID-19 (Pfizer)",
      date: "01/03/2024",
      dose: "Booster #3",
      provider: "Startsmartz Clinic",
    },
    {
      vaccine: "Influenza",
      date: "01/03/2024",
      dose: "Annual",
      provider: "Startsmartz Clinic",
    },
    {
      vaccine: "Tetanus",
      date: "15/09/2023",
      dose: "Booster",
      provider: "City Health Center",
    },
    {
      vaccine: "Hepatitis B",
      date: "20/05/2023",
      dose: "Series Complete",
      provider: "Startsmartz Clinic",
    },
    {
      vaccine: "MMR",
      date: "10/01/2023",
      dose: "Booster",
      provider: "Regional Clinic",
    },
  ];

  const [immunizationPage, setImmunizationPage] = useState(1);
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
        Immunization History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Vaccine
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Dose
              </th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 border-b">
                Provider
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {getPaginatedData(immunizationHistory, immunizationPage).map(
              (immunization, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">
                    {immunization.vaccine}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    {immunization.date}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    {immunization.dose}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                    {immunization.provider}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={immunizationPage}
        totalPages={getTotalPages(immunizationHistory)}
        onPageChange={setImmunizationPage}
      />
    </div>
  );
};

export default ImmunizationHistory;
