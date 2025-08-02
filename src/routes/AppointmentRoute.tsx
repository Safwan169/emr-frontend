import AppointmentConfirmation from "../designSlotComponents/AppointmentConfirmation";
import Appointments from "../pages/appointments/Appointments";
import NewAppoinmentLayout from "../pages/appointments/newAppoinmentLayout/NewAppoinmentLayout";
import AppointmentDetails from "../pages/appointments/pages/appointmentDetails/AppointmentDetails";
import BookAppoinment from "../pages/appointments/pages/bookAppoinment/BookAppoinment";
import ReviewAppointment from "../pages/appointments/pages/reviewAppoinment/ReviewAppointment";
import SelectDoctorSectionMain from "../pages/appointments/pages/selectDoctor/SelectDoctorMain";
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
      {
        path: "appoinment-details", 
        element: <AppointmentDetails />,
      },
      {
        path: "reviewAppointment", 
        element: <ReviewAppointment />,
      },
     
    ],
    
  }, {
        path: "confirm-appointment", 
        element: <AppointmentConfirmation />,
      }
];

export default AppointmentRoute;
