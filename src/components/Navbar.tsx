"use client";

import React from "react";
import { Search, Menu, X } from "lucide-react";
import Link from 'next/link';

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
  <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo et barre de recherche */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          {/* Logo EventHub */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Event</span>
              <span className="text-yellow-400">Hub</span>
            </h1>
          </div>

          {/* Barre de recherche - Cachée sur mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un événement, un lieu, une date..."
                className="block w-full rounded-lg border border-gray-300 pl-11 pr-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 font-normal"
              />
            </div>
          </div>

          {/* Logo Akory ABY!!! - Caché sur mobile */}
          <div className="hidden lg:flex flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Akory</span>
              <span className="text-yellow-400">ABY!!!</span>
            </h1>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Barre de recherche mobile */}
        <div className="md:hidden py-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="block w-full rounded-lg border border-gray-300 pl-11 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 font-normal"
            />
          </div>
        </div>

        {/* Menu principal - Desktop */}
        <div className="hidden md:flex h-14 items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              Accueil
            </Link>
        
     
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              href="#"
              className="px-5 py-2.5 text-sm font-bold text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              + Organiser un événement
            </Link>
          </div>
        </div>

        {/* Menu mobile - Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            <Link 
            href="/" 
            className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
            Accueil
            </Link>
   
            
            <Link
              href="/contacte"
              className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="block w-full px-5 py-3 text-sm font-bold text-center text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              + Organiser un événement
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}