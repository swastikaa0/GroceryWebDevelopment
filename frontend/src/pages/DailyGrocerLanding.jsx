import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CategoriesGrid from '../components/CategoriesGrid';
import ProductsShowcase from '../components/ProductsShowcase';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const DailyGrocerLanding = () => {
  return (
    <div className="min-h-screen bg-[#ECFAE5]">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesGrid />
        <ProductsShowcase />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default DailyGrocerLanding;
