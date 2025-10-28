// ==========================================
// DTOs (Data Transfer Objects) - Modèles de données
// ==========================================


export interface EventDTO {
  src: string;              // Chemin de l'image de l'événement
  alt: string;              // Texte alternatif pour l'image
  titre: string;            // Titre de l'événement
  date: string | string[];  // Date(s) de l'événement - string pour 1 jour, string[] pour plusieurs jours
  type: EventType;          // Type d'événement (Salons, Conférences, Workshops, Foire)
  lieu: string;             // Lieu de l'événement
  horaire: string | string[]; // Horaire(s) - string pour 1 créneau, string[] pour plusieurs créneaux
  description: string;      // Description détaillée de l'événement
  programme: string[];      // Liste des activités du programme
  payement: PaymentType;    // Type de paiement (Gratuit ou Payant)
  prix: string;             // Prix (format: "0 MGA" ou "2000 MGA")
  places: number;           // Nombre de places disponibles
}

/**
 * Types d'événements possibles
 */
export type EventType = 
  | "Salons" 
  | "Conférences" 
  | "Workshops" 
  | "Foire";

/**
 * Types de paiement possibles
 */
export type PaymentType = 
  | "Gratuit" 
  | "Payant";

/**
 * Informations de l'événement sélectionné
 * Utilisé dans inscription/page.tsx
 */
export interface EventInfoDTO {
  titre: string;            // Titre de l'événement sélectionné
  date: string;             // Date de l'événement
  type: string;             // Type d'événement
  prix: string;             // Prix de l'événement
  payement: string;         // Type de paiement
}

/**
 * Formulaire d'inscription à un événement
 * Utilisé dans inscription/page.tsx
 */
export interface InscriptionFormDTO {
  // Étape 1 - Informations personnelles
  nom: string;              // Nom de famille du participant
  prenom: string;           // Prénom du participant
  entreprise: string;       // Nom de l'entreprise (optionnel)
  telephone: string;        // Numéro de téléphone/WhatsApp
  email: string;            // Adresse email
  poste: PosteType;         // Poste/Fonction/Statut
  
  // Étape 2 - Attentes et objectifs
  source: SourceType;       // Comment a-t-il entendu parler de l'événement
  attentes: string;         // Attentes concernant l'événement
  objectifs: string;        // Objectifs en participant
  apprentissage: string;    // Ce qu'il souhaite apprendre/découvrir
  resultats: string;        // Résultats espérés à la fin
}

/**
 * Types de postes/statuts possibles
 */
export type PosteType = 
  | "" 
  | "etudiant" 
  | "enseignant" 
  | "entrepreneur" 
  | "salarie" 
  | "chercheur" 
  | "autre";

/**
 * Sources de découverte de l'événement
 */
export type SourceType = 
  | "" 
  | "reseaux-sociaux" 
  | "email" 
  | "ami" 
  | "affiche" 
  | "site-web" 
  | "autre";

/**
 * Données complètes d'inscription
 * Combinaison du formulaire et des infos de l'événement
 */
export interface InscriptionDataDTO {
  formData: InscriptionFormDTO;
  evenement: EventInfoDTO;
}

/**
 * Formulaire de contact
 * Utilisé dans contact/page.tsx
 */
export interface ContactFormDTO {
  nom: string;              // Nom complet de la personne
  email: string;            // Adresse email
  objet: string;            // Objet de la demande
  telephone?: string;       // Numéro de téléphone (optionnel)
  message: string;          // Message détaillé
}

/**
 * État du formulaire de contact
 */
export interface ContactFormStateDTO {
  isSubmitting: boolean;    // Indique si le formulaire est en cours de soumission
  isSuccess?: boolean;      // Indique si l'envoi a réussi
  error?: string;           // Message d'erreur éventuel
}

/**
 * État du modal d'événement
 * Utilisé dans event.tsx
 */
export interface EventModalStateDTO {
  isOpen: boolean;          // Indique si le modal est ouvert
  selectedEvent: EventDTO | null;  // Événement sélectionné (null si aucun)
}

/**
 * État des étapes du formulaire d'inscription
 */
export interface InscriptionStepStateDTO {
  currentStep: 1 | 2;       // Étape actuelle (1 ou 2)
  totalSteps: 2;            // Nombre total d'étapes
}

// ==========================================
// Fonctions utilitaires pour la validation
// ==========================================

/**
 * Formate la date pour l'affichage
 * Gère à la fois les dates simples et multiples
 */
export const formatEventDate = (date: string | string[]): string => {
  if (Array.isArray(date)) {
    return date.join(' - ');  // "12/12/2025 - 13/12/2025"
  }
  return date;  // "12/12/2025"
};

/**
 * Formate l'horaire pour l'affichage
 * Gère à la fois les horaires simples et multiples
 */
