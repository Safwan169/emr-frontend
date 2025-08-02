import { useAppSelector } from '../../../../redux/hooks';
import NeedHelpSection from '../selectDoctor/componants/NeedHelpSection';
import SelectDoctorSection from '../selectDoctor/componants/SelectDoctorSection';
import SelectedDoctorSection from './componats/SelectedDoctorSection';

const SelectTimeSlot = () => {

    const selectedDoctor = useAppSelector((state) => state.booking.selectedDoctor);

    console.log(selectedDoctor,'adfssadf');

    return (
        <div className='flex  gap-2'>

              <SelectDoctorSection />

            <div className=''>

                <SelectedDoctorSection doctor={selectedDoctor} />      
            
            
            <NeedHelpSection/>
            </div>
              </div>
    );
};

export default SelectTimeSlot;