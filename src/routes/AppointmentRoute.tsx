import Appointments from "../pages/appointments/Appointments";
import NewAppoinmentLayout from "../pages/appointments/newAppoinmentLayout/NewAppoinmentLayout";
import SelectDoctorSectionMain from "../pages/appointments/pages/selectDoctor/SelectorDoctorMain";
import SelectTimeSlot from "../pages/appointments/pages/selectTimeSlot/SelectTimeSlot";
// Import other child components as needed

const AppointmentRoute = [
  {
    path: "appointments",
    element: <Appointments />, // this will act as layout or parent
  
  },
  {
    path: "new-appointment",
    element: <NewAppoinmentLayout/>,
      children: [
      {
        path: "", 
        element: <SelectDoctorSectionMain />,
      },
      {
        path: "select-timeSlot", 
        element: <SelectTimeSlot />,
      },
      // Add more children routes if needed here
      // {
      //   path: "patient/:id",
      //   element: <PatientAppointment />,
      // }
    ],
  }
];

export default AppointmentRoute;
