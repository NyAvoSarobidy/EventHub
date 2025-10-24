'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { number: '95%', label: 'Forecast Accuracy' },
    { number: '40%', label: 'Cost Reduction' },
    { number: '24/7', label: 'Real-time Monitoring' }
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-radial-pattern animate-background-shift opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Hero Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Your Business. Mirrored, Optimized, Future-Ready.
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Auratwin is a cloud-native, AI-powered digital twin platform that enables real-time visibility, 
            forecasting, and optimization across your entire enterprise ecosystem.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0">
              <span className="group-hover:scale-105 transition-transform duration-150 inline-block">
                Request Demo
              </span>
            </button>
            <button className="group cursor-pointer bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-150">
              <span className="group-hover:scale-105 transition-transform duration-150 inline-block">
                Learn More
              </span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="block text-3xl font-extrabold text-emerald-400 mb-2 tabular-nums">
                  {stat.number}
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <div className="group relative">
            {/* Dashboard Preview */}
            <div 
              className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl"
              style={{
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(-2deg) rotateX(2deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
              }}
            >
              <Image
                src="/images/ai_control_tower.png"
                alt="Auratwin AI Control Tower Dashboard"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Dashboard Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-800/10 pointer-events-none">
                {/* Pulse Indicator */}
                <div className="absolute top-5 right-5 w-3 h-3 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                
                {/* Data Stream */}
                <div className="absolute bottom-5 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-data-flow"></div>
                
                {/* Additional animated elements */}
                <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-80 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-60 animate-float-delayed"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 1; 
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          50% { 
            opacity: 0.5; 
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
        }
        
        @keyframes data-flow {
          0% { 
            background-position: -100% 0;
          }
          100% { 
            background-position: 100% 0;
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-8px);
          }
        }
        
        @keyframes background-shift {
          0%, 100% { 
            transform: translateX(0);
          }
          50% { 
            transform: translateX(-5px);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .animate-data-flow {
          animation: data-flow 3s infinite;
          background-size: 200% 100%;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
        
        .animate-background-shift {
          animation: background-shift 20s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}

export default Hero