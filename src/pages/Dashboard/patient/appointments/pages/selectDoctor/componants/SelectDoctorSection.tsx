import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import DoctorCard from './DoctorCard';

interface Doctor {
  id: number;
name: string;
  specialty: string;
  rating: number;
  experience: string;
  nextAvailable: string;
  fee: number;
  imageUrl: string;
}

const SelectDoctorSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialities');

  const specialties = [
    'All Specialities',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology'
  ];




  const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    rating: 4.8,
    experience: "10 years",
    nextAvailable: "Tomorrow, 10:00 AM",
    fee: 1500,
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  { id: 2,
    name: "Dr. Mahmud Hasan",
    specialty: "Dermatologist",
    rating: 4.6,
    experience: "8 years",
    nextAvailable: "Today, 3:00 PM",
    fee: 1200,
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  { id: 3,
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    rating: 4.9,
    experience: "12 years",
    nextAvailable: "Tomorrow, 9:30 AM",
    fee: 1300,
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {id: 4,
    name: "Dr. Sayed Karim",
    specialty: "Orthopedic Surgeon",
    rating: 4.5,
    experience: "15 years",
    nextAvailable: "Friday, 11:00 AM",
    fee: 2000,
    imageUrl: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {id: 5,
    name: "Dr. Tamanna Islam",
    specialty: "Neurologist",
    rating: 4.7,
    experience: "9 years",
    nextAvailable: "Today, 5:00 PM",
    fee: 1800,
    imageUrl: "https://randomuser.me/api/portraits/women/56.jpg",
  },
];


  return (
    <div className="w-full max-w-5xl  mt-2">
      <div className="bg-white border border-gray-100/90 rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Select Doctor</h2>
        </div>
        
        {/* Search and Filter Row */}
        <div className="p-4 flex items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Specialty Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between px-3 py-2  border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
            >
              <span>{selectedSpecialty}</span>
              <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => {
                      setSelectedSpecialty(specialty);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Results Area */}
        <div className="px-4 pb-4">
           {doctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              Start typing to search for doctors or select a specialty
            </div>
          ):(
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.name} {...doctor} />
              ))}
            </div>
          )
        
        }
        </div>

        

        
      </div>
    </div>
  );
};

export default SelectDoctorSection;