import React from 'react';
import { Search, ShoppingCart, Star } from 'lucide-react';

export default function Bakery() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">GreenCart</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Seller Dashboard</a>
              <a href="#" className="text-gray-900 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">All Product</a>
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
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">BAKERY & BREADS</h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Brown Bread */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-3">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjEwIiB5PSIzMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjUwIiByeD0iNSIgZmlsbD0iIzk5NjYzMyIvPgo8cmVjdCB4PSIxNSIgeT0iMzUiIHdpZHRoPSI3MCIgaGVpZ2h0PSI0MCIgcng9IjMiIGZpbGw9IiNCODc5NTQiLz4KPGxpbmUgeDE9IjI1IiB5MT0iMzAiIHgyPSIyNSIgeTI9IjgwIiBzdHJva2U9IiM4MDU5MzMiIHN0cm9rZS13aWR0aD0iMSIvPgo8bGluZSB4MT0iMzUiIHkxPSIzMCIgeDI9IjM1IiB5Mj0iODAiIHN0cm9rZT0iIzgwNTkzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxsaW5lIHgxPSI0NSIgeTE9IjMwIiB4Mj0iNDUiIHkyPSI4MCIgc3Ryb2tlPSIjODA1OTMzIiBzdHJva2Utd2lkdGg9IjEiLz4KPGxpbmUgeDE9IjU1IiB5MT0iMzAiIHgyPSI1NSIgeTI9IjgwIiBzdHJva2U9IiM4MDU5MzMiIHN0cm9rZS13aWR0aD0iMSIvPgo8bGluZSB4MT0iNjUiIHkxPSIzMCIgeDI9IjY1IiB5Mj0iODAiIHN0cm9rZT0iIzgwNTkzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxsaW5lIHgxPSI3NSIgeTE9IjMwIiB4Mj0iNzUiIHkyPSI4MCIgc3Ryb2tlPSIjODA1OTMzIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+Cg=="
                alt="Brown Bread"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 mb-1">Bakery</p>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Brown Bread 400g</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <Star className="h-3 w-3 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(4)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-green-600">$35</span>
                  <span className="text-xs text-gray-500 line-through">$40</span>
                </div>
                <button className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-200 transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Butter Croissant */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-3">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMCA1MEM5IDQ1IDEwIDM1IDIwIDMwQzMwIDI1IDQ1IDI1IDU1IDMwQzY1IDM1IDc1IDQwIDgwIDUwQzg1IDYwIDc1IDY1IDY1IDY1QzU1IDY1IDQ1IDYwIDM1IDU1QzI1IDUwIDIwIDUwIDIwIDUwWiIgZmlsbD0iI0ZGRDcwMCIvPgo8cGF0aCBkPSJNMjUgNTBDMTUgNDcgMTUgNDAgMjUgMzVDMzUgMzAgNDUgMzAgNTUgMzVDNjUgNDAgNzAgNDUgNzUgNTJDODAgNTkgNzAgNjIgNjAgNjJDNTAgNjIgNDAgNTggMzAgNTVDMjUgNTMgMjUgNTAgMjUgNTBaIiBmaWxsPSIjRkZFMzAwIi8+CjxlbGxpcHNlIGN4PSI0NSIgY3k9IjQ1IiByeD0iMyIgcnk9IjIiIGZpbGw9IiNGRkI4MDAiLz4KPGVsbGlwc2UgY3g9IjU1IiBjeT0iNTAiIHJ4PSIyIiByeT0iMS41IiBmaWxsPSIjRkZCODAwIi8+CjxlbGxpcHNlIGN4PSIzNSIgY3k9IjUyIiByeD0iMiIgcnk9IjEuNSIgZmlsbD0iI0ZGQjgwMCIvPgo8L3N2Zz4K"
                alt="Butter Croissant"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 mb-1">Bakery</p>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Butter Croissant 100g</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <Star className="h-3 w-3 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(4)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-green-600">$45</span>
                  <span className="text-xs text-gray-500 line-through">$50</span>
                </div>
                <button className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-200 transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-bold text-green-600 mb-4">GreenCart</div>
              <p className="text-gray-600 text-sm">
                We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Home</a></li>
                <li><a href="#" className="hover:text-gray-900">Best Sellers</a></li>
                <li><a href="#" className="hover:text-gray-900">Offers & Deals</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Need help?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Delivery Information</a></li>
                <li><a href="#" className="hover:text-gray-900">Return & Refund Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Payment Methods</a></li>
                <li><a href="#" className="hover:text-gray-900">Track your Order</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-900">YouTube</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            Copyright 2025 © GreatStock.dev All Right Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}