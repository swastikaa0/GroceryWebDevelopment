import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-3 px-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src="C:\Users\swast\Desktop\Class\project\src\pics\logo.svg" alt="GreenCart Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 font-semibold hover:text-green-600">Seller Dashboard</a>
          <a href="#" className="text-gray-700 font-semibold hover:text-green-600">Home</a>
          <a href="#" className="text-gray-700 font-semibold hover:text-green-600">All Product</a>
        </div>

        {/* Right-aligned elements: Search + Cart + Login */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex border rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search products"
              className="px-4 py-2 outline-none"
            />
            <button className="bg-green-600 text-white px-4">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center relative">
            <img src="/cart_icon.svg" alt="Cart" className="h-8 w-8" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </div>

          {/* Login Button */}
          <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
