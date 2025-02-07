import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
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
import { Link, NavLink, Outlet } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FaGlobe } from "react-icons/fa";
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout  } = useAuth();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);

  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);

  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const { language, switchLanguage } = useLanguage(); // استخدام الـ context لتغيير اللغة

  const handleLanguageSwitch = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    switchLanguage(newLanguage); // تغيير اللغة عند الضغط
  };


  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard/dash",
    },
    { id: "users", icon: Users, label: "Users", path: "/dashboard/users" },
    {
      id: "comments",
      icon: MessageSquare,
      label: "Comments",
      path: "/dashboard/comments",
    },
    { id: "profile", icon: UserCircle, label: "Profile", path: "/dashboard/profile" },
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "help", icon: HelpCircle, label: "Get Help", path: "/help" },
    // { id: "logout", icon: LogOut, label: "Logout", path: "/logout" },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== 1) {
      navigate("/"); // redirect if user role is not 1
    }
  }, [user, navigate]);

  return (
    <div className="">
      <aside
        className={`fixed left-0 top-0 h-screen ${
          isSidebarOpen ? "w-64" : "w-[80px]"
        } ${
          isDarkMode
            ? "bg-gray-700"
            : "bg-gray-100 border border-gray-50 shadow-xl shadow-gray-500/50"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Top section with toggle */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 hover:text-black hover:dark:text-gray-700 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? <X  size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col gap-10 items-start justify-start p-4 text-white">
          {menuItems.map(({ id, icon: Icon, label, path }) => (
            <NavLink
              key={id}
              to={path}
              className={`${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              } p-2 rounded-md ${isSidebarOpen ? "w-full" : "w-10"}`}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                {isSidebarOpen && <span>{label}</span>}{" "}
                {/* Only display the label when the sidebar is open */}
              </div>
            </NavLink>











          ))}
           <Link
           onClick={logout}
              className={`${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              } p-2 rounded-md ${isSidebarOpen ? "w-full" : "w-10"}`}
            >
              <div className="flex items-center gap-4">
                <LogOut size={20} />
                {isSidebarOpen && <span >{"Logout"}</span>}{" "}
                {/* Only display the label when the sidebar is open */}
              </div>
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <nav
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Top Navigation */}
        <nav
          className={`h-16 px-4 flex items-center justify-between border-b ${
            isDarkMode
              ? "bg-gray-700 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          {/* Search Bar */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg w-64 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <Search
              size={18}
              className={`    ${isDarkMode ? " text-white" : " text-black"}
`}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`    ${
                isDarkMode ? " text-white" : " text-black"
              }             bg-transparent outline-none w-full text-sm"`}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun color="white" size={20} />
              ) : (
                <Moon color="black" size={20} />
              )}
            </button>

            {/* Language Selector */}
            <button
                  onClick={handleLanguageSwitch}
                  className="text-gray-300 gap-2  hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center"
                >
                  <FaGlobe className="mr-2" />
                  {language === "en" ? "AR" : "الانجليزيه"}
                </button>

            {/* Notifications */}
            <button className="relative p-2">
              <Bell
                className={`${isDarkMode ? "text-white" : "text-black"}`}
                size={20}
              />
              <span
                className={`absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ${
                  isDarkMode ? "bg-red-500" : "bg-red-500"
                }`}
              ></span>
            </button>

            {/* Profile */}
            <button className="flex flex-row-reverse   items-center justify-center gap-2">
              <img
                src={
                  user?.image
                    ? `http://localhost:8000/storage/${user.image}`
                    : "/assets/images/userman.jpeg"
                }
                className="w-8 h-8 rounded-full object-cover"
              />
              <span
                className={`hidden sm:inline text-sm font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                } `}
              >
                {user.first_name}
              </span>
            </button>
          </div>
        </nav>
      </nav>
      {/* Content */}
      <main
        className={`transition-all   duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-slate-100"
        } dark:bg-gray-900  min-h-screen p-5 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
