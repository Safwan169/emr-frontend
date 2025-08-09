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

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const doctorsPerPage = 10; 

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

  const { data = [], isLoading, isError } = useGetAllDoctorsQuery(null);

  const doctors: Doctor[] =
    data?.data?.map((doc: any) => ({
      id: doc?.user?.id,
      name: `${doc.user?.first_name || ''} ${doc.user?.last_name || ''}`.trim(),
      specialty: doc.specialization || 'Unknown',
      rating: doc.rating || 0,
      experience: `${doc.years_of_experience || 0} years`,
      nextAvailable: 'Tomorrow, 10:00 AM', // Hardcoded because API lacks this info
      fee: doc.fee || 0,
      imageUrl: doc?.user?.profile_image?.file_URL
        ? `${process.env.REACT_APP_API_BASE_URL}${doc.user.profile_image.file_URL}`
        : '/profile.jpg',
    })) || [];

  // Filter doctors by search and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'All Specialities' ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Pagination handlers
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Reset page to 1 when search term or specialty filter changes
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const onSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

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
              onChange={onSearchChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hidden sm:flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
            >
              <span>{selectedSpecialty}</span>
              <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => onSpecialtySelect(specialty)}
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
            <>
              <div className="space-y-4">
                {currentDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} {...doctor} />
                ))}
              </div>

              {/* Pagination controls (show only if more than 10 doctors) */}
              {filteredDoctors.length > doctorsPerPage && (
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded ${
                      currentPage === 1
                        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'text-gray-700 border-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'text-gray-700 border-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border rounded ${
                      currentPage === totalPages
                        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'text-gray-700 border-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectDoctorSection;
