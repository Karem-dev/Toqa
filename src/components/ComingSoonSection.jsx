import  { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ComingSoonSection = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens only once when scrolled into view
    });
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date("2024-12-31T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section data-aos="fade-out" 
    className="section coming-soon text-white py-12"
    id="section3"
  >
    <div
      className="container mx-auto bg-[url('/images/1.png')] bg-cover rounded-xl p-8 md:p-12 lg:p-24 h-full"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
   
      }}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* النص الرئيسي */}
        <h4 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
          Take <em>any online course</em> and win <span className='text-yellow-500'>500LE</span> for your next class
        </h4>
  
        {/* العد التنازلي */}
        <div className="flex justify-center space-x-4">
          <div className="days flex flex-col items-center justify-center border-2 border-yellow-500 bg-yellow-400 p-3 rounded-md">
            <div className="value text-4xl md:text-5xl font-bold">{timeLeft.days}</div>
            <span className="text-sm md:text-base">Days</span>
          </div>
          <div className="hours flex flex-col items-center justify-center border-2 border-yellow-500 bg-yellow-400 p-3 rounded-md">
            <div className="value text-4xl md:text-5xl font-bold">{timeLeft.hours}</div>
            <span className="text-sm md:text-base">Hours</span>
          </div>
          <div className="minutes flex flex-col items-center justify-center border-2 border-yellow-500 bg-yellow-400 p-3 rounded-md">
            <div className="value text-4xl md:text-5xl font-bold">{timeLeft.minutes}</div>
            <span className="text-sm md:text-base">Minutes</span>
          </div>
          <div className="seconds flex flex-col items-center justify-center border-2 border-yellow-500 bg-yellow-400 p-3 rounded-md">
            <div className="value text-4xl md:text-5xl font-bold">{timeLeft.seconds}</div>
            <span className="text-sm md:text-base">Seconds</span>
          </div>
        </div>
  
        {/* الزر */}
        <a
          href="https://wa.me/201023257791"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-6 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Get it now
        </a>
      </div>
    </div>
  </section>
  
  );
};

export default ComingSoonSection;
