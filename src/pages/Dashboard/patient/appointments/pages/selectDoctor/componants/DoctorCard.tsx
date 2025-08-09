import { Star, CheckCircle } from "lucide-react";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { setSelectedDoctor } from "../../../../../../../redux/features/appoinment/appoinmentSlice";
import { useNavigate } from "react-router-dom";


type DoctorProps = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  nextAvailable: string;
  fee: number;
  imageUrl: string;
};

export default function DoctorCard({
  id,
  name,
  specialty,
  rating,
  experience,
  nextAvailable,
  fee,
  imageUrl
}: DoctorProps) {
  const dispatch = useAppDispatch();

console.log(imageUrl,'adfas')
  const navigate = useNavigate()
  const handleClick = () => {
    dispatch(
      setSelectedDoctor({
        id,
        name,
        specialty,
        rating,
        experience,
        nextAvailable,
        fee,
        imageUrl,
        date: '',
        timeSlot: ''
      })
    );
    navigate('select-timeSlot')
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-between cursor-pointer border border-gray-100/90 rounded-md p-4 shadow-sm hover:shadow-md transition-all"
    >
      {/* Left */}
      <div className="flex-col sm:flex-row sm:flex justify-center items-center  sm:items-start gap-4">
        <img
          src={
            imageUrl
              ? imageUrl
              : 'profile.jpg'
          }
          alt={name ?? 'Profile'}
          className="w-16 h-16 rounded-full mx-auto sm:mx-0 object-cover border"
        />



        <div className="">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-[#1C3BA4] font-medium">{specialty}</p>
          <div className="text-right flex-row-reverse flex  sm:hidden items-center justify-between min-w-[120px] h-fit">
            <h4 className="text-lg font-semibold text-gray-800">$ {fee}</h4>
            <p className="text-xs text-gray-500">CONSULTATION FEE</p>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>{rating}</span>
            </div>
            <span className="border-l h-4" />
            <span>{experience}</span>
          </div>
          <p className="text-[#009E18] font-medium text-sm mt-1">
            <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-[#009E18]" />
            Next Available: <span>{nextAvailable}</span>
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right hidden sm:block min-w-[120px] h-fit">
        <h4 className="text-lg font-semibold text-gray-800">$ {fee}</h4>
        <p className="text-xs text-gray-500">CONSULTATION FEE</p>
      </div>
    </div>
  );
}
