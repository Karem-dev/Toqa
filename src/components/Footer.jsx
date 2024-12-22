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
            Welcome to TOQ-A-CADEMy, a cutting-edge academy specializing in Computer Science and Science. We offer a comprehensive, innovative approach to education that empowers students to explore the fascinating realms of technology and science in a practical and engaging way
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
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
          © {new Date().getFullYear()} TOQ-A-CADEMY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
