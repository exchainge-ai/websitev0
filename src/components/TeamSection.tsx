
import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Marc Ryan",
      title: "Co-Founder & CEO",
      subtitle: "Founder of FlipVault · ex-HSBC Tech Investment Banking",
      description: "8x Hackathon Winner · Strategic Management + Blockchain Dev",
      image: "/lovable-uploads/ef727aa7-f21f-4423-b71a-ffffd1a10147.png",
      color: "blue"
    },
    // {
    //   name: "Paul van Mierlo",
    //   title: "Co-Founder & CTO",
    //   subtitle: "Full-stack dev with wins across Aptos, Starknet, and other ecosystems",
    //   description: "Built a Tornado Cash-style token mixer on Starknet • Finalist in Aptos Social Track with payments product • Master's in Strategic Management from Erasmus University",
    //   image: "/lovable-uploads/4e8c3353-3b49-4ee9-905e-b100565ba8fe.png",
    //   color: "purple"
    // },
    {
      name: "Luca Trevisani",
      title: "Co-Founder & CSO",
      subtitle: "Crypto-Native Strategist",
      description: "Made his first cold wallet Bitcoin transaction at age 13 • Conceived and co-developed ExchAInge's product vision and go-to-market strategy • Early contributor to FlipVault's strategic roadmap and product development.",
      image: "/lovable-uploads/1c6c6a6a-e0ac-4ac1-90cb-3be5a24765f0.png",
      color: "cyan"
    },
    {
      name: "Milind Choudhary",
      title: "CTO & Head of AI",
      subtitle: "AI & Robotics Researcher · MS in Data Science · Full-Stack GenAI Builder",
      description: "Leading research on LiDAR + stereo camera simulation for BICA 2025 (top AI conference). Built digital twins in Unreal Engine 5 using ROS, Velodyne LiDAR, and ZED 2i sensors. Created FinBot AI — a GenAI financial research assistant. 2.5+ years as a Data Analyst managing BI systems for 1000+ employees.",
      image: "/lovable-uploads/c1faf9a1-9601-4821-8770-72b5c51e5eaf.png",
      color: "green"
    }
    // {
    //   name: "Saiprasad Raut",
    //   title: "Advisor",
    //   subtitle: "Governing Council, Hedera · Strategic Advisor, Worldpay",
    //   description: "Co-Chair of Hedera's Technical Steering and Product Committee. Advises Worldpay and Hashport on Web3 and payments strategy. Deep expertise in blockchain infra and enterprise-grade payment systems.",
    //   image: "/lovable-uploads/d39dc983-01d7-4ee3-baa1-5e4ba50bd1e2.png",
    //   color: "blue"
    // },
    // {
    //   name: "Gregg Lester",
    //   title: "Advisor",
    //   subtitle: "President, Balcony · Principal, Par5",
    //   description: "Co-Founder of Balcony, a GovTech real estate protocol on Avalanche that has raised ~$10m. Serial entrepreneur and digital strategist. Former brand strategy lead; advisor to NIL marketplace NextName. Brings go-to-market, brand, and growth expertise to AquaFi.",
    //   image: "/lovable-uploads/2afa0b8f-70bd-4d3c-a31e-65aaf1317b6b.png",
    //   color: "purple"
    // }
  ];

  return (
    <div className="bg-gray-800 py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-300">The experts behind the platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const hoverClass = `hover-glow-${member.color}`;
            return (
              <div key={index} className={`bg-gray-700 rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 text-center border border-gray-600 hover:border-${member.color}-500 ${hoverClass}`}>
                <div className="w-32 h-32 mx-auto mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-xl border-2 border-gray-500 hover-scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className={`text-${member.color}-400 font-semibold mb-2`}>{member.title}</p>
                <p className="text-gray-300 font-medium mb-4 text-sm">{member.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
