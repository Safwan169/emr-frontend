// src/components/Sidebar/sidebarConfig.ts
import { Calendar, Home, MessageCircle, Settings, User, Users } from "lucide-react";
import { ComponentType } from "react";

export interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<{ size?: number; className?: string }>; // Proper type for Lucide icons
}

 const SidebarConfig: Record<string, NavItem[]> = {
  patient: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Appointments", path: "/appointments", icon: Calendar },
    { label: "Chat", path: "/chat", icon: MessageCircle },
    { label: "Profile", path: "/profile", icon: User },
  ],
  doctor: [
    { label: "Dashboard", path: "/", icon: Home },
    // { label: "Patients", path: "/patients", icon: Users },
    { label: "Appointments", path: "doctor/appoinment", icon: Calendar },
    { label: "Profile", path: "/doctor/profile", icon: User },
  ],
  admin: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Users", path: "/users", icon: Users },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
};

export default SidebarConfig;