import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
function Main() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens only once when scrolled into view
    });
  }, []);
  
  return (
    <section  data-aos="fade-in"  className="section main-banner" id="top hero" data-section="section1">
    <video autoPlay muted loop id="bg-video">
      <source src="../public/assets/vedio.mp4" type="video/mp4" />
    </video>

    <div className="video-overlay header-text">
      <div className="caption">
        <h6>wlcome we are </h6>
        <h2><em>TOQ-A</em>-cademy</h2>
        <div className="main-button">
          <div className="scroll-to-section">
            <a href="#section2">Discover more</a>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
}

export default Main