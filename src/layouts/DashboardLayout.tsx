import { FC, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
interface LayoutProps {
  children?: React.ReactNode;
  pageTitle: string;
}

const DashboardLayout: FC<LayoutProps> = ({  pageTitle }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-h-screen bg-gray-50">
        <Navbar title={pageTitle} onToggleSidebar={toggleSidebar} />
        <main className="p-6">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
