import React, { useState, useEffect } from "react";
import {
  Home,
  Search,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  X,
  Users,
  MessageSquare,
  UserCircle,
  LogOut,
  HelpCircle,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Link, NavLink, Outlet } from "react-router-dom";
const Aside = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);

  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const { user } = useAuth();

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const { language, switchLanguage } = useLanguage(); // استخدام الـ context لتغيير اللغة
  const { isAuthenticated, user, logout, role } = useAuth();

  const handleLanguageSwitch = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    switchLanguage(newLanguage); // تغيير اللغة عند الضغط
  };

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard/all",
    },
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "users", icon: Users, label: "Users", path: "/dashboard/users" }
,    {
      id: "comments",
      icon: MessageSquare,
      label: "Comments",
      path: "/comments",
    },
    { id: "profile", icon: UserCircle, label: "Profile", path: "/profile" },
    { id: "help", icon: HelpCircle, label: "Get Help", path: "/help" },
    { id: "logout", icon: LogOut, label: "Logout", path: "/logout" },
  ];

  return (
    <div
  >
    {/* Sidebar */}
 
  </div>
  
  );
};

export default Aside;
