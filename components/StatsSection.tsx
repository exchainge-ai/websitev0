'use client';

import React from 'react';
import { Database, TrendingUp, Users, Globe } from 'lucide-react';
import CountUp from 'react-countup';

const StatsSection = () => {
  const stats = [
    { icon: Database, label: 'Datasets', value: 5000, suffix: '+', color: 'text-blue-400', hoverColor: 'hover-glow-blue' },
    { icon: Users, label: 'AI Researchers', value: 25000, suffix: '+', color: 'text-purple-400', hoverColor: 'hover-glow-purple' },
    { icon: TrendingUp, label: 'Downloads', value: 500, suffix: 'K+', color: 'text-cyan-400', hoverColor: 'hover-glow-cyan' },
    { icon: Globe, label: 'Industries', value: 50, suffix: '+', color: 'text-green-400', hoverColor: 'hover-glow-green' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gray-800/90 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-500 transform hover:scale-105 border border-gray-700 hover:border-gray-600 ${stat.hoverColor} animate-fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 animate-float hover-rotate-12`} style={{ animationDelay: `${index * 0.5}s` }} />
            <div className="text-2xl font-bold text-white mb-1">
              <CountUp end={stat.value} duration={2.5} separator="," />
              {stat.suffix}
            </div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
