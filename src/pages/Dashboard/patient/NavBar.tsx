import { Bell } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="h-fit bg-gray-600 flex items-center justify-between m-3 p-4 shadow-md rounded-xl">
      {/* Left Side: Logo / Title */}
      <div className="text-2xl font-bold text-emerald-600">Dashboard</div>

      {/* Right Side: Search, Notification, Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2"
        />

        {/* Notification Bell */}
        <button className="relative" aria-label="Notifications">
          <Bell className="w-6 h-6 text-green-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Pic */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 cursor-pointer">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
