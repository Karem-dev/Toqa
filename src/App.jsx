import  { useState, useEffect } from "react";
import { gsap } from "gsap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from './components/Nav';

function App() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.lang = language; // Update the `lang` attribute
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);

    if (!loading) {
      gsap.to(".content", { opacity: 1, duration: 1 });
    }

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Router>
      {loading && (
        <div className="preloader">
          <div className="img">
            <img
              src="/assets/images/1.png"
              alt="Toqa Academy"
              className="preloader-image"
            />
          </div>
          <div className="logo">
            <a href="#"><em>TOQ-A</em>-cademy</a>
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
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
