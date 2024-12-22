import  { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyUsSection = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Animation happens only once when scrolled into view
    });
  }, []);
  
  const [activeTab, setActiveTab] = useState(1); // لتحديد التبويب النشط

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabsContent = [
    {
      title: "Best Education",
      image: "/public/images/1.png",
      description: "Grad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank you Grad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank you."
    },
    {
      title: "Top Management",
      image: "/public/images/1.png",
      description: " You can modify this HTML layout by editing contents and adding more pages as needed. Grad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youSince this template has options to add dropdown menus, you can add many HTML pages."
    },
    {
      title: "Quality Meeting",
      image: "/public/images/1.png",
      description: "You are NOT allowed to redistribute this Grad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank youGrad School is a free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank you template ZIP file on any template collection website. However, you can use this template to convert into a specific theme for any CMS platform like WordPress."
    },
  ];

  return (
    <section data-aos="fade-up"  className="section why-us  text-white py-12" id="section2">
    <div className="container mx-auto">
      <div className="section-heading text-center mb-8">
        <h2 className="text-4xl font-semibold">Why choose ToQ-A-cademy</h2>
      </div>

      <div className="tabs flex justify-center mb-6">
        {tabsContent.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-2 text-lg font-semibold text-white hover:text-[#f5a425] ${activeTab === index ? 'text-yellow-500 border-b-2  border-[#f5a425]' : ''}`}
          >
            {tab.title}
          </button>
        ))}
      </div>


      <div data-aos="fade-left"  className="tab-content">
        <div className="flex items-center justify-center gap-20 flex-col md:flex-row mt-20 w-full">
          <div className="w-[80%] m-auto md:w-1/2 flex justify-center items-center">
            <img 
            id='imgg'
              src={tabsContent[activeTab].image}
              alt={tabsContent[activeTab].title}
              className=" w-full md:w-[80%] rounded-lg transition-transform duration-300 transform hover:scale-105"
              style={{ filter: activeTab === 0 ? 'grayscale(50%)' : activeTab === 1 ? 'sepia(50%)' : 'blur(2px)' }}
            />
          </div>
          <div data-aos="fade-right"   className="w-full md:w-1/2 pl-6 flex flex-col items-start justify-center h-[100%]">
            <h4 className="text-2xl font-semibold">{tabsContent[activeTab].title}</h4>
            <p className="mt-4">{tabsContent[activeTab].description}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default WhyUsSection;
