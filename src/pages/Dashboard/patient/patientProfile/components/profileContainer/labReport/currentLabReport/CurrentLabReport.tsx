import { Download, Eye } from "lucide-react";

const CurrentLabReport = () => {
  const testResults = [
    {
      test: "Complete Blood Count (CBC)",
      orderedBy: "Dr. Emily Rodriguez",
      priority: "Routine Priority",
      date: "01/03/2024",
      status: "Complete",
      result: "Normal",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      test: "Lipid Panel",
      orderedBy: "Dr. Sarah",
      priority: "Routine Priority",
      date: "01/03/2024",
      status: "Complete",
      result: "Abnormal",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
      resultColor: "text-red-600",
    },
    {
      test: "Chest X-Ray",
      orderedBy: "Dr. Emily Rodriguez",
      priority: "Normal Priority",
      date: "01/03/2024",
      status: "Complete",
      result: "Normal",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      test: "Thyroid Function Tests",
      orderedBy: "Dr. Emily Rodriguez",
      priority: "Routine Priority",
      date: "01/03/2024",
      status: "Pending",
      result: "Pending",
      statusColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const imageReports = [
    {
      title: "Lipid Panel",
      date: "March 16, 2025",
      image:
        "https://plus.unsplash.com/premium_photo-1661315406324-329dd27ebc34?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Chest X-Ray",
      date: "March 16, 2025",
      image:
        "https://plus.unsplash.com/premium_photo-1661315406324-329dd27ebc34?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Complete Blood Count",
      date: "March 16, 2025",
      image:
        "https://plus.unsplash.com/premium_photo-1661315406324-329dd27ebc34?w=500&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition w-full sm:w-auto">
            <Download size={16} />
            Download
          </button>
          <button className="bg-[#009E18] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition w-full sm:w-auto">
            <span>📅</span>
            Schedule
          </button>
        </div>
      </div>

      {/* Test Results Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-x-auto">
        <table className="w-full min-w-[600px] table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Test Details
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Date
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Result
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {testResults.map((test, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-gray-900">{test.test}</div>
                    <div className="text-sm text-[#4B5563]">
                      Ordered by {test.orderedBy}
                    </div>
                    <div className="text-sm text-[#1C3BA4]">
                      {test.priority}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-700">{test.date}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-medium ${test.bgColor} ${test.statusColor}`}
                  >
                    {test.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`font-medium ${
                      test.resultColor || "text-[#009E18]"
                    }`}
                  >
                    {test.result}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button className="p-2 text-[#1C3BA4] hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-[#1C3BA4] hover:bg-gray-50 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Reports Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {imageReports.map((report, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="h-48 sm:h-56 bg-gray-100">
              <img
                className="w-full h-full object-cover"
                src={report.image}
                alt={report.title}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {report.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{report.date}</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                <Download size={14} />
                Download JPG
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentLabReport;
