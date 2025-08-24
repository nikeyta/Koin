import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="about&contact"
      className="bg-gradient-to-r from-emerald-500 to-teal-500 
                 dark:from-[#031914] dark:via-[#05241d] dark:to-[#08372d]  
                 border-t border-gray-200 dark:border-gray-700 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white dark:text-emerald-200 mb-2">
              KOIN
            </h2>
            <p className="text-gray-100 dark:text-gray-300 text-sm leading-relaxed">
              Because your wallet deserves better.
            </p>
          </div>

          {/* Empty for grid balance */}
          <div></div>

          <div>
            <h3 className="text-lg font-semibold text-white dark:text-emerald-200 mb-4">
              Features
            </h3>
            <div className="space-y-2 text-gray-100 dark:text-gray-300">
              <p>AI-Powered Insights</p>
              <p>Smart Categorization</p>
              <p>Previous expense tracking</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white dark:text-emerald-200 mb-4">
              Contact Me
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:atinikszn@example.com"
                className="flex items-center gap-2 text-gray-100 dark:text-gray-300 hover:text-emerald-100 dark:hover:text-emerald-400 transition"
              >
                <FaEnvelope /> atinikszn@example.com
              </a>
              <a
                href="tel:+918827290625"
                className="flex items-center gap-2 text-gray-100 dark:text-gray-300 hover:text-emerald-100 dark:hover:text-emerald-400 transition"
              >
                <FaPhone /> +91 8827290625
              </a>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://github.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 dark:text-gray-300 hover:text-emerald-100 dark:hover:text-emerald-400"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nikita-nandmehar-60b901250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 dark:text-gray-300 hover:text-emerald-100 dark:hover:text-emerald-400"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/atinikszn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-100 dark:text-gray-300 hover:text-emerald-100 dark:hover:text-emerald-400"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-100 dark:text-gray-400 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} KOIN. All rights reserved.
          </p>
          <p className="text-gray-100 dark:text-gray-400 text-sm">
            Made by Nikita
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
