import React from 'react';
import { ChevronDown } from 'lucide-react';

const data = [
  { day: 'Sat', value: 82 },
  { day: 'Sat', value: 68 },
  { day: 'Sat', value: 89 },
  { day: 'Sat', value: 56 },
  { day: 'Sat', value: 29 },
  { day: 'Sat', value: 52 }
];

const PatientTracking = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-medium text-gray-900">Patient Traking</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            <span>Day</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            <span>See Details</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 relative">
        {/* Y-axis labels */}
        <div className="absolute left-4 top-0 h-full flex flex-col justify-between text-sm text-gray-500 py-4">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-12 mr-8 h-full flex items-end justify-center gap-8 pt-4 pb-8">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* 3D Cylinder/Barrel */}
              <div className="relative mb-2" style={{ height: `${(item.value / 100) * 240}px` }}>
                {/* Top ellipse */}
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 rounded-full bg-gradient-to-b from-blue-300 to-blue-400 border border-blue-500"
                  style={{ 
                    background: 'linear-gradient(180deg, #93C5FD 0%, #7C83DB 100%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                ></div>
                
                {/* Main cylinder body */}
                <div 
                  className="w-12 h-full relative"
                  style={{
                    background: 'linear-gradient(90deg, #4F5DBE 0%, #5B6BC5 50%, #4F5DBE 100%)',
                    borderLeft: '1px solid #3B4096',
                    borderRight: '1px solid #7C83DB',
                    boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.2), inset 3px 0 6px rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Highlight stripe */}
                  <div 
                    className="absolute left-2 top-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-30"
                  ></div>
                </div>
                
                {/* Bottom ellipse */}
                <div 
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-6 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 border border-blue-700"
                  style={{ 
                    background: 'linear-gradient(180deg, #4F5DBE 0%, #3B4096 100%)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                ></div>
              </div>
              
              {/* X-axis label */}
              <span className="text-sm text-gray-500">{item.day}</span>
            </div>
          ))}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 ml-12 mr-8 pointer-events-none">
          {[20, 40, 60, 80, 100].map((tick) => (
            <div 
              key={tick}
              className="absolute w-full border-t border-gray-200"
              style={{ 
                bottom: `${((tick / 100) * 240) + 32}px`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientTracking;
