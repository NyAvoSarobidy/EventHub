'use client';

import React from 'react';
import { ShoppingCart, Package, Truck } from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      icon: ShoppingCart,
      title: "Retail",
      description: "Optimize inventory, improve demand forecasting, and enhance customer satisfaction"
    },
    {
      icon: Package,
      title: "FMCG",
      description: "Streamline production planning, reduce waste, and accelerate time-to-market"
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Enhance route optimization, improve delivery performance, and reduce costs"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Trusted by Leading Industries
          </h2>
          <p className="text-xl text-slate-600">
            Tailored solutions for your specific industry needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div key={index} className="text-center p-8 bg-white rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{industry.title}</h3>
                <p className="text-slate-600 leading-relaxed">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;

