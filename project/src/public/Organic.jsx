import React, { useState } from 'react';
import { Search, ShoppingCart, Star, Plus } from 'lucide-react';

const GreenCart = () => {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Carrot 500g',
      category: 'Vegetables',
      price: 44,
      originalPrice: 50,
      rating: 4,
      reviews: 4,
      image: '🥕',
      bgColor: 'bg-orange-50'
    },
    {
      id: 2,
      name: 'Onion 500g',
      category: 'Vegetables',
      price: 45,
      originalPrice: 50,
      rating: 4,
      reviews: 6,
      image: '🧅',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      name: 'Potato 500g',
      category: 'Vegetables',
      price: 35,
      originalPrice: 40,
      rating: 4,
      reviews: 8,
      image: '🥔',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 4,
      name: 'Spinach 500g',
      category: 'Vegetables',
      price: 15,
      originalPrice: 18,
      rating: 5,
      reviews: 5,
      image: '🥬',
      bgColor: 'bg-green-50'
    },
    {
      id: 5,
      name: 'Tomato 1 kg',
      category: 'Vegetables',
      price: 28,
      originalPrice: 30,
      rating: 4,
      reviews: 4,
      image: '🍅',
      bgColor: 'bg-red-50'
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className={`${product.bgColor} rounded-lg p-6 mb-4 flex items-center justify-center`}>
        <span className="text-6xl">{product.image}</span>
      </div>
      
      <div className="space-y-2">
        <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-emerald-600">${product.price}</span>
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-emerald-600">
                🛒GreenCart
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Seller Dashboard</a>
              <a href="#" className="text-gray-900 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">All Product</a>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                />
              </div>
              
              <div className="relative">
                <ShoppingCart className="text-gray-600 hover:text-gray-900 cursor-pointer" size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>

              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">ORGANIC VEGGIES</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-bold text-emerald-600 mb-4">🛒GreenCart</div>
              <p className="text-gray-600 max-w-md">
                We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Home</a></li>
                <li><a href="#" className="hover:text-gray-900">Best Sellers</a></li>
                <li><a href="#" className="hover:text-gray-900">Offers & Deals</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
              </ul>
            </div>

            {/* Help & Follow */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Need help?</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li><a href="#" className="hover:text-gray-900">Delivery Information</a></li>
                <li><a href="#" className="hover:text-gray-900">Return & Refund Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Payment Methods</a></li>
                <li><a href="#" className="hover:text-gray-900">Track your Order</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-900">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-center text-gray-500">
              Copyright 2025 © GreatStock.dev All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GreenCart;