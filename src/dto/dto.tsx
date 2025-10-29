// ==========================================
// DTOs (Data Transfer Objects) - Modèles de données
// ==========================================


export interface EventDTO {
  src: string;              // Chemin de l'image de l'événement
  alt: string;              // Texte alternatif pour l'image
  id_event : Int16Array;    // Identifiant unique de l'événement 
  titre: string;            // Titre de l'événement
  date: string | string[];  // Date(s) de l'événement - string pour 1 jour, string[] pour plusieurs jours
  type: string | string[];          // Type d'événement (Salons, Conférences, Workshops, Foire)
  lieu: string;             // Lieu de l'événement
  horaire: string | string[]; // Horaire(s) - string pour 1 créneau, string[] pour plusieurs créneaux
  description: string;      // Description détaillée de l'événement
  programme: string[];      // Liste des activités du programme
  payement: string | string[];    // Type de paiement (Gratuit ou Payant)
  prix: string;             // Prix (format: "0 MGA" ou "2000 MGA")
  places: number;           // Nombre de places disponibles
}

export interface participantDTO {
  nom: string | string[];             // nom du participant
  description: string;      // Description détaillée du participant
  apropos: string;      // A propos du participant
  logo_src: string;             // Chemin du logo du participant (Optionel)
  siteweb: string;          // Site web du participant (Optionel)
  programme: string[];      // Liste des activités du programme
  id_event : Int16Array;       // Identifiant unique de l'événement 
}


export interface questionDTO {
  id_question : Int16Array;       // Identifiant unique de l'événement
  question: string | string[] ;      // question posée par l'organisateur 
  reponse : string | string[];      // reponse donnée par l'user finaux
  id_event : Int16Array;       // Identifiant unique de l'événement 
}

export interface EventInfoDTO {
  titre: string;            // Titre de l'événement sélectionné
  date: string;             // Date de l'événement
  type: string;             // Type d'événement
  prix: string;             // Prix de l'événement
  payement: string;         // Type de paiement
}

export interface InscriptionFormDTO {
  nom: string;              // Nom de famille du participant
  prenom: string;           // Prénom du participant
  entreprise: string;       // Nom de l'entreprise (optionnel)
  telephone: string;        // Numéro de téléphone/WhatsApp
  email: string;            // Adresse email
  id_event : Int16Array;       // Identifiant unique de l'événement
  id_question : Int16Array;       // Identifiant unique de l'événement
}

export interface InscriptionDataDTO {
  formData: InscriptionFormDTO;
  evenement: EventInfoDTO;
  question : questionDTO;
}

export interface ContactFormDTO {
  nom: string;              // Nom complet de la personne
  email: string;            // Adresse email
  objet: string;            // Objet de la demande
  telephone?: string;       // Numéro de téléphone (optionnel)
  message: string;          // Message détaillé
}









