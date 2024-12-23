import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // استيراد CSS لـ Swiper
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa'; // استيراد أيقونة النجمة

// بيانات آراء العملاء
const customerOpinions = [
  {
    id: 1,
    name: "Ali",
    image: "/assets/images/userman.jpeg",
    opinion: "The service was outstanding! The team was very professional and exceeded my expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mohamed",
    image: "/assets/images/userman.jpeg",
    opinion: "التعامل معكم اكثر من رائع شكرا لجهودكم معنا .",
    rating: 5,
  },
  {
    id: 3,
    name: "Amira Mohamed",
    image: "/assets/images/userwoman.jpeg",
    opinion: "Great experience! The process was smooth, and the result was amazing.",
    rating: 4,
  },
  {
    id: 4,
    name: "zeyad",
    image: "/assets/images/userman.jpeg",
    opinion: "I'm very happy with the quality of service. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "مالك خليفه",
    image: "/assets/images/userman.jpeg",
    opinion: "شرح ممتاز جدا جدا جدا جدا فوق المتوقع ",
    rating: 5,
  },
  {
    id: 6,
    name: "سوفيان خليفه",
    image: "/assets/images/userman.jpeg",
    opinion: "thanks for your help in our training", 
    rating: 5,
  },
  {
    id: 7,
    name: "malak Mohamoud",
    image: "/assets/images/userwoman.jpeg",
    opinion: "شكرا يمستر على مجهودك الكبير معانا ",
    rating: 4,
  },
];

const CustomerOpinionsSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4" id="opinions">
      <h1 className="text-3xl font-bold text-white hover:text-[#f5a425] mb-8 text-center " >Our Rating</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          1024: { slidesPerView: 2 }, // شريحتان للشاشات الكبيرة
        }}
      >
        {customerOpinions.map((customer) => (
          <SwiperSlide key={customer.id}>
            <motion.div
              className="flex justify-center items-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-800 cursor-grab rounded-xl w-full max-w-[400px] h-[350px] relative shadow-lg border border-white p-6 text-center">
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 bg-white"
                />
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: customer.rating }, (_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[#f5a425] mb-2">
                  {customer.name}
                </h3>
                <p className="text-white text-sm">{customer.opinion}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerOpinionsSlider;
