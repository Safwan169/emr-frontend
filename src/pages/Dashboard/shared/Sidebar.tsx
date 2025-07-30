// layouts/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  role: "doctor" | "patient";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const doctorMenu = [
    { name: "Dashboard", path: "/Dashboard/doctor" },
    { name: "Appointments", path: "/Dashboard/doctor/appointments" },
    { name: "Patients", path: "/Dashboard/doctor/patients" },
    { name: "Settings", path: "/Dashboard/doctor/settings" },
  ];

  const patientMenu = [
    { name: "Dashboard", path: "/Dashboard/patient" },
    { name: "My Doctors", path: "/Dashboard/patient/doctors" },
    { name: "My Appointments", path: "/Dashboard/patient/appointments" },
    { name: "Profile", path: "/Dashboard/patient/profile" },
  ];

  const menu = role === "doctor" ? doctorMenu : patientMenu;

  return (
    <aside className="w-60 h-screen bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4 capitalize">{role} Panel</h2>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-blue-500 text-white rounded"
                  : "block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
