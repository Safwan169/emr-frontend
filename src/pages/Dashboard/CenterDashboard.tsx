import React, { useState, useEffect } from 'react';
import PatientDashboard from './patient/patientDashboard/PatientDashboard';
import DoctorDashboard from './doctor/dashboard/DoctorDashboard';

import NewCard from './admin/components/NewCard';
import Dashboard from './admin/components/Dashboard';

interface UserProfile {
    role_name?: 'patient' | 'doctor' | string;
}

const CenterDashboard: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            const profileString = localStorage.getItem("profileInfo");
            if (profileString) {
                const profile: UserProfile = JSON.parse(profileString);
                setUserRole(profile.role_name || null);
            } else {
                setUserRole(null);
            }
        } catch (error) {
            console.error("Error parsing profileInfo from localStorage:", error);
            setUserRole(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    console.log(userRole,'thsi is role')

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }

    if (userRole === 'patient') {
        return <PatientDashboard />;
    }

    if (userRole === 'doctor') {
        return <DoctorDashboard />;
    }

    if (userRole === 'super_admin') {
        return <Dashboard />;
    }

    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>Please log in or select a valid role to view your specific dashboard.</p>
        </div>
    );
};

export default CenterDashboard;