import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
interface LayoutProps {
  children?: React.ReactNode;
  pageTitle: string;
}

const DashboardLayout: FC<LayoutProps> = ({ pageTitle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixed */}
      <Sidebar
        role="doctor"
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 ml-1   flex flex-col my-3">
        {/* Navbar (sticky top) */}
        <div className="sticky top-0 z-30  ">
          <Navbar title={pageTitle} onToggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable content */}
        <main className="overflow-y-auto lg:p-3 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
