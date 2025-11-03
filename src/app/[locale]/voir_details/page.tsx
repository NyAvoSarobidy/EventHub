'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { eventAPI } from '../../../api/api';
import Link from 'next/link';

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

interface EventInfo {
  id: string;
  titre: string;
  date: string;
  type: string;
  lieu: string;
  horaire: string;
  description: string;
  number_stand: string;
  places: string;
  src: string;
}

export default function VoirDetails_page() {
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const eventId = searchParams.get('id');
        
        if (!eventId) {
          throw new Error('ID de l\'événement non fourni');
        }

        const eventData = await eventAPI.getEventById(eventId);
        
        // Transformer les données de l'API en format attendu par le composant
        const transformedEvent: EventInfo = {
          id: eventData.id,
          titre: eventData.title,
          date: formatDate(eventData.date_debut),
          type: getEventType(eventData),
          lieu: eventData.location,
          horaire: `${formatTime(eventData.date_debut)} - ${formatTime(eventData.date_fin)}`,
          description: eventData.description,
          number_stand: eventData.companies_count?.toString() || "0",
          places: eventData.participants_count?.toString() || "0",
          src: getImageUrl(eventData.image_url)
        };

        setEventInfo(transformedEvent);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement des détails de l\'événement');
        setEventInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-grey via-gray-50 to-yellow-50/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray rounded-lg shadow-2xl overflow-hidden border border-gray-100 max-w-6xl mx-auto mt-5">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5">
                <div className="relative h-64 lg:h-full min-h-[400px] bg-gray-200 animate-pulse"></div>
              </div>
              <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="w-12 h-12 rounded-xl bg-gray-300"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !eventInfo) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-grey via-gray-50 to-yellow-50/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">Erreur</div>
            <p className="text-gray-600 mb-6">{error || 'Événement non trouvé'}</p>
            <Link
              href="/evenements"
              className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Retour aux événements
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-grey via-gray-50 to-yellow-50/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray rounded-lg shadow-2xl overflow-hidden border border-gray-100 max-w-6xl mx-auto mt-5">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5">
              {eventInfo.src && (
                <div className="relative h-64 lg:h-full min-h-[400px]">
                  <div 
                    className="relative w-full h-full group cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <img
                      src={eventInfo.src}
                      alt={eventInfo.titre}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/pub/pub-default.jpg";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Voir la publicité
                      </button>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:hidden"></div>
                  {eventInfo.type && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {eventInfo.type}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10">
              {eventInfo.titre && (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-normal">
                  {eventInfo.titre}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {eventInfo.date && (
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-gray text-4xl">📅</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Date</p>
                      <p className="font-normal text-gray-900 text-lg">{eventInfo.date}</p>
                    </div>
                  </div>
                )}

                {eventInfo.horaire && (
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-gray text-4xl">⏰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Horaire</p>
                      <p className="font-normal text-gray-900 text-lg">{eventInfo.horaire}</p>
                    </div>
                  </div>
                )}

                {eventInfo.lieu && (
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-4xl">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Lieu</p>
                      <p className="font-normal text-gray-900 text-lg">{eventInfo.lieu}</p>
                    </div>
                  </div>
                )}

                {/* Statistiques résumées */}
                <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-4xl">👥</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Participants</p>
                    <p className="font-normal text-gray-900 text-lg">{eventInfo.places} inscrits</p>
                  </div>
                </div>
              </div>

              {/* Statistiques détaillées */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {eventInfo.number_stand && (
                  <div className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border text-center border-gray-200">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">{eventInfo.number_stand}</div>
                    <div className="text-sm font-semibold text-gray-800">Stands</div>
                    <div className="text-xs text-gray-600 mt-1">Entreprises participantes</div>
                  </div>
                )}

                <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg p-5 text-center border border-gray-200">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">{eventInfo.places}</div>
                  <div className="text-sm font-semibold text-gray-800">Participants</div>
                  <div className="text-xs text-gray-600 mt-1">Inscrits</div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8 text-center">
                <Link 
                  href={`/inscription?id=${encodeURIComponent(eventInfo.id)}`}
                  className="bg-yellow-300 hover:bg-yellow-400 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group/btn backdrop-blur-sm border border-yellow-400/20 justify-center"
                >
                  <span>S'inscrire maintenant</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sections en dessous */}
          <div className="border-t border-gray-200">
            
            {/* Description */}
            {eventInfo.description && (
              <div className="p-6 sm:p-8 lg:p-10 border-t border-gray-100">
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 font-normal">Description de l'Événement</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-base font-medium">
                    {eventInfo.description}
                  </p>
                </div>
              </div>
            )}

            {/* Informations supplémentaires */}
            <div className="p-6 sm:p-8 lg:p-10 border-t border-gray-100">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 font-normal">Informations Complémentaires</h3>
              </div>
              <div className="bg-gradient-to-r from-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Statistiques de l'événement</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Type d'événement:</span>
                        <span className="font-medium">{eventInfo.type}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Stands réservés:</span>
                        <span className="font-medium">{eventInfo.number_stand}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Participants inscrits:</span>
                        <span className="font-medium">{eventInfo.places}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Détails pratiques</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{eventInfo.date}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Horaire:</span>
                        <span className="font-medium">{eventInfo.horaire}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Lieu:</span>
                        <span className="font-medium">{eventInfo.lieu}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            🚀 Prêt à vivre une expérience unique ?
          </p>
          <Link 
            href={`/inscription?id=${encodeURIComponent(eventInfo.id)}`}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Réserver ma place maintenant
          </Link>
        </div>
      </div>

      {/* Modal pour afficher l'image en grand */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <img
                src={eventInfo.src}
                alt={eventInfo.titre}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/pub/pub-default.jpg";
                }}
              />
            </div>
            <div className="text-white text-center mt-4 bg-black bg-opacity-50 px-4 py-2 rounded">
              {eventInfo.titre}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}