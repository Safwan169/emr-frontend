import React, { useEffect } from 'react';
import DetailForm from './componants/DetailsForm';
import SelectedDoctorSection from '../selectTimeSlot/componats/SelectedDoctorSection';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStep } from '../../../../redux/features/appoinment/appoinmentSlice';
import NeedHelpSection from '../selectDoctor/componants/NeedHelpSection';
import SelectedTimeAndDate from '../../components/SelectedTimeAndDate';

const AppointmentDetails = () => {
  const selectedDoctor = useAppSelector((state) => state.booking.selectedDoctor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStep(3));
  }, [] )

  return (
    <div className='flex  w-full  gap-[14px]'>
      <div className="w-full max-w-[60%] ">
        {/* left content */}
        <DetailForm/>
      </div>
{/* right content */}
      <div className='w-full space-y-2 max-w-[40%]'>
        <SelectedDoctorSection doctor={selectedDoctor}/>
        
        <SelectedTimeAndDate/>
        <NeedHelpSection/>
      </div>
    </div>
  );
};

export default AppointmentDetails;