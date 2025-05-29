import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Bell, MessageSquare, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-teal-600">Local<span className="text-orange-500">Market</span></span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </span>
            </div>
            <button type="submit" className="ml-2 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
              Search
            </button>
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/create-listing" className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              Post Ad
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <Link to="/messages" className="text-gray-600 hover:text-teal-600">
                    <MessageSquare size={20} />
                  </Link>
                  <Link to="/favorites" className="text-gray-600 hover:text-teal-600">
                    <Heart size={20} />
                  </Link>
                  <button 
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-1 text-gray-600 hover:text-teal-600"
                  >
                    <User size={20} />
                    <span className="text-sm">{user?.name?.split(' ')[0]}</span>
                  </button>
                </div>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/my-listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Listings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-teal-600 hover:text-teal-800">
                  Login
                </Link>
                <Link to="/register" className="text-teal-600 hover:text-teal-800">
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </span>
            <button type="submit" className="absolute right-2 top-1.5 px-3 py-1 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/create-listing" 
                  className="block px-4 py-2 text-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post Ad
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/messages" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      <MessageSquare size={18} className="mr-2" />
                      Messages
                    </Link>
                  </li>
                  <li>
                    <Link to="/favorites" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      <Heart size={18} className="mr-2" />
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      <User size={18} className="mr-2" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-listings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      <User size={18} className="mr-2" />
                      My Listings
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="block px-4 py-2 text-center text-teal-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="block px-4 py-2 text-center text-teal-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;