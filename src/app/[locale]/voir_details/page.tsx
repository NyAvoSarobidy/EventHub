'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';

export default function VoirDetails_page() {
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    src: '',
    titre: '',
    date: '',
    type: '',
    lieu: '',
    prix: '',
    payement: '',
    horaire: '',
    description: '',      
    programme: '',      
    number_stand: '',      
    places: '',           
    participants: '',
  })

  useEffect(() => {
    const src = searchParams.get('src')
    const event = searchParams.get('titre')
    const date = searchParams.get('date')
    const type = searchParams.get('type')
    const lieu = searchParams.get('lieu')
    const horaire = searchParams.get('horaire')
    const description = searchParams.get('description')
    const programme = searchParams.get('programme')
    const prix = searchParams.get('prix')
    const payement = searchParams.get('payement')
    const number_stand = searchParams.get('number_stand')
    const places = searchParams.get('places')
    const participants = searchParams.get('participants')

    if (event) {
      setEventInfo({
        src: src || '',
        titre: event,
        date: date || '',
        type: type || '',
        lieu: lieu || '',
        prix: prix || '',
        payement: payement || '',
        horaire: horaire || '',
        description: description || '',
        programme: programme || '',
        number_stand: number_stand || '',
        places: places || '',
        participants: participants || '',
      })
    }
  }, [searchParams])

  // Fonction pour parser les participants depuis la string
  const getParticipantsArray = () => {
    if (!eventInfo.participants) return []
    try {
      // Si c'est déjà un tableau, on le retourne
      if (Array.isArray(eventInfo.participants)) {
        return eventInfo.participants
      }
      // Sinon on essaie de parser la string
      const parsed = JSON.parse(eventInfo.participants)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      // Si le parsing échoue, on split par virgule
      return eventInfo.participants.split(',').map(p => p.trim()).filter(p => p)
    }
  }

  const participantsList = getParticipantsArray()



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
                    <Image
                        src={eventInfo.src}
                        alt={eventInfo.titre}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-75"
                        priority
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
                    <div className="w-12 h-12  rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-4xl">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Lieu</p>
                      <p className="font-normal text-gray-900 text-lg">{eventInfo.lieu}</p>
                    </div>
                  </div>
                )}

                {eventInfo.prix && (
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="w-12 h-12  rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-4xl">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Prix</p>
                      <p className="font-normal text-gray-900 text-lg">{eventInfo.prix} {eventInfo.payement}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {eventInfo.number_stand && (
                  <div className=" bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg p-4 border text-center border-gray-200">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">{eventInfo.number_stand}</div>
                    <div className="text-sm font-semibold text-gray-800">Stands</div>
                    <div className="text-xs text-gray-600 mt-1">Disponibles</div>
                  </div>
                )}

                {eventInfo.places && (
                  <div className="bg-gradient-to-br from-gray-200 to-gary-100 rounded-lg p-5 text-center border border-gray-200">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">{eventInfo.places}</div>
                    <div className="text-sm font-semibold text-gray-800">Places</div>
                    <div className="text-xs text-gray-600 mt-1">Restantes</div>
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8 text-center">
                <Link 
                href={`/inscription?event=${encodeURIComponent(eventInfo.titre)}&date=${encodeURIComponent(eventInfo.date)}&type=${encodeURIComponent(eventInfo.type)}&payement=${encodeURIComponent(eventInfo.payement)}&prix=${encodeURIComponent(eventInfo.prix)}`}
           
                className="bg-yellow-300 hover:bg-yellow text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group/btn backdrop-blur-sm border border-yellow/20">
                  <span>S'inscrire maintenant</span>
                </Link>
                
              </div>
            </div>
          </div>

          {/* Sections en dessous */}
          <div className="border-t border-gray-200">
            
            {/* Participants en cercles */}
              {participantsList.length > 0 && (
                <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-normal">NOS PARTICIPANTS</h3>
                    </div>
                    <div className="bg-gradient-to-r">
                      <div className="mt-8">
                        <div className="flex flex-wrap justify-between gap-4">
                        {participantsList.map((participant, index) => (
                            <div 
                            key={index}
                            className="relative group flex-1 min-w-[80px] max-w-[100px] mx-auto"
                            title={participant}
                            >
                            <div 
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md bg-gray-500 group-hover:scale-110 transition-transform duration-200"
                            >
                                {participant.substring(0, 1).toUpperCase()}
                            </div>
                           {/* Nom du participant en dessous */}
                                <div className="mt-2">
                                    <p className="text-xs sm:text-sm text-center font-bold text-gray-700 font-medium truncate">
                                    {participant}
                                    </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                )}
            {/* Programme */}
                {eventInfo.programme && (
                <div className="p-6 sm:p-8 lg:p-10 border-t border-gray-100">
                    <div className="flex items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-normal">PROGRAMME</h3>
                    </div>
                    <div className="bg-gradient-to-r   p-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {(Array.isArray(eventInfo.programme) 
                        ? eventInfo.programme 
                        : typeof eventInfo.programme === 'string' 
                            ? eventInfo.programme.split(',') 
                            : []
                        ).map((item, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                {index + 1}
                            </div>
                            <div className="text-gray-800 font-medium">
                                {item.trim()}
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                )}
            {/* Description */}
            {eventInfo.description && (
              <div className="p-6 sm:p-8 lg:p-10 border-t border-gray-100">
                <div className="flex items-center mb-6">
                  
                  <h3 className="text-xl font-bold text-gray-900 font-normal">Description de l'Événement</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-50  rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-base font-medium">
                    {eventInfo.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            🚀 Prêt à vivre une expérience unique ?
          </p>
          <Link 
           href={`/inscription?event=${encodeURIComponent(eventInfo.titre)}&date=${encodeURIComponent(eventInfo.date)}&type=${encodeURIComponent(eventInfo.type)}&payement=${encodeURIComponent(eventInfo.payement)}&prix=${encodeURIComponent(eventInfo.prix)}`}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
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
                    <Image
                    src={eventInfo.src}
                    alt={eventInfo.titre}
                    fill
                    className="object-contain"
                    priority
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