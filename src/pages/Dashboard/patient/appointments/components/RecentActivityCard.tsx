import React from "react";
import { RecentActivityCardProps } from "../../../../../types/global";

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ data }) => {
  return (
    <div className="p-4  bottom-0 w-full bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-5">
        {data?.map((item) => (
          <div key={item?.id} className="flex items-start gap-4">
            <div className="text-blue-500 bg-[#ebedf7] p-2 rounded-full">
              ✔️
            </div>
            <div className="space-y-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
