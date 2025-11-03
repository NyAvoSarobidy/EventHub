'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { eventAPI } from '../../api/api';

// Interface pour typer les données de l'API
interface Event {
  id: string;
  title: string;
  date_debut: string;
  date_fin: string;
  description: string;
  location: string;
  image_url: string;
  participants_count: number;
  companies_count: number;
  visiteurs_count: number;
  total_stand_visits: number;
  is_upcoming: boolean;
  is_ongoing: boolean;
  is_past: boolean;
}

export default function Event() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour formater l'heure
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  // Fonction pour déterminer le type d'événement basé sur les dates
  const getEventType = (event: Event) => {
    if (event.is_ongoing) return "En cours";
    if (event.is_upcoming) return "À venir";
    if (event.is_past) return "Terminé";
    return "Événement";
  };

  // Fonction pour déterminer si l'événement est gratuit ou payant
  const getPaymentInfo = (event: Event) => {
    // Cette logique peut être adaptée selon vos besoins
    // Pour l'instant, on considère tous les événements comme gratuits
    return {
      payement: "Gratuit",
      prix: "0 MGA"
    };
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

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">Erreur</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galerie des <span className="text-yellow-500">Événements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les moments forts de nos événements passés et à venir
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {events.length} événement(s) trouvé(s)
          </div>
        </div>

        {/* Grille des événements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event, index) => {
            const paymentInfo = getPaymentInfo(event);
            
            return (
              <div
                key={event.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={getImageUrl(event.image_url)}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/pub/pub-default.jpg";
                    }}
                  />
                  
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Link 
                        href={`/inscription?id=${encodeURIComponent(event.id)}`}
                        className="bg-white/90 text-gray-900 font-semibold px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white transition-colors"
                      >
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                  
                  {/* Badge numéro */}
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>

                  {/* Badge statut */}
                  <div className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
                    event.is_ongoing ? 'bg-green-500' : 
                    event.is_upcoming ? 'bg-blue-500' : 
                    'bg-gray-500'
                  }`}>
                    {getEventType(event)}
                  </div>
                </div>
                
                {/* Légende */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {event.title}
                  </h3>
                  <p className="font-semibold text-red-800 text-xs mb-1">
                    {paymentInfo.payement} : {paymentInfo.prix}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      📅 {formatDate(event.date_debut)}
                    </span>
                    <Link
                      href={`/voir_details?id=${encodeURIComponent(event.id)}`}
                      className="text-xs text-yellow-600 font-semibold hover:text-yellow-700"
                    >
                      En savoir plus →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Aucun événement disponible</div>
            <p className="text-gray-400 mt-2">Revenez plus tard pour découvrir nos prochains événements</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}