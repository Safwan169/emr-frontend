import { FC, useState, useRef, useEffect } from "react";
import { ChevronDown, Bell, Search } from "lucide-react";
import Logout from "../../pages/logout/Logout";
import useGetUserData from "../../hooks/useGetUserData";

interface NavbarProps {
  title: string;
  onToggleSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ title, onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { data } = useGetUserData();
  
  console.log(data,'this is data');
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow-sm rounded-lg mx-2">
      {/* Left: Title */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden text-2xl">
          ☰
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Right: Search, Notification, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search anything here..."
            className="bg-gray-100 rounded-lg pl-9 pr-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <div className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
            <Bell className="text-blue-800" size={20} />
          </div>
          <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-1">
            3
          </span>
        </div>

        {/* Profile Dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <p className="font-medium text-sm">{data?.first_name} {data?.last_name}</p>
              <p className="text-xs text-gray-500">{data?.role?.role_name}</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
