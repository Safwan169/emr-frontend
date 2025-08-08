
import Chat from "../pages/Dashboard/patient/chat/Chat";
import PatientDashboard from "../pages/Dashboard/patient/patientDashboard/PatientDashboard";
import PatientProfile from "../pages/Dashboard/patient/patientProfile/PatientProfile";

const PatientRoute = [
  {
    path: "profile",
    element: <PatientProfile />,
  },{
    path: "chat",
    element: <Chat />,
  },
  
];

export default PatientRoute;
