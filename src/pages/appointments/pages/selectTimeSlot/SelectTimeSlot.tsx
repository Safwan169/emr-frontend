import { useEffect } from 'react';
import CalenderPicker from '../../../../designSlotComponents/CalenderPicker';
import TimeSlotPicker from '../../../../designSlotComponents/components/TimeSlotPicker';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import NeedHelpSection from '../selectDoctor/componants/NeedHelpSection';
import SelectDoctorSection from '../selectDoctor/componants/SelectDoctorSection';
import SelectedDoctorSection from './componats/SelectedDoctorSection';
import { setStep } from '../../../../redux/features/appoinment/appoinmentSlice';

const SelectTimeSlot = () => {

    const selectedDoctor = useAppSelector((state) => state.booking.selectedDoctor);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStep(2));
  },[])

    return (
        <div className='flex  gap-2'>

        <div className='max-w-[65%] w-full space-y-2 mt-2'>
                <CalenderPicker />
            <TimeSlotPicker />
        </div>
            <div className=''>

                <SelectedDoctorSection doctor={selectedDoctor} />


                <NeedHelpSection />
            </div>
        </div>
    );
};

export default SelectTimeSlot;