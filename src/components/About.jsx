import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence from framer-motion
import { useTranslation } from 'react-i18next'; // Import useTranslation for multilingual support
import Spline from "@splinetool/react-spline";

const AboutUs = () => {
  const { t } = useTranslation(); // Access translation function
  const [selectedSection, setSelectedSection] = useState(null);

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0", transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.5 } },
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens only once when scrolled into view
    });

    // Re-initialize AOS when the window is resized (in case of layout changes)
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <section
      id="about"
      data-aos="fade-up"
      className="py-16 w-full bg-[url('/assets/images/bg.jpg')] bg-cover bg-center"
    >
      <div className="w-full mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-8 hover:text-[#f5a425] transition-colors duration-300 ease-in-out transform cursor-pointer">
          {t('about.heading')} {/* Use translated heading */}
        </h2>

        <div
          data-aos="fade-in"
          className="flex flex-col-reverse xl:flex-row items-start justify-center gap-12 xl:p-24"
        >
          <div className="w-full xl:w-[60%]">
            <p className="text-lg text-start text-gray-300 mb-8 leading-relaxed w-full mx-auto">
              {t('about.mission_description')}
            </p>

            <div data-aos="fade-right" className="flex flex-col xl:flex-row gap-8">
              <motion.div
                className="bg-gray-700 cursor-pointer p-8 w-full rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
                initial="hidden"
                animate="visible"
                variants={modalVariants}
                onClick={() => setSelectedSection('mission')} // Open modal on click
              >
                <h3 className="text-3xl font-semibold text-white mb-4">{t('about.mission_title')}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {t('about.mission_description')}
                </p>
              </motion.div>

              <motion.div
                data-aos="fade-left"
                className="bg-gray-700 cursor-pointer p-8 w-full rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
                onClick={() => setSelectedSection('offer')} // Open modal on click
              >
                <h3 className="text-3xl font-semibold text-white mb-4">{t('about.offer_title')}</h3>
                <ul className="list-disc pl-6 text-lg text-gray-300 space-y-4">
                  {t('about.offer_list', { returnObjects: true }).map((item, index) => (
                    <li key={index}>
                      <strong className="text-[#f5a425]">{item.split(":")[0]}:</strong>
                      {item.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div data-aos="fade-up" className="w-full xl:w-[40%] flex items-start justify-center">
            <img
              src="/assets/images/logo.png"
              className="w-[70%] mx-auto xl:w-full rounded-xl shadow-lg clippath transform transition-all duration-500 hover:scale-105"
              alt="A  Image"
            />
           {/* <div  className="w-full h-full scale-150">
           <Spline
        scene="https://prod.spline.design/wN1VWrOeyY2csqq9/scene.splinecode"
      />
    </div> */}
          </div>
        </div>
      </div>

      {/* Modal for selected section */}
      <AnimatePresence>
        {selectedSection && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedSection(null)} // Close modal on overlay click
          >
            <motion.div
              className="bg-[url('/assets/images/bg.jpg')] relative py-8 rounded-lg shadow-2xl text-white w-[90%] md:w-[40%] lg:w-[40%] shadow-slate-700"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
              <button
                onClick={() => setSelectedSection(null)}
                className="absolute right-5 top-5 bg-white p-1 w-10 rounded-md text-red-600 text-2xl z-[9999]"
              >
                &times;
              </button>
              {selectedSection === 'mission' && (
                <div className="p-10">
                  <h3 className="text-2xl text-center text-yellow-500 font-bold mb-2">{t('about.mission_title')}</h3>
                  <p className="text-white text-lg">{t('about.mission_description')}</p>
                </div>
              )}
              {selectedSection === 'offer' && (
                <div className="p-10">
                  <h3 className="text-2xl text-center text-yellow-500 font-bold mb-2">{t('about.offer_title')}</h3>
                  <ul className="text-white text-lg space-y-4">
                    {t('about.offer_list', { returnObjects: true }).map((item, index) => (
                      <li key={index}>
                        <strong className="text-[#f5a425]">{item.split(":")[0]}:</strong>
                        {item.split(":")[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutUs;
