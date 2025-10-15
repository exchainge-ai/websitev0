
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import DatasetsSection from '../components/DatasetsSection';
import NewsletterSection from '../components/NewsletterSection';
import ContactSection from '../components/ContactSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import CryptoBackground from '../components/CryptoBackground';

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={goHome}>
              <img 
                src="/lovable-uploads/ef47e395-8547-4feb-a3cf-e57fd16c42f3.png" 
                alt="ExchAInge" 
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#datasets" className="text-gray-300 hover:text-white transition-colors">Datasets</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <button 
                onClick={goHome}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding top to account for fixed nav */}
      <div className="pt-16">
        {/* Crypto Background Effects */}
        <CryptoBackground />

        {/* Additional Dynamic Background Effects */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-gradient-shift"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">
          <HeroSection />
          <StatsSection />
          <HowItWorksSection />
          <DatasetsSection 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <NewsletterSection 
            email={email}
            onEmailChange={setEmail}
            isSubscribed={isSubscribed}
            onSubmit={handleNewsletterSubmit}
          />
          <ContactSection />
          <TeamSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
