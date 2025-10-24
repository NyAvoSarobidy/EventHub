import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction utilitaire pour formater les nombres
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

// Fonction utilitaire pour formater les devises
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Fonction utilitaire pour formater les dates
export function formatDate(date: Date | string, locale: string = 'fr-FR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

// Fonction utilitaire pour créer des slugs
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9 -]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim()
}

// Fonction utilitaire pour tronquer le texte
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Fonction utilitaire pour capitaliser la première lettre
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Fonction utilitaire pour générer des couleurs aléatoires
export function generateRandomColor(): string {
  const colors = [
    'bg-red-100 text-red-800',
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Fonction utilitaire pour débouncer les fonctions
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Fonction utilitaire pour vérifier si on est côté client
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

// Fonction utilitaire pour copier du texte dans le presse-papiers
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient()) return false
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}