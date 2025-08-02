import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import NeedHelpSection from './componants/NeedHelpSection';
import SelectDoctorSection from './componants/SelectDoctorSection';
import { setStep } from '../../../../redux/features/appoinment/appoinmentSlice';

const SelectDoctorSectionMain = () => {

    const step=useAppSelector((state) => state.booking);
    console.log(step.step,'this is for step');

      const dispatch = useAppDispatch();

      useEffect(() => {
        dispatch(setStep(1));
      },[])

    return (
        <div className='flex  gap-2'>

            <SelectDoctorSection />
            <NeedHelpSection/>
        </div>
    );
};

export default SelectDoctorSectionMain;