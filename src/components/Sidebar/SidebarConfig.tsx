// src/components/Sidebar/sidebarConfig.ts
import { Calendar, Home, MessageCircle, Settings, User, Users,Activity,ClipboardPlus,Pill } from "lucide-react";
import { ComponentType } from "react";

export interface NavItem {
  label: string;
  path: string;
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>; // Proper type for Lucide icons
}

 const SidebarConfig: Record<string, NavItem[]> = {
  patient: [
    { label: "Dashboard", path: "/", title: "Patient Dashboard", icon: Home },
    { label: "Appointments", path: "/appointments", title: "Patient Appointments", icon: Calendar },
    { label: "Chat", path: "/chat", title: "Pathent Chat Portal", icon: MessageCircle },
    { label: "Profile", path: "/profile", title: "Patient Profile", icon: User },
  ],
  doctor: [
    { label: "Dashboard", path: "/", title: "Doctor Dashboard", icon: Home },
    { label: "Patients", path: "doctor/patients", title: "Doctor Patients", icon: Users },
    { label: "Appointments", path: "doctor/appoinment", title: "Doctor Appointments", icon: Calendar },
    { label: "Profile", path: "doctor/profile", title: "Doctor Profile", icon: User },
  ],
  admin: [
    { label: "Dashboard", path: "/", title: "Admin Dashboard", icon: Home },
    { label: "Doctors", path: "/add-doctors", title: "Admin Appointments", icon: Users },
    { label: "Settings", path: "/settings", title: "Admin Settings", icon: Settings },
  ],
};

export default SidebarConfig;