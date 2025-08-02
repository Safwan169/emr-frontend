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
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search anything here..."
          className="border px-3 py-1 rounded-md text-sm"
        />
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/Sr9bR2z/profile.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">Salil Chakma</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
