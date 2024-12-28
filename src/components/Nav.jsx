import { Disclosure } from '@headlessui/react';
import { FaBars, FaWindowClose, FaGlobe } from 'react-icons/fa'; // استيراد الأيقونات
import { useTranslation } from 'react-i18next'; // استيراد الـ hook لترجمة النصوص
import { useLanguage } from '../context/LanguageContext'; // استيراد الـ context
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'home', href: '/', current: true, path: '/' },
  { name: 'about', href: '#about', current: false, path: '/' },
  { name: 'courses', href: '#courses', current: false, path: '/' },
  { name: 'instructors', href: '#our', current: false, path: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  const { t } = useTranslation(); // استخدام الـ hook لجلب الترجمة
  const { language, switchLanguage } = useLanguage(); // استخدام الـ context لتغيير اللغة
  const { isAuthenticated, user, logout } = useAuth();


  const handleLanguageSwitch = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    switchLanguage(newLanguage); // تغيير اللغة عند الضغط
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full z-[9999]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className="text-white text-xl font-bold logo">
                  <Link to={'/'}>
                    <Link to={'/'} dangerouslySetInnerHTML={{ __html: t('navbar.logo') }} /> {/* الشعار مع <em> */}
                  </Link>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex items-center space-x-4 gap-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {t(`navbar.${item.name}`)} {/* استخدام الترجمة */}
                  </Link>
                ))}

                {/* Language Switcher */}
                <button
                  onClick={handleLanguageSwitch}
                  className="text-gray-300 gap-2  hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center"
                >
                  <FaGlobe className="mr-2" />
                  {language === 'en' ? 'AR' : 'الانجليزيه'}
                </button>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    {user && (
                      <Link to="/profile" className="text-gray-300">{user.first_name}</Link>
                    )}
                    <button
                      onClick={logout}
                      className="text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                      {t('navbar.logout')}
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      {t('navbar.login')}
                    </Link>
                    {/* <Link
                      to="/register"
                      className="text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      {t('navbar.register')}
                    </Link> */}
                  </div>
                )}

              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center">
                <Disclosure.Button className="text-gray-400 hover:text-white hover:bg-gray-700 border-none outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaWindowClose className="h-6 w-6 outline-none border-none" aria-hidden="true" />
                  ) : (
                    <FaBars className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {t(`navbar.${item.name}`)} {/* استخدام الترجمة */}
                </Disclosure.Button>
              ))}

              {/* Language Switcher in Mobile */}
              <Disclosure.Button
                onClick={handleLanguageSwitch}
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium flex items-center"
              >
                <FaGlobe className="mr-2" />
                {language === 'en' ? 'English' : 'العربية'}
              </Disclosure.Button>
              {isAuthenticated ? (
                <Disclosure.Button
                  onClick={logout}
                  className="block  text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  {t('navbar.logout')}
                </Disclosure.Button>
              ) : (
                <Disclosure.Button
                  as="a"
                  href="/login"
                  className="block  text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  {t('navbar.login')}
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
