import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/LanguageContext"; 
import { 
  Bell, 
  Sun, 
  Moon, 
  Search, 
  User, 
  LogOut,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

function FixedNavBar() {

  const [isLanguageOpen, setLanguageOpen] = useState(false);

  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
<nav
          className={`h-16 px-4 flex items-center justify-between border-b fixed top-0 w-full right-0 ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          {/* Search Bar */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg w-64 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Globe size={18} />
                <span className="text-sm">{selectedLanguage.name}</span>
                <ChevronDown size={14} />
              </button>
              {isLanguageOpen && (
                <div
                  className={`absolute top-full right-0 mt-1 w-48 rounded-lg shadow-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } border border-gray-200`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2">
              <img
                src={
                  user?.image
                    ? `http://localhost:8000/storage/${user.image}`
                    : "/assets/images/userman.jpeg"
                }
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium">
                {user.first_name}
              </span>
            </button>
          </div>
        </nav>
  );
}

export default FixedNavBar;