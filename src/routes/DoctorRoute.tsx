import React from 'react';
import DoctorProfile from '../pages/Dashboard/doctor/profile/components/DoctorProfile';
import Profile from '../pages/Dashboard/doctor/profile/Profile';
import DoctorDashboard from '../pages/Dashboard/doctor/dashboard/DoctorDashboard';

const DoctorRoute = [


    {
        path: "doctor/profile",
        element: <Profile/>,
    },
    {
        path: "doctor/dashboard",
        element: <DoctorDashboard/>,
    }
]



export default DoctorRoute;

