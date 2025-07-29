import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Settings, Users, Package, BarChart3, ChevronDown } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { CartContext } from '../contexts/CartContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false); // Also close mobile menu if open
    // Use window.location to ensure a complete page refresh and proper navigation
    window.location.href = '/';
  };

  const cartCount = getCartCount();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/buyer/home") : "/"} className="text-2xl font-bold text-[#0A400C]">
              Daily<span className="text-[#B0DB9C]">Grocer</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  // Admin Navigation
                  <>
                    <Link to="/admin/dashboard" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/admin/users" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Users
                    </Link>
                    <Link to="/admin/products" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Products
                    </Link>
                    <Link to="/admin/orders" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Orders
                    </Link>
                    <Link to="/admin/reports" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Reports
                    </Link>
                  </>
                ) : (
                  // Buyer Navigation
                  <>
                    <Link to="/buyer/home" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Home
                    </Link>
                    <Link to="/products" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Products
                    </Link>
                    <Link to="/categories" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      About Us
                    </Link>
                    <Link to="/orders" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      My Orders
                    </Link>
                  </>
                )}
              </>
            ) : (
              // Guest Navigation
              <>
                <Link to="/" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <a href="/#products" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Products
                </a>
                                    <a href="/#categories" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      About Us
                    </a>
                <a href="/#about" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </a>
                <a href="/#contact" className="text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </a>
              </>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && !isAdmin && (
              // Cart button for buyers only
              <Link to="/cart" className="relative p-2 text-[#0A400C] hover:text-[#B0DB9C] transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B0DB9C] text-[#0A400C] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              // User Menu Dropdown
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name || 'User'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin/profile"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Settings
                        </Link>
                        <Link
                          to="/admin/users"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Manage Users
                        </Link>
                        <Link
                          to="/admin/products"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Manage Products
                        </Link>
                        <Link
                          to="/admin/reports"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                        <Link
                          to="/cart"
                          className="flex items-center px-4 py-2 text-sm text-[#0A400C] hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cart ({cartCount})
                        </Link>
                      </>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login/Register buttons for guests
              <>
                <Link 
                  to="/login"
                  className="flex items-center space-x-1 text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register"
                  className="bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white px-6 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#0A400C] hover:text-[#B0DB9C] p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    // Admin Mobile Navigation
                    <>
                      <Link to="/admin/dashboard" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Dashboard
                      </Link>
                      <Link to="/admin/users" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Users
                      </Link>
                      <Link to="/admin/products" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Products
                      </Link>
                      <Link to="/admin/orders" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Orders
                      </Link>
                      <Link to="/admin/reports" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Reports
                      </Link>
                    </>
                  ) : (
                    // Buyer Mobile Navigation
                    <>
                      <Link to="/buyer/home" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Home
                      </Link>
                      <Link to="/products" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Products
                      </Link>
                      <Link to="/categories" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        About Us
                      </Link>
                      <Link to="/orders" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        My Orders
                      </Link>
                      <Link to="/cart" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        Cart ({cartCount})
                      </Link>
                    </>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-[#0A400C]">
                        {user?.name} {isAdmin && <span className="text-[#B0DB9C]">(Admin)</span>}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                // Guest Mobile Navigation
                <>
                  <Link to="/" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                    Home
                  </Link>
                  <a href="/#products" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                    Products
                  </a>
                                        <a href="/#categories" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                        About Us
                      </a>
                  <a href="/#about" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                    About
                  </a>
                  <a href="/#contact" className="block text-[#0A400C] hover:text-[#B0DB9C] px-3 py-2 rounded-md text-base font-medium">
                    Contact
                  </a>
                  <div className="flex flex-col space-y-2 px-3 pt-4">
                    <Link to="/login" className="block text-[#0A400C] hover:text-[#B0DB9C] py-2 text-center">
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      className="bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white py-2 rounded-md font-medium transition-all duration-200 text-center block"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
