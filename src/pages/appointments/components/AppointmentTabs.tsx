import React, { useState } from "react";
import { Link } from "react-router-dom";

const tabs = ["All", "Upcoming", "Completed", "Cancel"] as const;
type Tab = (typeof tabs)[number];

const AppointmentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="py-4 w-full max-w-5xl">
      <h2 className="text-sm font-medium text-gray-700 mb-2">
        All Appointments
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-1 text-sm rounded-md font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-100 border text-[#1C3BA4]"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* New Appointment Button */}
        <Link
          to={"/new-appointment"}
          className="bg-[#1C3BA4] hover:bg-blue-800 text-white px-5 py-2 text-sm rounded-md font-medium shadow"
        >
          + New Appointment
        </Link>
      </div>
    </div>
  );
};

export default AppointmentTabs;
