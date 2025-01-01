import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* About Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm">
            Welcome to SCI-CODEA- , a cutting-edge a  specializing in Computer SCI-CODEence and SCI-CODEence. We offer a comprehensive, innovative approach to education that empowers students to explore the faSCI-CODEnating realms of technology and SCI-CODEence in a practical and engaging way
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-white hover:text-[#f5a425] duration-1000 cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-[#f5a425] duration-1000 cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a href="#courses" className="text-white hover:text-[#f5a425] duration-1000 cursor-pointer">
                courses
                </a>
              </li>
              <li>
                <a href="#Our" className="text-white hover:text-[#f5a425] duration-1000 cursor-pointer">
                  our team
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4 items-center justify-center">
              <a
                href="#"
                className="p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          © {new Date().getFullYear()} SCI-CODEA- . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
