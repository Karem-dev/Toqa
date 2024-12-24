import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';


const CoursesSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens only once when scrolled into view
    });
  }, []);

  const courses = [
    {
      id: 1,
      image: "/assets/images/Science.png",
      title: t('courses.course1.title'),
      description: t('courses.course1.description'),
      taughtLanguages: ["English", "Arabic"],
      technologies: [
        t('courses.course1.technologies.0'),
        t('courses.course1.technologies.1'),
        t('courses.course1.technologies.2'),
        t('courses.course1.technologies.3')
      ],
      features: [
        t('courses.course1.features.0'),
        t('courses.course1.features.1'),
        t('courses.course1.features.2'),
        t('courses.course1.features.3')
      ]
    },
    {
      id: 2,
      image: "/assets/images/basic.jpg",
      title: t('courses.course2.title'),
      description: t('courses.course2.description'),
      taughtLanguages: ["Python", "JavaScript"],
      technologies: [
        t('courses.course2.technologies.0'),
        t('courses.course2.technologies.1'),
        t('courses.course2.technologies.2'),
        t('courses.course2.technologies.3')
      ],
      features: [
        t('courses.course2.features.0'),
        t('courses.course2.features.1'),
        t('courses.course2.features.2'),
        t('courses.course2.features.3')
      ]
    },
    {
      id: 3,
      image: "/assets/images/front.jpg",
      title: t('courses.course3.title'),
      description: t('courses.course3.description'),
      taughtLanguages: ["C++", "Java"],
      technologies: [
        t('courses.course3.technologies.0'),
        t('courses.course3.technologies.1'),
        t('courses.course3.technologies.2'),
        t('courses.course3.technologies.3')
      ],
      features: [
        t('courses.course3.features.0'),
        t('courses.course3.features.1'),
        t('courses.course3.features.2'),
        t('courses.course3.features.3')
      ]
    },
    {
      id: 4,
      image: "/assets/images/back.png",
      title: t('courses.course4.title'),
      description: t('courses.course4.description'),
      taughtLanguages: ["JavaScript", "HTML", "CSS"],
      technologies: [
        t('courses.course4.technologies.0'),
        t('courses.course4.technologies.1'),
        t('courses.course4.technologies.2'),
        t('courses.course4.technologies.3')
      ],
      features: [
        t('courses.course4.features.0'),
        t('courses.course4.features.1'),
        t('courses.course4.features.2'),
        t('courses.course4.features.3')
      ]
    },
    {
      id: 5,
      image: "/assets/images/ardiono.jpeg",
      title: t('courses.course5.title'),
      description: t('courses.course5.description'),
      taughtLanguages: ["Python", "R"],
      technologies: [
        t('courses.course5.technologies.0'),
        t('courses.course5.technologies.1'),
        t('courses.course5.technologies.2'),
        t('courses.course5.technologies.3')
      ],
      features: [
        t('courses.course5.features.0'),
        t('courses.course5.features.1'),
        t('courses.course5.features.2'),
        t('courses.course5.features.3')
      ]
    },
    {
      id: 6,
      image: "/assets/images/ai.png",
      title: t('courses.course6.title'),
      description: t('courses.course6.description'),
      taughtLanguages: ["Python", "JavaScript"],
      technologies: [
        t('courses.course6.technologies.0'),
        t('courses.course6.technologies.1'),
        t('courses.course6.technologies.2'),
        t('courses.course6.technologies.3')
      ],
      features: [
        t('courses.course6.features.0'),
        t('courses.course6.features.1'),
        t('courses.course6.features.2'),
        t('courses.course6.features.3')
      ]
    },
 
    
   
    // يمكن إضافة المزيد من الدورات حسب الحاجة
  ];
  

  const [selectedCourse, setSelectedCourse] = useState(null);

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0", transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.5 } },
  };

  return (
    <section data-aos="fade-down" id="courses" className="courses-section py-16 bg-[url('/assets/images/bg.jpg')] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8">
          {t('courses.heading')} {/* Dynamic translation */}
        </h2>
        <p className="text-center text-lg text-white/80 mb-12">
          {t('courses.description')} {/* Dynamic translation */}
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
        >
          {courses.map((course, id) => (
            <motion.div
              data-aos={course.id % 2 === 0 ? 'fade-up' : 'fade-down'}
              key={id}
              className="course-card relative hover:scale-110 duration-1000 bg-slate-900 h-[400px] text-white shadow-lg rounded-lg overflow-hidden transition-transform cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover hover:scale-110 duration-1000 z-0"
              />
              <div className="p-6 absolute bottom-0 left-[2%] w-full">
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-yellow-600 text-lg mt-4">click for more details</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedCourse(null)} // Close modal when clicking on overlay
            >
              <motion.div
                className="bg-[url('/assets/images/bg.jpg')] bg-cover relative rounded-lg shadow-2xl shadow-blue-950 text-white w-[90%] md:w-[60%] lg:w-[50%]"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
              >
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute right-5 top-5 bg-white p-1 w-10 rounded-md text-red-600 text-2xl z-[999]"
                >
                  &times;
                </button>
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="rounded-md mb-4 w-full h-[300px] object-cover"
                />
                <div className="flex flex-col items-start justify-start p-10">
                  <h3 className="text-2xl text-start text-yellow-500 font-bold mb-2">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-white text-lg">{selectedCourse.description}</p>

                  {/* Display taught languages */}
                  <div className="text-white w-full text-start mb-4">
                    <strong className="text-yellow-500">{t('courses.technologies_title')}:</strong>
                    <ul className="list-disc pl-5">
                      {selectedCourse.technologies.map((lang, index) => (
                        <li key={index}>{lang}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Display course features */}
                  <div className="text-white">
                    <strong className="text-yellow-500">{t('courses.features_title')}:</strong>
                    <ul className="list-disc pl-5">
                      {selectedCourse.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="https://wa.me/201023257791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 mt-10 mx-auto bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
                  >
                    {t('hero.book_now')} {/* Dynamic translation */}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CoursesSection;
