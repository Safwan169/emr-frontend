import React from 'react';

interface Appointment {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  status: 'confirm' | 'pending';
  avatar: string;
}

const AppointmentList: React.FC = () => {
  // Sample data - replace with your API data later
  const appointments: Appointment[] = [
    {
      id: '1',
      name: 'Mashrukh Khan',
      type: 'Check-up',
      date: 'August 22, 2025',
      time: '10:00 AM',
      status: 'confirm',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b55c?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Mridul Chowdhury',
      type: 'Follow-up',
      date: 'August 22, 2025',
      time: '10:00 AM',
      status: 'confirm',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Britto Khan',
      type: 'Consultation',
      date: 'August 22, 2025',
      time: '10:00 AM',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Sarah',
      type: 'Consultation',
      date: 'August 22, 2025',
      time: '10:00 AM',
      status: 'confirm',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirm':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-500';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirm':
        return 'Confirm';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-1/2">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Appointment List</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Appointment Items */}
      <div className="divide-y divide-gray-100">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            {/* Left Section - Avatar and Info */}
            <div className="flex items-center space-x-4">
              <img
                src={appointment.avatar}
                alt={appointment.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-900">{appointment.name}</h3>
                <p className="text-sm text-gray-600">{appointment.type}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 mr-1">•</span>
                  <span className={`text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Date and Time */}
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Today</div>
              <div className="text-sm font-medium text-gray-900">
                {appointment.date} - {appointment.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;