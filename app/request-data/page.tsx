'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, DollarSign, Calendar, CheckCircle, FileText, Clock, Users } from 'lucide-react';

export default function RequestDataPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [requestComplete, setRequestComplete] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    dataType: '',
    budget: '',
    deadline: '',
    sampleSize: '',
    requirements: '',
  });

  const handleSubmit = () => {
    setSubmitting(true);
    // MOCKED: In production, this would submit the request to the Solana program
    // and notify potential data sellers via on-chain events
    setTimeout(() => {
      setSubmitting(false);
      setRequestComplete(true);
    }, 2000);
  };

  if (requestComplete) {
    return (
      <div className="min-h-screen bg-[#0C2B31] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#04C61B]/20 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-[#04C61B]" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Request Submitted Successfully!</h1>
            <p className="text-gray-400 mb-8">
              Your data request has been published to the marketplace. Sellers will start submitting proposals soon.
            </p>

            <div className="bg-[#04C61B]/5 border border-[#04C61B]/20 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-xl font-bold text-white mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#04C61B]/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-[#04C61B] font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 mb-1">Sellers Review Your Request</h4>
                    <p className="text-gray-400 text-sm">
                      Data providers will evaluate your requirements and budget to determine if they can fulfill your request.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#04C61B]/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-[#04C61B] font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 mb-1">Receive Proposals (24-72 hours)</h4>
                    <p className="text-gray-400 text-sm">
                      You'll receive notifications when sellers submit proposals with pricing, timelines, and sample data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#04C61B]/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-[#04C61B] font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 mb-1">Review & Select</h4>
                    <p className="text-gray-400 text-sm">
                      Compare proposals, negotiate terms, and select the best provider for your needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#04C61B]/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-[#04C61B] font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 mb-1">Secure Transaction</h4>
                    <p className="text-gray-400 text-sm">
                      Payment is held in escrow until you confirm the data meets your requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0C2B31] rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-bold text-white mb-4">Your Request Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Title:</span>
                  <span className="text-gray-100 font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-gray-100 font-medium">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget:</span>
                  <span className="text-[#04C61B] font-bold">${parseFloat(formData.budget || '0').toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deadline:</span>
                  <span className="text-gray-100 font-medium">{formData.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sample Size:</span>
                  <span className="text-gray-100 font-medium">{formData.sampleSize}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
              <p className="text-yellow-200 text-sm flex items-start">
                <Clock className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Beta Feature:</strong> The proposal notification system is in beta.
                  Check your dashboard regularly for new proposals.
                </span>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Coming Soon</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#0C2B31] rounded-lg p-4 text-left">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Auto-Matching</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    AI-powered matching to instantly connect your request with qualified sellers.
                  </p>
                </div>

                <div className="bg-[#0C2B31] rounded-lg p-4 text-left">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Milestone Payments</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Split payments across multiple deliverables for large dataset requests.
                  </p>
                </div>

                <div className="bg-[#0C2B31] rounded-lg p-4 text-left">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Real-time Chat</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Direct messaging with sellers to discuss requirements and negotiate terms.
                  </p>
                </div>

                <div className="bg-[#0C2B31] rounded-lg p-4 text-left">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-[#04C61B] mr-2" />
                    <h4 className="font-bold text-gray-100">Quality Guarantees</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Money-back guarantee if delivered data doesn't meet specified requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/marketplace')}
                className="px-6 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Browse Marketplace
              </button>
              <button
                onClick={() => {
                  setRequestComplete(false);
                  setStep(1);
                  setFormData({
                    title: '', description: '', category: '', dataType: '', budget: '', deadline: '', sampleSize: '', requirements: ''
                  });
                }}
                className="px-6 py-3 bg-[#0A1F24] border border-[#04C61B]/30 text-white rounded-lg font-bold hover:border-[#04C61B] transition-all"
              >
                Create Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C2B31] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Marketplace
        </button>

        <div className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Request Custom Data</h1>
          <p className="text-gray-400 mb-8">
            Describe the data you need and receive proposals from verified data providers
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            {[
              { num: 1, label: 'Requirements' },
              { num: 2, label: 'Budget & Timeline' },
              { num: 3, label: 'Review' }
            ].map((s) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= s.num ? 'border-[#04C61B] bg-[#04C61B]/20 text-[#04C61B]' : 'border-gray-600 text-gray-600'
                } font-bold`}>
                  {s.num}
                </div>
                <span className={`ml-3 ${step >= s.num ? 'text-white' : 'text-gray-600'} font-medium`}>
                  {s.label}
                </span>
                {s.num < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${step > s.num ? 'bg-[#04C61B]' : 'bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Requirements */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Request Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Indoor Navigation Dataset for Warehouse Robots"
                  className="w-full px-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Detailed Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={5}
                  placeholder="Describe exactly what data you need, use cases, quality requirements, format preferences, etc."
                  className="w-full px-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Sensor Data">Sensor Data</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Autonomous Vehicles">Autonomous Vehicles</option>
                    <option value="NLP">Natural Language Processing</option>
                    <option value="Audio">Audio Data</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Data Type *</label>
                  <input
                    type="text"
                    value={formData.dataType}
                    onChange={(e) => setFormData({...formData, dataType: e.target.value})}
                    placeholder="e.g., Video, Images, LiDAR, etc."
                    className="w-full px-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Sample Size Required</label>
                <input
                  type="text"
                  value={formData.sampleSize}
                  onChange={(e) => setFormData({...formData, sampleSize: e.target.value})}
                  placeholder="e.g., 10,000 labeled images or 100 hours of video"
                  className="w-full px-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Specific Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  rows={4}
                  placeholder="Annotation standards, file formats, quality metrics, diversity requirements, etc."
                  className="w-full px-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.title || !formData.description || !formData.category}
                  className="px-8 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Timeline */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Budget (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="5000"
                    className="w-full pl-12 pr-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  This is your total budget. Sellers will submit proposals within this range.
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Delivery Deadline *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-[#0C2B31] border border-gray-700 rounded-lg text-white focus:border-[#04C61B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#04C61B]/5 border border-[#04C61B]/20 rounded-lg p-4">
                <h4 className="text-white font-bold mb-2">How Pricing Works</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#04C61B] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Sellers submit proposals with their pricing and timelines</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#04C61B] mr-2 mt-0.5 flex-shrink-0" />
                    <span>You can negotiate directly with sellers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#04C61B] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Payment held in escrow until delivery is confirmed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#04C61B] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Platform fee: 3% of final transaction</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 bg-[#0A1F24] border border-[#04C61B]/30 text-white rounded-lg font-bold hover:border-[#04C61B] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.budget || !formData.deadline}
                  className="px-8 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-[#0C2B31] rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">Review Your Request</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Title</label>
                    <p className="text-white font-medium">{formData.title}</p>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm">Description</label>
                    <p className="text-white">{formData.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm">Category</label>
                      <p className="text-white font-medium">{formData.category}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Data Type</label>
                      <p className="text-white font-medium">{formData.dataType}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm">Sample Size</label>
                    <p className="text-white font-medium">{formData.sampleSize}</p>
                  </div>

                  {formData.requirements && (
                    <div>
                      <label className="text-gray-400 text-sm">Requirements</label>
                      <p className="text-white">{formData.requirements}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div>
                      <label className="text-gray-400 text-sm">Budget</label>
                      <p className="text-[#04C61B] font-bold text-xl">
                        ${parseFloat(formData.budget || '0').toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Deadline</label>
                      <p className="text-white font-medium">{formData.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#04C61B]/5 border border-[#04C61B]/20 rounded-lg p-4">
                <p className="text-gray-400 text-sm flex items-start">
                  <FileText className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-[#04C61B]" />
                  <span>
                    By submitting this request, you agree to respond to seller proposals within 7 days
                    and complete the transaction through our secure escrow system.
                  </span>
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-[#0A1F24] border border-[#04C61B]/30 text-white rounded-lg font-bold hover:border-[#04C61B] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0C2B31] mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
