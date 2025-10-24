'use client';

import React from 'react';
import { Eye, Brain, Copy, Plug, Leaf, Shield } from 'lucide-react';

const FeaturesOverview = () => {
  const features = [
    {
      icon: Eye,
      title: "Real-time Visibility & Alerts",
      description: "Monitor your entire supply chain with instant alerts and comprehensive dashboards"
    },
    {
      icon: Brain,
      title: "AI-based Forecasting",
      description: "Advanced machine learning algorithms for accurate demand prediction and optimization"
    },
    {
      icon: Copy,
      title: "Digital Twin Simulations",
      description: "Create virtual replicas of your operations for scenario planning and risk assessment"
    },
    {
      icon: Plug,
      title: "Seamless Integration",
      description: "Connect with SAP, Oracle, IoT devices, and existing enterprise systems"
    },
    {
      icon: Leaf,
      title: "Sustainability Modeling",
      description: "Track and optimize carbon impact across your entire value chain"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with compliance to industry standards and regulations"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Intelligent Control Tower for Your Enterprise
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect data from ERP, CRM, IoT, and planning systems to simulate and improve business decisions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;

