import { FC } from "react";

interface NavbarProps {
  title: string;
  onToggleSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ title, onToggleSidebar }) => {
  return (
    <div className="flex justify-between rounded-lg mx-2  items-center bg-white px-6 py-4 ">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden text-2xl">
          ☰
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search anything here..."
          className="border px-3 py-1 rounded-md text-sm w-full sm:w-auto"
        />
        <div className="flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4g-3ZH_1TjfN-zOuCRru2LrfrGtPbwaCsQ&s"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-sm sm:text-base">Salil Chakma</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
