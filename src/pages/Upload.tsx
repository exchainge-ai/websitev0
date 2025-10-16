import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Upload as UploadIcon, FileText, DollarSign, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const Upload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: 'Upload Files', icon: UploadIcon },
    { number: 2, title: 'Add Details', icon: FileText },
    { number: 3, title: 'Set Price', icon: DollarSign },
    { number: 4, title: 'Review', icon: Shield },
  ];

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
      <section className="py-12 px-4">
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
                  <label className="block text-gray-100 font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Robot Arm Manipulation Dataset"
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Description</label>
                  <textarea
                    placeholder="Describe your dataset, what it contains, and how it was collected..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none">
                    <option>Select a category</option>
                    <option>Robotics</option>
                    <option>Autonomous Vehicles</option>
                    <option>Drone</option>
                    <option>Manipulation</option>
                    <option>Navigation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="e.g., robotics, manipulation, ros"
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
                  <label className="block text-gray-100 font-semibold mb-2">Price (USDC)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-100 font-semibold mb-2">License Type</label>
                  <select className="w-full px-4 py-3 bg-[#0C2B31] border border-[#04C61B]/30 rounded-xl text-gray-100 focus:border-[#04C61B] focus:outline-none">
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
                      AI Training Allowed
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
                      Commercial Use
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      Derivative Works Allowed
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
                    <p className="text-gray-100 font-semibold">Robot Arm Manipulation Dataset</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Price</p>
                    <p className="text-gray-100 font-semibold">$299.00 USDC</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">License</p>
                    <p className="text-gray-100 font-semibold">Commercial Use Allowed</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-8 py-4 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-xl font-bold text-lg hover:bg-[#04C61B]/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all flex items-center justify-center group"
                  >
                    Publish Dataset
                    <CheckCircle className="ml-2 w-5 h-5" />
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
