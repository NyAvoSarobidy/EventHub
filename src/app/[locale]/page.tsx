'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const slides = [
    { src: "/pub/pub-1.jpg", alt: "image 1" },
    { src: "/pub/pub-2.jpg", alt: "image 2" },
    { src: "/pub/pub-3.jpg", alt: "image 3" },
    { src: "/pub/pub-4.jpg", alt: "image 4" },
    { src: "/pub/pub-5.jpg", alt: "image 5" },
  ]

  const nextSlide = (): void => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 3))
  }

  const prevSlide = (): void => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < slides.length - 3) {
        nextSlide()
      } else {
        setCurrentSlide(0)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, slides.length])

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div className="w-full h-auto sm:h-64 md:h-80 lg:h-96 relative">
          <Image
            src="/images/fonds-1.jpg"
            alt="image de fond"
            fill
            className="object-cover blur-sm"
            priority
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/3 px-2"
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-white rounded-lg shadow-lg overflow-hidden">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300">
                <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </span>
            </button>

            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30"
              onClick={nextSlide}
              disabled={currentSlide >= slides.length - 3}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300">
                <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Apropos_platform  */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bienvenue sur <span className="text-yellow-400">EvenHub</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-white max-w-2xl mx-auto">
              La plateforme moderne dédiée à la <span className="text-yellow-400 font-semibold">découverte</span> et à l'<span className="text-yellow-400 font-semibold">inscription</span> d'événements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Colonne de gauche - Texte */}
            <div className="space-y-8">
              {/* Mission */}
              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
                  Notre Mission
                </h2>
                <p className="text-white leading-relaxed">
                  Connecter les visiteurs aux événements qui les <span className="text-yellow-400">inspirent</span>, qu'il s'agisse de conférences, d'expositions, de salons ou de rencontres culturelles.
                </p>
              </div>

              {/* Fonctionnalités */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Ce que nous offrons :</h3>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Exploration Facile</h4>
                    <p className="text-white text-sm">Recherche intelligente avec filtres par date, lieu et catégorie</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">🗓️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Détails Complets</h4>
                    <p className="text-white text-sm">Programme, horaires, intervenants et emplacement détaillés</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">📝</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Inscription Rapide</h4>
                    <p className="text-white text-sm">Formulaire simple et sécurisé en quelques clics</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">🎉</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Confirmation Instantanée</h4>
                    <p className="text-white text-sm">Recevez une confirmation et ajoutez à votre calendrier</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne de droite - Image et avantages */}
            <div className="space-y-8">
              {/* Carte Design */}
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-gray-900 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Interface Moderne</h3>
                <p className="mb-6 font-medium">
                  Inspirée des meilleurs outils comme Eventbrite, Notion et Airtable, notre interface allie design épuré et expérience utilisateur intuitive.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-sm font-medium">Design adaptatif</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-sm font-medium">Mode clair/sombre</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-sm font-medium">Interactions réactives</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-sm font-medium">Navigation agréable</span>
                  </div>
                </div>
              </div>

              {/* Espace Organisateurs */}
              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-3">
                  Pour les Organisateurs
                </h3>
                <p className="text-white mb-4">
                  Un espace dédié pour gérer vos événements, suivre les inscriptions et analyser les données en toute simplicité.
                </p>
                <div className="flex items-center space-x-2 text-sm text-yellow-400 font-semibold">
                  <span>→</span>
                  <span>Gestion simplifiée</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Avec <span className="text-yellow-400">EvenHub</span>, participer à un événement n'a jamais été aussi simple
                </h3>
                <p className="text-white mb-4">
                  Rapide, agréable et entièrement adapté à vos besoins.
                </p>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  🎯 Découvrir les événements
                </button>
              </div>
            </div>
          </div>

          {/* Citation finale */}
          <div className="text-center mt-12">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-8 py-4 shadow-lg">
              <p className="text-lg text-gray-900 font-bold italic">
                "✨ Découvrez, inscrivez-vous, et vivez pleinement vos événements !"
              </p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-white">Événements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-white">Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-white">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}