// page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { eventAPI } from '../../../api/api';

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
  is_upcoming: boolean;
  is_ongoing: boolean;
  is_past: boolean;
}

interface Question {
  id: string;
  event_id: string;
  question_text: string;
  question_type: string;
  options: string[];
  order: number;
  is_required: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function InscriptionForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionResponses, setQuestionResponses] = useState<{[key: string]: string}>({})
  

  const [isSubmitting, setIsSubmitting] = useState(false)

  





  // État pour stocker les informations de l'événement sélectionné
  const [eventInfo, setEventInfo] = useState({
    id: '',
    titre: '',
    date: '',
    type: '',
    lieu: '',
    horaire: ''
  })
  
  const [formData, setFormData] = useState({
    // Étape 1 - Champs correspondant à l'API
    id_event: '',
    annee_experience: '',
    centres_interet: [] as string[],
    email: '',
    entreprise: '',
    nom: '',
    poste: '',
    prenom: '',
    profil_linkedin: '',
    recevoir_mises_a_jour: true,
    region: '',
    secteur_activite: '',
    telephone: ''
  })

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      id_event: formData.id_event, // On garde l'id_event
      annee_experience: '',
      centres_interet: [],
      email: '',
      entreprise: '',
      nom: '',
      poste: '',
      prenom: '',
      profil_linkedin: '',
      recevoir_mises_a_jour: true,
      region: '',
      secteur_activite: '',
      telephone: ''
    });
    setQuestionResponses({});
    setStep(1);
  };

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

  // Fonction pour déterminer le type d'événement
  const getEventType = (event: Event) => {
    if (event.is_ongoing) return "En cours";
    if (event.is_upcoming) return "À venir";
    if (event.is_past) return "Terminé";
    return "Événement";
  };

  // Récupérer les informations de l'événement depuis l'API
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const eventId = searchParams.get('id');
        
        if (eventId) {
          const eventData = await eventAPI.getEventById(eventId);
          
          setEventInfo({
            id: eventData.id,
            titre: eventData.title,
            date: formatDate(eventData.date_debut),
            type: getEventType(eventData),
            lieu: eventData.location,
            horaire: `${formatTime(eventData.date_debut)} - ${formatTime(eventData.date_fin)}`
          });

          // Mettre à jour formData avec l'id_event
          setFormData(prev => ({
            ...prev,
            id_event: eventData.id
          }));

          // Récupérer les questions de l'événement
          const questionsData = await eventAPI.getEventQuestions(eventId);
          setQuestions(questionsData);
        } else {
          // Fallback pour les anciens liens sans ID
          const event = searchParams.get('event')
          const date = searchParams.get('date')
          const type = searchParams.get('type')
          const lieu = searchParams.get('lieu')

          setEventInfo({
            id: '',
            titre: event || '',
            date: date || '',
            type: type || '',
            lieu: lieu || '',
            horaire: ''
          });
        }
      } catch (err) {
        console.error('Erreur:', err);
        // Fallback si l'API échoue
        const event = searchParams.get('event')
        const date = searchParams.get('date')
        const type = searchParams.get('type')
        const lieu = searchParams.get('lieu')

        setEventInfo({
          id: '',
          titre: event || '',
          date: date || '',
          type: type || '',
          lieu: lieu || '',
          horaire: ''
        });
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetails();
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleQuestionChange = (questionId: string, value: string) => {
    setQuestionResponses({
      ...questionResponses,
      [questionId]: value
    })
  }

  const nextStep = () => {
    setStep(2)
  }

  const prevStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true) 
    try {
      // Gestion du profil LinkedIn
      let linkedinUrl = formData.profil_linkedin;
      
      if (linkedinUrl && linkedinUrl.trim() !== '') {
        // Si c'est un email, extraire le nom pour créer une URL LinkedIn
        if (linkedinUrl.includes('@')) {
          const username = linkedinUrl.split('@')[0];
          linkedinUrl = `https://linkedin.com/in/${username}`;
        }
        // Si ce n'est pas une URL complète mais juste un nom d'utilisateur
        else if (!linkedinUrl.startsWith('http')) {
          linkedinUrl = `https://linkedin.com/in/${linkedinUrl}`;
        }
      } else {
        // Si vide, mettre une valeur par défaut
        linkedinUrl = "https://linkedin.com";
      }

      const submissionData = {
        annee_experience: formData.annee_experience || "Non spécifié",
        centres_interet: Object.values(questionResponses).filter(response => response !== ''),
        email: formData.email,
        entreprise: formData.entreprise || "Non spécifié",
        nom: formData.nom,
        poste: formData.poste || "Non spécifié",
        prenom: formData.prenom,
        profil_linkedin: linkedinUrl,
        recevoir_mises_a_jour: formData.recevoir_mises_a_jour,
        region: formData.region || "Non spécifié",
        secteur_activite: formData.secteur_activite || "Non spécifié",
        telephone: formData.telephone
      }

      console.log('Données à envoyer:', JSON.stringify(submissionData, null, 2))
      console.log('Event ID:', formData.id_event)
      
      const result = await eventAPI.registerVisitor(submissionData, formData.id_event)
      console.log('Réponse de l\'API:', result)
      
      // Afficher la modale de succès
      setModalMessage(`Inscription réussie pour l'événement : ${eventInfo.titre || 'Non spécifié'}`)
      setShowSuccessModal(true)
      
      // Réinitialiser le formulaire
      resetForm();
      
    } catch (error: any) {
      console.error('Erreur détaillée:', error)
      console.error('Message:', error.message)
      
      // Afficher la modale d'erreur
      setModalMessage('Erreur lors de l\'inscription. Veuillez réessayer.')
      setShowErrorModal(true)
    }finally {
    setIsSubmitting(false) // Désactiver le chargement dans tous les cas
  }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-yellow-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
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
          
          {/* Affichage de l'événement sélectionné */}
          {eventInfo.titre && (
            <div className="mt-6 inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3">
              <p className="text-sm text-gray-600 mb-1">Vous vous inscrivez pour :</p>
              <p className="text-lg font-bold text-gray-900">{eventInfo.titre}</p>
              {eventInfo.date && (
                <p className="text-sm text-gray-600 mt-1">📅 {eventInfo.date}</p>
              )}
              {eventInfo.horaire && (
                <p className="text-sm text-gray-600">⏰ {eventInfo.horaire}</p>
              )}
              {eventInfo.lieu && (
                <p className="text-sm text-gray-600">📍 {eventInfo.lieu}</p>
              )}
              {eventInfo.type && (
                <span className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                  {eventInfo.type}
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
              <span className="text-xs font-medium mt-2 text-center">Questions<br/>événement</span>
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
                    Informations personnelles
                  </h3>
                  <p className="text-sm text-gray-600">
                    Remplissez vos informations de base
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
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
                      Téléphone *
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
                    Entreprise <span className="text-gray-500 font-normal ml-1">(Optionnel)</span>
                  </label>
                  <input
                    type="text"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                    placeholder="Votre entreprise"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Poste
                  </label>
                  <input
                    type="text"
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                    placeholder="Votre poste"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Années d'expérience
                  </label>
                  <select
                    name="annee_experience"
                    value={formData.annee_experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="0-2 ans">0-2 ans</option>
                    <option value="2-5 ans">2-5 ans</option>
                    <option value="5-10 ans">5-10 ans</option>
                    <option value="10+ ans">10+ ans</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Secteur d'activité
                  </label>
                  <input
                    type="text"
                    name="secteur_activite"
                    value={formData.secteur_activite}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                    placeholder="Votre secteur d'activité"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Région
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                    placeholder="Votre région"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profil LinkedIn <span className="text-gray-500 font-normal ml-1">(Optionnel)</span>
                  </label>
                  <input
                    type="url"
                    name="profil_linkedin"
                    value={formData.profil_linkedin}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                    placeholder="https://linkedin.com/in/votrenom"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="recevoir_mises_a_jour"
                    checked={formData.recevoir_mises_a_jour}
                    onChange={(e) => setFormData({...formData, recevoir_mises_a_jour: e.target.checked})}
                    className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Je souhaite recevoir les mises à jour
                  </label>
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
                    Questions de l'événement
                  </h3>
                  <p className="text-sm text-gray-600">
                    Répondez aux questions spécifiques de cet événement
                  </p>
                </div>

                {questions.length > 0 ? (
                  questions.map((question) => (
                    <div key={question.id} className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {question.question_text}
                        {question.is_required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {question.question_type === 'multiple_choice' ? (
                        <select
                          value={questionResponses[question.id] || ''}
                          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                          required={question.is_required}
                        >
                          <option value="">Sélectionnez une option</option>
                          {question.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={questionResponses[question.id] || ''}
                          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
                          placeholder="Votre réponse"
                          required={question.is_required}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune question n'est disponible pour cet événement.</p>
                  </div>
                )}

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
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Chargement...</span>
                      </>
                    ) : (
                      <>
                        <span>Finaliser l'inscription</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Informations supplémentaires */}
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <p className="text-sm text-gray-500">
            ✨ Vos informations sont sécurisées et ne seront pas partagées
          </p>
        </div>
      </div>

      {/* Modale de Succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="p-6 text-center">
              {/* Icône de succès */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inscription Réussie !</h3>
              <p className="text-gray-600 mb-2">{modalMessage}</p>
              <p className="text-sm text-green-600 mb-6">
                ✅ Le formulaire a été réinitialisé pour une nouvelle inscription
              </p>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full"
              >
                Super !
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale d'Erreur */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="p-6 text-center">
              {/* Icône d'erreur */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Oups !</h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    setShowErrorModal(false)
                    // Optionnel : revenir à l'étape 1 pour corriger
                    setStep(1)
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Corriger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes check {
          from {
            stroke-dashoffset: 50;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        .animate-check {
          animation: check 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}