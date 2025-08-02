import { CalendarDays, Clock, IndianRupee, Star, Stethoscope } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Summary:React.FC<any> = ({doctor}) => {
    return (
        <div className="md:col-span-2 mt-2 space-y-6">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <h3 className="text-gray-700 text-sm font-bold">
                        Available Time Slots
                    </h3>

                    {/* Doctor Info */}
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                        <img
                            src={doctor?.imageUrl}
                            alt="Doctor"
                            className="w-14 h-14 rounded-full object-cover mr-4"
                        />
                        <div>
                            <h4 className="text-md font-semibold text-gray-800">

                                {doctor?.name}
                            </h4>
                            <p className="text-sm text-blue-600">{doctor?.specialty}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{doctor?.rating}</span> • <span>{doctor?.experience} Experience</span>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Date */}
                        <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                            <CalendarDays className="text-blue-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Monday, 26 July 2025
                                </p>
                                <p className="text-xs text-gray-500">Appointments Date</p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                            <Clock className="text-blue-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    08:00 - 12:00 PM
                                </p>
                                <p className="text-xs text-gray-500">Appointments Time</p>
                            </div>
                        </div>

                        {/* Type */}
                        <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                            <Stethoscope className="text-blue-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Consultation
                                </p>
                                <p className="text-xs text-gray-500">Appointments Type</p>
                            </div>
                        </div>

                        {/* Fee */}
                        <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-3">
                            <IndianRupee className="text-blue-600 w-5 h-5 mt-1" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">৳ 300.00</p>
                                <p className="text-xs text-gray-500">Consultation Fee</p>
                            </div>
                        </div>
                    </div>

                    {/* Total & Confirm */}
                    <div className="border-t pt-4 flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-800">Total Amount</p>
                        <p className="text-lg font-bold text-gray-800">৳ 300.00</p>
                    </div>
                    <p className="text-xs text-gray-500">
                        Lorem ipsum dolor sit amet consectetur. Cras id vitae consequat
                        ultrices.
                    </p>
                    <Link to={'/confirm-appointment'}>


                        <button className="w-full bg-[#1C3BA4] mt-3 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                            Confirm Appointment
                        </button>
                    </Link>

                    <p className="text-center text-[11px] text-gray-500 mt-2">
                        By confirming, you agree to our terms and conditions. <br />
                        You will receive a confirmation email shortly.
                    </p>
                </div>


            </div>

    );
};

export default Summary;