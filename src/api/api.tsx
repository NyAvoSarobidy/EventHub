// api.tsx
'use client';

const API_BASE_URL = 'http://192.168.1.226:8000/api/v1';

// Service API pour les événements
export const eventAPI = {
  // Récupérer tous les événements
  getAllEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      throw error;
    }
  },

  // Récupérer un événement par ID
  getEventById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'événement ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les questions d'un événement
  getEventQuestions: async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/questions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des questions pour l'événement ${eventId}:`, error);
      throw error;
    }
  },

  // Dans api.tsx
 // Dans api.tsx
registerVisitor: async (visitorData: any, eventId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/visiteurs/register?event_id=${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(visitorData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur API:', response.status, errorText);
      throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du visiteur:', error);
    throw error;
  }
}
};

export default eventAPI;