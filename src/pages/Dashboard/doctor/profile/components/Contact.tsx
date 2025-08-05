import React from 'react';

const Contact:React.FC <any>  = ({personalInfo}) => {
    return (
          <div className=" bg-white p-6 shadow rounded-lg gap-4 mt-3 text-sm">
        <h1 className=" border-b  font-bold text-[16px] border-gray-200/70 pb-3">Personal Information</h1>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div>
            <p className="text-gray-500/95 font-medium">Name</p>
            <p>{personalInfo.first_name} {personalInfo.last_name}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Specialization</p>
            <p>{personalInfo.specialization}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Email</p>
            <p>{personalInfo.email}</p>
          </div>
          
          <div>
            <p className="text-gray-500/95 font-medium">Hospital/Clinic</p>
            <p>{personalInfo.hospital}</p>
          </div>
          <div>
            <p className="text-gray-500/95 font-medium">Years of Experience</p>
            <p>{personalInfo.years_of_experience} Years</p>
          </div>
        </div>
      </div>
    );
};

export default Contact;