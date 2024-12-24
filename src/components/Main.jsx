import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // استيراد useTranslation

function Main() {
  const { t } = useTranslation(); // الحصول على الترجمة من i18next

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // مدة الرسوم المتحركة (بالملي ثانية)
      easing: 'ease-in-out', // دالة التسريع
      once: true, // يحدث التحريك مرة واحدة فقط عند التمرير
    });
  }, []);

  return (
    <section data-aos="fade-in" className="section main-banner" id="top hero" data-section="section1">
      <video autoPlay muted loop id="bg-video">
        <source src="/assets/images/vedio.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay header-text">
        <div className="caption">
          <h6>{t('hero.welcome')}</h6> {/* استخدام الترجمة */}
          <h2 dangerouslySetInnerHTML={{ __html: t('hero.company_name') }} /> {/* استخدام الترجمة مع <em> */}
          <div className="main-button">
            <div className="scroll-to-section">
              <a href="#courses" className='hover:scale-105 hover:bg-amber-600 hover:text-white rounded-md  duration-1000 ' >{t('hero.discover_more')}</a> {/* استخدام الترجمة */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
