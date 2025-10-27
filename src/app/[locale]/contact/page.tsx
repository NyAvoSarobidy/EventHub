'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulation d'envoi
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Section Hero avec animation */}
      <section className="bg-white relative group overflow-hidden">
        <div className="w-full h-[80vh] min-h-[600px] max-h-[900px] relative">
          <Image
            src="/images/event-2.jpg"
            alt="image de fond d'événement"
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            priority
          />
          
          {/* Overlay gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-yellow-600/30 group-hover:from-gray-900/90 group-hover:via-gray-900/70 group-hover:to-yellow-600/40 transition-all duration-700"></div>
          
          {/* Éléments décoratifs */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-16 w-12 h-12 bg-yellow-300/30 rounded-full blur-lg animate-bounce delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-yellow-200/40 rounded-full blur-md animate-ping"></div>

          {/* Contenu principal */}
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-6 lg:px-8 pt-25 md:pt-34">
            <div className="text-center text-white max-w-4xl mx-auto transform group-hover:scale-105 transition-transform duration-500">
              
              {/* Titre avec animation */}
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="text-yellow-400 drop-shadow-2xl">Contactez</span>
                  <span className="drop-shadow-2xl">-nous</span>
                </h1>
                
                {/* Séparateur animé */}
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-8 rounded-full transform group-hover:scale-125 transition-transform duration-500"></div>
              </div>

              {/* Texte inspirant */}
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed opacity-90">
                  Votre vision, notre expertise. 
                  <span className="text-yellow-300 font-semibold"> Créons ensemble</span> des événements qui marquent les esprits
                </p>
                
                <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed opacity-80">
                  Transformons vos idées en <span className="text-yellow-300 font-medium">expériences inoubliables</span>
                </p>
              </div>

              {/* Indicateur de scroll */}
              <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300">
                <div className="animate-bounce">
                  <svg className="w-6 h-6 mx-auto text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                  <span className="text-yellow-200 text-sm">Découvrez le formulaire</span>
                </div>
              </div>
            </div>
          </div>

     
        </div>
      </section>

      {/* Section Formulaire */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-yellow-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* En-tête section formulaire */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Parlons de votre <span className="text-yellow-500">projet</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Remplissez ce formulaire et notre équipe vous recontactera sous 24h
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Formulaire amélioré */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-gray-100 transform hover:shadow-3xl transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Nom et Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-all duration-300 group-focus-within:text-yellow-600">
                    Votre nom complet *
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-lg font-medium"
                      placeholder="John Doe"
                      required 
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-all duration-300 group-focus-within:text-yellow-600">
                    Adresse email *
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-lg"
                      placeholder="votre@email.com"
                      required 
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Objet et Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-all duration-300 group-focus-within:text-yellow-600">
                    Objet de votre demande *
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-lg"
                      placeholder="Ex: Organisation d'un séminaire"
                      required 
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-all duration-300 group-focus-within:text-yellow-600">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-lg"
                      placeholder="+33 1 23 45 67 89"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 transition-all duration-300 group-focus-within:text-yellow-600">
                  Votre message *
                </label>
                <div className="relative">
                  <textarea 
                    rows={6}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-lg resize-none"
                    placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                    required
                  ></textarea>
                  <div className="absolute right-4 top-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 group/btn ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma demande</span>
                      <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </>
                  )}
                </button>
                
                {/* Message de confirmation */}
                <p className="text-center text-gray-500 text-sm mt-4">
                  ✨ Nous vous répondons dans les 24 heures ouvrables
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Styles d'animation pour les vagues */}
      <style jsx>{`
        @keyframes infiniteWave {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100px);
          }
        }
        .animate-infinite-wave {
          animation: infiniteWave 3s linear infinite;
        }
        .animate-infinite-wave-slow {
          animation: infiniteWave 4s linear infinite;
        }
      `}</style>
    </div>
  )
}