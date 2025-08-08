import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import DoctorCard from './DoctorCard';
import { useGetAllDoctorsQuery } from '../../../../../../../redux/features/doctor/doctorApi';

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
    'Radiology',
  ];

  // ✅ Fetch doctors from API
  const { data = [], isLoading, isError } = useGetAllDoctorsQuery(null);
  console.log(data.data, 'thsi is data for doctors');
  // ✅ Transform API data into Doctor[]
  const doctors: Doctor[] =
    data?.data?.map((doc: any) => ({
      id: doc?.user?.id,
      name: `${doc.user?.first_name || ''} ${doc.user?.last_name || ''}`.trim(),
      specialty: doc.specialization || 'Unknown',
      rating: doc.rating || 0,
      experience: `${doc.years_of_experience || 0} years`,
      nextAvailable: 'Tomorrow, 10:00 AM', // API does not provide this → Hardcoded
      fee: doc.fee || 0,
      imageUrl : doc?.user?.profile_image?.file_URL
        ? `${process.env.REACT_APP_API_BASE_URL}${doc.user.profile_image.file_URL}`
        : '/profile.jpg'

    })) || [];

  // ✅ Apply filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'All Specialities' ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="w-full max-w-5xl mt-2">
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
              className=" hidden sm:flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
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
          {isLoading ? (
            <div className="text-center py-8 text-gray-500 text-sm">Loading doctors...</div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500 text-sm">Failed to load doctors</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No doctors found. Try a different search or specialty.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectDoctorSection;
