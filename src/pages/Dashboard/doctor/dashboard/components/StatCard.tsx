// import React from 'react';
// import { Shield, Calendar, FileText, Pill } from 'lucide-react';
// import { useGetDoctorPatientCountQuery, useGetTodaysAppointmentsQuery } from '../api/dashboardApi';

// type ColorVariant = 'blue' | 'green' | 'orange' | 'purple';

// interface PatientStatsCardProps {
//   title?: string;
//   totalCount?: number;
//   trendData?: number[];
//   colorVariant?: ColorVariant;
//   icon?: 'shield' | 'calendar' | 'fileText' | 'pill';
//   isLoading?: boolean;
// }

// const PatientStatsCard: React.FC<PatientStatsCardProps> = ({
//   title = "Total Patient",
//   totalCount = 0,
//   trendData = [0.3, 0.5, 0.2, 0.4, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9, 1.0, 0.85, 0.95],
//   colorVariant = 'blue',
//   icon = 'shield',
//   isLoading = false
// }) => {
//   // Color configurations
//   const colorConfig = {
//     blue: {
//       bg: 'bg-blue-600',
//       gradient: '#6366f1',
//       gradientLight: '#6366f1'
//     },
//     green: {
//       bg: 'bg-green-600',
//       gradient: '#10b981',
//       gradientLight: '#10b981'
//     },
//     orange: {
//       bg: 'bg-orange-500',
//       gradient: '#f59e0b',
//       gradientLight: '#f59e0b'
//     },
//     purple: {
//       bg: 'bg-purple-500',
//       gradient: '#8b5cf6',
//       gradientLight: '#8b5cf6'
//     }
//   };

//   // Icon mapping
//   const iconMap = {
//     shield: Shield,
//     calendar: Calendar,
//     fileText: FileText,
//     pill: Pill
//   };

//   const IconComponent = iconMap[icon];
//   const colors = colorConfig[colorVariant];

//   // Generate last 7 days dates
//   const generateLast7Days = () => {
//     const dates = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       dates.push(date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric' 
//       }));
//     }
//     return dates;
//   };

//   const dateLabels = generateLast7Days();

//   // Generate smooth SVG path using curves
//   const generateSmoothPath = (data: number[]) => {
//     const width = 200;
//     const height = 60;
//     const stepX = width / (data.length - 1);
    
//     if (data.length < 2) return '';
    
//     let path = `M 0 ${height - data[0] * height}`;
    
//     for (let i = 1; i < data.length; i++) {
//       const x = i * stepX;
//       const y = height - data[i] * height;
      
//       if (i === 1) {
//         // First curve
//         const prevX = 0;
//         const prevY = height - data[0] * height;
//         const cpX1 = prevX + stepX * 0.3;
//         const cpY1 = prevY;
//         const cpX2 = x - stepX * 0.3;
//         const cpY2 = y;
//         path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
//       } else {
//         // Subsequent curves
//         const cpX1 = (i - 1) * stepX + stepX * 0.3;
//         const cpY1 = height - data[i - 1] * height;
//         const cpX2 = x - stepX * 0.3;
//         const cpY2 = y;
//         path += ` S ${cpX2} ${cpY2}, ${x} ${y}`;
//       }
//     }
    
//     return path;
//   };

//   // Generate smooth area path
//   const generateSmoothAreaPath = (data: number[]) => {
//     const width = 200;
//     const height = 60;
//     const linePath = generateSmoothPath(data);
    
//     if (!linePath) return '';
    
//     return linePath + ` L ${width} ${height} L 0 ${height} Z`;
//   };

//   return (
//     <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 w-full">
//       {/* Header with icon and title */}
//       <div className="flex items-center gap-3 mb-4">
//         <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
//           <IconComponent className="w-5 h-5 text-white" />
//         </div>
//         <h3 className="text-gray-700 font-medium text-base">{title}</h3>
//       </div>
      
//       {/* Content row: Count + Text and Graph */}
//       <div className="flex items-center justify-between">
//         {/* Left side: Count and text - smaller section */}
//         <div className="flex flex-col flex-shrink-0 w-20">
//           <div className="text-2xl font-bold text-gray-900 mb-1">
//             {isLoading ? (
//               <div className="bg-gray-200 animate-pulse h-8 w-16 rounded"></div>
//             ) : (
//               totalCount.toLocaleString()
//             )}
//           </div>
//           <div className="text-xs text-gray-500">
//             Last 7 days graph
//           </div>
//         </div>
        
