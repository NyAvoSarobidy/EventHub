import React from 'react'

export default function Footer() {
    return (
    <footer className=" shadow-sm dark:bg-gray-900">
    <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-emerald-50">Event</span>
              <span className="text-yellow-400">Hub</span>
            </h1>
          </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">À propos</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">politique de confidentialité</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}  <a href="https://www.clearmind-analytics.com/" className="hover:underline">Clearmind-Analytics</a>. Tous droits réservés.
        </span>
    </div>
</footer>



    )
}
