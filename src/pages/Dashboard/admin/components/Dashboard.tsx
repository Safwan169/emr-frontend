import React, { ReactElement } from "react";
import { 
  User, 
  Users, 
  Calendar, 
  Package, 
  Activity, 
  AlertCircle,
  Star
} from "lucide-react";
import NewCard from "./NewCard";

// --- Types ---
interface Stat {
  title: string;
  value: string;
  icon: ReactElement;
  change: string;
  textColor: string;
  bgColor: string;
  graphSrc: string;
}

interface ActivityItem {
  icon: ReactElement;
  title: string;
  subtitle: string;
  time: string;
}

interface Appointment {
  name: string;
  doctor: string;
  time: string;
  date: string;
  status: string;
  avatar: string | null;
}

interface Doctor {
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  patients: string;
  earnings: string;
  avatar: string;
}

interface Department {
  name: string;
  usage: number;
  color: string;
  status: string;
}

// --- Data ---
const stats: Stat[] = [
  {
    title: "Total Doctor",
    value: "209",
    icon: <User className="w-8 h-8 text-blue-600" />,
    change: "+8.5% Than Last Week",
    textColor: "text-blue-600",
    bgColor: "bg-blue-100",
    graphSrc: "https://www.svgrepo.com/show/303003/line-chart.svg",
  },
  {
    title: "Total Patients",
    value: "2345",
    icon: <Users className="w-8 h-8 text-green-600" />,
    change: "+2.4% Than Last Week",
    textColor: "text-green-600",
    bgColor: "bg-green-100",
    graphSrc: "https://www.svgrepo.com/show/303003/line-chart.svg",
  },
  {
    title: "Appointments Today",
    value: "68",
    icon: <Calendar className="w-8 h-8 text-orange-600" />,
    change: "+8.7% Than Yesterday",
    textColor: "text-orange-600",
    bgColor: "bg-orange-100",
    graphSrc: "https://www.svgrepo.com/show/303003/line-chart.svg",
  },
  {
    title: "Medicine Stock",
    value: "49585",
    icon: <Package className="w-8 h-8 text-purple-600" />,
    change: "+6.2% Than Last Week",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
    graphSrc: "https://www.svgrepo.com/show/303003/line-chart.svg",
  },
];

const recentActivities: ActivityItem[] = [
  {
    icon: <User className="w-4 h-4 text-green-500" />,
    title: "New patient registered",
    subtitle: "Sarah Johnson • 5 min ago",
    time: "Today",
  },
  {
    icon: <Package className="w-4 h-4 text-purple-500" />,
    title: "Medication dispensed",
    subtitle: "Pharmacy • 21 min ago",
    time: "Today",
  },
  {
    icon: <User className="w-4 h-4 text-blue-500" />,
    title: "New patient registered",
    subtitle: "John Anderson • 1 hour ago",
    time: "Today",
  },
  {
    icon: <AlertCircle className="w-4 h-4 text-red-500" />,
    title: "Emergency admission",
    subtitle: "ER Dept • 2 hours ago",
    time: "Today",
  },
  {
    icon: <Activity className="w-4 h-4 text-blue-500" />,
    title: "Lab report ready",
    subtitle: "Lab Department • 1 hour ago",
    time: "Today",
  },
];

const defaultAvatar = "https://i.pravatar.cc/40?u=default";

const appointments: Appointment[] = [
  {
    name: "Mashirah Khan",
    doctor: "Dr. Smith • Consultation",
    time: "Today",
    date: "August 22, 2025",
    status: "Confirm",
    avatar: null,
  },
  {
    name: "Millad Chowdhury",
    doctor: "Dr. Smith • Consultation",
    time: "Today",
    date: "August 22, 2025 - 10:00 AM",
    status: "Confirm",
    avatar: null,
  },
  {
    name: "Britto Khan",
    doctor: "Dr. Smith • Consultation",
    time: "Today",
    date: "August 22, 2025 - 10:00 AM",
    status: "Confirm",
    avatar: null,
  },
  {
    name: "Sarah",
    doctor: "Dr. Smith • Consultation",
    time: "Today",
    date: "August 22, 2025 - 10:00 AM",
    status: "Confirm",
    avatar: null,
  },
];

const topDoctors: Doctor[] = [
  {
    name: "Dr. Safi Channa",
    specialty: "Orthopedic Surgery",
    rating: 4.7,
    experience: "15 Years Experience",
    patients: "1764 Patients",
    earnings: "$300.00",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Amina Noor",
    specialty: "Cardiology",
    rating: 4.9,
    experience: "12 Years Experience",
    patients: "1984 Patients",
    earnings: "$450.00",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Imran Hasan",
    specialty: "Neurology",
    rating: 4.8,
    experience: "10 Years Experience",
    patients: "1423 Patients",
    earnings: "$350.00",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const departments: Department[] = [
  { name: "Emergency", usage: 100, color: "bg-green-500", status: "High" },
  { name: "ICU", usage: 95, color: "bg-red-500", status: "Critical" },
  { name: "General Ward", usage: 77, color: "bg-orange-500", status: "70%" },
  { name: "Pediatrics", usage: 65, color: "bg-blue-500", status: "Moderate" },
];

// --- Component ---
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gray-50  mt-2">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Stats Cards with api data*/}
       <NewCard />

        {/* Main Content Grid - Equal Width (50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-sm text-blue-900 ">View All</button>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3 py-3">
                    <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.subtitle}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Today's Appointment</h2>
                <div className="flex items-center space-x-5">
                  <span className="text-sm sm:text-base text-green-600 font-medium">Total 18</span>
                  <button className="text-sm sm:text-base text-blue-900">View All</button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {appointments.map((appointment, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 py-3"
                  >
                    <img
                      src={appointment.avatar || defaultAvatar}
                      alt={`${appointment.name} avatar`}
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-medium text-gray-900">{appointment.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{appointment.doctor}</p>
                      <button className="mt-1 px-2 py-0.5 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                        {appointment.status}
                      </button>
                    </div>
                    <div className="text-right text-xs sm:text-sm  whitespace-nowrap">
                      <p className="text-gray-500">{appointment.time}</p>
                      <p className="font-bold">{appointment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Performing Doctors */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Top Performing Doctors</h2>
                <button className="text-sm text-blue-600 ">View All</button>
              </div>
              <div className="space-y-4">
                {topDoctors.map((doctor, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-6 border border-gray-200 rounded-lg min-h-[100px]"
                  >
                    <img
                      src={doctor.avatar}
                      alt={`${doctor.name} avatar`}
                      className="w-15 h-15 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-xs text-blue-500 font-semibold">{doctor.specialty}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{doctor.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">{doctor.experience}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{doctor.earnings}</p>
                      <p className="text-xs text-gray-500">{doctor.patients}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Utilization */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Utilization</h2>
              <div className="space-y-4">
                {departments.map((dept, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                        <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{dept.usage}%</p>
                          <p className="text-xs text-gray-500">Occupied</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            dept.status === "High"
                              ? "bg-green-100 text-green-700"
                              : dept.status === "Critical"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {dept.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${dept.color}`}
                        style={{ width: `${dept.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