//         {/* Right side: Trend chart - larger section */}
//         <div className="relative flex-1 ml-1 min-w-0">
//           <div className="h-14">
//             {isLoading ? (
//               <div className="bg-gray-200 animate-pulse h-full w-full rounded"></div>
//             ) : (
//               <svg
//                 width="100%"
//                 height="60"
//                 viewBox="0 0 200 60"
//                 preserveAspectRatio="none"
//                 className="w-full h-full"
//               >
//                 <defs>
//                   <linearGradient id={`areaGradient-${colorVariant}`} x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor={colors.gradient} stopOpacity="0.3" />
//                     <stop offset="100%" stopColor={colors.gradient} stopOpacity="0.05" />
//                   </linearGradient>
//                 </defs>
                
//                 {/* Area fill */}
//                 <path
//                   d={generateSmoothAreaPath(trendData)}
//                   fill={`url(#areaGradient-${colorVariant})`}
//                 />
                
//                 {/* Trend line */}
//                 <path
//                   d={generateSmoothPath(trendData)}
//                   stroke={colors.gradient}
//                   strokeWidth="2.5"
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // At a glance component that uses the PatientStatsCard with API integration
// interface AtAGlanceProps {
//   doctorId: string;
// }

// const AtAGlance: React.FC<AtAGlanceProps> = ({ doctorId }) => {
//   // API calls
//   const { 
//     data: patientCountData, 
//     isLoading: isPatientCountLoading, 
//     error: patientCountError 
//   } = useGetDoctorPatientCountQuery(doctorId);

//   const { 
//     data: todaysAppointmentsData, 
//     isLoading: isTodaysAppointmentsLoading, 
//     error: todaysAppointmentsError 
//   } = useGetTodaysAppointmentsQuery(doctorId);

//   // Static data for cards that don't have API endpoints yet
//   const staticCardsData = [
//     {
//       title: "Total Pending Reports",
//       totalCount: 54,
//       colorVariant: 'orange' as ColorVariant,
//       icon: 'fileText' as const,
//       trendData: [0.4, 0.3, 0.5, 0.2, 0.6, 0.7, 0.8]
//     },
//     {
//       title: "Total Prescriptions Issued",
//       totalCount: 196,
//       colorVariant: 'purple' as ColorVariant,
//       icon: 'pill' as const,
//       trendData: [0.5, 0.3, 0.7, 0.4, 0.8, 0.6, 0.9]
//     }
//   ];

//   return (
//     <div className="p-3 sm:p-4 bg-gray-50">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//         {/* Total Patients - from API */}
//         <PatientStatsCard
//           title="Total Patient"
//           totalCount={patientCountData?.patientCount || 0}
//           colorVariant="blue"
//           icon="shield"
//           trendData={[0.3, 0.5, 0.2, 0.4, 0.8, 0.6, 0.9]}
//           isLoading={isPatientCountLoading}
//         />

//         {/* Today's Appointments - from API */}
//         <PatientStatsCard
//           title="Today's Appointment"
//           totalCount={todaysAppointmentsData?.total || 0}
//           colorVariant="green"
//           icon="calendar"
//           trendData={[0.2, 0.4, 0.3, 0.6, 0.5, 0.8, 0.9]}
//           isLoading={isTodaysAppointmentsLoading}
//         />

//         {/* Static cards */}
//         {staticCardsData.map((card, index) => (
//           <PatientStatsCard
//             key={index + 2}
//             title={card.title}
//             totalCount={card.totalCount}
//             colorVariant={card.colorVariant}
//             icon={card.icon}
//             trendData={card.trendData}
//             isLoading={false}
//           />
//         ))}
//       </div>

//       {/* Error handling - you can customize this based on your UI patterns */}
//       {(patientCountError || todaysAppointmentsError) && (
//         <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm">
//             {patientCountError && "Failed to load patient count. "}
//             {todaysAppointmentsError && "Failed to load today's appointments. "}
//             Please try refreshing the page.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AtAGlance;




