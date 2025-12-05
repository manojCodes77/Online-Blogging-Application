import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiEdit3, FiLogOut } from 'react-icons/fi';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Medium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/blogs" 
                  className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200"
                >
                  Explore
                </Link>
                <Link 
                  to="/my-posts" 
                  className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200"
                >
                  My Posts
                </Link>
                <Link 
                  to="/my-posts/publish" 
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 ml-2"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>Write</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 ml-2 px-4 py-2 text-gray-600 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/"
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/blogs" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200"
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/my-posts" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200"
                  >
                    My Posts
                  </Link>
                  <Link 
                    to="/my-posts/publish" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    <span>Write</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-3 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-200 text-left"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-600 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
