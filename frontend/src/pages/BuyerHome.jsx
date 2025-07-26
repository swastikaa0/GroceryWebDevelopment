import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock, Truck, Star, TrendingUp, User, Heart, Gift, Percent, Zap } from 'lucide-react';

const BuyerHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] via-white to-[#B0DB9C]/20">
      {/* Vibrant Welcome Hero Section */}
      <section className="bg-gradient-to-r from-[#B0DB9C] via-[#ECFAE5] to-[#B0DB9C] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[#0A400C] opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #0A400C 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-[#0A400C] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Welcome back, valued customer!
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0A400C] leading-tight">
                Fresh & 
                <span className="text-[#0A400C] block bg-gradient-to-r from-[#0A400C] to-[#B0DB9C] bg-clip-text">Delicious</span>
                <span className="text-[#0A400C] block">Awaits You!</span>
              </h1>
              <p className="text-xl text-gray-700 mt-6 leading-relaxed">
                🛒 Your favorite grocery store is ready with fresh produce, amazing deals, and lightning-fast delivery!
              </p>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6 mt-8 p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0A400C]">2.5k+</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0A400C]">24/7</p>
                  <p className="text-sm text-gray-600">Delivery</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0A400C]">99%</p>
                  <p className="text-sm text-gray-600">Fresh</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Start Shopping 🛍️</span>
                </Link>
                <Link
                  to="/orders"
                  className="bg-white border-2 border-[#B0DB9C] text-[#0A400C] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#B0DB9C] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Clock className="h-6 w-6" />
                  <span>My Orders</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&crop=center"
                  alt="Fresh groceries"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover border-4 border-white"
                />
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                  <Percent className="h-6 w-6" />
                  <p className="text-xs font-bold mt-1">50% OFF</p>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#B0DB9C]">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-[#B0DB9C] to-[#ECFAE5] p-3 rounded-full">
                      <Truck className="h-6 w-6 text-[#0A400C]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0A400C]">Free Delivery</p>
                      <p className="text-gray-600 text-sm">Orders over $50</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B0DB9C]/30 to-[#ECFAE5]/30 rounded-3xl -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Fun & Colorful */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A400C] mb-4">Quick Actions 🚀</h2>
            <p className="text-gray-600">Everything you need, just a click away!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/cart"
              className="group bg-gradient-to-br from-orange-400 to-orange-500 p-6 rounded-2xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-10 w-10 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">My Cart 🛒</h3>
              <p className="text-orange-100">View items in cart</p>
            </Link>

            <Link
              to="/orders"
              className="group bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-2xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Clock className="h-10 w-10 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Order History 📦</h3>
              <p className="text-blue-100">Track your orders</p>
            </Link>

            <Link
              to="/profile"
              className="group bg-gradient-to-br from-purple-400 to-purple-500 p-6 rounded-2xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <User className="h-10 w-10 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">My Profile 👤</h3>
              <p className="text-purple-100">Update your info</p>
            </Link>

            <Link
              to="/wishlist"
              className="group bg-gradient-to-br from-pink-400 to-pink-500 p-6 rounded-2xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Heart className="h-10 w-10 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Wishlist ❤️</h3>
              <p className="text-pink-100">Saved favorites</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-12 bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-white" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-lg mb-6 animate-pulse">
              <Gift className="h-5 w-5 mr-2" />
              🎉 SPECIAL OFFERS TODAY!
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Up to 50% OFF on Fresh Produce! 🥬🍎
            </h2>
            <p className="text-gray-200 text-xl mb-8">
              Limited time offer - Stock up on your favorite fruits and vegetables!
            </p>
            <Link
              to="/products?category=fruits-vegetables"
              className="bg-[#B0DB9C] text-[#0A400C] px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2 shadow-xl"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Shop Deals Now!</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-[#ECFAE5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A400C] mb-4">Shop by Category 🏪</h2>
            <p className="text-gray-600">Find exactly what you're looking for!</p>
          </div>
          
          {/* Simple Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link to="/products?category=fruits" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="font-bold text-[#0A400C] group-hover:text-[#B0DB9C]">Fruits</h3>
            </Link>
            <Link to="/products?category=vegetables" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🥬</div>
              <h3 className="font-bold text-[#0A400C] group-hover:text-[#B0DB9C]">Vegetables</h3>
            </Link>
            <Link to="/products?category=dairy" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🥛</div>
              <h3 className="font-bold text-[#0A400C] group-hover:text-[#B0DB9C]">Dairy</h3>
            </Link>
            <Link to="/products?category=meat" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🥩</div>
              <h3 className="font-bold text-[#0A400C] group-hover:text-[#B0DB9C]">Meat</h3>
            </Link>
            <Link to="/products?category=bakery" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🍞</div>
              <h3 className="font-bold text-[#0A400C] group-hover:text-[#B0DB9C]">Bakery</h3>
            </Link>
            <Link to="/products?category=snacks" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-4">🍿</div>
              <h3 className="font-bold text-[#0A400C] group-hover:text-[#B0DB9C]">Snacks</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A400C] mb-4">Featured Products ⭐</h2>
            <p className="text-gray-600">Hand-picked fresh items just for you!</p>
          </div>
          
          {/* Simple Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border-2 border-[#B0DB9C] rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-[#ECFAE5] to-[#B0DB9C] rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🥗</span>
                </div>
                <h3 className="font-bold text-[#0A400C] mb-2">Fresh Product {item}</h3>
                <p className="text-gray-600 text-sm mb-4">Premium quality fresh produce</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0A400C]">$9.99</span>
                  <button className="bg-[#0A400C] text-white px-4 py-2 rounded-lg hover:bg-[#2D5A2F] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-[#B0DB9C] to-[#ECFAE5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A400C] mb-4">Stay Updated! 📧</h2>
          <p className="text-gray-700 text-lg mb-8">
            Get the latest deals, fresh arrivals, and exclusive offers delivered to your inbox!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-6 py-3 rounded-xl border border-[#B0DB9C] focus:outline-none focus:ring-2 focus:ring-[#0A400C]"
            />
            <button className="bg-[#0A400C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2D5A2F] transition-colors">
              Subscribe 🚀
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyerHome;
