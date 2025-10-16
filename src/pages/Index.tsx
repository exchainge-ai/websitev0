
import { useState } from 'react';
import Navigation from '../components/Navigation';
import DatasetsSection from '../components/DatasetsSection';
import Footer from '../components/Footer';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Marketplace Header */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#04C61B]/10 to-[#0C2B31]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
            Dataset Marketplace
          </h1>
          <p className="text-xl text-gray-300">
            Discover and download verified AI datasets for robotics and embodied AI
          </p>
        </div>
      </section>

      {/* Datasets Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <DatasetsSection
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
