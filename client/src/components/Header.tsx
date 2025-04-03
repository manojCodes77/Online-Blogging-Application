import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setUser({ token: null });
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Medium
        </Link>
        <nav className="flex items-center space-x-4">
          {user.token ? (
            <>
              <Link to="/my-posts" className="text-gray-600 hover:text-gray-800">
                My Posts
              </Link>
              <Link to="/blogs" className="text-gray-600 hover:text-gray-800">
                All Posts
              </Link>
              <Link to="/my-posts/publish" className="text-gray-600 hover:text-gray-800">
                Write
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-600 hover:text-gray-800">
                Sign In
              </Link>
              <Link
                to="/"
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
