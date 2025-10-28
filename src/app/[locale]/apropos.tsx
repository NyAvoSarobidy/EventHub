
'use client'


export default function Apropos() {

    return (
        <section id="#apropos" className="py-20 bg-white">
              
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête avec animations */}
                <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    <span className="opacity-0 animate-fade-in-up">A propos sur </span>
                    <span className="text-yellow-500 opacity-0 animate-bounce-in">EvenHub</span>
                </h1>
                <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-8 rounded-full opacity-0 animate-scale-in"></div>
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-delayed">
                    La plateforme moderne dédiée à la <span className="text-yellow-500 font-semibold">découverte</span> et à l'<span className="text-yellow-500 font-semibold">inscription</span> d'événements
                </p>
                </div>

               
                <div className="grid lg:grid-cols-2 gap-16 items-start pt-4">
                
                <div className="space-y-8">
                    {/* Mission */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 opacity-0 animate-slide-in-left">
                    <div className="flex items-center mb-6">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4 shadow-lg"></div>
                        <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Connecter les visiteurs aux événements qui les <span className="text-yellow-500 font-semibold">inspirent</span>, qu'il s'agisse de conférences, d'expositions, de salons ou de rencontres culturelles.
                    </p>
                    </div>

                    {/* Fonctionnalités */}
                    <div className="space-y-6 opacity-0 animate-slide-in-left-delayed">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Ce que nous offrons :</h3>
                    
                    {[
                        { icon: "🔍", title: "Exploration Facile", desc: "Recherche intelligente avec filtres par date, lieu et catégorie" },
                        { icon: "🗓️", title: "Détails Complets", desc: "Programme, horaires, intervenants et emplacement détaillés" },
                        { icon: "📝", title: "Inscription Rapide", desc: "Formulaire simple et sécurisé en quelques clics" },
                        { icon: "🎉", title: "Confirmation Instantanée", desc: "Recevez une confirmation et ajoutez à votre calendrier" }
                    ].map((feature, index) => (
                        <div 
                        key={index}
                        className="flex items-start space-x-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200 group opacity-0 animate-stagger-fade-in"
                        style={{ animationDelay: `${1.2 + (index * 0.1)}s` }}
                        >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white text-lg">{feature.icon}</span>
                        </div>  
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

             
                <div className="relative opacity-0 animate-slide-in-right">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 shadow-2xl h-full min-h-[500px] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 opacity-0 animate-rotate-in">
                        <span className="text-4xl">📅</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in-up-delayed">Découvrez des Événements Exceptionnels</h3>
                        <p className="text-lg opacity-90 mb-6 opacity-0 animate-fade-in-up-more-delayed">
                        Rejoignez une communauté passionnée et vivez des expériences uniques
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-in-up-final">
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Conférences</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Expositions</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Salons</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">Culture</span>
                        </div>
                    </div>
                    </div>
                    
                    {/* Éléments décoratifs */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-200 rounded-full opacity-40"></div>
                </div>
                </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-200 rounded-full opacity-40"></div>
            </div>
                <style jsx>{`
                .animate-infinite-wave {
                        animation: infiniteWave 4s linear infinite;
                    }

                    .animate-infinite-wave-slow {
                        animation: infiniteWave 6s linear infinite;
                    }

                    @keyframes infiniteWave {
                        0% {
                        transform: translateX(-1200px);
                        }
                        100% {
                        transform: translateX(0);
                        }
                    }
                .animate-draw-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 3s ease-in-out forwards;
                }

                @keyframes draw {
                    to {
                    stroke-dashoffset: 0;
                    }
                }
                    .typewriter-smooth {
                        display: inline-block;
                        overflow: hidden;
                    }

                    .typewriter-smooth::after {
                        content: '|';
                        animation: blink 0.7s infinite;
                    }

                    .typewriter-smooth {
                        animation: 
                        typewriter 2.5s steps(22) 0.2s forwards,
                        remove-cursor 0.1s 2.7s forwards;
                    }

                    @keyframes typewriter {
                        from { 
                        width: 0;
                        }
                        to { 
                        width: 100%;
                        }
                    }

                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }

                    @keyframes remove-cursor {
                        to {
                        border-right: none;
                        }
                    }

                    /* Coloration pour EvenHub */
                    .typewriter-smooth::before {
                        content: 'Bienvenue sur EvenHub';
                        position: absolute;
                        width: 0;
                        overflow: hidden;
                        color: #f59e0b;
                        animation: 
                        typewriter-colored 2.5s steps(22) 0.2s forwards,
                        remove-cursor 0.1s 2.7s forwards;
                    }

                    @keyframes typewriter-colored {
                        from { width: 0; }
                        to { width: 100%; }
                    }

                    @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    }
                    
                    @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    }
                    
                    @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scaleX(0);
                    }
                    to {
                        opacity: 1;
                        transform: scaleX(1);
                    }
                    }
                    
                    @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    }
                    
                    @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    }
                    
                    @keyframes rotateIn {
                    from {
                        opacity: 0;
                        transform: rotate(-180deg) scale(0.3);
                    }
                    to {
                        opacity: 1;
                        transform: rotate(0) scale(1);
                    }
                    }
                    
                    .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out 0.2s forwards;
                    }
                    
                    .animate-bounce-in {
                    animation: bounceIn 1s ease-out 0.5s forwards;
                    }
                    
                    .animate-scale-in {
                    animation: scaleIn 0.8s ease-out 1s forwards;
                    }
                    
                    .animate-fade-in-delayed {
                    animation: fadeInUp 1s ease-out 1.2s forwards;
                    }
                    
                    .animate-slide-in-left {
                    animation: slideInLeft 1s ease-out 0.8s forwards;
                    }
                    
                    .animate-slide-in-left-delayed {
                    animation: slideInLeft 1s ease-out 1s forwards;
                    }
                    
                    .animate-slide-in-right {
                    animation: slideInRight 1s ease-out 0.8s forwards;
                    }
                    
                    .animate-stagger-fade-in {
                    animation: fadeInUp 0.8s ease-out forwards;
                    }
                    
                    .animate-rotate-in {
                    animation: rotateIn 1s ease-out 1.5s forwards;
                    }
                    
                    .animate-fade-in-up-delayed {
                    animation: fadeInUp 1s ease-out 1.7s forwards;
                    }
                    
                    .animate-fade-in-up-more-delayed {
                    animation: fadeInUp 1s ease-out 1.9s forwards;
                    }
                    
                    .animate-fade-in-up-final {
                    animation: fadeInUp 1s ease-out 2.1s forwards;
                    }
                `}</style>
</section>)

}