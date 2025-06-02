import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper CSS
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'; // Import icons
import { useTranslation } from 'react-i18next';

const TeacherSlider = () => {
  const { t } = useTranslation();
  const instructors = [
    {
      id: 1,
      name: t('instructors.instructor1.name'),
      image: '/assets/images/me3.jpg',
      bio: t('instructors.instructor1.bio'),
      linkedin: 'https://www.linkedin.com/in/karem-mahmoud-963b84262/',
      github: 'https://github.com/karem880',
      website: 'https://karemmahmouddev.netlify.app/',
      cv: '/assets/cvs/Karem Mahmoud Full Stack CV (1).pdf',
    },
    {
      id: 2,
      name: t('instructors.instructor3.name'),
      image: '/assets/images/mohamed.png',
      bio: t('instructors.instructor3.bio'),
      linkedin: 'https://www.linkedin.com/in/mohamed-abd-el-samea-491208121/',
      github: null,
      website: null,
      cv: '/assets/cvs/Mohamed Abd ELsamea-CV.pdf',
    },
    {
      id: 3,
      name: t('instructors.instructor2.name'),
      image: '/assets/images/shady.png',
      bio: t('instructors.instructor2.bio'),
      linkedin: 'https://www.linkedin.com/in/shady-mahmoud-600321293/',
      github: 'https://github.com/Shady-Mahmoud9',
      website: 'https://shady-portfolio-gamma.vercel.app/',
      cv: '/assets/cvs/Shady-Mahmoud-Abdelkader-FlowCV-Resume-20241220 (1).pdf',
    },
 
    {
      id: 4,
      name: t('instructors.instructor4.name'),
      image: '/assets/images/jana.jpg',
      bio: t('instructors.instructor4.bio'),
      linkedin: 'https://www.linkedin.com/in/jana-mostafa-246a91320',
      github: 'https://github.com/Jana144-m',
      website: null,
      cv: '/assets/cvs/Jana Mostafa cv.pdf',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4" id="OurInstructors">
      <h1 className="text-3xl font-bold text-white hover:text-[#f5a425] mb-8 text-center m-20">
        {t('instructors.heading')}
      </h1>
      <p className='text-gray-500 text-center '>{t('instructors.description')}</p>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          1024: { slidesPerView: 2 },
        }}
      >
        {instructors.map((instructor) => (
          <SwiperSlide key={instructor.id}>
            <motion.div
              className="flex justify-center items-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-800 cursor-grab rounded-xl w-full max-w-[400px] h-[350px] relative shadow-lg border border-white p-6 text-center">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className={
                    instructor.id === 1
                      ? 'w-24 h-24 object-cover scale-105 rounded-full mx-auto mb-4 bg-white'
                      : 'w-24 h-24 object-contain scale-105 rounded-full mx-auto mb-4 bg-white'
                  }
                />
                <div className="flex justify-center gap-4 mb-4 md:absolute top-5 right-10 md:flex-col">
                  {instructor.linkedin && (
                    <a
                      href={instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-500 p-2 flex items-center justify-center rounded-md hover:text-gray-700 hover:scale-110 duration-500"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {instructor.github && (
                    <a
                      href={instructor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-slate-900 p-2 flex items-center justify-center rounded-md hover:text-gray-700 hover:scale-110 duration-500"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {instructor.website && (
                    <a
                      href={instructor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-green-500 p-2 flex items-center justify-center rounded-md hover:text-gray-700 hover:scale-110 duration-500"
                    >
                      <FaGlobe size={20} />
                    </a>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#f5a425] mb-2">
                  {instructor.name}
                </h3>
                <p className="text-white text-sm mb-6">{instructor.bio}</p>
                <a
                  href={instructor.cv}
                  download
                  className="p-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  {t('instructors.showcv')}
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
