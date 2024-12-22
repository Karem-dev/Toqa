import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Featuerd from "./components/Featuerd";
import WhyUsSection from "./components/Why";
import ComingSoonSection from "./components/ComingSoonSection";
import CoursesSection from "./components/CoursesSection";
import AboutUs from "./components/About";
import CourseModal from "./components/Instructors";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 

    if (!loading) {
      const tl = gsap.timeline();

      tl.to(".content", { opacity: 1, duration: 1 }); 
    }

    return () => clearTimeout(timer);
  }, [loading]);
  

  return (
    <>
      {loading && (
        <div className="preloader">
          <div className="img">
            <img
              src="/images/1.png" 
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
        <Main />
        <Featuerd />
        <AboutUs/>
        {/* <WhyUsSection /> */}
        <CoursesSection />
        <ComingSoonSection />
        <CourseModal/>
        <Contact/>
         <Footer /> 
      </div>
    </>
  );
}

export default App;
