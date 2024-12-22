import { MdLocationOn } from "react-icons/md";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Aos from "aos";

export default function ContactSection() {
  useEffect(() => {
    // Initialize AOS
    Aos.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens only once when scrolled into view
    });
  }, []);
  const phoneNumber = "+201023257791"; // استبدل برقم هاتفك
  const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`; // صيغة رابط واتساب

  return (
    <section data-aos="fade-in" id="location" className="bg-[url('./public/assets/bg.jpg')] bg-cover bg-center py-12 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Location</h2>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-12">
          {/* الموقع */}
          <div className="w-full  flex flex-col items-center text-center">
            <MdLocationOn className="text-indigo-500 text-5xl mb-4" />
            <p className="text-lg mb-4">شارع الصعيدي بجوار مسجد العمده</p>
            <iframe
src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d275.55334560771695!2d31.596522324987486!3d31.08887303120322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2seg!4v1734883444852!5m2!1sen!2seg"              width="100%"
              height="550"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="الموقع على الخريطة"
            ></iframe>
          </div>

        
            
          
        </div>
      </div>
    </section>
  );
}
