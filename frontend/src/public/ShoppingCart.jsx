import React, { useState } from 'react';
import { Search, ShoppingCart, ArrowLeft, ChevronDown } from 'lucide-react';

export default function ShoppingCart() {
  const [cartCount, setCartCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

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
              <a href="#" className="text-gray-500 hover:text-gray-700">All Product</a>
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
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart <span className="text-lg font-normal text-gray-500">0 items</span>
              </h1>
            </div>

            {/* Cart Table Headers */}
            <div className="bg-gray-50 px-6 py-4 rounded-t-lg">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-3 text-center">Subtotal</div>
                <div className="col-span-3 text-center">Action</div>
              </div>
            </div>

            {/* Empty Cart Content */}
            <div className="bg-white border border-gray-200 rounded-b-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg text-gray-500">Your cart is empty</p>
              </div>
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-6">
              <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Delivery Address */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">DELIVERY ADDRESS</h3>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Change
                  </button>
                </div>
                <p className="text-gray-500 text-sm">No address found</p>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">PAYMENT METHOD</h3>
                <div className="relative">
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Price</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (2%)</span>
                  <span>$0</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total Amount:</span>
                  <span>$0</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                Place Order
              </button>
            </div>
          </div>
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