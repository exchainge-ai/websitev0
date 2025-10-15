import React, { useEffect, useState } from 'react';
import { ChevronDown, Database, Zap, Users, Shield, ArrowRight, Brain, Cpu, Rocket, Check, Star, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const teamMembers = [
    {
      name: "Marc Ryan",
      role: "Co-Founder & CEO",
      expertise: "Blockchain Development",
      image: "/lovable-uploads/ef727aa7-f21f-4423-b71a-ffffd1a10147.png"
    },
    // {
    //   name: "Paul van Mierlo",
    //   role: "Co-Founder & CTO",
    //   expertise: "Full-stack Development",
    //   image: "/lovable-uploads/4e8c3353-3b49-4ee9-905e-b100565ba8fe.png"
    // },
    {
      name: "Luca Trevisani",
      role: "Co-Founder & CSO",
      expertise: "Crypto-Native Strategy",
      image: "/lovable-uploads/1c6c6a6a-e0ac-4ac1-90cb-3be5a24765f0.png"
    },
    {
      name: "Milind Choudhary",
      role: "CTO & Head of AI",
      expertise: "AI & Robotics Research",
      image: "/lovable-uploads/c1faf9a1-9601-4821-8770-72b5c51e5eaf.png"
    }
    // {
    //   name: "Saiprasad Raut",
    //   role: "Advisor",
    //   expertise: "Hedera Governing Council",
    //   image: "/lovable-uploads/d39dc983-01d7-4ee3-baa1-5e4ba50bd1e2.png"
    // },
    // {
    //   name: "Gregg Lester",
    //   role: "Advisor",
    //   expertise: "President, Balcony",
    //   image: "/lovable-uploads/2afa0b8f-70bd-4d3c-a31e-65aaf1317b6b.png"
    // }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('features');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const launchMarketplace = () => {
    navigate('/marketplace');
  };

  const nextTeamMember = () => {
    if (isTransitioning || currentTeamIndex >= teamMembers.length - 3) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTeamIndex(prev => prev + 1);
      setIsTransitioning(false);
    }, 150);
  };

  const prevTeamMember = () => {
    if (isTransitioning || currentTeamIndex <= 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTeamIndex(prev => prev - 1);
      setIsTransitioning(false);
    }, 150);
  };

  const getVisibleMembers = () => {
    const members = [];
    for (let i = 0; i < 3; i++) {
      const index = currentTeamIndex + i;
      if (index < teamMembers.length) {
        members.push(teamMembers[index]);
      }
    }
    return members;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/lovable-uploads/background-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/ef47e395-8547-4feb-a3cf-e57fd16c42f3.png" 
                alt="ExchAInge" 
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <button 
                onClick={launchMarketplace}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block">
                Decentralized Marketplace for Physical AI Data
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Discover, access, and contribute to the world's largest marketplace for specialized datasets 
              powering the next generation of robotics and autonomous systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={launchMarketplace}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Datasets
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-500 hover:bg-gray-800 transition-all duration-300">
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5,000+</div>
                <div className="text-gray-400">Datasets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25K+</div>
                <div className="text-gray-400">Researchers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500K+</div>
                <div className="text-gray-400">Downloads</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <button 
            onClick={scrollToNext}
            className="text-gray-400 hover:text-gray-300 transition-colors animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/90 backdrop-blur-sm relative z-10">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for the Future of AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform provides everything you need to access, validate, and deploy 
              high-quality datasets for physical AI applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Curated Datasets",
                description: "Access thousands of high-quality, validated datasets specifically designed for robotics and autonomous systems.",
                color: "blue"
              },
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "Every dataset undergoes rigorous validation by our expert team to ensure data integrity and compliance.",
                color: "purple"
              },
              {
                icon: Zap,
                title: "Instant Access",
                description: "Download datasets immediately after purchase with secure, fast delivery and comprehensive documentation.",
                color: "cyan"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-600">
                <div className={`w-12 h-12 bg-${feature.color}-900 rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" data-animate className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powering Innovation Across Industries
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From autonomous vehicles to industrial robotics, our datasets enable breakthrough 
              innovations in physical AI applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                For AI Researchers & Companies
              </h3>
              <div className="space-y-4">
                {[
                  "Access specialized robotics datasets",
                  "Accelerate training and validation",
                  "Reduce data collection costs",
                  "Ensure compliance and quality"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={launchMarketplace}
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Explore Datasets
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Brain, label: "Computer Vision" },
                  { icon: Cpu, label: "Sensor Data" },
                  { icon: Rocket, label: "Motion Capture" },
                  { icon: Globe, label: "Simulation Data" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gray-600/80 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <item.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Carousel Section */}
      <section id="about" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/90 backdrop-blur-sm relative z-10">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading the future of AI data with decades of combined experience in 
              machine learning, robotics, and data science.
            </p>
          </div>

          {/* Team Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <button 
                onClick={prevTeamMember}
                className={`absolute left-0 z-10 bg-gray-700/80 hover:bg-gray-600/80 shadow-lg rounded-full p-2 transition-all duration-300 backdrop-blur-sm ${
                  currentTeamIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                disabled={isTransitioning || currentTeamIndex <= 0}
              >
                <ChevronLeft className="w-6 h-6 text-gray-300" />
              </button>
              
              <div className="overflow-hidden mx-16">
                <div 
                  className={`grid md:grid-cols-3 gap-8 transition-all duration-300 ease-in-out transform ${
                    isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                  }`}
                >
                  {getVisibleMembers().map((member, index) => (
                    <div key={`${member.name}-${currentTeamIndex}-${index}`} className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-600">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                      <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                      <p className="text-gray-300 text-sm">{member.expertise}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={nextTeamMember}
                className={`absolute right-0 z-10 bg-gray-700/80 hover:bg-gray-600/80 shadow-lg rounded-full p-2 transition-all duration-300 backdrop-blur-sm ${
                  currentTeamIndex >= teamMembers.length - 3 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                disabled={isTransitioning || currentTeamIndex >= teamMembers.length - 3}
              >
                <ChevronRight className="w-6 h-6 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your AI Development?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of researchers and companies using ExchAInge to accelerate their physical AI innovations.
          </p>
          <button 
            onClick={launchMarketplace}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800/90 text-white backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/lovable-uploads/ef47e395-8547-4feb-a3cf-e57fd16c42f3.png" 
                alt="ExchAInge" 
                className="h-6 w-auto mb-4"
              />
              <p className="text-gray-400">
                The premier marketplace for physical AI datasets and embodied intelligence solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Datasets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ExchAInge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
