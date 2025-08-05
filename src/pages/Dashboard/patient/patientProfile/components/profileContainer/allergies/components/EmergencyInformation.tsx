import { Phone } from "lucide-react";
import useGetUserData from "../../../../../../../../hooks/useGetUserData";

const EmergencyInformation = () => {
  const { data } = useGetUserData();

  console.log("data ssss", data);

  return (
    <div className="bg-[#F5F5F5] rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Phone className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-gray-800">Emergency Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <span className="text-gray-500 text-sm">
              Emergency Contact:{" "}
              {`${data?.emergency_contact?.first_name} ${data?.emergency_contact?.last_name}`}
            </span>
            <p className="text-gray-800">
              Phone: {data?.emergency_contact?.phone}
            </p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">
              Relationship: {data?.emergency_contact?.relationship}
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Change Laboratory
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-gray-500 text-sm">
              Medical Alert ID: #SM-12345
            </span>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Blood Group: O+</span>
          </div>
          <div>
            <span className="text-gray-500 text-sm">
              Insurance: Startsmartz Premium Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyInformation;
