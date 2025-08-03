import { CalendarDays, Clock } from 'lucide-react';
import React from 'react';

const SelectedTimeAndDate = () => {
    return (
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
    );
};

export default SelectedTimeAndDate;