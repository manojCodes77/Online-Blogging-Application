import React from "react";
import { FiHeart } from "react-icons/fi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { href: "#help", label: "Help" },
    { href: "#about", label: "About" },
    { href: "#careers", label: "Careers" },
    { href: "#privacy", label: "Privacy" },
    { href: "#terms", label: "Terms" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>© {currentYear} Medium.</span>
            <span className="hidden sm:inline">Made with</span>
            <FiHeart className="w-4 h-4 text-red-500 hidden sm:inline" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
