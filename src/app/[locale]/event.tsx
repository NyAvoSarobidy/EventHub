
'use client'
import Link from 'next/link';

export default function Event (){
    const images = [
        { src: "/pub/pub-.jpg", alt: "image 1" },
        { src: "/pub/pub-2.jpg", alt: "image 2" },
        { src: "/pub/pub-3.jpg", alt: "image 3" },
        { src: "/pub/pub-4.jpg", alt: "image 4" },
        { src: "/pub/pub-5.jpg", alt: "image 5" },
        { src: "/pub/pub-6.jpg", alt: "image 6" },
        { src: "/pub/pub-7.jpg", alt: "image 7" },
        { src: "/pub/pub-8.jpg", alt: "image 8" },
        { src: "/pub/pub-9.jpg", alt: "image 9" },
        { src: "/pub/pub-10.jpg", alt: "image 10"},
        { src: "/pub/pub-11.jpg", alt: "image 11"}
    ]

    return (
         <section className="py-20 bg-white">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Galerie des <span className="text-yellow-500">Événements</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Découvrez les moments forts de nos événements passés et à venir
                        </p>
                    </div>
                      {/* Filtres */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Tous', 'Salons', 'Conférences', 'Workshops', 'Networking'].map((filter) => (
                <button
                key={filter}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-yellow-500 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 font-medium"
                >
                {filter}
                </button>
            ))}
            </div>
     
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image, index) => (
                <div
                    key={index}
                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100"
                >
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden">
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay au survol */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <button className="bg-white/90 text-gray-900 font-semibold px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white transition-colors">
                            S'inscrire
                        </button>
                        </div>
                    </div>
                    
                    {/* Badge numéro */}
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        {index + 1}
                    </div>
                    </div>
                    
                    {/* Légende */}
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        Événement {index + 1}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {image.alt}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        📅 12/12/2025
                        </span>
                        <span className="text-xs text-yellow-600 font-semibold">
                        En savoir plus →
                        </span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
    )
}