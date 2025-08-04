
import Aichat from "../pages/Dashboard/patient/chat/Aichat";
import PatientProfile from "../pages/Dashboard/patient/patientProfile/PatientProfile";

const PatientRoute = [
  {
    path: "profile",
    element: <PatientProfile />,
  },
  {
    path: "chat",
    element: <Aichat />,
  },
];

export default PatientRoute;
