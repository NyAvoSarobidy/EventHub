'use client'
import Link from 'next/link';
import Image from 'next/image'

export default function AddEvent (){

    return(  <section className="bg-white relative group">
  <div className="w-full h-70 sm:h-70 md:h-70 lg:h-70 xl:h-70 relative">
    <Image
      src="/images/event-1.jpg"
      alt="image de fond d'événement"
      fill
      className="object-cover"
      priority
    />
    
    {/* Overlay simple */}
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500"></div>
    
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="text-center text-white">
        
        {/* Bouton toujours visible mais qui s'anime */}
        <button className="bg-white/95 hover:bg-white text-gray-900 font-semibold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group/btn backdrop-blur-sm border border-white/20">
          <span className="text-2xl">+</span>
          <span>Organiser un événement</span>
          <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>

        {/* Texte qui apparaît au survol */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mt-4">
          <p className="text-white/90 text-sm">Lancez votre événement en quelques clics</p>
        </div>

      </div>
    </div>
  </div>
</section>


     )
}