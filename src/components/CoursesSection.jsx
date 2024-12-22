import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CoursesSection = () => {
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
      image: "../public/images/science.png",
      title: "science Fundamentals",
      description: "Master the basics of science with this comprehensive course, covering topics from classical mechanics to modern science principles.",
      taughtLanguages: ["English", "Arabic"], // science is taught in these languages
      technologies: [
        "Classical Mechanics",
        "Electromagnetism",
        "Quantum science",
        "Relativity"
      ],
      features: [
        "In-depth explanations of fundamental science concepts.",
        "Hands-on experiments and simulations.",
        "Quizzes to test your understanding.",
        "Access to a community of science enthusiasts."
      ]
    },
    {
      id: 2,
      image: "../public/images/basic.jpg",
      title: "Programming Basics",
      description: "Learn programming from scratch with easy-to-follow lessons covering variables, data types, control structures, and algorithms.",
      taughtLanguages: ["Python", "JavaScript"], // Programming taught in Python & JS
      technologies: [
        "Variables",
        "Data Types",
        "Control Structures",
        "Algorithms"
      ],
      features: [
        "Step-by-step tutorials for beginners.",
        "Projects to build your first applications.",
        "Interactive coding exercises.",
        "Code review and feedback from instructors."
      ]
    },
    {
      id: 3,
      image: "../public/images/front.jpg",
      title: "Frontend Development",
      description: "Build modern, responsive websites using HTML, CSS, and JavaScript. Learn best practices for user interface design and interactivity.",
      taughtLanguages: ["HTML", "CSS", "JavaScript"], // Frontend taught in HTML, CSS, JS
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Design",
        "UI/UX Principles"
      ],
      features: [
        "Learn the basics of HTML5, CSS3, and JavaScript.",
        "Understand responsive web design techniques.",
        "Build real-world web projects.",
        "Learn about UI/UX design principles."
      ]
    },
    {
      id: 4,
      image: "../public/images/back.png",
      title: "Backend Development",
      description: "Dive into server-side programming with Node.js, PHP, and more. Understand how to create powerful web servers and APIs.",
      taughtLanguages: ["Node.js", "PHP", "SQL"], // Backend taught in Node.js, PHP, SQL
      technologies: [
        "Node.js",
        "PHP",
        "SQL Databases",
        "NoSQL Databases",
        "APIs"
      ],
      features: [
        "Master server-side programming with Node.js and PHP.",
        "Learn how to work with databases (SQL & NoSQL).",
        "Build APIs and integrate third-party services.",
        "Secure your backend applications."
      ]
    },
    {
      id: 5,
      image: "../public/images/ardiono.jpeg",
      title: "Arduino Programming",
      description: "Learn to program microcontrollers and build smart projects using Arduino. Perfect for beginners and electronics enthusiasts.",
      taughtLanguages: ["C", "Arduino IDE"], // Taught in C & Arduino IDE
      technologies: [
        "Arduino IDE",
        "Microcontrollers",
        "Sensors",
        "Actuators",
        "Basic Electronics"
      ],
      features: [
        "Introduction to Arduino hardware and software.",
        "Build hands-on projects like smart lights and sensors.",
        "Learn basic electronics and circuit design.",
        "Explore sensor and actuator integration."
      ]
    },
    {
      id: 6,
      image: "../public/images/ai.png",
      title: "Artificial Intelligence",
      description: "Get started with machine learning and AI techniques. Understand algorithms like decision trees, neural networks, and deep learning.",
      taughtLanguages: ["Python", "TensorFlow", "Keras"], // Taught in Python, TensorFlow, Keras
      technologies: [
        "Machine Learning",
        "Neural Networks",
        "Deep Learning",
        "TensorFlow",
        "Keras"
      ],
      features: [
        "Learn core machine learning algorithms.",
        "Understand deep learning and neural networks.",
        "Work with real-world datasets.",
        "Implement AI models using Python."
      ]
    },
  ];
  

  const [selectedCourse, setSelectedCourse] = useState(null);

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0", transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.5 } },
  };

  return (
    <section data-AOS="fade-down" id="courses" className="courses-section py-16 bg-[url('./public/images/bg.jpg')] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8">
          Explore Our Creative Courses
        </h2>
        <p className="text-center text-lg text-white/80 mb-12">
          Discover your passion and start learning today!
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
              className="course-card relative hover:scale-110 duration-1000 bg-slate-900 h-[400px] text-white shadow-lg rounded-lg overflow-hidden  transition-transform cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover  hover:scale-110 duration-1000 z-0"
              />
              <div className="p-6 absolute bottom-0 left-[2%] w-full">
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-yellow-600 text-lg mt-4"> click for more details</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* نافذة منبثقة */}
        <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center "
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedCourse(null)} // Close modal when clicking on overlay
          >
            <motion.div
              className="bg-[url('./public/images/bg.jpg')] bg-cover relative rounded-lg shadow-2xl shadow-blue-950 text-white w-[90%] md:w-[60%] lg:w-[50%]"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
            >
              {/* Close button */}
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
                <p className="text-white text-lg ">{selectedCourse.description}</p>

                {/* Display taught languages */}
                <div className="text-white w-full text-start mb-4">
                  <strong className="text-yellow-500">technologies we teatch : </strong>
                  <ul className="list-disc pl-5">
                    {selectedCourse.technologies.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>                </div>

                {/* Display course features */}
                <div className="text-white">
                  <strong className="text-yellow-500">Features: </strong>
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
                  Get it now
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
