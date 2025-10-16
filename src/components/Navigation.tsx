import { Link, useLocation } from 'react-router-dom';
import { Database } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Docs', path: '/docs' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C2B31]/95 backdrop-blur-md border-b border-[#04C61B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Database className="w-9 h-9 text-[#04C61B] transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#04C61B]/20 blur-xl group-hover:blur-2xl transition-all" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
              ExchAInge
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#04C61B] text-[#0C2B31] shadow-lg shadow-[#04C61B]/30'
                      : 'text-gray-300 hover:bg-[#04C61B]/10 hover:text-[#04C61B]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/marketplace"
              className="px-6 py-2 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-xl hover:shadow-[#04C61B]/40 transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[#04C61B]/10 text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
