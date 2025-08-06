import { useEffect, useState } from 'react';
import CalenderPicker from '../../components/CalenderPicker';
import TimeSlotPicker from '../../components/TimeSlotPicker';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import NeedHelpSection from '../selectDoctor/componants/NeedHelpSection';
import SelectedDoctorSection from './componats/SelectedDoctorSection';
import { setStep } from '../../../../../../redux/features/appoinment/appoinmentSlice';

const SelectTimeSlot = () => {
  const selectedDoctor = useAppSelector((state) => state.booking.selectedDoctor);
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setStep(2));
  }, []);
  

  return (
    <div className="flex gap-2">
      <div className="max-w-[65%] w-full space-y-2 mt-2">
        <CalenderPicker onDateSelect={setSelectedDate} />
        <TimeSlotPicker selectedDate={selectedDate} />
      </div>
      <div>
        <SelectedDoctorSection doctor={selectedDoctor} />
        <NeedHelpSection />
      </div>
    </div>
  );
};

export default SelectTimeSlot;
