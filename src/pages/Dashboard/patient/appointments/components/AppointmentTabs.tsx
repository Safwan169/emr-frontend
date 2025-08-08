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
    <div className="py-4  mx-auto 2xl:mx-0 mb-2 w-full  xl:w-full">
      <h2 className="xl:text-sm text-center xl:text-left text-lg font-medium text-gray-700 mb-2">
        All Appointments
      </h2>
      <div className="flex flex-col xl:flex-row justify-center md:justify-between gap-3 items-start md:items-center">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
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
          className="bg-[#1C3BA4] hover:bg-blue-800 text-white mx-auto 2xl:mx-0 px-5 py-2 text-sm rounded-md font-medium shadow"
        >
          + New Appointment
        </Link>
      </div>
    </div>
  );
};

export default AppointmentTabs;
