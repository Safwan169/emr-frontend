import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Users, Calendar, Package } from "lucide-react";

type Stat = {
  title: string;
  value: string;
  iconKey: keyof typeof iconMap;
  change: string;
  textColor: string;
  bgColor: string;
  stroke: string;
  colorVariant: string;
  trendData: number[];
  gradient: string;
};

const iconMap = {
  doctor: <User className="w-8 h-8 text-blue-600" />,
  patients: <Users className="w-8 h-8 text-green-600" />,
  appointments: <Calendar className="w-8 h-8 text-orange-600" />,
  medicine: <Package className="w-8 h-8 text-purple-600" />,
};

const NewCard: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const generateSmoothPath = (data: number[]): string => {
    if (!data || !data.length) return "";
    const width = 200;
    const height = 60;
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const len = data.length;

    const points = data.map((val, i) => {
      const x = (i / (len - 1)) * width;
      const y = height - ((val - minVal) / (maxVal - minVal || 1)) * height;
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cpX = (points[i - 1].x + points[i].x) / 2;
      const cpY1 = points[i - 1].y;
      path += ` Q ${cpX} ${cpY1} ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const generateSmoothAreaPath = (data: number[]): string => {
    if (!data || !data.length) return "";
    const width = 200;
    const height = 60;
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const len = data.length;

    const points = data.map((val, i) => {
      const x = (i / (len - 1)) * width;
      const y = height - ((val - minVal) / (maxVal - minVal || 1)) * height;
      return { x, y };
    });

    let path = `M ${points[0].x} ${height} L ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cpX = (points[i - 1].x + points[i].x) / 2;
      const cpY1 = points[i - 1].y;
      path += ` Q ${cpX} ${cpY1} ${points[i].x} ${points[i].y}`;
    }

    path += ` L ${points[len - 1].x} ${height} Z`;
    return path;
  };

  useEffect(() => {
    setLoading(true);
    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}`;

    Promise.all([
      axios.get<{ doctorCount: number }>(`${baseUrl}/Appointments/Doctors/Count`),
      axios.get<{ patientCount: number }>(`${baseUrl}/Appointments/Patients/Count`),
      axios.get<{ totalAppointments: number }>(`${baseUrl}/Appointments/Count`),
      axios.get<{ date: string; count: number }[]>(`${baseUrl}/Appointments/Doctors/New/Last7Days`),
      axios.get<{ date: string; count: number }[]>(`${baseUrl}/Appointments/Patients/New/Last7Days`),
      axios.get<{ date: string; count: number }[]>(`${baseUrl}/Appointments/Last7Days`),
    ])
      .then(([
        docCountRes,
        patCountRes,
        appCountRes,
        docTrendRes,
        patTrendRes,
        appTrendRes,
      ]) => {
        const statsData: Stat[] = [
          {
            title: "Total Doctor",
            value: docCountRes.data.doctorCount.toString(),
            iconKey: "doctor",
            change: "+8.5% Than Last Week",
            textColor: "text-blue-600",
            bgColor: "bg-blue-100",
            stroke: "#2563eb",
            colorVariant: "blue",
            trendData: docTrendRes.data.map((d) => d.count),
            gradient: "#2563eb",
          },
          {
            title: "Total Patients",
            value: patCountRes.data.patientCount.toString(),
            iconKey: "patients",
            change: "+2.4% Than Last Week",
            textColor: "text-green-600",
            bgColor: "bg-green-100",
            stroke: "#16a34a",
            colorVariant: "green",
            trendData: patTrendRes.data.map((d) => d.count),
            gradient: "#16a34a",
          },
          {
            title: "Appointments Today",
            value: appCountRes.data.totalAppointments.toString(),
            iconKey: "appointments",
            change: "+8.7% Than Yesterday",
            textColor: "text-orange-600",
            bgColor: "bg-orange-100",
            stroke: "#ea580c",
            colorVariant: "orange",
            trendData: appTrendRes.data.map((d) => d.count),
            gradient: "#ea580c",
          },
          {
            title: "Medicine Stock",
            value: "49585",
            iconKey: "medicine",
            change: "+6.2% Than Last Week",
            textColor: "text-purple-600",
            bgColor: "bg-purple-100",
            stroke: "#9333ea",
            colorVariant: "purple",
            trendData: [50, 55, 53, 60, 58, 65, 62],
            gradient: "#9333ea",
          },
        ];
        setStats(statsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col justify-between animate-pulse"
            style={{ height: 140 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col justify-between"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {iconMap[stat.iconKey] ?? <User className="w-8 h-8 text-gray-600" />}
            </div>
            <p className="text-lg font-semibold text-gray-900">{stat.title}</p>
          </div>

          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>

          <div className="flex items-center justify-between mt-2">
            <p className={`text-xs font-medium ${stat.textColor}`}>{stat.change}</p>
            <div className="w-48 h-14 overflow-hidden">
              <svg
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                className="w-full h-full block"
              >
                <defs>
                  <linearGradient
                    id={`areaGradient-${stat.colorVariant}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={stat.gradient} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={stat.gradient} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d={generateSmoothAreaPath(stat.trendData)}
                  fill={`url(#areaGradient-${stat.colorVariant})`}
                />
                <path
                  d={generateSmoothPath(stat.trendData)}
                  stroke={stat.gradient}
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewCard;
