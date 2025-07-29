import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0A400C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Daily<span className="text-[#B0DB9C]">Grocer</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted partner for fresh, quality groceries delivered straight to your door. 
                Farm-fresh produce, competitive prices, and exceptional service.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#B0DB9C]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#B0DB9C]" />
                <span className="text-gray-300">support@dailygrocer.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#B0DB9C]" />
                <span className="text-gray-300">123 Fresh Street, Green City, GC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#B0DB9C]">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">About Us</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Products</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Categories</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Contact</a></li>
              <li><a href="#blog" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#B0DB9C]">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#help" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Help Center</a></li>
              <li><a href="#shipping" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Returns & Refunds</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">FAQ</a></li>
              <li><a href="#track" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Track Your Order</a></li>
              <li><a href="#support" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">24/7 Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2025 DailyGrocer. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Terms of Service</a>
              <a href="#cookies" className="text-gray-300 hover:text-[#B0DB9C] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