// import React from 'react';
// import { Shield, Calendar, FileText, Pill } from 'lucide-react';
// import { 
//   useGetDoctorPatientCountQuery, 
//   useGetTodaysAppointmentsQuery,
//   useGetDailyNewPatientsLast7DaysQuery
// } from '../api/dashboardApi';

// type ColorVariant = 'blue' | 'green' | 'orange' | 'purple';

// interface PatientStatsCardProps {
//   title?: string;
//   totalCount?: number;
//   trendData?: number[];
//   colorVariant?: ColorVariant;
//   icon?: 'shield' | 'calendar' | 'fileText' | 'pill';
//   isLoading?: boolean;
// }
// interface DailyStat {
//   date: string;
//   count: number;
// }

// const PatientStatsCard: React.FC<PatientStatsCardProps> = ({
//   title = "Total Patient",
//   totalCount = 0,
//   trendData = [0.3, 0.5, 0.2, 0.4, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9, 1.0, 0.85, 0.95],
//   colorVariant = 'blue',
//   icon = 'shield',
//   isLoading = false
// }) => {
//   // Color configurations
//   const colorConfig = {
//     blue: {
//       bg: 'bg-blue-600',
//       gradient: '#6366f1',
//       gradientLight: '#6366f1'
//     },
//     green: {
//       bg: 'bg-green-600',
//       gradient: '#10b981',
//       gradientLight: '#10b981'
//     },
//     orange: {
//       bg: 'bg-orange-500',
//       gradient: '#f59e0b',
//       gradientLight: '#f59e0b'
//     },
//     purple: {
//       bg: 'bg-purple-500',
//       gradient: '#8b5cf6',
//       gradientLight: '#8b5cf6'
//     }
//   };

//   // Icon mapping
//   const iconMap = {
//     shield: Shield,
//     calendar: Calendar,
//     fileText: FileText,
//     pill: Pill
//   };

//   const IconComponent = iconMap[icon];
//   const colors = colorConfig[colorVariant];

//   // Generate last 7 days dates
//   const generateLast7Days = () => {
//     const dates = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       dates.push(date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric' 
//       }));
//     }
//     return dates;
//   };

//   const dateLabels = generateLast7Days();

//   // Generate smooth SVG path using curves
//   const generateSmoothPath = (data: number[]) => {
//     const width = 200;
//     const height = 60;
//     const stepX = width / (data.length - 1);
    
//     if (data.length < 2) return '';
    
//     let path = `M 0 ${height - data[0] * height}`;
    
//     for (let i = 1; i < data.length; i++) {
//       const x = i * stepX;
//       const y = height - data[i] * height;
      
//       if (i === 1) {
//         // First curve
//         const prevX = 0;
//         const prevY = height - data[0] * height;
//         const cpX1 = prevX + stepX * 0.3;
//         const cpY1 = prevY;
//         const cpX2 = x - stepX * 0.3;
//         const cpY2 = y;
//         path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
//       } else {
//         // Subsequent curves
//         const cpX1 = (i - 1) * stepX + stepX * 0.3;
//         const cpY1 = height - data[i - 1] * height;
//         const cpX2 = x - stepX * 0.3;
//         const cpY2 = y;
//         path += ` S ${cpX2} ${cpY2}, ${x} ${y}`;
//       }
//     }
    
//     return path;
//   };

//   // Generate smooth area path
//   const generateSmoothAreaPath = (data: number[]) => {
//     const width = 200;
//     const height = 60;
//     const linePath = generateSmoothPath(data);
    
//     if (!linePath) return '';
    
//     return linePath + ` L ${width} ${height} L 0 ${height} Z`;
//   };

//   return (
//     <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 w-full">
//       {/* Header with icon and title */}
//       <div className="flex items-center gap-3 mb-4">
//         <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
//           <IconComponent className="w-5 h-5 text-white" />
//         </div>
//         <h3 className="text-gray-700 font-medium text-base">{title}</h3>
//       </div>
      