export const formatEventHoraire = (horaire: string | string[]): string => {
  if (Array.isArray(horaire)) {
    // Si tous les horaires sont identiques, n'afficher qu'une fois
    if (horaire.every(h => h === horaire[0])) {
      return horaire[0];
    }
    return horaire.join(' | ');  // "9h00-18h00 | 10h00-19h00"
  }
  return horaire;  // "9h00 - 18h00"
};

/**
 * Vérifie si un événement est sur plusieurs jours
 */
export const isMultiDayEvent = (event: EventDTO): boolean => {
  return Array.isArray(event.date) && event.date.length > 1;
};

/**
 * Valide un email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
};

/**
 * Valide les données d'inscription (étape 1)
 */
export const validateInscriptionStep1 = (data: Partial<InscriptionFormDTO>): boolean => {
  return !!(
    data.nom &&
    data.prenom &&
    data.telephone &&
    data.email &&
    isValidEmail(data.email) &&
    isValidPhone(data.telephone)
  );
};

/**
 * Valide les données d'inscription (étape 2)
 */
export const validateInscriptionStep2 = (data: Partial<InscriptionFormDTO>): boolean => {
  return !!(
    data.source &&
    data.attentes &&
    data.resultats
  );
};

/**
 * Valide le formulaire de contact
 */
export const validateContactForm = (data: Partial<ContactFormDTO>): boolean => {
  return !!(
    data.nom &&
    data.email &&
    data.objet &&
    data.message &&
    isValidEmail(data.email)
  );
};

// ==========================================
// Constantes et valeurs par défaut
// ==========================================

/**
 * Valeurs par défaut pour un formulaire d'inscription vide
 */
export const DEFAULT_INSCRIPTION_FORM: InscriptionFormDTO = {
  nom: '',
  prenom: '',
  entreprise: '',
  telephone: '',
  email: '',
  poste: '',
  source: '',
  attentes: '',
  objectifs: '',
  apprentissage: '',
  resultats: ''
};

/**
 * Valeurs par défaut pour un formulaire de contact vide
 */
export const DEFAULT_CONTACT_FORM: ContactFormDTO = {
  nom: '',
  email: '',
  objet: '',
  telephone: '',
  message: ''
};

/**
 * Valeurs par défaut pour les infos d'événement
 */
export const DEFAULT_EVENT_INFO: EventInfoDTO = {
  titre: '',
  date: '',
  type: '',
  prix: '',
  payement: ''
};

// ==========================================
// Types pour les filtres d'événements
// ==========================================

/**
 * Type de filtre pour la galerie d'événements
 */
export type EventFilterType = 
  | "Tous" 
  | "Salons" 
  | "Conférences" 
  | "Workshops" 
  | "Foire";

/**
 * Interface pour l'état des filtres
 */
export interface EventFilterStateDTO {
  activeFilter: EventFilterType;
  filteredEvents: EventDTO[];
}

// ==========================================
// Exemples d'utilisation
// ==========================================

/**
 * Exemple de création d'un événement sur 1 jour
 */
export const createEventExample = (): EventDTO => ({
  src: "/pub/pub-1.jpg",
  alt: "image 1",
  titre: "Salon Tech 2025",
  date: "12/12/2025",  // Un seul jour
  type: "Salons",
  lieu: "Paris Expo Porte de Versailles",
  horaire: "9h00 - 18h00",  // Un seul créneau
  description: "Le plus grand salon technologique de l'année",
  programme: ["Conférences", "Démonstrations", "Networking"],
  payement: "Gratuit",
  prix: "0 MGA",
  places: 500
});

/**
 * Exemple de création d'un événement sur plusieurs jours
 */
export const createMultiDayEventExample = (): EventDTO => ({
  src: "/pub/pub-1.jpg",
  alt: "image 1",
  titre: "Salon Tech 2025",
  date: ["12/12/2025", "13/12/2025"],  // Plusieurs jours
  type: "Salons",
  lieu: "Paris Expo Porte de Versailles",
  horaire: ["9h00 - 18h00", "9h00 - 18h00"],  // Plusieurs créneaux
  description: "Le plus grand salon technologique de l'année",
  programme: ["Conférences", "Démonstrations", "Networking"],
  payement: "Gratuit",
  prix: "0 MGA",
  places: 500
});

/**
 * Exemple de données d'inscription complètes
 */
export const createInscriptionExample = (): InscriptionDataDTO => ({
  formData: {
    nom: "Dupont",
    prenom: "Jean",
    entreprise: "TechCorp",
    telephone: "+33 6 12 34 56 78",
    email: "jean.dupont@example.com",
    poste: "entrepreneur",
    source: "reseaux-sociaux",
    attentes: "Découvrir les nouvelles technologies",
    objectifs: "Développer mon réseau professionnel",
    apprentissage: "IA et machine learning",
    resultats: "Trouver des partenaires pour mon projet"
  },
  evenement: {
    titre: "Salon Tech 2025",
    date: "12/12/2025",
    type: "Salons",
    prix: "0 MGA",
    payement: "Gratuit"
  }
});