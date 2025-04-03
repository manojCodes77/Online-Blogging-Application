import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Replace "authToken" with the actual key you're using
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="bg-[#f5f5f5] border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <span>Medium</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-600">
          {isAuthenticated ? (
            <>
              <Link to="/my-posts" className="hover:text-black">
                My Stories
              </Link>
              <Link to="/blogs" className="hover:text-black">
                All Blogs
              </Link>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsAuthenticated(false);
                }}
                className="hover:text-black"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/blogs" className="hover:text-black">
                All Blogs
              </Link>
              <Link to="/signin" className="hover:text-black">
                Sign In
              </Link>
              <Link to="/" className="hover:text-black">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* CTA Button */}
        <div>
          {!isAuthenticated ? (
            <Link
              to="/"
              className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/profile"
              className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