//       {/* Content row: Count + Text and Graph */}
//       <div className="flex items-center justify-between">
//         {/* Left side: Count and text - smaller section */}
//         <div className="flex flex-col flex-shrink-0 w-20">
//           <div className="text-2xl font-bold text-gray-900 mb-1">
//             {isLoading ? (
//               <div className="bg-gray-200 animate-pulse h-8 w-16 rounded"></div>
//             ) : (
//               totalCount.toLocaleString()
//             )}
//           </div>
//           <div className="text-xs text-gray-500">
//             Last 7 days graph
//           </div>
//         </div>
        
//         {/* Right side: Trend chart - larger section */}
//         <div className="relative flex-1 ml-1 min-w-0">
//           <div className="h-14">
//             {isLoading ? (
//               <div className="bg-gray-200 animate-pulse h-full w-full rounded"></div>
//             ) : (
//               <svg
//                 width="100%"
//                 height="60"
//                 viewBox="0 0 200 60"
//                 preserveAspectRatio="none"
//                 className="w-full h-full"
//               >
//                 <defs>
//                   <linearGradient id={`areaGradient-${colorVariant}`} x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor={colors.gradient} stopOpacity="0.3" />
//                     <stop offset="100%" stopColor={colors.gradient} stopOpacity="0.05" />
//                   </linearGradient>
//                 </defs>
                
//                 {/* Area fill */}
//                 <path
//                   d={generateSmoothAreaPath(trendData)}
//                   fill={`url(#areaGradient-${colorVariant})`}
//                 />
                
//                 {/* Trend line */}
//                 <path
//                   d={generateSmoothPath(trendData)}
//                   stroke={colors.gradient}
//                   strokeWidth="2.5"
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // At a glance component that uses the PatientStatsCard with API integration
// interface AtAGlanceProps {
//   doctorId: string;
// }

// const AtAGlance: React.FC<AtAGlanceProps> = ({ doctorId }) => {
//   // API calls
//   const { 
//     data: patientCountData, 
//     isLoading: isPatientCountLoading, 
//     error: patientCountError 
//   } = useGetDoctorPatientCountQuery(doctorId);

//   const { 
//     data: todaysAppointmentsData, 
//     isLoading: isTodaysAppointmentsLoading, 
//     error: todaysAppointmentsError 
//   } = useGetTodaysAppointmentsQuery(doctorId);

//   const { 
//     data: dailyNewPatientsData, 
//     isLoading: isDailyNewPatientsLoading 
//   } = useGetDailyNewPatientsLast7DaysQuery(doctorId);

//   // Process trend data from API
//   const getTrendData = (apiData: DailyStat[] | undefined) => {
//     if (!apiData || apiData.length === 0) return [0, 0, 0, 0, 0, 0, 0];
    
//     // Find the maximum count to normalize the values
//     const maxCount = Math.max(...apiData.map(item => item.count), 1);
    
//     // Return normalized values between 0 and 1
//     return apiData.map(item => item.count / maxCount);
//   };

//   // Static data for cards that don't have API endpoints yet
//   const staticCardsData = [
//     {
//       title: "Total Pending Reports",
//       totalCount: 54,
//       colorVariant: 'orange' as ColorVariant,
//       icon: 'fileText' as const,
//       trendData: [0.4, 0.3, 0.5, 0.2, 0.6, 0.7, 0.8]
//     },
//     {
//       title: "Total Prescriptions Issued",
//       totalCount: 196,
//       colorVariant: 'purple' as ColorVariant,
//       icon: 'pill' as const,
//       trendData: [0.5, 0.3, 0.7, 0.4, 0.8, 0.6, 0.9]
//     }
//   ];

//   return (
//     <div className="p-3 sm:p-4 bg-gray-50">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//         {/* Total Patients - from API */}
//         <PatientStatsCard
//           title="Total Patient"
//           totalCount={patientCountData?.patientCount || 0}
//           colorVariant="blue"
//           icon="shield"
//           trendData={getTrendData(dailyNewPatientsData)}
//           isLoading={isPatientCountLoading || isDailyNewPatientsLoading}
//         />

//         {/* Today's Appointments - from API */}
//         <PatientStatsCard
//           title="Today's Appointment"
//           totalCount={todaysAppointmentsData?.total || 0}
//           colorVariant="green"
//           icon="calendar"
//           trendData={[0.2, 0.4, 0.3, 0.6, 0.5, 0.8, 0.9]} // Using static trend data for now
//           isLoading={isTodaysAppointmentsLoading}
//         />

