import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // استيراد CSS لـ Swiper
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'; // استيراد الأيقونات

// بيانات المعلمين
const instructors = [
  {
    id: 1,
    name: "Karem Mahmoud",
    image: "/assets/me3.jpg",
    bio: "Full stack web developer and instructor in software engineering",
    linkedin: "https://www.linkedin.com/in/karem-mahmoud-963b84262/",
    github: "https://github.com/karem880",
    website: "https://karemmahmouddev.netlify.app/",
    cv:"/cvs/Karem Mahmoud Full Stack CV (1).pdf"
  },
  {
    id: 2,
    name: "Shady Mahmoud",
    image: "/assets/shady.png",
    bio: "Front End web developer and instructor in software engineering",
    linkedin: "https://www.linkedin.com/in/shady-mahmoud-600321293/",
    github: "https://github.com/Shady-Mahmoud9",
    website: "https://shady-portfolio-gamma.vercel.app/",
    cv:"/cvs/Shady-Mahmoud-Abdelkader-FlowCV-Resume-20241220 (1).pdf"

  },
  {
    id: 3,
    name: "Mr. Mohamed AbdElsamiee",
    image: "/assets/mohamed.png",
    bio: "Senior and supervisor of the teaching staff, Department of Physics",
    linkedin: "https://www.linkedin.com/in/mohamed-abd-el-samea-491208121/",
    github: null,
    website: null,
    cv:"/cvs/Mohamed Abd ELsamea-CV.pdf"

  },
  {
    id: 4,
    name: "Jana Mostafa",
    image: "/assets/jana.jpg",
    bio: "UI/UX developer, UI/UX designer, marketer",
    linkedin: "https://www.linkedin.com/in/jana-mostafa-246a91320",
    github: "https://github.com/Jana144-m",
    website: null,
    cv:"/cvs/Jana Mostafa cv.pdf"

  },

  // يمكنك إضافة المزيد من المعلمين هنا
];

const TeacherSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4" id='instructors'>
      <Swiper
        spaceBetween={50}
        slidesPerView={2}
        
        loop={true}
        autoplay={true}
      >
        {instructors.map((instructor) => (
          <SwiperSlide key={instructor.id}>
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-800 rounded-xl w-[700px] relative  h-[390px] shadow-lg border border-white p-8 text-center">
            

                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 bg-white "
                />
                  <div className="flex justify-center flex-row md:flex-col gap-6 mb-4 md:absolute right-10 top-10">
                  {instructor.linkedin && (
                    <a
                      href={instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-500 p-2 flex items-center justify-center rounded-md  hover:text-gray-700 hover:scale-110 duration-1000"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  )}
                  {instructor.github && (
                    <a
                      href={instructor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-slate-900 p-2 flex items-center justify-center rounded-md hover:text-gray-700 hover:scale-110 duration-1000"
                    >
                      <FaGithub size={24} />
                    </a>
                  )}
                  {instructor.website && (
                    <a
                      href={instructor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-green-500 p-2 flex items-center justify-center rounded-md  hover:text-gray-700 hover:scale-110 duration-1000 "
                    >
                      <FaGlobe size={24} />
                    </a>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-[#f5a425]  mb-2">
                  {instructor.name}
                </h3>
                <p className="text-white text-lg mb-10 w-[70%]  mx-auto">{instructor.bio}</p>

            

                <a
                    href={instructor.cv}
                    download
                    className="p-4 cursor-pointer mt-40   bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Show CV
                  </a>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeacherSlider;
