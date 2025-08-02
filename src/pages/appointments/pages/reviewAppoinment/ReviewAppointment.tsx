import {
    CalendarDays,
    Clock,
    IndianRupee,
    Star,
    Stethoscope,
} from "lucide-react";
import SelectedDoctorSection from "../selectTimeSlot/componats/SelectedDoctorSection";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useEffect } from "react";
import { setStep } from "../../../../redux/features/appoinment/appoinmentSlice";
import { Link } from "react-router-dom";
import Summary from "./componants/Summary";
import NeedHelpSection from "../selectDoctor/componants/NeedHelpSection";
import SelectedTimeAndDate from "../../components/SelectedTimeAndDate";

const ReviewAppointment = () => {

    const selectedDoctor = useAppSelector((state) => state.booking.selectedDoctor);
    console.log(selectedDoctor, 'thsi is selected doctor');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setStep(4));
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3   ">
            {/* Left Content */}
            <Summary doctor = {selectedDoctor} />
            {/* Right Sidebar */}
            <div className="md:col-span-1 space-y-2">
                <SelectedDoctorSection doctor={selectedDoctor} />

{/* this is for selected time and date  */}
             <SelectedTimeAndDate/>

                {/* Need Help */}
                <NeedHelpSection />
            </div>
        </div>
    );
};

export default ReviewAppointment;