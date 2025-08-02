import {
    CalendarDays,
    Clock,
    IndianRupee,
    Star,
    Stethoscope,
} from "lucide-react";
import NeedHelp from "../../../../designSlotComponents/components/NeedHelp";
import SelectedDoctorSection from "../selectTimeSlot/componats/SelectedDoctorSection";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useEffect } from "react";
import { setStep } from "../../../../redux/features/appoinment/appoinmentSlice";
import { Link } from "react-router-dom";
import Summary from "./componants/Summary";

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


                <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="text-gray-700 text-sm font-medium mb-4">
                        Selected Date & Time
                    </h3>

                    {/* Date Row */}
                    <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 mb-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <CalendarDays className="text-blue-600 w-5 h-5" />
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            Thursday, July 31, 2025
                        </p>
                    </div>

                    {/* Time Row */}
                    <div className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Clock className="text-blue-600 w-5 h-5" />
                        </div>
                        <p className="text-sm text-gray-700 font-medium">09:00 AM</p>
                    </div>
                </div>

                {/* Need Help */}
                <NeedHelp />
            </div>
        </div>
    );
};

export default ReviewAppointment;