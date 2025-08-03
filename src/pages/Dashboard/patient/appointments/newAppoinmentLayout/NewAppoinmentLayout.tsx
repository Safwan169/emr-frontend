import { useAppSelector } from '../../../../../redux/hooks';
import StepTabsExact from './componants/Tabs';
import { Outlet } from 'react-router-dom';

const NewAppoinmentLayout = () => {

    const step=useAppSelector((state) => state.booking);
    return (
        <div>
            <StepTabsExact currentStep={step.step} />

            <Outlet />
        </div>
    );
};

export default NewAppoinmentLayout;