import  { useState, useEffect } from "react";
import { gsap } from "gsap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from './components/Nav';
import Profile from "./pages/Profile";
import Meeting from "./pages/Meeting";
import Game from "./pages/Game";
import Spline from "@splinetool/react-spline";


function App() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.lang = language; // Update the `lang` attribute
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000);

    if (!loading) {
      gsap.to(".content", { opacity: 1, duration: 1 });
    }

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Router>
      {loading && (
        <div className="preloader">
      <div  className="w-full h-[80vh] scale-150">
      <Spline
        scene="https://prod.spline.design/wN1VWrOeyY2csqq9/scene.splinecode"
      />
    </div>
          <div className="logo">
            <a href="#"><em>SCICODEA</em>-ACADEMY </a>
          </div>
          <div className="textWrapper">
            <p className="text">Loading...</p>
            <div className="invertbox" />
          </div>
        </div>
      )}
      <div className="content">
      <Nav />

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Home />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
