'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TeamSection from '@/components/TeamSection';
import { Shield, Zap, Globe, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
              Building the Future of AI Data
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ExchAInge is the world's first decentralized marketplace for physical AI datasets,
              empowering researchers and developers to access verified, high-quality training data.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-[#04C61B]/5 to-[#6DF77E]/5 rounded-3xl p-12 mb-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're democratizing access to physical AI datasets by creating a transparent,
              secure marketplace where data creators can monetize their work and AI developers
              can access the high-quality data they need to build the next generation of embodied AI systems.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Verification</h3>
              <p className="text-gray-300">
                Every dataset is verified for authenticity and quality
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Decentralized</h3>
              <p className="text-gray-300">
                Built on blockchain for transparency and fairness
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-300">
                Pushing the boundaries of AI and robotics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-300">
                Empowering creators and developers worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#0C2B31]">
        <TeamSection />
      </section>

      <Footer />
    </div>
  );
};

export default About;
