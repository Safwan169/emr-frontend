import { Calendar, Home, MessageCircle, Settings, User, X } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`z-50 fixed bottom-0 my-3 ml-2 left-0 w-full md:relative md:top-0 md:left-0 
        md:w-64  bg-[#1A3EAB] text-white p-4 transform 
        ${isOpen ? "translate-y-0" : "translate-y-full"} 
        transition-transform duration-300 
        md:translate-y-0 rounded-t-xl md:rounded-xl`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">EMR Logo</h1>
        <button
          className="md:hidden text-white text-2xl"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          <X size={24} />
        </button>
      </div>

      {/* Optional image */}
      <img className="absolute bottom-0 h-[60%] right-0 -translate-x-1/4" src="/vector.png" alt="" />

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className="flex items-center gap-2 hover:text-gray-300">
          <Home size={20} /> Dashboard
        </NavLink>
        <NavLink
          to="/appointments"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Calendar size={20} /> Appointments
        </NavLink>
        <NavLink
          to="/chat"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <MessageCircle size={20} /> Chat
        </NavLink>
        <NavLink
          to="/profile"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <User size={20} /> Profile
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
