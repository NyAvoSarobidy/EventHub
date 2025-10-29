'use client'
import Link from 'next/link';


export default function Event (){


    const images = [
        { 
            src: "/pub/pub-.jpg", 
            alt: "image 1", 
            titre: "Salon Tech 2025", 
            date: "12/12/2025", 
            type: "Salons",
            lieu: "Paris Expo Porte de Versailles",
            horaire: "9h00 - 18h00",
            description: "Le plus grand salon technologique de l'année. Découvrez les dernières innovations en IA, robotique et technologies vertes.",
            programme: ["Conférences avec experts internationaux", "Démonstrations produits", "Foire avec 500+ exposants", "Ateliers pratiques"],
            payement : "Gratuit",
            prix : "0 MGA",
            places: 0,
            number_stand : 50,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-2.jpg", 
            alt: "image 2", 
            titre: "Conférence IA", 
            date: "15/01/2026", 
            type: "Conférences",
            lieu: "Station F, Paris",
            horaire: "14h00 - 17h00",
            description: "Plongez dans l'univers de l'Intelligence Artificielle avec des experts du domaine. Découvrez les applications concrètes de l'IA.",
            programme: ["Introduction à l'IA moderne", "Cas d'usage en entreprise", "Éthique et IA", "Session Q&A"],
            payement : "Payant",
            prix : "2000 MGA",
            places: 200,
            number_stand : 1,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-3.jpg", 
            alt: "image 3", 
            titre: "Workshop Digital", 
            date: "20/01/2026", 
            type: "Workshops",
            lieu: "Le Wagon, Lyon",
            horaire: "10h00 - 16h00",
            description: "Atelier pratique sur les outils digitaux essentiels pour les entrepreneurs et freelances modernes.",
            programme: ["Marketing digital", "Outils de productivité", "Automation", "Projet pratique"],
            payement : "Payant",
            prix : "2000 MGA",
            places: 50,
            number_stand : 1,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-4.jpg", 
            alt: "image 4", 
            titre: "Foire Event", 
            date: "25/01/2026", 
            type: "Foire",
            lieu: "WeWork, Marseille",
            horaire: "18h00 - 21h00",
            description: "Soirée Foire pour entrepreneurs, startups et investisseurs. Élargissez votre réseau professionnel.",
            programme: ["Speed Foire", "Pitch sessions", "Cocktail dinatoire", "Échanges libres"],
            payement : "Payant",
            prix : "2000 MGA",
            places: 150,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-5.jpg", 
            alt: "image 5", 
            titre: "Innovation Summit", 
            date: "01/02/2026", 
            type: "Salons",
            lieu: "Palais des Congrès, Nice",
            horaire: "9h00 - 19h00",
            description: "Sommet de l'innovation réunissant les acteurs majeurs de la transformation digitale en France.",
            programme: ["Keynotes inspirantes", "Tables rondes", "Expo innovation", "Awards ceremony"],
            payement : "Payant",
            prix : "5000 MGA",
            places: 800,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-6.jpg", 
            alt: "image 6", 
            titre: "Startup Pitch", 
            date: "05/02/2026", 
            type: "Conférences",
            lieu: "La French Tech, Toulouse",
            horaire: "15h00 - 19h00",
            description: "Concours de pitch pour startups avec jury d'investisseurs. Présentez votre projet et gagnez un financement.",
            programme: ["Pitchs de 5 minutes", "Feedback des jurés", "Foire", "Annonce des gagnants"],
            payement : "Payant",
            prix : "5000 MGA",
            places: 100,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-7.jpg", 
            alt: "image 7", 
            titre: "Design Thinking", 
            date: "10/02/2026", 
            type: "Workshops",
            lieu: "Schoolab, Paris",
            horaire: "9h00 - 17h00",
            description: "Formation intensive au Design Thinking. Apprenez à innover et résoudre des problèmes complexes.",
            programme: ["Méthodologie complète", "Exercices pratiques", "Cas réels", "Certification"],
            payement : "Gratuit",
            prix : "0 MGA",
            places: 30,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-8.jpg", 
            alt: "image 8", 
            titre: "Business Meetup", 
            date: "15/02/2026", 
            type: "Foire",
            lieu: "Anticafe, Bordeaux",
            horaire: "17h00 - 20h00",
            description: "Rencontre mensuelle des entrepreneurs bordelais. Échangez sur vos défis et opportunités.",
            programme: ["Présentation des participants", "Groupes de discussion", "Apéro Foire", "Échanges de cartes"],
            payement : "Payant",
            prix : "2000 MGA",
            places: 80,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-9.jpg", 
            alt: "image 9", 
            titre: "Tech Conference", 
            date: "20/02/2026", 
            type: "Conférences",
            lieu: "Euratechnologies, Lille",
            horaire: "13h00 - 18h00",
            description: "Conférence sur les technologies émergentes : blockchain, IoT, cloud computing et cybersécurité.",
            programme: ["4 conférences thématiques", "Démonstrations live", "Panel d'experts", "Foire cocktail"],
            payement : "Payant",
            prix : "5000 MGA",
            places: 250,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-10.jpg", 
            alt: "image 10", 
            titre: "Coding Workshop", 
            date: "25/02/2026", 
            type: "Workshops",
            lieu: "42, Paris",
            horaire: "10h00 - 18h00",
            description: "Journée intensive de code. Apprenez React, Next.js et développez une application complète.",
            programme: ["Setup environnement", "React fundamentals", "Next.js avancé", "Projet final"],
            payement : "Payant",
            prix : "5000 MGA",
            places: 40,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        },
        { 
            src: "/pub/pub-11.jpg", 
            alt: "image 11", 
            titre: "Innovation Day", 
            date: "01/03/2026", 
            type: "Salons",
            lieu: "Lyon Convention Centre",
            horaire: "8h00 - 20h00",
            description: "Journée dédiée à l'innovation dans tous les secteurs. Conférences, ateliers et exposition.",
            programme: ["Plénière d'ouverture", "20+ conférences parallèles", "Expo 100+ stands", "Soirée de clôture"],
            payement : "Gratuit",
            prix : "0 MGA",
            places: 1000,
            number_stand : 0,
            participants : ['BNI','YAS','ORANGE','Airtel']
        }
    ];


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
                        <Link 
                            href={`/inscription?event=${encodeURIComponent(image.titre)}&date=${encodeURIComponent(image.date)}&type=${encodeURIComponent(image.type)}&payement=${encodeURIComponent(image.payement)}&prix=${encodeURIComponent(image.prix)}`}
                            className="bg-white/90 text-gray-900 font-semibold px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white transition-colors"
                        >
                            S'inscrire
                        </Link>
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
                        {image.titre}
                    </h3>
                    <p className="font-semibold text-red-800 text-xs mb-1">
                       {image.payement} : {image.prix}
                    </p>
                    <p className="text-gray-600 text-sm">
                        {image.alt}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        📅 {image.date}
                        </span>
                        <Link
                            href={`/voir_details?titre=${encodeURIComponent(image.titre)}&src=${encodeURIComponent(image.src)}&date=${encodeURIComponent(image.date)}&horaire=${encodeURIComponent(image.horaire)}&type=${encodeURIComponent(image.type)}&lieu=${encodeURIComponent(image.lieu)}&description=${encodeURIComponent(image.description)}&programme=${encodeURIComponent(image.programme.join(','))}&payement=${encodeURIComponent(image.payement)}&prix=${encodeURIComponent(image.prix)}&places=${encodeURIComponent(image.places)}&number_stand=${encodeURIComponent(image.number_stand)}&participants=${encodeURIComponent(image.participants.join(','))}`}
                            className="text-xs text-yellow-600 font-semibold hover:text-yellow-700"
                        >
                            En savoir plus →
                        </Link>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>

            

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
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
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scale-in {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </section>
    )
}