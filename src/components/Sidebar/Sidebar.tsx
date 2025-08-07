import { X, ChevronUp, Menu } from "lucide-react";
import { FC, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarConfig from "./SidebarConfig";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void; // Added onToggle prop for hamburger functionality
  role: string; // patient | doctor | admin etc.
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, onToggle, role }) => {
  const navItems = SidebarConfig[role] || [];
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  console.log(navItems);

  // Find active nav item index
  useEffect(() => {
    const currentIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, navItems]);

  // Handle touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    // If swipe down is detected (diff < -50), close sidebar
    if (diff < -50) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`z-50 fixed bottom-0 left-0 right-0 md:relative md:top-0 m-2 mr-0 md:left-0 md:right-auto
         ${isOpen ? "md:min-w-[13rem] md:max-w-[13rem]" : "md:min-w-[4rem] md:max-w-[4rem]"}
         bg-gradient-to-br from-[#1A3EAB] via-[#1A3EAB] to-[#0F2A7A] md:bg-[#1A3EAB] 
         text-white transform 
        ${isOpen ? "translate-y-0" : "translate-y-full"} 
        transition-all duration-500 ease-out
        md:translate-y-0 
        
        /* Mobile-specific styles */
        md:rounded-xl
        rounded-t-3xl md:rounded-t-xl
        shadow-2xl md:shadow-none
        border-t-2 border-white/10 md:border-none
        max-h-[60vh] md:max-h-none
        overflow-hidden`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Swipe Indicator */}
        <div className="md:hidden flex justify-center py-2">
          <div className="w-12 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Mobile Header with Quick Actions */}
        <div className="md:hidden px-4 py-3 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm font-bold">E</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">EMR</h1>
                <p className="text-xs text-white/70 capitalize">{role} Panel</p>
              </div>
            </div>
            <button
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={onClose}
              aria-label="Close Sidebar"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Header with Hamburger Menu */}
        <div className={`hidden md:flex items-center mb-6 p-4 ${isOpen ? "justify-between" : "justify-center"}`}>
          {isOpen && <h1 className="text-2xl font-bold">EMR Logo</h1>}
          <button
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
            onClick={onToggle}
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
          <button
            className="md:hidden text-white text-2xl"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Navigation Grid */}
        <nav className="md:hidden px-4 pb-6">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {navItems.slice(0, 6).map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                // ✅ Passing title via state
                state={{ title: item.title }}
                onClick={onClose}
                className={`
    flex flex-col items-center gap-2 p-4 rounded-2xl
    transition-all duration-300 transform hover:scale-105
    ${
      location.pathname === item.path
        ? "bg-white/20 backdrop-blur-sm shadow-lg scale-105"
        : "bg-white/5 hover:bg-white/10"
    }
  `}
              >
                <div
                  className={`
    w-10 h-10 rounded-xl flex items-center justify-center
    ${
      location.pathname === item.path
        ? "bg-white/20 text-white shadow-lg"
        : "bg-white/10 text-white/80"
    }
  `}
                >
                  {item.icon && <item.icon size={20} />}
                </div>
                <span className="text-xs text-center font-medium leading-tight">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Additional items as list if more than 6 */}
          {navItems.length > 6 && (
            <div className="space-y-2">
              <div className="text-xs text-white/50 font-medium px-2 mb-3">
                More Options
              </div>
              {navItems.slice(6).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  state={{ title: item.title }}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl
                    transition-all duration-200
                    ${
                      location.pathname === item.path
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {item.icon && <item.icon size={18} />}
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-col gap-4 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              state={{ title: item.title }}
              className={`flex items-center gap-2 hover:text-gray-300 transition-all duration-200 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
              title={!isOpen ? item.label : undefined} // Show tooltip when collapsed
            >
              {item.icon && <item.icon size={20} />} 
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Image (only show when expanded) */}
        {isOpen && (
          <img
            className="hidden md:block absolute bottom-0 h-[60%] right-0 -translate-x-1/4"
            src="/vector.png"
            alt=""
          />
        )}

        {/* Mobile Bottom Gradient */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0F2A7A] to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default Sidebar;