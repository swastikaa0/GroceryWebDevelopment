import React, { useState } from 'react';
import { Search, ShoppingCart, Star, Plus } from 'lucide-react';

export default function AllProducts() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    // Row 1
    {
      id: 1,
      name: "Brown Bread 400g",
      category: "Bakery",
      price: 35,
      originalPrice: 40,
      rating: 4,
      reviews: 4,
      image: "/api/placeholder/200/200",
      color: "from-amber-200 to-amber-400"
    },
    {
      id: 2,
      name: "Organic Quinoa 500g",
      category: "Grains",
      price: 420,
      originalPrice: 450,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-orange-200 to-orange-400"
    },
    {
      id: 3,
      name: "Carrot 500g",
      category: "Vegetables",
      price: 44,
      originalPrice: 50,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-orange-300 to-orange-500"
    },
    {
      id: 4,
      name: "Apple 1kg",
      category: "Fruits",
      price: 90,
      originalPrice: 100,
      rating: 4,
      reviews: 2,
      image: "/api/placeholder/200/200",
      color: "from-red-300 to-red-500"
    },
    {
      id: 5,
      name: "Cheese 200g",
      category: "Dairy",
      price: 130,
      originalPrice: 140,
      rating: 4,
      reviews: 4,
      image: "/api/placeholder/200/200",
      color: "from-yellow-200 to-yellow-400"
    },
    
    // Row 2
    {
      id: 6,
      name: "Wheat Flour 5kg",
      category: "Grains",
      price: 230,
      originalPrice: 250,
      rating: 4,
      reviews: 2,
      image: "/api/placeholder/200/200",
      color: "from-amber-300 to-amber-500"
    },
    {
      id: 7,
      name: "Mango 1kg",
      category: "Fruits",
      price: 140,
      originalPrice: 150,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-yellow-300 to-orange-400"
    },
    {
      id: 8,
      name: "Grapes 500g",
      category: "Fruits",
      price: 65,
      originalPrice: 70,
      rating: 4,
      reviews: 4,
      image: "/api/placeholder/200/200",
      color: "from-green-300 to-green-500"
    },
    {
      id: 9,
      name: "Onion 500g",
      category: "Vegetables",
      price: 45,
      originalPrice: 50,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-purple-200 to-purple-400"
    },
    {
      id: 10,
      name: "7 Up 1.5L",
      category: "Drinks",
      price: 70,
      originalPrice: 75,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-green-400 to-green-600"
    },
    
    // Row 3
    {
      id: 11,
      name: "Banana 1kg",
      category: "Fruits",
      price: 45,
      originalPrice: 50,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-yellow-300 to-yellow-500"
    },
    {
      id: 12,
      name: "Sprite 1.5L",
      category: "Drinks",
      price: 60,
      originalPrice: 75,
      rating: 4,
      reviews: 6,
      image: "/api/placeholder/200/200",
      color: "from-green-400 to-green-600"
    },
    {
      id: 13,
      name: "Knorr Cup Soup 70g",
      category: "Instant",
      price: 30,
      originalPrice: 35,
      rating: 4,
      reviews: 4,
      image: "/api/placeholder/200/200",
      color: "from-green-300 to-green-500"
    },
    {
      id: 14,
      name: "Potato 500g",
      category: "Vegetables",
      price: 35,
      originalPrice: 40,
      rating: 4,
      reviews: 2,
      image: "/api/placeholder/200/200",
      color: "from-yellow-200 to-yellow-400"
    },
    {
      id: 15,
      name: "Coca-Cola 1.5L",
      category: "Drinks",
      price: 75,
      originalPrice: 80,
      rating: 4,
      reviews: 4,
      image: "/api/placeholder/200/200",
      color: "from-red-400 to-red-600"
    }
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={12} 
        className={`${i < rating ? 'fill-green-400 text-green-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">GreenCart</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-700">Seller Dashboard</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
              <a href="#" className="text-gray-900 font-medium">All Product</a>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <button className="p-2 relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ALL PRODUCTS</h1>
          <div className="w-20 h-1 bg-green-500 mt-2"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className={`w-24 h-24 bg-gradient-to-br ${product.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-semibold text-sm">
                    {product.category === 'Fruits' && '🍎'}
                    {product.category === 'Vegetables' && '🥕'}
                    {product.category === 'Grains' && '🌾'}
                    {product.category === 'Bakery' && '🍞'}
                    {product.category === 'Dairy' && '🧀'}
                    {product.category === 'Drinks' && '🥤'}
                    {product.category === 'Instant' && '🍜'}
                  </span>
                </div>
              </div>

              {/* Category */}
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>

              {/* Product Name */}
              <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              {/* Price and Add Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">₹{product.price}</span>
                  <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                </div>
                <button
                  onClick={addToCart}
                  className="text-green-600 hover:bg-green-50 p-1 rounded transition-colors flex items-center"
                >
                  <Plus size={16} />
                  <span className="text-xs ml-1">Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-bold text-green-600 mb-4">GreenCart</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-green-600">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Best Sellers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Offers & Deals</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">FAQs</a></li>
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Need help?</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-green-600">Delivery Information</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Return & Refund Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Payment Methods</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Track your Order</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Contact Us</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-green-600">Instagram</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Facebook</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">YouTube</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              Copyright 2025 © GreatStack.dev All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}