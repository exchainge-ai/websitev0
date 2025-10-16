import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Upload, Shield, DollarSign, Download, ArrowRight, Check, Users, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero with Animated Background */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#04C61B]/10 via-[#0C2B31] to-[#04C61B]/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-[#04C61B]/20 border border-[#04C61B]/40 rounded-full">
            <span className="text-[#04C61B] font-semibold text-sm">Simple. Secure. Transparent.</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trading AI datasets has never been easier. Get started in minutes.
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#04C61B] to-transparent hidden md:block"></div>

            {/* Step 1 */}
            <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 text-right">
                <div className="inline-block bg-[#04C61B]/10 border border-[#04C61B]/30 rounded-2xl p-8 hover:border-[#04C61B] transition-all group">
                  <h3 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-[#04C61B] transition-colors">
                    1. Upload Dataset
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Upload your dataset in any supported format. Add descriptions, tags, and set your price.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-end text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      ROS bags, HDF5, Video
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Flexible pricing
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Custom licensing
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-full flex items-center justify-center shadow-2xl shadow-[#04C61B]/50">
                    <Upload className="w-16 h-16 text-[#0C2B31]" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#04C61B] rounded-full flex items-center justify-center font-bold text-xl text-[#0C2B31] shadow-lg">
                    1
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-full flex items-center justify-center shadow-2xl shadow-[#04C61B]/50">
                    <Shield className="w-16 h-16 text-[#0C2B31]" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#04C61B] rounded-full flex items-center justify-center font-bold text-xl text-[#0C2B31] shadow-lg">
                    2
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="inline-block bg-[#04C61B]/10 border border-[#04C61B]/30 rounded-2xl p-8 hover:border-[#04C61B] transition-all group">
                  <h3 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-[#04C61B] transition-colors">
                    2. AI Verification
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Our advanced AI system verifies authenticity, quality, and completeness automatically.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Quality checks
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Authenticity validation
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Fast approval
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 text-right">
                <div className="inline-block bg-[#04C61B]/10 border border-[#04C61B]/30 rounded-2xl p-8 hover:border-[#04C61B] transition-all group">
                  <h3 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-[#04C61B] transition-colors">
                    3. Live on Marketplace
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Your dataset goes live instantly. Start earning from day one with global visibility.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-end text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Global marketplace
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Searchable catalog
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Preview features
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-full flex items-center justify-center shadow-2xl shadow-[#04C61B]/50">
                    <DollarSign className="w-16 h-16 text-[#0C2B31]" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#04C61B] rounded-full flex items-center justify-center font-bold text-xl text-[#0C2B31] shadow-lg">
                    3
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-full flex items-center justify-center shadow-2xl shadow-[#04C61B]/50">
                    <Download className="w-16 h-16 text-[#0C2B31]" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#04C61B] rounded-full flex items-center justify-center font-bold text-xl text-[#0C2B31] shadow-lg">
                    4
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="inline-block bg-[#04C61B]/10 border border-[#04C61B]/30 rounded-2xl p-8 hover:border-[#04C61B] transition-all group">
                  <h3 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-[#04C61B] transition-colors">
                    4. Instant Purchase
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Buyers discover, purchase, and download your datasets instantly with secure payments.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Secure payments
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      Instant downloads
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#04C61B] mr-2" />
                      License tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Benefits */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#04C61B]/5 to-[#0C2B31]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-300">
              Whether you're creating data or building with it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Creators */}
            <div className="bg-[#0C2B31]/80 backdrop-blur-sm border-2 border-[#04C61B]/30 rounded-3xl p-8 hover:border-[#04C61B] transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#0C2B31]" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-100 group-hover:text-[#04C61B] transition-colors">
                For Data Creators
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#04C61B] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0C2B31]" />
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gray-100">Monetize Your Work</strong>
                    <br />
                    <span className="text-sm">Set your own prices and licensing terms</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#04C61B] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0C2B31]" />
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gray-100">Global Reach</strong>
                    <br />
                    <span className="text-sm">Access worldwide market of AI developers</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#04C61B] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0C2B31]" />
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gray-100">Retain Control</strong>
                    <br />
                    <span className="text-sm">Choose exactly how your data is used</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Buyers */}
            <div className="bg-[#0C2B31]/80 backdrop-blur-sm border-2 border-[#04C61B]/30 rounded-3xl p-8 hover:border-[#04C61B] transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#0C2B31]" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-100 group-hover:text-[#04C61B] transition-colors">
                For Buyers
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#04C61B] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0C2B31]" />
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gray-100">Verified Quality</strong>
                    <br />
                    <span className="text-sm">Every dataset is AI-verified for authenticity</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#04C61B] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0C2B31]" />
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gray-100">Easy Discovery</strong>
                    <br />
                    <span className="text-sm">Search, filter, and preview before buying</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#04C61B] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0C2B31]" />
                  </div>
                  <div className="text-gray-300">
                    <strong className="text-gray-100">Instant Access</strong>
                    <br />
                    <span className="text-sm">Download immediately after purchase</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of researchers trading AI datasets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/upload')}
              className="px-10 py-5 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#04C61B]/50 transition-all hover:scale-105 flex items-center justify-center group"
            >
              Start Selling
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-10 py-5 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-2xl font-bold text-lg hover:bg-[#04C61B]/10 hover:shadow-xl transition-all"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
