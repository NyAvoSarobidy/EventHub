'use client';

import React from 'react';
import { Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { text: "Platform Overview", href: "#" },
        { text: "Modules", href: "#" },
        { text: "Integrations", href: "#" },
        { text: "Security", href: "#" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { text: "By Industry", href: "#" },
        { text: "Retail", href: "#" },
        { text: "FMCG", href: "#" },
        { text: "Logistics", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "#" },
        { text: "Leadership", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Contact", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Insights", href: "#" },
        { text: "Documentation", href: "#" },
        { text: "Support", href: "#" },
        { text: "Privacy Policy", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              Auratwin
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Your Business. Mirrored, Optimized, Future-Ready.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4 className="text-lg font-semibold mb-4 text-slate-200">{section.title}</h4>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link.href}
                    className="block text-slate-400 hover:text-white transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8">
          <p className="text-center text-slate-500">
            &copy; 2024 Auratwin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;