'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Upload as UploadIcon, FileText, DollarSign, Shield, CheckCircle, ArrowRight, AlertCircle, Clock, Sparkles, Gavel } from 'lucide-react';

const Upload = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    price: '',
    license: 'Commercial Use Allowed',
  });

  const steps = [
    { number: 1, title: 'Upload Files', icon: UploadIcon },
    { number: 2, title: 'Add Details', icon: FileText },
    { number: 3, title: 'Set Price', icon: DollarSign },
    { number: 4, title: 'Review', icon: Shield },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePublish = () => {
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 2000);
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen">
        <Navigation />

        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#04C61B]/50 animate-bounce">
                <CheckCircle className="w-16 h-16 text-[#0C2B31]" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
                Upload Successful!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your dataset has been submitted and is now entering our verification process
              </p>
            </div>

            {/* Verification Notice */}
            <div className="bg-[#0C2B31]/80 border-2 border-[#04C61B]/30 rounded-3xl p-8 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <Clock className="w-8 h-8 text-[#04C61B] flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">Verification in Progress</h3>
                  <p className="text-gray-300 mb-4">
                    Our AI-powered verification system is analyzing your dataset to ensure quality and accuracy. This typically takes 24-48 hours.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-[#04C61B] rounded-full mr-3"></div>
                      <span>Quality checks: Data integrity, format validation</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-[#04C61B] rounded-full mr-3"></div>
                      <span>Security scan: Malware detection, privacy compliance</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-[#04C61B] rounded-full mr-3"></div>
                      <span>Metadata review: Accuracy and completeness</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-yellow-200 font-semibold mb-1">Verification System - Beta</p>
                    <p className="text-yellow-100/80 text-sm">
                      Our automated verification system is currently in beta. You'll receive an email once your dataset is approved or if we need additional information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon Features */}
            <div className="bg-[#0C2B31]/60 border-2 border-[#04C61B]/20 rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#04C61B] mr-2" />
                <h3 className="text-2xl font-bold text-gray-100">Coming Soon</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#04C61B]/5 rounded-xl p-6 text-left">
                  <div className="flex items-center mb-3">
                    <Gavel className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Dataset Auctions</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    List exclusive datasets for auction and let buyers compete for access. Perfect for rare or high-value datasets.
                  </p>
                </div>

                <div className="bg-[#04C61B]/5 rounded-xl p-6 text-left">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Smart Contracts</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Automated royalty distribution and usage tracking powered by blockchain smart contracts.
                  </p>
                </div>

                <div className="bg-[#04C61B]/5 rounded-xl p-6 text-left">
                  <div className="flex items-center mb-3">
                    <FileText className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">API Access</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Direct API access for dataset uploads and marketplace integration with your existing workflows.
                  </p>
                </div>

                <div className="bg-[#04C61B]/5 rounded-xl p-6 text-left">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Premium Verification</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Fast-track verification (&lt; 6 hours) with detailed quality reports and certification badges.
                  </p>
                </div>
              </div>
            </div>

            {/* Dataset Summary */}
            <div className="bg-[#0C2B31]/80 border-2 border-[#04C61B]/30 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Your Submission</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Dataset Title</p>
                  <p className="text-gray-100 font-semibold">{formData.title || 'Untitled Dataset'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Category</p>
                  <p className="text-gray-100 font-semibold">{formData.category || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Price</p>
                  <p className="text-gray-100 font-semibold">${formData.price || '0.00'} USDC</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">License</p>
                  <p className="text-gray-100 font-semibold">{formData.license}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/marketplace')}
                className="px-8 py-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all hover:scale-105"
              >
                Browse Marketplace
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-xl font-bold text-lg hover:bg-[#04C61B]/10 transition-all"
              >
                Upload Another Dataset
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#04C61B]/10 to-[#0C2B31]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
            Upload Your Dataset
          </h1>
          <p className="text-xl text-gray-300">
            Share your AI datasets with the world and start earning
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= s.number
                        ? 'bg-gradient-to-br from-[#04C61B] to-[#6DF77E] shadow-lg shadow-[#04C61B]/30'
                        : 'bg-[#0C2B31] border-2 border-[#04C61B]/30'
                    }`}
                  >
                    <s.icon className={`w-8 h-8 ${step >= s.number ? 'text-[#0C2B31]' : 'text-gray-400'}`} />
                  </div>
                  <span className={`text-sm font-medium ${step >= s.number ? 'text-[#04C61B]' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      step > s.number ? 'bg-[#04C61B]' : 'bg-[#04C61B]/20'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Form */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0C2B31]/60 border-2 border-[#04C61B]/30 rounded-3xl p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-gray-100">Upload Your Files</h2>
                  <p className="text-gray-300">Drag and drop your dataset files or click to browse</p>
                </div>

                {/* Drag and Drop Area */}
                <div className="border-2 border-dashed border-[#04C61B]/50 rounded-2xl p-12 hover:border-[#04C61B] transition-all cursor-pointer group">
                  <div className="text-center">
                    <UploadIcon className="w-16 h-16 text-[#04C61B] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-xl font-semibold text-gray-100 mb-2">Drop files here</p>
                    <p className="text-gray-400 mb-4">or click to browse</p>
                    <p className="text-sm text-gray-500">Supports: ROS bags, HDF5, Video, ZIP (Max 5GB)</p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all flex items-center justify-center group"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-100">Dataset Details</h2>
                  <p className="text-gray-300">Tell us about your dataset</p>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Title*</label>
                  <input
                    type="text"
                    placeholder="e.g., Urban Robot Navigation - 10K Hours LiDAR Data"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Description*</label>
                  <textarea
                    placeholder="Describe your dataset: What it contains, collection methodology, use cases, hardware/software used, data quality measures..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Category*</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    <option>Robotics</option>
                    <option>Autonomous Vehicles</option>
                    <option>Drone</option>
                    <option>Manipulation</option>
                    <option>Navigation</option>
                    <option>Agriculture</option>
                    <option>Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., robotics, lidar, navigation, urban, ros2"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-8 py-4 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-xl font-bold text-lg hover:bg-[#04C61B]/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all flex items-center justify-center group"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-100">Pricing & Licensing</h2>
                  <p className="text-gray-300">Set your price and terms</p>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Price (USDC)*</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
                    <input
                      type="number"
                      placeholder="299.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Platform fee: 5% • You receive: ${formData.price ? (parseFloat(formData.price) * 0.95).toFixed(2) : '0.00'} USDC</p>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">License Type*</label>
                  <select
                    value={formData.license}
                    onChange={(e) => handleInputChange('license', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  >
                    <option>Commercial Use Allowed</option>
                    <option>Research Only</option>
                    <option>Attribution Required</option>
                    <option>Custom License</option>
                  </select>
                </div>

                <div className="bg-[#04C61B]/10 border border-[#04C61B]/30 rounded-xl p-6">
                  <h3 className="font-bold text-gray-100 mb-4">Usage Rights</h3>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
                      AI/ML Training Allowed
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
                      Commercial Use
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      Derivative Works Allowed
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
                      Redistribution Prohibited
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-8 py-4 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-xl font-bold text-lg hover:bg-[#04C61B]/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all flex items-center justify-center group"
                  >
                    Review
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <CheckCircle className="w-20 h-20 text-[#04C61B] mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-gray-100">Review & Submit</h2>
                  <p className="text-gray-300">Verify your information before publishing</p>
                </div>

                <div className="bg-[#04C61B]/10 border border-[#04C61B]/30 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Dataset Title</p>
                    <p className="text-gray-100 font-semibold">{formData.title || 'Untitled Dataset'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-gray-100 font-semibold">{formData.category || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Price</p>
                    <p className="text-gray-100 font-semibold">${formData.price || '0.00'} USDC</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">License</p>
                    <p className="text-gray-100 font-semibold">{formData.license}</p>
                  </div>
                  {formData.tags && (
                    <div>
                      <p className="text-gray-400 text-sm">Tags</p>
                      <p className="text-gray-100 font-semibold">{formData.tags}</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-blue-200 font-semibold mb-1">What happens next?</p>
                      <p className="text-blue-100/80 text-sm">
                        Your dataset will enter our automated verification process (24-48 hours). You'll receive an email notification once it's approved and live on the marketplace.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-8 py-4 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-xl font-bold text-lg hover:bg-[#04C61B]/10 transition-all"
                    disabled={uploading}
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={uploading}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0C2B31] mr-2"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        Publish Dataset
                        <CheckCircle className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Upload;
