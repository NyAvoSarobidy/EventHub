"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Démarre le loader
    setLoading(true);

    // Arrête le loader après maximum 5 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    // Arrête le loader dès que la page est chargée (généralement moins de 5s)
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 500); // Ajustez selon vos besoins

    return () => {
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo EventHub */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="text-gray-900">Event</span>
            <span className="text-amber-600">Hub</span>
          </h1>
        </div>

        {/* Spinner animé */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-amber-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
        </div>

        {/* Texte de chargement */}
        <p className="text-gray-600 font-medium animate-pulse">
          Chargement en cours...
        </p>

        {/* Barre de progression */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-amber-600 rounded-full animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// Exemple d'intégration dans votre layout.js :
/*
"use client";

import PageLoader from '@/components/PageLoader';
import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
*/