import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      // If we're on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on other page, go to home and then scroll
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-health flex items-center justify-center">
              <span className="text-white text-sm">❤️</span>
            </div>
            <span className="text-xl font-bold text-gray-900">মনবন্ধু</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              হোম
            </Link>

            {/* সেবা সমূহ - Scroll to features section */}
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              সেবা সমূহ
            </button>

            {/* জরুরি স্বাস্থ্য সেবা */}
            <button
              onClick={() => scrollToSection("emergency")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              জরুরি সেবা
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
