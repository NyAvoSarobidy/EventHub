'use client'
import Link from 'next/link';
import Image from 'next/image'

export default function AddEvent (){

    return(  
<section className="bg-white relative group">
  <div className="w-full h-80 sm:h-96 relative">
    <Image
      src="/images/event-1.jpg"
      alt="image de fond d'événement"
      fill
      className="object-cover"
      priority
    />
    
    <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30"></div>
    
    {/* Statistiques avec design épuré */}
    <div className="absolute top-6 sm:top-10 left-0 right-0">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
          {/* Événements */}
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">877</div>
            <div className="text-white/80 text-xs font-medium uppercase tracking-wide">Événements</div>
          </div>
          
          {/* Inscrits */}
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">194,287</div>
            <div className="text-white/80 text-xs font-medium uppercase tracking-wide">Inscrits</div>
          </div>
          
          {/* Participants */}
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">1,677,176</div>
            <div className="text-white/80 text-xs font-medium uppercase tracking-wide">Participants</div>
          </div>
        </div>
      </div>
    </div>

    {/* Bouton centré */}
   <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <Link 
          href="#" 
          className="bg-white/95 hover:bg-white text-gray-900 font-semibold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group/btn backdrop-blur-sm border border-white/20"
        >
          <span className="text-2xl">+</span>
          <span>Organiser un événement</span>
          <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </Link>
        
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mt-4">
          <p className="text-white/90 text-sm">Lancez votre événement en quelques clics</p>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}