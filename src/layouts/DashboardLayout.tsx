// import { FC, useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// import Sidebar from "../components/Sidebar/Sidebar";
// import { decodeToken } from "../utils/decodeToken";
// interface LayoutProps {
//   children?: React.ReactNode;
//   pageTitle: string;
// }

// const DashboardLayout: FC<LayoutProps> = ({ pageTitle }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
// const [role,setRole]=useState<any>('')

//  useEffect(() => {
//     const token = localStorage.getItem("EMRtoken");
//     const decoded = decodeToken(token);
//     console.log(decoded,'this is decode role ')

//     if (decoded?.role_name) {
//       setRole(decoded.role_name);
//     }
//   }, []);

//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar fixed */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         role={role}
//       />
//       {/* Main content */}
//       <div className="flex-1 ml-1   flex flex-col my-3">
//         {/* Navbar (sticky top) */}
//         <div className="sticky top-0 z-30  ">
//           <Navbar title={pageTitle} onToggleSidebar={toggleSidebar} />
//         </div>

//         {/* Scrollable content */}
//         <main className="overflow-y-auto lg:p-3 h-full">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { decodeToken } from "../utils/decodeToken";

interface LayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: FC<LayoutProps> = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<any>('');

  useEffect(() => {
    const token = localStorage.getItem("EMRtoken");
    const decoded = decodeToken(token);
    console.log(decoded, 'this is decode role');

    if (decoded?.role_name) {
      setRole(decoded.role_name);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside on mobile
  const handleMainClick = () => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

const handleToggleSidebar = () => {
  setSidebarOpen(!isSidebarOpen);
};

const handleCloseSidebar = () => {
  setSidebarOpen(false);
};

  return (
    <div className="flex h-screen  bg-gray-50">
      {/* Sidebar */}
<Sidebar
  isOpen={isSidebarOpen}
  onClose={handleCloseSidebar}
  onToggle={handleToggleSidebar}
  role={role}/>

      
      {/* Main content area */}
      <div className={`
        flex-1 flex flex-col
        transition-all duration-300
        ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}
        ml-0
        my-0 md:my-3 md:ml-1
      `}>
        {/* Navbar */}
        <div className="sticky top-0 z-20 bg-white md:bg-transparent">
          <Navbar onToggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable content */}
        <main 
          className={`
            flex-1 overflow-y-auto
            px-0 md:px-3
            pb-20 md:pb-3
            ${isSidebarOpen ? 'md:pointer-events-auto' : ''}
          `}
          onClick={handleMainClick}
        >
          {/* Content wrapper for better mobile spacing */}
          <div className="min-h-full  md:p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;