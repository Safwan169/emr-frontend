// import { FC } from "react";
// import Logout from "../../pages/logout/Logout";

// interface NavbarProps {
//   title: string;
//   onToggleSidebar: () => void;
// }

// const Navbar: FC<NavbarProps> = ({ title, onToggleSidebar }) => {
//   return (
//     <div className="flex justify-between rounded-lg mx-2  items-center bg-white px-6 py-4 ">
//       <div className="flex items-center gap-4">
//         <button onClick={onToggleSidebar} className="md:hidden text-2xl">
//           ☰
//         </button>
//         <h2 className="text-xl font-semibold">{title}</h2>
//       </div>

//       {/* Right: Search & Profile */}
//       <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
//         <input
//           type="text"
//           placeholder="Search anything here..."
//           className="border px-3 py-1 rounded-md text-sm w-full sm:w-auto"
//         />
//         <div className="flex items-center gap-2">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s"
//             alt="Profile"
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <span className="font-medium text-sm sm:text-base">Salil Chakma</span>
//         </div>
//         <Logout/>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { FC, useState } from "react";
import { Menu, Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import Logout from "../../pages/logout/Logout";

interface NavbarProps {
  title: string;
  onToggleSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ title, onToggleSidebar }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-gradient-to-r from-white via-white to-blue-50 px-4 py-3 shadow-sm border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button 
              onClick={onToggleSidebar} 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A3EAB] to-[#0F2A7A] text-white flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">{title}</h2>
              <p className="text-xs text-gray-500">Good morning! 👋</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button className="relative w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>
            
            {/* Profile */}
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full pr-3 pl-1 py-1 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 bg-white border-b border-gray-100">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm
                ${isSearchFocused 
                  ? 'border-[#1A3EAB] bg-blue-50/50 shadow-lg shadow-blue-100/50' 
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }
                focus:outline-none focus:ring-0`}
            />
            {isSearchFocused && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex gap-1">
                  <span className="px-2 py-1 text-xs bg-white rounded border text-gray-500">⌘K</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowProfileMenu(false)}
            />
            <div className="absolute right-4 top-16 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[200px] transform transition-all duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Salil Chakma</p>
                    <p className="text-xs text-gray-500">salil@example.com</p>
                  </div>
                </div>
              </div>
              
              <div className="py-1">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
                  <User size={16} />
                  <span>Profile Settings</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
                  <Settings size={16} />
                  <span>Preferences</span>
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <div className="px-4 py-2">
                    <Logout />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Navbar (Enhanced but similar to original) */}
      <div className="hidden md:flex justify-between rounded-lg mx-2 items-center bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="md:hidden text-2xl">
            ☰
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Right: Search & Profile */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything here..."
              className="border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A3EAB]/20 focus:border-[#1A3EAB] transition-all duration-200 w-64"
            />
          </div>
          
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
            />
            <span className="font-medium text-sm">Salil Chakma</span>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;