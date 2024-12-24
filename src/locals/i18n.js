import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        about: 'About Us',
        courses: 'Courses',
        instructors: 'Our Instructors',
        language: 'English',
        logo: '<em>TOQ-A</em>-cademy', // الشعار مع استخدام <em> لتنسيق الجزء المحدد
      },
    },
  },
  ar: {
    translation: {
      navbar: {
        home: 'الرئيسية',
        about: 'حولنا',
        courses: 'الدورات',
        instructors: 'مدربونا',
        language: 'العربية',
        logo: '<em>تقى</em>-اكاديمي', // الشعار بالعربية

      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
