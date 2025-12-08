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
    <header className="bg-slate-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-cyan-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src="/lekhak_ka_pakh.png" 
              alt="Lekhak Logo" 
              className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                LEKHAK
              </div>
              <div className="text-xs text-cyan-400 font-semibold -mt-1" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.2em' }}>
                WHERE STORIES COME ALIVE
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/blogs" 
                  className="px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                >
                  Explore
                </Link>
                <Link 
                  to="/my-posts" 
                  className="px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                >
                  My Posts
                </Link>
                <Link 
                  to="/my-posts/publish" 
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 ml-2"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>Write</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 ml-2 px-4 py-2 text-gray-300 hover:text-red-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/"
                  className="px-6 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/20 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/blogs" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-300 hover:text-cyan-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/my-posts" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-300 hover:text-cyan-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                  >
                    My Posts
                  </Link>
                  <Link 
                    to="/my-posts/publish" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    <span>Write</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-3 text-red-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 text-left"
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
                    className="px-4 py-3 text-gray-300 hover:text-cyan-400 font-medium rounded-lg hover:bg-slate-800 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 bg-cyan-500 text-slate-900 font-semibold rounded-lg text-center hover:bg-cyan-400"
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
