import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Book, Code, FileText, Zap, Database, Shield } from 'lucide-react';

const Docs = () => {
  const sections = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of using ExchAInge',
      links: [
        'Quick Start Guide',
        'Account Setup',
        'First Dataset Upload',
        'Making Your First Purchase',
      ],
    },
    {
      icon: Database,
      title: 'Dataset Guidelines',
      description: 'Best practices for creating quality datasets',
      links: [
        'Supported Formats',
        'Quality Standards',
        'Metadata Requirements',
        'Pricing Your Dataset',
      ],
    },
    {
      icon: Code,
      title: 'API Documentation',
      description: 'Integrate ExchAInge into your workflow',
      links: [
        'API Overview',
        'Authentication',
        'Dataset Endpoints',
        'Code Examples',
      ],
    },
    {
      icon: Shield,
      title: 'Verification Process',
      description: 'Understanding our quality checks',
      links: [
        'Verification Steps',
        'Quality Metrics',
        'Common Issues',
        'Appeals Process',
      ],
    },
    {
      icon: FileText,
      title: 'Legal & Licensing',
      description: 'Terms, licenses, and compliance',
      links: [
        'Terms of Service',
        'License Types',
        'Data Privacy',
        'Copyright Guidelines',
      ],
    },
    {
      icon: Zap,
      title: 'Advanced Features',
      description: 'Power user tips and tricks',
      links: [
        'Batch Operations',
        'Custom Licensing',
        'Analytics Dashboard',
        'Integration Tools',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about using ExchAInge, from getting started to advanced features.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#04C61B] focus:outline-none text-lg"
            />
            <svg
              className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#04C61B] hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#04C61B] to-[#6DF77E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-100">{section.title}</h3>
                <p className="text-gray-300 mb-6">{section.description}</p>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#04C61B] transition-colors flex items-center group/link"
                      >
                        <span className="w-1.5 h-1.5 bg-[#04C61B] rounded-full mr-3 group-hover/link:w-2 group-hover/link:h-2 transition-all" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 px-4 bg-[#0C2B31]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'How do I upload my first dataset?',
              'What file formats are supported?',
              'How does the verification process work?',
              'What are the different license types?',
              'How do I integrate the API?',
              'What payment methods are accepted?',
            ].map((topic, index) => (
              <a
                key={index}
                href="#"
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-[#04C61B] hover:shadow-lg transition-all group"
              >
                <span className="text-lg text-gray-100 group-hover:text-[#04C61B] transition-colors">
                  {topic}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#04C61B]/10 to-[#6DF77E]/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-white rounded-lg font-medium hover:shadow-xl hover:shadow-[#04C61B]/30 transition-all">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-white border-2 border-[#04C61B] text-[#04C61B] rounded-lg font-medium hover:bg-[#04C61B] hover:text-white transition-all">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Docs;
