import React from 'react';

const NeedHelpSection: React.FC = () => {
  return (
    <div className="   mt-2">
      <div className="bg-white rounded-lg p-4">
        {/* Header */}
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Need Help?
        </h3>
        
        {/* Support Text */}
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Our support team is available 24/7 to assist you with your appointment booking systems.
        </p>
        
        {/* Contact Support Link */}
        <a 
          href="#" 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            // Add your contact support logic here
            console.log('Contact support clicked');
          }}
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default NeedHelpSection;