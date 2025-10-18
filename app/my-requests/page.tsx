'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, DollarSign, MessageSquare, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function MyRequestsPage() {
  const router = useRouter();

  const mockRequests = [
    {
      id: 1,
      title: 'Indoor Navigation Dataset for Warehouse Robots',
      category: 'Robotics',
      budget: 15000,
      deadline: '2025-11-30',
      status: 'active',
      proposalsCount: 7,
      views: 143,
      createdAt: '2025-10-14',
      description: 'Need labeled indoor navigation data for warehouse robot training...',
    },
    {
      id: 2,
      title: 'Pedestrian Detection Dataset - Urban Environments',
      category: 'Computer Vision',
      budget: 8500,
      deadline: '2025-11-15',
      status: 'reviewing',
      proposalsCount: 12,
      views: 231,
      createdAt: '2025-10-10',
      description: 'Looking for diverse pedestrian detection data across various lighting...',
    },
    {
      id: 3,
      title: 'Sensor Fusion Data for Autonomous Drones',
      category: 'Autonomous Vehicles',
      budget: 22000,
      deadline: '2025-12-20',
      status: 'pending',
      proposalsCount: 3,
      views: 89,
      createdAt: '2025-10-16',
      description: 'Multi-sensor data (LiDAR, camera, IMU) for drone navigation...',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center px-3 py-1 bg-[#04C61B]/20 text-[#04C61B] rounded-full text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Active
          </span>
        );
      case 'reviewing':
        return (
          <span className="flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            <Eye className="w-4 h-4 mr-1" />
            Reviewing Proposals
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
            <Clock className="w-4 h-4 mr-1" />
            Waiting for Proposals
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0C2B31] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Data Requests</h1>
            <p className="text-gray-400">Track your custom data requests and review proposals</p>
          </div>
          <button
            onClick={() => router.push('/request-data')}
            className="px-6 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all"
          >
            + New Request
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Requests</p>
                <p className="text-3xl font-bold text-white">{mockRequests.length}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-[#04C61B]/30" />
            </div>
          </div>

          <div className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-3xl font-bold text-[#04C61B]">
                  {mockRequests.filter(r => r.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-[#04C61B]/30" />
            </div>
          </div>

          <div className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Proposals</p>
                <p className="text-3xl font-bold text-white">
                  {mockRequests.reduce((sum, r) => sum + r.proposalsCount, 0)}
                </p>
              </div>
              <Eye className="w-10 h-10 text-[#04C61B]/30" />
            </div>
          </div>

          <div className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Budget</p>
                <p className="text-3xl font-bold text-white">
                  ${(mockRequests.reduce((sum, r) => sum + r.budget, 0) / 1000).toFixed(0)}k
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-[#04C61B]/30" />
            </div>
          </div>
        </div>

        {/* Beta Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
          <p className="text-yellow-200 text-sm flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Demo Mode:</strong> This dashboard shows mock data requests and proposals.
              In production, you'll see real-time updates and receive notifications when sellers submit proposals.
            </span>
          </p>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-6 hover:border-[#04C61B]/40 transition-all cursor-pointer"
              onClick={() => {
                // In real app, would navigate to request detail page
                alert('Request details page coming soon! This is a mock demo.');
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{request.title}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{request.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#0C2B31] text-gray-300 rounded text-sm">
                      {request.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Budget</p>
                  <p className="text-[#04C61B] font-bold">
                    ${request.budget.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs mb-1">Deadline</p>
                  <p className="text-gray-300 font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(request.deadline).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs mb-1">Proposals</p>
                  <p className="text-white font-bold flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1 text-[#04C61B]" />
                    {request.proposalsCount}
                    {request.proposalsCount > 5 && (
                      <span className="ml-2 text-xs text-[#04C61B]">+{request.proposalsCount - 5} new</span>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs mb-1">Views</p>
                  <p className="text-gray-300 font-medium flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {request.views}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs mb-1">Created</p>
                  <p className="text-gray-300 font-medium">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {request.proposalsCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Proposal review page coming soon! This is a mock demo.');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-lg transition-all text-sm"
                  >
                    Review {request.proposalsCount} Proposal{request.proposalsCount !== 1 ? 's' : ''}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon Features */}
        <div className="mt-12 bg-[#0A1F24] border border-[#04C61B]/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Coming Soon to Dashboard</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#04C61B] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Real-time Notifications</h4>
                <p className="text-gray-400 text-sm">Get instant alerts when sellers submit proposals</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#04C61B] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Proposal Comparison</h4>
                <p className="text-gray-400 text-sm">Side-by-side comparison of seller proposals</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-[#04C61B] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Direct Messaging</h4>
                <p className="text-gray-400 text-sm">Chat with sellers to discuss requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
