'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, MessageSquare } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DatasetsSection from '@/components/DatasetsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Marketplace Header */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#04C61B]/10 to-[#0C2B31]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
                Dataset Marketplace
              </h1>
              <p className="text-xl text-gray-300">
                Discover and download verified AI datasets for robotics and embodied AI
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/request-data')}
                className="flex items-center space-x-2 px-6 py-3 bg-[#0A1F24] border border-[#04C61B]/30 text-white rounded-lg font-bold hover:border-[#04C61B] transition-all hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Request Data</span>
              </button>
              <button
                onClick={() => router.push('/upload')}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Dataset</span>
              </button>
            </div>
          </div>
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
