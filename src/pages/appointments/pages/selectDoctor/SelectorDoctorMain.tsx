import NeedHelpSection from './componants/NeedHelpSection';
import SelectDoctorSection from './componants/SelectDoctorSection';

const SelectDoctorSectionMain = () => {
    return (
        <div className='flex  gap-2'>
            <SelectDoctorSection />
            <NeedHelpSection/>
        </div>
    );
};

export default SelectDoctorSectionMain;