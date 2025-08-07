import React, { useState, useEffect, ReactElement } from "react";
import {
  User,
  Users,
  Calendar,
  Package,
  Activity,
  AlertCircle,
  Star,
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
  chartData: number[];
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

interface ApiData {
  doctorCount: number;
  patientCount: number;
  doctorWeeklyData: Array<{ date: string; count: number }>;
  patientWeeklyData: Array<{ date: string; count: number }>;
  appointmentData: Array<{ date: string; count: number }>;
}

// --- Mini Bar Chart Component ---
const MiniBarChart: React.FC<{ data: number[]; color: string }> = ({
  data,
  color,
}) => {
  const maxValue = Math.max(...data, 1);

  return (
    <div className="flex items-end space-x-1 h-12 w-20">
      {data.map((value, index) => (
        <div
          key={index}
          className={`${color} rounded-sm flex-1 transition-all duration-300`}
          style={{
            height: `${(value / maxValue) * 100}%`,
            minHeight: value > 0 ? "2px" : "1px",
          }}
        />
      ))}
    </div>
  );
};

// --- Static Data ---
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

// --- Utility Functions ---
const calculatePercentageChange = (data: Array<{ count: number }>) => {
  console.log(data, "thsi is fdata");

  if (data.length < 2) return 0;

  const currentWeekTotal = data
    ?.slice(-7)
    .reduce((sum, item) => sum + item.count, 0);
  const previousWeekTotal = data
    ?.slice(-14, -7)
    .reduce((sum, item) => sum + item.count, 0);

  if (previousWeekTotal === 0) return currentWeekTotal > 0 ? 100 : 0;
  return ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;
};

const getTodaysCount = (data: Array<{ date: string; count: number }>) => {
  const today = new Date().toISOString().split("T")[0];
  const todayData = data.find((item) => item.date === today);
  return todayData ? todayData.count : 0;
};

// --- Main Component ---
const Dashboard: React.FC = () => {
  const [apiData, setApiData] = useState<ApiData>({
    doctorCount: 0,
    patientCount: 0,
    doctorWeeklyData: [],
    patientWeeklyData: [],
    appointmentData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual base URL
  const BASE_URL = "http://localhost:5000"; // Replace this with your actual base URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all API data concurrently using fetch API
        const [
          doctorCountRes,
          patientCountRes,
          doctorWeeklyRes,
          patientWeeklyRes,
          appointmentRes,
        ] = await Promise.all([
          fetch(`${BASE_URL}/Appointments/Doctors/Count`).then((res) =>
            res.json()
          ),
          fetch(`${BASE_URL}/Appointments/Patients/Count`).then((res) =>
            res.json()
          ),
          fetch(`${BASE_URL}/Appointments/Doctors/New/Last7Days`).then((res) =>
            res.json()
          ),
          fetch(`${BASE_URL}/Appointments/Patients/New/Last7Days`).then((res) =>
            res.json()
          ),
          fetch(`${BASE_URL}/Appointments/Count`).then((res) => res.json()),
        ]);

        setApiData({
          doctorCount: doctorCountRes.doctorCount,
          patientCount: patientCountRes.patientCount,
          doctorWeeklyData: doctorWeeklyRes,
          patientWeeklyData: patientWeeklyRes,
          appointmentData: appointmentRes,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate stats with API data
  const getStats = (): Stat[] => {
    const doctorChange = calculatePercentageChange(apiData.doctorWeeklyData);
    const patientChange = calculatePercentageChange(apiData.patientWeeklyData);
    const appointmentChange = calculatePercentageChange(
      apiData.appointmentData
    );
    const todaysAppointments = getTodaysCount(apiData.appointmentData);

    return [
      {
        title: "Total Doctor",
        value: apiData.doctorCount.toString(),
        icon: <User className="w-8 h-8 text-blue-600" />,
        change: `${doctorChange >= 0 ? "+" : ""}${doctorChange.toFixed(
          1
        )}% Than Last Week`,
        textColor: doctorChange >= 0 ? "text-green-600" : "text-red-600",
        bgColor: "bg-blue-100",
        chartData: apiData.doctorWeeklyData.map((item) => item.count),
      },
      {
        title: "Total Patients",
        value: apiData.patientCount.toString(),
        icon: <Users className="w-8 h-8 text-green-600" />,
        change: `${patientChange >= 0 ? "+" : ""}${patientChange.toFixed(
          1
        )}% Than Last Week`,
        textColor: patientChange >= 0 ? "text-green-600" : "text-red-600",
        bgColor: "bg-green-100",
        chartData: apiData.patientWeeklyData.map((item) => item.count),
      },
      {
        title: "Appointments Today",
        value: todaysAppointments.toString(),
        icon: <Calendar className="w-8 h-8 text-orange-600" />,
        change: `${
          appointmentChange >= 0 ? "+" : ""
        }${appointmentChange.toFixed(1)}% Than Last Week`,
        textColor: appointmentChange >= 0 ? "text-green-600" : "text-red-600",
        bgColor: "bg-orange-100",
        chartData: apiData.appointmentData.map((item) => item.count),
      },
      {
        title: "Medicine Stock",
        value: "49585", // This remains static as no API provided
        icon: <Package className="w-8 h-8 text-purple-600" />,
        change: "+6.2% Than Last Week",
        textColor: "text-purple-600",
        bgColor: "bg-purple-100",
        chartData: [10, 15, 8, 22, 18, 25, 30], // Static mock data
      },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-gray-100 flex"
            >
              {/* Left icon + vertical stack */}
              <div className="flex flex-col mr-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {stat.title}
                  </p>
                </div>
                <p className="mt-4 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div className="flex items-center justify-between mt-2 w-full">
                  <p className={`text-xs font-medium ${stat.textColor}`}>
                    {stat.change}
                  </p>
                  <img
                    src={''}
                    alt={`${stat.title} graph`}
                    className="w-20 h-12 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid - Equal Width (50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activities
                </h2>
                <button className="text-sm text-blue-900 hover:text-blue-700 transition-colors">
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3 py-3">
                    <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.subtitle}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Today's Appointment
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base text-green-600 font-medium">
                    Total 18
                  </span>
                  <button className="text-sm sm:text-base text-blue-900 hover:text-blue-700 transition-colors">
                    View All
                  </button>
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
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {appointment.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {appointment.doctor}
                      </p>
                      <button className="mt-1 px-2 py-0.5 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full whitespace-nowrap hover:bg-green-200 transition-colors">
                        {appointment.status}
                      </button>
                    </div>
                    <div className="text-right text-xs sm:text-sm whitespace-nowrap">
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
                <h2 className="text-lg font-semibold text-gray-900">
                  Top Performing Doctors
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {topDoctors.map((doctor, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-6 border border-gray-200 rounded-lg min-h-[100px] hover:shadow-md transition-shadow"
                  >
                    <img
                      src={doctor.avatar}
                      alt={`${doctor.name} avatar`}
                      className="w-14 h-14 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-blue-500 font-semibold">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">
                            {doctor.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {doctor.experience}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {doctor.earnings}
                      </p>
                      <p className="text-xs text-gray-500">{doctor.patients}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Utilization */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Department Utilization
              </h2>
              <div className="space-y-4">
                {departments.map((dept, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${dept.color}`}
                        ></div>
                        <span className="text-sm font-medium text-gray-700">
                          {dept.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {dept.usage}%
                          </p>
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
                        className={`h-2 rounded-full ${dept.color} transition-all duration-500`}
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
