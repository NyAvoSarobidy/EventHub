import React from 'react'
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                            <span className="text-emerald-50">Event</span>
                            <span className="text-yellow-400">Hub</span>
                        </h1>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
                        <li>
                            <a href="#" className="hover:text-white hover:underline me-4 md:me-6 transition-colors duration-200">Politique de confidentialité</a>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white hover:underline transition-colors duration-200">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-300 sm:text-center">
                    © {new Date().getFullYear()}  <a href="https://www.clearmind-analytics.com/" className="hover:text-white hover:underline transition-colors duration-200">Clearmind-Analytics</a>. Tous droits réservés.
                </span>
            </div>
        </footer>
    )
}