import React from 'react';
import { Truck, Clock, Shield, Leaf, Heart, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your groceries delivered within 30 minutes to your doorstep with our express delivery service."
    },
    {
      icon: Leaf,
      title: "100% Fresh",
      description: "We source directly from local farms to ensure you get the freshest produce every time."
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Every product goes through our quality check process. Not satisfied? We'll make it right."
    },
    {
      icon: Heart,
      title: "Health Focused",
      description: "Organic, pesticide-free options available. We care about your family's health and wellness."
    },
    {
      icon: Star,
      title: "Best Prices",
      description: "Competitive pricing with regular discounts and offers. Save more on your grocery shopping."
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Shop anytime, anywhere. Our platform is available round the clock for your convenience."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A400C] mb-4">
            Why Choose DailyGrocer?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to providing you with the best grocery shopping experience. 
            Here's what makes us different from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-[#ECFAE5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-6">
                  <div className="bg-[#B0DB9C] rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-[#0A400C]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A400C] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Shopping Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
