import { Home, Settings, User, Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from './../shared/Sidebar';

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="py-3 pl-3">
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } h-[97vh] bg-gray-900 text-white flex flex-col rounded-2xl p-5 transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className={`text-2xl font-bold text-emerald-400 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            EMR
          </h1>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-emerald-400"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-4 mt-10">
          <a
            href="#"
            className="flex items-center gap-3 hover:text-emerald-400"
          >
            <Home size={20} />
            {!collapsed && <span>Home</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:text-emerald-400"
          >
            <User size={20} />
            {!collapsed && <span>Users</span>}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:text-emerald-400"
          >
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
