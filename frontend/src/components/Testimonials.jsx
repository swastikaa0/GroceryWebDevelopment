import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Working Mom",
      rating: 5,
      text: "DailyGrocer has been a lifesaver! Fresh groceries delivered right to my door, and the quality is always amazing. My kids love the organic fruits!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Chef",
      rating: 5,
      text: "As a professional chef, I'm very particular about ingredient quality. DailyGrocer consistently delivers restaurant-grade fresh produce.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Health Enthusiast",
      rating: 5,
      text: "The organic selection is fantastic! I love being able to filter by organic and pesticide-free options. Fast delivery and great prices too.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Robert Miller",
      role: "Senior Citizen",
      rating: 5,
      text: "The convenience is unmatched. At my age, shopping for groceries was becoming difficult. DailyGrocer makes it so easy!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Busy Professional",
      rating: 5,
      text: "I work long hours and DailyGrocer fits perfectly into my schedule. 24/7 ordering and reliable delivery - couldn't ask for more!",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Tom Anderson",
      role: "Family Man",
      rating: 5,
      text: "Great variety and competitive prices. My family of five saves both time and money with DailyGrocer. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-[#ECFAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A400C] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say 
            about their DailyGrocer experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="bg-[#B0DB9C] rounded-full p-3">
                  <Quote className="h-6 w-6 text-[#0A400C]" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A400C]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-2">50K+</div>
            <div className="text-gray-600">Orders Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-2">100+</div>
            <div className="text-gray-600">Partner Farms</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
