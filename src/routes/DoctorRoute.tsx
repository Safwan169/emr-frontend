import React from 'react';
import DoctorProfile from '../pages/Dashboard/doctor/profile/components/DoctorProfile';
import Profile from '../pages/Dashboard/doctor/profile/Profile';
import DoctorDashboard from '../pages/Dashboard/doctor/dashboard/DoctorDashboard';
import DocApp from '../pages/Dashboard/doctor/appointment/DocApp';

const DoctorRoute = [


    {
        path: "doctor/profile",
        element: <Profile/>,
    },
    {
        path: "doctor/dashboard",
        element: <DoctorDashboard/>,
    },
    {
        path: "doctor/appoinment",
        element: <DocApp/>,
    }
]



export default DoctorRoute;

