import React from 'react';
import { ArrowRight, Truck, Clock, Leaf } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-[#ECFAE5] to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0A400C] leading-tight">
                Fresh Groceries
                <span className="text-[#B0DB9C]"> Delivered</span>
                <br />
                To Your Door
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Get the freshest fruits, vegetables, and daily essentials delivered straight to your home. 
                Quality guaranteed, convenience delivered.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center group">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-[#B0DB9C] text-[#0A400C] hover:bg-[#B0DB9C] hover:text-[#0A400C] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                Learn More
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Truck className="h-8 w-8 text-[#B0DB9C]" />
                </div>
                <p className="text-sm text-gray-600">Free Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Clock className="h-8 w-8 text-[#B0DB9C]" />
                </div>
                <p className="text-sm text-gray-600">30 Min Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-md">
                  <Leaf className="h-8 w-8 text-[#B0DB9C]" />
                </div>
                <p className="text-sm text-gray-600">100% Fresh</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#B0DB9C] to-[#ECFAE5] rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden">
                {/* Hero Image */}
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop&crop=center" 
                    alt="Fresh groceries and produce" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-4 space-y-2">
                  <h3 className="text-2xl font-bold text-[#0A400C]">Farm Fresh</h3>
                  <p className="text-gray-600">Directly from local farms</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <div className="w-8 h-8 bg-[#B0DB9C] rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <div className="w-8 h-8 bg-[#B0DB9C] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
