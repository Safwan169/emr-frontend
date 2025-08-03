// import { Calendar, Home, MessageCircle, Settings, User, X } from "lucide-react";
// import { FC } from "react";
// import { NavLink } from "react-router-dom";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
//   return (
//     <div
//       className={`z-50 fixed bottom-0 my-3 ml-2 left-0 w-full md:relative md:top-0 md:left-0
//         md:w-64  bg-[#1A3EAB] text-white p-4 transform
//         ${isOpen ? "translate-y-0" : "translate-y-full"}
//         transition-transform duration-300
//         md:translate-y-0 rounded-t-xl md:rounded-xl`}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">EMR Logo</h1>
//         <button
//           className="md:hidden text-white text-2xl"
//           onClick={onClose}
//           aria-label="Close Sidebar"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Optional image */}
//       <img
//         className="absolute bottom-0 h-[60%] right-0 -translate-x-1/4"
//         src="vector.png"
//         alt=""
//       />

//       {/* Navigation */}
//       <nav className="flex flex-col gap-4">
//         <NavLink to="/" className="flex items-center gap-2 hover:text-gray-300">
//           <Home size={20} /> Dashboard
//         </NavLink>
//         <NavLink
//           to="/appointments"
//           className="flex items-center gap-2 hover:text-gray-300"
//         >
//           <Calendar size={20} /> Appointments
//         </NavLink>
//         <NavLink
//           to="/chat"
//           className="flex items-center gap-2 hover:text-gray-300"
//         >
//           <MessageCircle size={20} /> Chat
//         </NavLink>
//         <NavLink
//           to="/profile"
//           className="flex items-center gap-2 hover:text-gray-300"
//         >
//           <User size={20} /> Profile
//         </NavLink>
//         <NavLink
//           to="/settings"
//           className="flex items-center gap-2 hover:text-gray-300"
//         >
//           <Settings size={20} /> Settings
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import {
  BriefcaseMedical,
  Calendar,
  FileText,
  Home,
  MessageCircle,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: "patient" | "doctor" | "admin";
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, role }) => {
  const menuItems: Record<
    string,
    { to: string; label: string; icon: JSX.Element }[]
  > = {
    patient: [
      { to: "/", label: "Dashboard", icon: <Home size={20} /> },
      {
        to: "/appointments",
        label: "Appointments",
        icon: <Calendar size={20} />,
      },
      { to: "/chat", label: "Chat", icon: <MessageCircle size={20} /> },
      { to: "/profile", label: "Profile", icon: <User size={20} /> },
      { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
    ],
    doctor: [
      { to: "/", label: "Dashboard", icon: <Home size={20} /> },
      { to: "/patients", label: "Patients", icon: <Users size={20} /> },
      {
        to: "/appointments",
        label: "Appointments",
        icon: <Calendar size={20} />,
      },
      { to: "/profile", label: "Profile", icon: <User size={20} /> },
    ],
    admin: [
      { to: "/", label: "Dashboard", icon: <Home size={20} /> },
      {
        to: "/doctors",
        label: "Doctors",
        icon: <BriefcaseMedical size={20} />,
      },
      { to: "/patients", label: "Patients", icon: <Users size={20} /> },
      {
        to: "/medical-records",
        label: "Medical Records",
        icon: <FileText size={20} />,
      },
      {
        to: "/pharmacy",
        label: "Pharmacy",
        icon: <BriefcaseMedical size={20} />,
      },
      { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
    ],
  };

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
        src="vector.png"
        alt=""
      />

      {/* Navigation */}
      <nav className="flex flex-col gap-4 z-10 relative">
        {menuItems[role].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
