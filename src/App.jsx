import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/dashboard/pages/Users";
import Main from "./pages/dashboard/pages/Main";
import DashProfile from "./pages/dashboard/pages/Profile";
import Profile from "./pages/Profile";
import { useLanguage } from "./context/LanguageContext";
import DashboardComments from "./pages/dashboard/pages/DashboardComments";

function App() {
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
useEffect(() => {
  document.documentElement.lang = language; // تحديث السمة lang في الـ HTML
}, [language]);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    if (!loading) {
      gsap.to(".content", { opacity: 1, duration: 1 });
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Router>
      {loading && (
        <div className="preloader">
          <div className="preloader-image flex items-center justify-center w-full h-[50%]">
            <img src="/assets/images/logo.png" className="rounded-full" alt="Logo" />
          </div>
          <div className="logo">
            <a href="#"><em>SCICODE</em>-ACADEMY </a>
          </div>
        </div>
      )}
      <div className="content opacity-0 transition-opacity duration-1000">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="dash" element={<Main />} />
            <Route path="profile" element={<DashProfile />} />
            <Route path="comments" element={<DashboardComments />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* ToastContainer for global toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
