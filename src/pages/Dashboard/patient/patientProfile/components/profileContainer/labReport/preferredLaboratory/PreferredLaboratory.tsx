import { Clock, MapPin, Phone } from "lucide-react";

const PreferredLaboratory = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 text-xl">🏥</span>
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Preferred Laboratory
          </h2>
          <h3 className="font-medium mb-3">Startsmartz Laboratory Service</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={16} className="text-gray-500 mt-1" />
                <div className="text-sm text-gray-700">
                  <div>3rd Floor, Shaik Bhuiyan Tower,</div>
                  <div>Lake Road, Sector 07,</div>
                  <div>Uttara, Dhaka 1230</div>
                </div>
              </div>
              <button className="text-[#1C3BA4] text-sm font-medium hover:text-blue-700">
                Change Laboratory
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">+880 16 8231 1409</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Mon-Fri 8AM-8PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Sat-Sun 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferredLaboratory;
