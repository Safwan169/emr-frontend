import React from 'react';
import DoctorMan from '../pages/Dashboard/admin/components/DoctorMan';
import MedRec from '../pages/Dashboard/admin/components/MedRec';
import MedicineInventory from '../pages/Dashboard/admin/components/MedicineInventory';
import PatientProfile from '../pages/Dashboard/admin/components/PatientProfile';
import DoctorProfile from '../pages/Dashboard/admin/components/DoctorProfile';
import PatientList from '../pages/Dashboard/admin/components/PatientList';

const AdminRoute =[

    { 
        path: "add-doctors",
        element: <DoctorMan/>,

    },{
        path:'admin/patients',
        element:<PatientList/>
    },
    {
        path:'admin/medical_records',
        element:<MedRec/>
    },
    {
        path:'admin/pharmacy',
        element:<DoctorProfile/>
    }
    

    
]

export default AdminRoute;