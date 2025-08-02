const SelectedDoctorCard = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Selected Doctor
        </h2>

        <div className="flex items-center space-x-4 border rounded-lg p-2">
          {/* Doctor Image */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
              alt="Dr. Salil Dhakma"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Dr. Salil Dhakma
            </h3>
            <p className="text-sm text-[#1C3BA4] mb-2">Orthopedic Surgery</p>
            <p className="text-lg font-bold text-gray-900">৳ 300.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDoctorCard;
