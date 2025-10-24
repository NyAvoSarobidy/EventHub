'use client';

import React from 'react';

const PlatformModules = () => {
  const modules = [
    {
      image: "/images/supply_chain_dashboard.png",
      title: "Integrated Planning",
      description: "Unified planning across demand, supply, and financial operations with real-time collaboration",
      features: [
        "Demand sensing and forecasting",
        "Supply planning optimization", 
        "Financial planning integration"
      ]
    },
    {
      image: "/images/digital_twin_platform.jpg",
      title: "Supply Chain Twin",
      description: "Digital replica of your entire supply network with real-time monitoring and simulation",
      features: [
        "End-to-end visibility",
        "Risk assessment and mitigation",
        "Scenario planning and what-if analysis"
      ]
    },
    {
      image: "/images/real_time_tracking.webp",
      title: "Operations Simulation",
      description: "Test operational changes in a virtual environment before implementation",
      features: [
        "Process optimization",
        "Capacity planning",
        "Performance prediction"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Comprehensive Platform Modules
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to transform your operations
          </p>
        </div>
        
        <div className="space-y-12">
          {modules.map((module, index) => (
            <div key={index} className={`bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            } lg:flex items-center`}>
              <div className="lg:w-1/2">
                <img 
                  src={module.image} 
                  alt={`${module.title} Module`}
                  className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{module.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{module.description}</p>
                <ul className="space-y-3">
                  {module.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformModules;

