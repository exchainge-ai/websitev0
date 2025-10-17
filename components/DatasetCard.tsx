
import React from 'react';
import { Download, Star, Calendar, FileText, DollarSign } from 'lucide-react';

interface Dataset {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  size: string;
  format: string;
  rating: number;
  downloads: string;
  lastUpdated: string;
  tags: string[];
  image: string;
}

interface DatasetCardProps {
  dataset: Dataset;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-700 hover:border-blue-500">
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        {dataset.image ? (
          <img 
            src={dataset.image} 
            alt={dataset.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
            <FileText className="w-16 h-16 text-blue-400/60 group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-gray-900/80 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30 shadow-sm backdrop-blur-sm">
            {dataset.category}
          </span>
        </div>
      </div>

      <div className="p-6 bg-gray-800">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-2 flex-1 mr-2">
            {dataset.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-gray-300">{dataset.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-3 font-medium">{dataset.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded-lg text-xs border border-blue-500/30 font-medium">
              {tag}
            </span>
          ))}
          {dataset.tags.length > 3 && (
            <span className="text-gray-400 text-xs font-medium">+{dataset.tags.length - 3} more</span>
          )}
        </div>

        {/* Dataset Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-400" />
            <span className="font-medium">{dataset.downloads}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="font-medium">{dataset.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="font-medium">{dataset.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-500/30 font-semibold">
              {dataset.size}
            </span>
          </div>
        </div>

        {/* Price and Purchase */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{dataset.price}</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-600">
            <span className="relative z-10">Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