//         {/* Static cards */}
//         {staticCardsData.map((card, index) => (
//           <PatientStatsCard
//             key={index + 2}
//             title={card.title}
//             totalCount={card.totalCount}
//             colorVariant={card.colorVariant}
//             icon={card.icon}
//             trendData={card.trendData}
//             isLoading={false}
//           />
//         ))}
//       </div>

//       {/* Error handling - you can customize this based on your UI patterns */}
//       {(patientCountError || todaysAppointmentsError) && (
//         <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm">
//             {patientCountError && "Failed to load patient count. "}
//             {todaysAppointmentsError && "Failed to load today's appointments. "}
//             Please try refreshing the page.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AtAGlance;

import React from 'react';
import { Shield, Calendar, FileText, Pill } from 'lucide-react';
import { 
  useGetDoctorPatientCountQuery, 
  useGetTodaysAppointmentsQuery,
  useGetDailyNewPatientsLast7DaysQuery,
  useGetDailyAppointmentsLast7DaysQuery
} from '../api/dashboardApi';

type ColorVariant = 'blue' | 'green' | 'orange' | 'purple';

interface PatientStatsCardProps {
  title?: string;
  totalCount?: number;
  trendData?: number[];
  colorVariant?: ColorVariant;
  icon?: 'shield' | 'calendar' | 'fileText' | 'pill';
  isLoading?: boolean;
}

interface DailyStat {
  date: string;
  count: number;
}

