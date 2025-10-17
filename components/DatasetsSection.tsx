
import React from 'react';
import DatasetCard from './DatasetCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { sampleDatasets } from '../data/sampleDatasets';

interface DatasetsSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const DatasetsSection = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange 
}: DatasetsSectionProps) => {
  const filteredDatasets = sampleDatasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-gray-900/30 to-black/30"></div>
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Our Datasets</h2>
        <p className="text-xl text-gray-300 font-medium">Discover high-quality physical AI training data</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8 relative z-10">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
        <div className="lg:w-64">
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <p className="text-gray-300 font-medium">
          Showing {filteredDatasets.length} of {sampleDatasets.length} physical AI datasets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredDatasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>

      {filteredDatasets.length > 0 && (
        <div className="text-center mt-12 relative z-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-blue-600">
            <span className="relative z-10">Load More Datasets</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DatasetsSection;
