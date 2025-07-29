import React from 'react';
import { 
  Heart, 
  Users, 
  Truck, 
  Shield, 
  Leaf, 
  Star,
  Award,
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: Truck, value: "500+", label: "Cities Served" },
    { icon: Star, value: "4.8", label: "Customer Rating" },
    { icon: Award, value: "5+", label: "Years of Service" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize our customers' satisfaction above everything else, ensuring every interaction is meaningful and every order is perfect."
    },
    {
      icon: Leaf,
      title: "Fresh & Quality",
      description: "We source only the freshest, highest-quality products from trusted local farmers and suppliers."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your safety and trust are paramount. We maintain the highest standards of food safety and data protection."
    },
    {
      icon: Globe,
      title: "Community Impact",
      description: "We're committed to supporting local communities and sustainable farming practices."
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-[#B0DB9C]">DailyGrocer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make fresh, quality groceries accessible to everyone, 
            delivered right to your doorstep with care and convenience.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#ECFAE5] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-[#0A400C]" />
                </div>
                <div className="text-3xl font-bold text-[#0A400C] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#ECFAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  DailyGrocer was born from a simple idea: everyone deserves access to fresh, 
                  quality groceries without the hassle of visiting crowded stores or settling 
                  for less-than-fresh produce.
                </p>
                <p>
                  What started as a small local delivery service has grown into a trusted 
                  platform serving thousands of customers across multiple cities. Our journey 
                  has been driven by one core principle: putting our customers first.
                </p>
                <p>
                  Today, we continue to innovate and expand, always staying true to our 
                  commitment to quality, convenience, and community.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                alt="Fresh groceries" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-[#0A400C]">Fresh Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the way we serve our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-[#ECFAE5] rounded-2xl hover:shadow-lg transition-shadow">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-[#0A400C]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A400C] mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              To revolutionize the grocery shopping experience by providing fresh, quality products 
              with unmatched convenience, while supporting local communities and sustainable practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Leaf className="w-5 h-5" />
                <span>Fresh Products</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 