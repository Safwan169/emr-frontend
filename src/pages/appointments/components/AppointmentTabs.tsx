import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = ['All', 'Upcoming', 'Completed', 'Cancel'] as const;
type Tab = typeof tabs[number];

const AppointmentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-between py-4 rounded-md w-full  max-w-5xl ">
      {/* Left - Title + Tabs */}
      <div className='w-full'>
        <h2 className="text-sm font-medium text-gray-700 mb-2">All Appointments</h2>
        <div className="flex justify-between items-center   w-full ">
       <div className="flex gap-2">
           {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-1 text-sm rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-100 border text-[#1C3BA4]'
                  : 'bg-white border rounded-lg border-gray-200 items-center text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
       </div>
       
      {/* Right - New Appointment Button */}
      <Link to={'/new-appointment'} className="bg-[#1C3BA4]  hover:bg-blue-800 text-white px-5 py-2 text-sm  rounded-md font-medium shadow">
        + New Appointment
      </Link >
        </div>
      </div>

    </div>
  );
};

export default AppointmentTabs;
