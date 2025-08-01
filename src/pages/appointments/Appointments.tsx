import React from 'react';
import  AppointmentsList  from "./components/AppointmentsList";
import AppointmentTabs from './components/AppointmentTabs';
import RecentActivites from './components/RecentActivites';
const Appointments = () => {
    return (
        <div className='  flex justify-between gap-5  '>
           <div className='bg-white p-3   rounded-lg w-[60%]'>
             <AppointmentTabs />
            <AppointmentsList />
           </div>
            <div className='w-[40%] ' >
                <RecentActivites  />
            </div>
        </div>
    );
};

export default Appointments;