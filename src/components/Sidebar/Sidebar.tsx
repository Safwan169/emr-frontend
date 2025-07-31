import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  MessageCircle,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-[#0B3D91] text-white p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:relative md:translate-x-0`}
    >
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

      <nav className="flex flex-col gap-4">
        <NavLink to="/" className="flex items-center gap-2 hover:text-gray-300">
          <Home size={20} /> Dashboard
        </NavLink>
        <NavLink to="/appointments" className="flex items-center gap-2 hover:text-gray-300">
          <Calendar size={20} /> Appointments
        </NavLink>
        <NavLink to="/chat" className="flex items-center gap-2 hover:text-gray-300">
          <MessageCircle size={20} /> Chat
        </NavLink>
        <NavLink to="/settings" className="flex items-center gap-2 hover:text-gray-300">
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