const PatientStatsCard: React.FC<PatientStatsCardProps> = ({
  title = "Total Patient",
  totalCount = 0,
  trendData = [0.3, 0.5, 0.2, 0.4, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9, 1.0, 0.85, 0.95],
  colorVariant = 'blue',
  icon = 'shield',
  isLoading = false
}) => {
  // Color configurations
  const colorConfig = {
    blue: {
      bg: 'bg-blue-600',
      gradient: '#6366f1',
      gradientLight: '#6366f1'
    },
    green: {
      bg: 'bg-green-600',
      gradient: '#10b981',
      gradientLight: '#10b981'
    },
    orange: {
      bg: 'bg-orange-500',
      gradient: '#f59e0b',
      gradientLight: '#f59e0b'
    },
    purple: {
      bg: 'bg-purple-500',
      gradient: '#8b5cf6',
      gradientLight: '#8b5cf6'
    }
  };

  // Icon mapping
  const iconMap = {
    shield: Shield,
    calendar: Calendar,
    fileText: FileText,
    pill: Pill
  };

  const IconComponent = iconMap[icon];
  const colors = colorConfig[colorVariant];

  // Generate smooth SVG path using curves
  const generateSmoothPath = (data: number[]) => {
    const width = 200;
    const height = 60;
    const stepX = width / (data.length - 1);
    
    if (data.length < 2) return '';
    
    let path = `M 0 ${height - data[0] * height}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = i * stepX;
      const y = height - data[i] * height;
      
      if (i === 1) {
        // First curve
        const prevX = 0;
        const prevY = height - data[0] * height;
        const cpX1 = prevX + stepX * 0.3;
        const cpY1 = prevY;
        const cpX2 = x - stepX * 0.3;
        const cpY2 = y;
        path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      } else {
        // Subsequent curves
        const cpX1 = (i - 1) * stepX + stepX * 0.3;
        const cpY1 = height - data[i - 1] * height;
        const cpX2 = x - stepX * 0.3;
        const cpY2 = y;
        path += ` S ${cpX2} ${cpY2}, ${x} ${y}`;
      }
    }
    
    return path;
  };

  // Generate smooth area path
  const generateSmoothAreaPath = (data: number[]) => {
    const width = 200;
    const height = 60;
    const linePath = generateSmoothPath(data);
    
    if (!linePath) return '';
    
    return linePath + ` L ${width} ${height} L 0 ${height} Z`;
  };

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 w-full">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-gray-700 font-medium text-base">{title}</h3>
      </div>
      
      {/* Content row: Count + Text and Graph */}
      <div className="flex items-center justify-between">
        {/* Left side: Count and text - smaller section */}
        <div className="flex flex-col flex-shrink-0 w-20">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {isLoading ? (
              <div className="bg-gray-200 animate-pulse h-8 w-16 rounded"></div>
            ) : (
              totalCount.toLocaleString()
            )}
          </div>
          <div className="text-xs text-gray-500">
            Last 7 days graph
          </div>
        </div>
        
        {/* Right side: Trend chart - larger section */}
        <div className="relative flex-1 ml-1 min-w-0">
          <div className="h-14">
            {isLoading ? (
              <div className="bg-gray-200 animate-pulse h-full w-full rounded"></div>
            ) : (
              <svg
                width="100%"
                height="60"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id={`areaGradient-${colorVariant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={colors.gradient} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={colors.gradient} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Area fill */}
                <path
                  d={generateSmoothAreaPath(trendData)}
                  fill={`url(#areaGradient-${colorVariant})`}
                />
                
                {/* Trend line */}
                <path
                  d={generateSmoothPath(trendData)}
                  stroke={colors.gradient}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// At a glance component that uses the PatientStatsCard with API integration
interface AtAGlanceProps {
  doctorId: string;
}

const AtAGlance: React.FC<AtAGlanceProps> = ({ doctorId }) => {
  // API calls
  const { 
    data: patientCountData, 
    isLoading: isPatientCountLoading, 
    error: patientCountError 
  } = useGetDoctorPatientCountQuery(doctorId);

  const { 
    data: todaysAppointmentsData, 
    isLoading: isTodaysAppointmentsLoading, 
    error: todaysAppointmentsError 
  } = useGetTodaysAppointmentsQuery(doctorId);

  const { 
    data: dailyNewPatientsData, 
    isLoading: isDailyNewPatientsLoading 
  } = useGetDailyNewPatientsLast7DaysQuery(doctorId);

  const { 
    data: dailyAppointmentsData, 
    isLoading: isDailyAppointmentsLoading 
  } = useGetDailyAppointmentsLast7DaysQuery(doctorId);

  // Process trend data from API
  const getTrendData = (apiData: DailyStat[] | undefined) => {
    if (!apiData || apiData.length === 0) return [0, 0, 0, 0, 0, 0, 0];
    
    // Find the maximum count to normalize the values
    const maxCount = Math.max(...apiData.map(item => item.count), 1);
    
    // Return normalized values between 0 and 1
    return apiData.map(item => item.count / maxCount);
  };

  // Static data for cards that don't have API endpoints yet
  const staticCardsData = [
    {
      title: "Total Pending Reports",
      totalCount: 54,
      colorVariant: 'orange' as ColorVariant,
      icon: 'fileText' as const,
      trendData: [0.4, 0.3, 0.5, 0.2, 0.6, 0.7, 0.8]
    },
    {
      title: "Total Prescriptions Issued",
      totalCount: 196,
      colorVariant: 'purple' as ColorVariant,
      icon: 'pill' as const,
      trendData: [0.5, 0.3, 0.7, 0.4, 0.8, 0.6, 0.9]
    }
  ];

  return (
    <div className="p-3 sm:p-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Patients - from API */}
        <PatientStatsCard
          title="Total Patient"
          totalCount={patientCountData?.patientCount || 0}
          colorVariant="blue"
          icon="shield"
          trendData={getTrendData(dailyNewPatientsData)}
          isLoading={isPatientCountLoading || isDailyNewPatientsLoading}
        />

        {/* Today's Appointments - from API */}
        <PatientStatsCard
          title="Today's Appointment"
          totalCount={todaysAppointmentsData?.total || 0}
          colorVariant="green"
          icon="calendar"
          trendData={getTrendData(dailyAppointmentsData)}
          isLoading={isTodaysAppointmentsLoading || isDailyAppointmentsLoading}
        />

        {/* Static cards */}
        {staticCardsData.map((card, index) => (
          <PatientStatsCard
            key={index + 2}
            title={card.title}
            totalCount={card.totalCount}
            colorVariant={card.colorVariant}
            icon={card.icon}
            trendData={card.trendData}
            isLoading={false}
          />
        ))}
      </div>

      {/* Error handling */}
      {(patientCountError || todaysAppointmentsError) && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {patientCountError && "Failed to load patient count. "}
            {todaysAppointmentsError && "Failed to load today's appointments. "}
            Please try refreshing the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default AtAGlance;