'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function InscriptionForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  
  // État pour stocker les informations de l'événement sélectionné
  const [eventInfo, setEventInfo] = useState({
    titre: '',
    date: '',
    type: '',
    prix: '',
    payement : '',
  })
  
  const [formData, setFormData] = useState({
    // Étape 1
    nom: '',
    prenom: '',
    entreprise: '',
    telephone: '',
    email: '',
    poste: '',
    
    // Étape 2
    source: '',
    attentes: '',
    objectifs: '',
    apprentissage: '',
    resultats: ''
  })

  // Récupérer les informations de l'événement depuis l'URL
  useEffect(() => {
    const event = searchParams.get('event')
    const date = searchParams.get('date')
    const type = searchParams.get('type')
    const prix = searchParams.get('prix')
    const payement = searchParams.get('payement')

    if (event) {
      setEventInfo({
        titre: event,
        date: date || '',
        type: type || '',
        prix: prix || '',
        payement: payement || ''
      })
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const nextStep = () => {
    setStep(2)
  }

  const prevStep = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const inscriptionData = {
      ...formData,
      evenement: eventInfo
    }
    console.log('Données soumises:', inscriptionData)
    alert(`Inscription réussie pour l'événement : ${eventInfo.titre || 'Non spécifié'}`)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-yellow-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">  
            Inscription aux <span className="text-yellow-500">Événements</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez-nous pour nos prochains événements en vous inscrivant dès aujourd'hui !
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full"></div>
          
          {/* NOUVEAU : Affichage de l'événement sélectionné */}
          {eventInfo.titre && (
            <div className="mt-6 inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3">
              <p className="text-sm text-gray-600 mb-1">Vous vous inscrivez pour :</p>
              <p className="text-lg font-bold text-gray-900">{eventInfo.titre}</p>
              {eventInfo.date && (
                <p className="text-sm text-gray-600 mt-1">📅 {eventInfo.date}</p>
              )}
              {eventInfo.type && (
                <span className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                  {eventInfo.type}
                </span>
              )}
              <br/>
               {eventInfo.payement && (
                <span className="inline-block mt-2 px-3 py-1 text-red-800 text-xs font-semibold rounded-full">
                   {eventInfo.payement} {eventInfo.prix}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Indicateur de progression amélioré */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= 1 ? 'bg-yellow-500 border-yellow-500 text-white shadow-lg' : 'border-gray-300 bg-white'
              }`}>
                <span className="font-semibold">1</span>
              </div>
              <span className="text-xs font-medium mt-2 text-center">Informations</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full bg-yellow-500 transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= 2 ? 'bg-yellow-500 border-yellow-500 text-white shadow-lg' : 'border-gray-300 bg-white'
              }`}>
                <span className="font-semibold">2</span>
              </div>
              <span className="text-xs font-medium mt-2 text-center">Vos attentes<br/>& objectifs</span>
            </div>
          </div>
        </div>

        {/* Formulaire avec taille moyenne */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit}>
            {/* Étape 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Informations 
                  </h3>
                  <p className="text-sm text-gray-600">
                    Remplissez vos informations de base
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom  *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                </div>

              

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                      placeholder="+33 1 23 45 67 89"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Entreprise   <span className="text-gray-500 font-normal ml-1">(Optionnel)</span>
                    </label>
                    <input
                        type="text"
                        name="entreprise"
                        value={formData.entreprise}
                
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                        placeholder="Votre entreprise"
                        required
                        />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Poste / Fonction / Statut
                    <span className="text-gray-500 font-normal ml-1">(Optionnel)</span>
                  </label>
                  <select
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                  >
                    <option value="">Sélectionnez votre statut</option>
                    <option value="etudiant">Étudiant</option>
                    <option value="enseignant">Enseignant</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="salarie">Salarié</option>
                    <option value="chercheur">Chercheur</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span>Suivant</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Étape 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Vos attentes et objectifs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Aidez-nous à mieux vous connaître
                  </p>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comment avez-vous entendu parler de l'événement ? *
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                    required
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="reseaux-sociaux">Réseaux sociaux</option>
                    <option value="email">Email</option>
                    <option value="ami">Ami/Collègue</option>
                    <option value="affiche">Affiche/Publicité</option>
                    <option value="site-web">Site web</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qu'attendez-vous de cet événement ? *
                  </label>
                  <textarea
                    name="attentes"
                    value={formData.attentes}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm resize-none"
                    placeholder="Décrivez vos principales attentes..."
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quels sont vos objectifs en participant ?
                  </label>
                  <textarea
                    name="objectifs"
                    value={formData.objectifs}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm resize-none"
                    placeholder="Quels objectifs souhaitez-vous atteindre ?"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qu'aimeriez-vous apprendre ou découvrir ?
                  </label>
                  <textarea
                    name="apprentissage"
                    value={formData.apprentissage}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm resize-none"
                    placeholder="Quelles compétences ou connaissances souhaitez-vous acquérir ?"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qu'espérez-vous obtenir à la fin de cet événement ? *
                  </label>
                  <textarea
                    name="resultats"
                    value={formData.resultats}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm resize-none"
                    placeholder="Quels résultats concrets attendez-vous ?"
                    required
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    <span>Retour</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <span>Finaliser l'inscription</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Fin du formulaire */}
            
          </form>
        </div>

        {/* Informations supplémentaires */}
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <p className="text-sm text-gray-500">
            ✨ Vos informations sont sécurisées et ne seront pas partagées
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  )
}