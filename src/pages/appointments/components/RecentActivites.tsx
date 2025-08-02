
import RecentActivityCard from './RecentActivityCard';


const RecentActivites = () => {

    const activityData  = [
        {
            id: 1,
            title: 'Appointment with Dr. Sabit Completed',
            description: 'Regular Checkup',

        },
         {
            id: 2,
            title: 'Appointment with Dr. Sabit Completed',
            description: 'Regular Checkup',
        },
         {
            id: 3,
            title: 'Appointment with Dr. Sabit Completed',
            description: 'Regular Checkup',
        },
    
    ]
    return (
        <div className="bottom-0 w-full bg-white rounded-lg shadow-md">
            {
                <RecentActivityCard data={activityData } />
            }
        </div>

    );
};

export default RecentActivites;