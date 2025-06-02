import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaBars, FaWindowClose, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const navigation = [
  { name: "home", href: "/", current: true, path: "/" },
  { name: "about", href: "/#about", current: false, path: "/" },
  { name: "courses", href: "/#courses", current: false, path: "/" },
  { name: "instructors", href: "/#ourInstructors", current: false, path: "/" },
  // { name: "game", href: "/game", current: false, path: "/game" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const { t } = useTranslation();
  const { language, switchLanguage } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e, item) => {
    if (item.href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = item.href.replace("/#", "");

      if (location.pathname !== "/") {
        navigate(`/${item.href}`);
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full z-[9999]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="text-white text-xl font-bold logo">
                <Link to="/">
                  <span dangerouslySetInnerHTML={{ __html: t("navbar.logo") }} />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center space-x-4 gap-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => handleNavigation(e, item)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {t(`navbar.${item.name}`)}
                  </Link>
                ))}

           

                {/* Language Toggle */}
                <button
                  onClick={() => switchLanguage(language === "en" ? "ar" : "en")}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center"
                >
                  <FaGlobe className="mr-2" />
                  {language === "en" ? "AR" : "EN"}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="sm:hidden flex items-center">
                <Disclosure.Button className="text-gray-400 hover:text-white hover:bg-gray-700 border-none outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaWindowClose className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  onClick={(e) => handleNavigation(e, item)}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {t(`navbar.${item.name}`)}
                </Disclosure.Button>
              ))}
              
      

              {/* Mobile Language Toggle */}
              <Disclosure.Button
                as="button"
                onClick={() => switchLanguage(language === "en" ? "ar" : "en")}
                className="text-gray-300 hover:text-white block w-full text-left rounded-md px-3 py-2 text-base font-medium"
              >
                <div className="flex items-center">
                  <FaGlobe className="mr-2" />
                  {language === "en" ? "AR" : "EN"}
                </div>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
