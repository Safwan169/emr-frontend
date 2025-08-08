import React from 'react';

interface SelectedDoctorProps {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    experience: string;
    nextAvailable: string;
    fee: number;
    imageUrl: string;
  } | null;
}

const SelectedDoctorSection: React.FC<SelectedDoctorProps> = ({ doctor }) => {

  console.log(doctor,'adfs')
  if (!doctor) {
    return (
      <div className="w-full   p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Selected Doctor
          </h3>
          <p className="text-sm text-gray-500">No doctor selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-2 border border-gray-100/90 rounded-xl shadow-sm bg-white mx-auto p-3">
      <div className=" ">
        {/* Header */}
        <div className=" pb-1">
          <h3 className="text-base font-semibold text-gray-900">
            Selected Doctor
          </h3>
        </div>

        {/* Doctor Info */}
        <div className="p-4 border border-gray-100/90 rounded-lg  ">
          <div className="flex items-start gap-3">
            {/* Doctor Image */}
            <img
              src={
                doctor?.imageUrl
                 
              }
              alt={doctor?.name || 'Doctor'}
              className="w-16 h-16 sm:w-16 sm:h-16 object-cover rounded-full border border-gray-200"
            />


            {/* Doctor Details */}
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">
                {doctor.name}
              </h4>
              <p className="text-xs text-[#1C3BA4] font-medium mt-0.5">
                {doctor.specialty}
              </p>

              {/* Fee */}
              <div className="mt-2">
                <span className="text-sm  font-bold text-gray-800">
                  ৳ {doctor.fee}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDoctorSection;