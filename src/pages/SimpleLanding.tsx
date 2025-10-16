import { useNavigate } from 'react-router-dom';
import { ArrowRight, Database, Shield, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

const SimpleLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C2B31] via-[#04C61B]/5 to-[#0C2B31]">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#04C61B]/40 rotate-6 hover:rotate-12 transition-transform">
                <Database className="w-12 h-12 text-[#0C2B31]" />
              </div>
              <div className="absolute inset-0 bg-[#0FA958]/20 blur-3xl -z-10" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
              The Marketplace
            </span>
            <br />
            <span className="text-gray-100">for Physical AI Data</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Buy and sell verified datasets for robotics, autonomous vehicles, and embodied AI.
            Powered by blockchain, trusted by researchers worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate('/marketplace')}
              className="group px-10 py-5 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#04C61B]/50 transition-all hover:scale-105 flex items-center"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="px-10 py-5 bg-transparent border-2 border-[#04C61B] text-gray-100 rounded-2xl font-bold text-lg hover:bg-[#04C61B]/10 hover:shadow-xl transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="bg-[#0C2B31]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#04C61B]/30 hover:border-[#04C61B] transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#0C2B31]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-100">Verified Quality</h3>
              <p className="text-gray-400 text-sm">
                All datasets undergo rigorous verification
              </p>
            </div>

            <div className="bg-[#0C2B31]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#04C61B]/30 hover:border-[#04C61B] transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[#0C2B31]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-100">Instant Access</h3>
              <p className="text-gray-400 text-sm">
                Download immediately after purchase
              </p>
            </div>

            <div className="bg-[#0C2B31]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#04C61B]/30 hover:border-[#04C61B] transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-[#0C2B31]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-100">Decentralized</h3>
              <p className="text-gray-400 text-sm">
                Built on blockchain for transparency
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleLanding;
