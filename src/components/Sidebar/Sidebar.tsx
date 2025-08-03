import { X } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import SidebarConfig from "./SidebarConfig";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: string; // patient | doctor | admin etc.
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, role }) => {
  const navItems = SidebarConfig[role] || [];

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
      <img
        className="absolute bottom-0 h-[60%] right-0 -translate-x-1/4"
        src="/vector.png"
        alt=""
      />

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            {item.icon && <item.icon size={20} />} {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
