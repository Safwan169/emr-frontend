import DoctorAppoinment from '../pages/Dashboard/doctor/appointment/components/DoctorAppoinment';
import DoctorAppoinmentDetails from '../pages/Dashboard/doctor/appointment/DoctorAppoinmentDetails';
import PatientStat from '../pages/Dashboard/doctor/patient/component/PatientStat';
import Profile from '../pages/Dashboard/doctor/profile/Profile';


const DoctorRoute = [


    {
        path: "doctor/profile",
        element: <Profile />,
    },

    {
        path: "doctor/appoinment",
        element: <DoctorAppoinment />,
    },
    {
        path: "doctor/patients",
        element: <PatientStat />,
    },
    {
        path: "doctor/appoinment-details",
        element: <DoctorAppoinmentDetails />,
    }
]



export default DoctorRoute;

