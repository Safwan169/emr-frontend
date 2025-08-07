import React from 'react';
import DoctorMan from '../pages/Dashboard/admin/components/DoctorMan';

const AdminRoute =[

    { 
        path: "add-doctors",
        element: <DoctorMan/>,

    },{
        path:'admin/patients',
        element:<DoctorMan/>
    },
    {
        path:'admin/medical_records',
        element:<DoctorMan/>
    },
    {
        path:'admin/pharmacy',
        element:<DoctorMan/>
    }

    
]

export default AdminRoute;