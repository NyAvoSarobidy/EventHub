'use client';

import React from 'react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl mb-8 text-slate-300">
              Join leading enterprises who trust Auratwin to optimize their business operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 hover:-translate-y-1 transition-all duration-150">
                Request Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-150">
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="cta-visual">
            <img 
              src="/images/logistics_map_interface.png" 
              alt="Auratwin Platform Interface"
              className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

