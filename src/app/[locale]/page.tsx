'use client'

import { useState, useEffect } from 'react'
import Apropos from './apropos'
import Event from './event'
import AddEvent from './add_event'
import { eventAPI } from '../../api/api'

interface Event {
  id: string;
  title: string;
  image_url: string;
  date_debut: string;
  description: string;
}

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/pub/pub-default.jpg";
    
    // Si l'URL est une URL complète, la retourner telle quelle
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Si c'est un chemin local, le construire avec l'URL de base de l'API
    if (imageUrl.startsWith('data/')) {
      return `http://192.168.1.226:8000/${imageUrl}`;
    }
    
    // Pour les chemins Windows, utiliser une image par défaut
    if (imageUrl.includes('\\')) {
      return "/pub/pub-default.jpg";
    }
    
    return "/pub/pub-default.jpg";
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await eventAPI.getAllEvents();
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement des événements');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Préparer les slides à partir des événements
  const slides = events.map(event => ({
    src: getImageUrl(event.image_url),
    alt: event.title,
    title: event.title,
    date: event.date_debut,
    description: event.description
  }));

  // Ajouter des slides par défaut si aucun événement n'est chargé
  const defaultSlides = [
    { src: "/pub/pub-default.jpg", alt: "Événement par défaut", title: "Événement à venir", date: "", description: "" },
    { src: "/pub/pub-default.jpg", alt: "Événement par défaut", title: "Événement à venir", date: "", description: "" },
    { src: "/pub/pub-default.jpg", alt: "Événement par défaut", title: "Événement à venir", date: "", description: "" }
  ];

  const displaySlides = slides.length > 0 ? slides : defaultSlides;

  const nextSlide = (): void => {
    const slidesToShow = typeof window !== 'undefined' 
      ? (window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1)
      : 3;
    setCurrentSlide((prev) => Math.min(prev + 1, displaySlides.length - slidesToShow))
  }

  const prevSlide = (): void => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  // Gestion du responsive pour le carrousel
  const getSlidesToShow = (): number => {
    if (typeof window === 'undefined') return 3;
    return window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  }

  useEffect(() => {
    const slidesToShow = getSlidesToShow();
    
    const interval = setInterval(() => {
      if (displaySlides.length <= slidesToShow) return;
      
      if (currentSlide < displaySlides.length - slidesToShow) {
        nextSlide()
      } else {
        setCurrentSlide(0)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, displaySlides.length])

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="relative w-full">
        {/* Section Hero - Plein écran avec état de chargement */}
        <div className="relative w-full h-screen">
          <div className="absolute inset-0 w-full h-full bg-gray-200">
            {/* Image de fond de secours */}
            <div 
              className="w-full h-full bg-cover bg-center blur-sm"
              style={{ backgroundImage: "url('/images/fonds-1.jpg')" }}
            />
          </div>
          
          {/* Carrousel de chargement */}
          <div className="absolute inset-0 flex items-center justify-center px-4 -mt-16 sm:-mt-20 md:-mt-24">
            <div className="relative w-full max-w-6xl">
              <div className="flex gap-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                  >
                    <div className="relative h-50 sm:h-72 md:h-80 lg:h-96 bg-gray-300 rounded-lg shadow-lg overflow-hidden animate-pulse">
                      <div className="absolute inset-0 bg-gray-400"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Section Hero - Plein écran */}
      <div className="relative w-full h-screen">
        {/* Image de fond avec balise img normale */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/fonds-1.jpg"
            alt="image de fond"
            className="w-full h-full object-cover blur-sm"
          />
        </div>

        {/* Carrousel */}
        <div className="absolute inset-0 flex items-center justify-center px-4 -mt-16 sm:-mt-20 md:-mt-24">
          <div className="relative w-full max-w-6xl">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / getSlidesToShow())}%)` }}
              >
                {displaySlides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                  >
                    <div className="relative h-50 sm:h-72 md:h-80 lg:h-96 bg-white rounded-lg shadow-lg overflow-hidden group">
                      {/* Utilisation de img au lieu de Image */}
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback si l'image ne charge pas
                          (e.target as HTMLImageElement).src = "/pub/pub-default.jpg";
                        }}
                      />
                      
                      {/* Overlay avec informations */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                        <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-lg mb-1">{slide.title}</h3>
                          {slide.date && (
                            <p className="text-sm opacity-90">
                              📅 {new Date(slide.date).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                          {slide.description && (
                            <p className="text-xs opacity-80 mt-1 line-clamp-2">
                              {slide.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Boutons de navigation seulement s'il y a plus de slides que visible */}
            {displaySlides.length > getSlidesToShow() && (
              <>
                {/* Bouton Précédent */}
                <button
                  type="button"
                  className="absolute top-1/2 -left-2 sm:left-4 transform -translate-y-1/2 z-30"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 disabled:opacity-50">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                  </span>
                </button>

                {/* Bouton Suivant */}
                <button
                  type="button"
                  className="absolute top-1/2 -right-2 sm:right-4 transform -translate-y-1/2 z-30"
                  onClick={nextSlide}
                  disabled={currentSlide >= displaySlides.length - getSlidesToShow()}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 disabled:opacity-50">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Event />
      <Apropos />
      <AddEvent />
    </div>
  )
}