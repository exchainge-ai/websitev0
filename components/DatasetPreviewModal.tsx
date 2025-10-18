'use client';

import { X, Download, ExternalLink, Database, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Dataset } from '@/data/sampleDatasets';

interface DatasetPreviewModalProps {
  dataset: Dataset | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DatasetPreviewModal({ dataset, isOpen, onClose }: DatasetPreviewModalProps) {
  if (!isOpen) return null;

  // Mock data for charts
  const usageData = [
    { month: 'Jan', downloads: 45 },
    { month: 'Feb', downloads: 52 },
    { month: 'Mar', downloads: 61 },
    { month: 'Apr', downloads: 58 },
    { month: 'May', downloads: 73 },
    { month: 'Jun', downloads: 89 },
  ];

  const qualityMetrics = [
    { metric: 'Accuracy', value: 94 },
    { metric: 'Completeness', value: 87 },
    { metric: 'Consistency', value: 91 },
    { metric: 'Timeliness', value: 96 },
  ];

  const dataDistribution = [
    { name: 'Training', value: 70, color: '#04C61B' },
    { name: 'Validation', value: 20, color: '#6DF77E' },
    { name: 'Test', value: 10, color: '#0A1F24' },
  ];

  const sampleImages = [
    { id: 1, label: 'Sample 1', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 2, label: 'Sample 2', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 3, label: 'Sample 3', color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    { id: 4, label: 'Sample 4', color: 'bg-gradient-to-br from-orange-500 to-red-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1F24] border-b border-[#04C61B]/20 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{dataset.title}</h2>
              <p className="text-gray-400 mb-3">{dataset.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#04C61B]/20 text-[#04C61B] rounded-full text-sm">
                  {dataset.category}
                </span>
                {dataset.tags?.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-[#0C2B31] text-gray-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#0C2B31] text-gray-400 hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-[#0C2B31] rounded-lg p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-[#04C61B] mr-2" />
                <span className="text-gray-400 text-sm">Price</span>
              </div>
              <p className="text-2xl font-bold text-white">${dataset.price}</p>
            </div>
            <div className="bg-[#0C2B31] rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Database className="w-5 h-5 text-[#04C61B] mr-2" />
                <span className="text-gray-400 text-sm">Size</span>
              </div>
              <p className="text-2xl font-bold text-white">{dataset.size || '2.4 GB'}</p>
            </div>
            <div className="bg-[#0C2B31] rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Download className="w-5 h-5 text-[#04C61B] mr-2" />
                <span className="text-gray-400 text-sm">Downloads</span>
              </div>
              <p className="text-2xl font-bold text-white">{dataset.downloads || '1.2k'}</p>
            </div>
            <div className="bg-[#0C2B31] rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-[#04C61B] mr-2" />
                <span className="text-gray-400 text-sm">Updated</span>
              </div>
              <p className="text-2xl font-bold text-white">{dataset.lastUpdated || '2w ago'}</p>
            </div>
          </div>

          {/* Sample Data Preview */}
          <div className="bg-[#0C2B31] rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sample Data Preview</h3>
            <div className="grid grid-cols-4 gap-4">
              {sampleImages.map((sample) => (
                <div key={sample.id} className="aspect-square rounded-lg overflow-hidden">
                  <div className={`w-full h-full ${sample.color} flex items-center justify-center text-white font-bold`}>
                    {sample.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Preview data samples from this dataset
            </p>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Download Trends */}
            <div className="bg-[#0C2B31] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Download Trends</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A1F24',
                      border: '1px solid #04C61B',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="downloads" stroke="#04C61B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Data Distribution */}
            <div className="bg-[#0C2B31] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Data Split Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dataDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-[#0C2B31] rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quality Metrics</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={qualityMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="metric" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A1F24',
                    border: '1px solid #04C61B',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="#04C61B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Dataset Info */}
          <div className="bg-[#0C2B31] rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Dataset Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Format</p>
                <p className="text-white font-medium">CSV, JSON, Parquet</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">License</p>
                <p className="text-white font-medium">Commercial Use Allowed</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Downloads</p>
                <p className="text-white font-medium">{dataset.downloads.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Rating</p>
                <p className="text-white font-medium">{dataset.rating} / 5.0</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => alert('Purchase flow coming soon! This is a mock demo.')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Purchase Dataset
            </button>
            <button
              onClick={() => alert('Documentation link coming soon! This is a mock demo.')}
              className="px-6 py-3 bg-[#0A1F24] border border-[#04C61B]/30 text-white rounded-lg font-bold hover:border-[#04C61B] transition-all flex items-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
