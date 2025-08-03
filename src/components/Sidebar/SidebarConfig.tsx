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
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  doctor: [
    { label: "Dashboard", path: "/doctor/dashboard", icon: Home },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Appointments", path: "/appointments", icon: Calendar },
    { label: "Profile", path: "/doctor/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Users", path: "/users", icon: Users },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
};

export default SidebarConfig;