"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Home, MessageSquare, HelpCircle, Send, Minimize2, Mail, Search, ArrowRight, Clock, User, BookOpen } from 'lucide-react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    type Message = {
        id: number;
        text: string;
        isBot: boolean;
        timestamp: string;
    };

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [activeTab, setActiveTab] = useState('home');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    // Questions prédéfinies basées sur votre plateforme Auratwin
    const predefinedQuestions = [
        {
            category: 'Digital Twin',
            icon: '🔗',
            questions: [
                'Comment créer un jumeau numérique de ma chaîne d\'approvisionnement ?',
                'Qu\'est-ce qu\'un digital twin et comment peut-il transformer mon entreprise ?',
                'Comment simuler des scénarios avec un jumeau numérique ?',
                'Quels sont les avantages d\'un digital twin pour la production ?'
            ]
        },
        {
            category: 'IA & Prédiction',
            icon: '🤖',
            questions: [
                'Comment l\'IA peut-elle améliorer ma précision de prévision à 95% ?',
                'Quels algorithmes utilisez-vous pour la prédiction de la demande ?',
                'Comment l\'IA peut-elle réduire mes coûts opérationnels de 40% ?',
                'L\'IA peut-elle m\'aider à optimiser ma planification intégrée ?'
            ]
        },
        {
            category: 'Supply Chain',
            icon: '🚛',
            questions: [
                'Comment obtenir une visibilité temps réel sur toute ma chaîne d\'approvisionnement ?',
                'Comment gérer les risques dans ma supply chain avec Auratwin ?',
                'Quels sont les KPI essentiels pour une supply chain optimisée ?',
                'Comment réduire les ruptures de stock avec votre solution ?'
            ]
        },
        {
            category: 'Intégrations',
            icon: '🔌',
            questions: [
                'Comment Auratwin s\'intègre-t-il avec SAP et Oracle ?',
                'Quelles sont les APIs disponibles pour l\'intégration ?',
                'Comment connecter mes systèmes IoT à la plateforme ?',
                'Combien de temps faut-il pour intégrer Auratwin dans mon ERP ?'
            ]
        },
        {
            category: 'Durabilité',
            icon: '🌱',
            questions: [
                'Comment mesurer et réduire mon empreinte carbone avec Auratwin ?',
                'Quels sont les indicateurs de durabilité disponibles ?',
                'Comment optimiser ma chaîne de valeur pour la durabilité ?',
                'Puis-je obtenir des rapports ESG avec votre plateforme ?'
            ]
        },
        {
            category: 'Industries',
            icon: '🏭',
            questions: [
                'Comment Auratwin peut-il optimiser mon secteur retail ?',
                'Quels sont les cas d\'usage pour l\'industrie FMCG ?',
                'Comment améliorer ma logistique avec votre solution ?',
                'Avez-vous des références clients dans mon secteur ?'
            ]
        }
    ];
    // Articles populaires du blog
    const popularArticles = [
        {
            title: "Comment les Digital Twins révolutionnent la Supply Chain",
            description: "Découvrez comment créer un jumeau numérique de votre chaîne d'approvisionnement pour une visibilité temps réel et une optimisation continue.",
            category: "Digital Twin",
            readTime: "5 min",
            link: "/blog/digital-twins-supply-chain"
        },
        {
            title: "IA et Prédiction : Atteindre 95% de précision dans vos prévisions",
            description: "Les algorithmes de machine learning avancés d'Auratwin pour transformer vos prévisions de demande et optimiser votre planification.",
            category: "IA & Prédiction",
            readTime: "7 min",
            link: "/blog/ia-prediction-precision"
        },
        {
            title: "Intégration SAP et Oracle : Guide complet avec Auratwin",
            description: "Étapes détaillées pour intégrer Auratwin avec vos systèmes SAP et Oracle existants. APIs, connecteurs et bonnes pratiques.",
            category: "Intégrations",
            readTime: "6 min",
            link: "/blog/integration-sap-oracle"
        },
        {
            title: "Réduire les coûts opérationnels de 40% avec l'optimisation IA",
            description: "Cas d'étude détaillé montrant comment nos clients ont réduit leurs coûts opérationnels grâce à l'IA et aux jumeaux numériques.",
            category: "ROI & Performance",
            readTime: "8 min",
            link: "/blog/reduction-couts-operationnels"
        },
        {
            title: "Sustainability Modeling : Mesurer et réduire votre empreinte carbone",
            description: "Comment utiliser Auratwin pour tracker, analyser et optimiser l'impact environnemental de votre chaîne de valeur.",
            category: "Durabilité",
            readTime: "6 min",
            link: "/blog/sustainability-modeling"
        },
        {
            title: "Retail 4.0 : Optimiser inventaire et satisfaction client",
            description: "Solutions spécifiques pour le secteur retail : gestion intelligente des stocks, prévision de demande et amélioration de l'expérience client.",
            category: "Retail",
            readTime: "5 min",
            link: "/blog/retail-4-0-optimisation"
        },
        {
            title: "FMCG : Accélérer le time-to-market avec les jumeaux numériques",
            description: "Comment les entreprises FMCG utilisent Auratwin pour optimiser leur production, réduire le gaspillage et accélérer la mise sur le marché.",
            category: "FMCG",
            readTime: "7 min",
            link: "/blog/fmcg-time-to-market"
        },
        {
            title: "Logistique intelligente : Optimisation routes et performances",
            description: "Transformation de la logistique avec l'IA : optimisation des routes, amélioration des performances de livraison et réduction des coûts.",
            category: "Logistique",
            readTime: "6 min",
            link: "/blog/logistique-intelligente"
        },
        {
            title: "Sécurité Enterprise : Protection niveau bancaire pour vos données",
            description: "Architecture sécurisée d'Auratwin : conformité réglementaire, protection des données et collaboration sécurisée.",
            category: "Sécurité",
            readTime: "5 min",
            link: "/blog/securite-enterprise"
        },
        {
            title: "ROI et KPIs : Mesurer le succès de votre transformation digitale",
            description: "Indicateurs clés et métriques pour évaluer l'impact de votre transformation digitale avec Auratwin.",
            category: "ROI & Performance",
            readTime: "8 min",
            link: "/blog/roi-kpis-transformation"
        }
    ];

    // Vérifier si l'email existe dans localStorage au chargement
    useEffect(() => {
        const savedEmail = localStorage.getItem('AuraTwin_user_email');
        const savedName = localStorage.getItem('AuraTwin_user_name');

        if (savedEmail) {
            setUserEmail(savedEmail);
            setUserName(savedName || '');
            setShowEmailForm(false);
        }
    }, []);

    const handleEmailSubmit = () => {
        if (userEmail.trim()) {
            // Stocker l'email et le nom dans localStorage
            localStorage.setItem('AuraTwin_user_email', userEmail);
            if (userName.trim()) {
                localStorage.setItem('AuraTwin_user_name', userName);
            }

            setShowEmailForm(false);
            setActiveTab('message');

            // Initialiser le chat avec un message de bienvenue
            const welcomeMessage = {
                id: 1,
                text: `Bonjour${userName ? ` ${userName}` : ''} ! Je suis votre assistant AuraTwin. Je peux vous aider sur nos articles de blog et répondre à vos questions sur l\'IA, la gestion client, et l\'optimisation de votre business. Comment puis-je vous aider ?`,
                isBot: true,
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([welcomeMessage]);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handlePredefinedQuestion = (question: string) => {
        // Ajouter la question de l'utilisateur
        const userMessage = {
            id: messages.length + 1,
            text: question,
            isBot: false,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setActiveTab('message');

        // Simulation de réponse contextuelle basée sur les articles
        setTimeout(() => {
            let botResponse = '';

            if (question.toLowerCase().includes('digital twin') || question.toLowerCase().includes('jumeau numérique')) {
                botResponse = `Excellente question sur les jumeaux numériques ! Auratwin crée des répliques virtuelles de vos opérations pour la simulation et l'optimisation. Avec notre plateforme, vous pouvez tester des scénarios, évaluer les risques et optimiser vos processus avant leur mise en œuvre. Notre module "Supply Chain Twin" offre une visibilité end-to-end avec monitoring temps réel.`;
            }

            // Réponses pour IA et prédiction
            else if (question.toLowerCase().includes('ia') || question.toLowerCase().includes('prédiction') || question.toLowerCase().includes('95%')) {
                botResponse = `D'après nos résultats, notre IA atteint 95% de précision dans les prévisions ! Nos algorithmes de machine learning avancés analysent vos données ERP, CRM et IoT pour la prédiction de demande et l'optimisation. Le module "Integrated Planning" combine sensing de demande, planification d'approvisionnement et intégration financière pour des décisions optimales.`;
            }

            // Réponses pour Supply Chain
            else if (question.toLowerCase().includes('supply chain') || question.toLowerCase().includes('chaîne') || question.toLowerCase().includes('visibilité')) {
                botResponse = `Notre solution offre une visibilité temps réel sur toute votre chaîne d'approvisionnement ! Avec des alertes instantanées, des tableaux de bord complets et notre module "Supply Chain Twin", vous pouvez surveiller, évaluer les risques et planifier des scénarios. Nos clients obtiennent une réduction de 40% des coûts opérationnels.`;
            }

            // Réponses pour Intégrations
            else if (question.toLowerCase().includes('intégration') || question.toLowerCase().includes('sap') || question.toLowerCase().includes('oracle') || question.toLowerCase().includes('iot')) {
                botResponse = `Auratwin s'intègre parfaitement avec SAP, Oracle, dispositifs IoT et vos systèmes d'entreprise existants ! Notre architecture cloud-native permet une intégration transparente via APIs robustes. Nous proposons des connecteurs prêts à l'emploi et un accompagnement personnalisé pour une mise en œuvre rapide et sécurisée.`;
            }

            // Réponses pour Durabilité
            else if (question.toLowerCase().includes('durabilité') || question.toLowerCase().includes('carbone') || question.toLowerCase().includes('esg')) {
                botResponse = `Notre module "Sustainability Modeling" track et optimise l'impact carbone sur toute votre chaîne de valeur ! Vous pouvez mesurer, analyser et réduire votre empreinte environnementale tout en générant des rapports ESG conformes. C'est l'avenir des opérations responsables et rentables.`;
            }

            // Réponses pour Industries
            else if (question.toLowerCase().includes('retail') || question.toLowerCase().includes('fmcg') || question.toLowerCase().includes('logistique')) {
                botResponse = `Auratwin est optimisé pour votre secteur ! Pour le retail : optimisation inventaire et prévision demande. Pour FMCG : planification production et réduction gaspillage. Pour la logistique : optimisation routes et amélioration performances livraison. Nos solutions sont adaptées aux besoins spécifiques de chaque industrie.`;
            }

            // Réponses pour Sécurité
            else if (question.toLowerCase().includes('sécurité') || question.toLowerCase().includes('conformité')) {
                botResponse = `La sécurité est notre priorité ! Auratwin offre une sécurité niveau bancaire avec conformité aux standards industriels et réglementations. Notre architecture cloud sécurisée protège vos données sensibles tout en permettant une collaboration temps réel sécurisée entre vos équipes.`;
            }

            // Réponses pour Démo/Pricing
            else if (question.toLowerCase().includes('démo') || question.toLowerCase().includes('prix') || question.toLowerCase().includes('coût')) {
                botResponse = `Je serais ravi de vous organiser une démo personnalisée ! Nos experts peuvent vous montrer comment Auratwin peut transformer vos opérations avec des cas d'usage spécifiques à votre industrie. Contactez notre équipe commerciale pour une démonstration et un devis personnalisé.`;
            }

            // Réponse générale
            else {
                botResponse = `Merci pour votre question${userName ? ` ${userName}` : ''} ! Auratwin est votre partenaire pour la transformation digitale avec notre plateforme cloud-native alimentée par l'IA. Je vais vous mettre en relation avec notre équipe d'experts qui pourra vous donner des conseils personnalisés. En attendant, n'hésitez pas à consulter nos modules ou à me poser d'autres questions !`;
            }

            const botMessage = {
                id: messages.length + 2,
                text: botResponse,
                isBot: true,
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1500);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputMessage,
                isBot: false,
                timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            };

            setMessages([...messages, newMessage]);
            setInputMessage('');

            // Simulation de réponse du bot avec analyse du contenu
            setTimeout(() => {
                let botResponse = '';
                const message = inputMessage.toLowerCase();

                if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
                    botResponse = `Pour connaître nos tarifs personnalisés selon votre secteur d'activité, notre équipe commerciale peut vous proposer un devis adapté. Nous avons des solutions pour tous les budgets, des micro-entreprises aux grandes chaînes. Souhaitez-vous que je vous mette en relation avec un conseiller ?`;
                } else if (message.includes('démo') || message.includes('essai') || message.includes('test')) {
                    botResponse = `Parfait ! Nous proposons une démonstration gratuite personnalisée selon votre secteur d'activité. Vous pourrez voir concrètement comment AuraTwin s'adapte à vos besoins spécifiques. Quel est votre domaine d'activité pour que je prépare la démo la plus pertinente ?`;
                } else {
                    botResponse = `Merci pour votre message${userName ? ` ${userName}` : ''} ! J'analyse votre demande en me basant sur notre base de connaissances d'articles et de cas clients. Notre équipe va vous répondre dans les plus brefs délais avec des recommandations personnalisées. En attendant, consultez nos questions fréquentes ou nos articles de blog !`;
                }

                const botMessage = {
                    id: messages.length + 2,
                    text: botResponse,
                    isBot: true,
                    timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botMessage]);
            }, 1000);
        }
    };

    interface KeyPressEvent extends React.KeyboardEvent<HTMLTextAreaElement> { }

    const handleKeyPress = (e: KeyPressEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleOpenChat = () => {
        setIsOpen(true);
        if (!userEmail) {
            setShowEmailForm(true);
            setActiveTab('home');
        }
    };

    const clearUserData = () => {
        localStorage.removeItem('AuraTwin_user_email');
        localStorage.removeItem('AuraTwin_user_name');
        setUserEmail('');
        setUserName('');
        setShowEmailForm(true);
        setMessages([]);
        setActiveTab('home');
    };

    // Filtrer les questions selon la recherche
    const filteredCategories = predefinedQuestions.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
            q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    const filteredArticles = popularArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleOpenChat}
                        className="bg-blue-800 cursor-pointer text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative"
                    >
                        <MessageCircle size={24} />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            1
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.3 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: isMinimized ? 0.8 : 1,
                        }}
                        exit={{ opacity: 0, y: 100, scale: 0.3 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                        style={{
                            width: '400px',
                            height: isMinimized ? '70px' : '580px',
                            maxHeight: isMinimized ? '70px' : '90vh' // Ajout d'une hauteur maximale
                        }}
                    >
                        {/* Header - Hauteur fixe */}
                        <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center space-x-3">
                                {/* Logo AuraTwin */}
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-sm">At</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Assistant Blog AuraTwin</h3>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span className="text-xs opacity-90">Spécialiste IA & Business</span>
                                    </div>
                                </div>
                            </div>

                            {/* Assistants avatars */}
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-xs">
                                            <Mail size={12} />
                                        </span>
                                    </div>
                                    <div className="w-6 h-6 bg-pink-400 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-xs">
                                            <User size={12} />
                                        </span>
                                    </div>
                                    <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-xs">
                                            <Clock size={12} />
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-1 ml-2">
                                    <button
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="p-1 cursor-pointer hover:bg-white/20 rounded transition-colors"
                                    >
                                        <Minimize2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 cursor-pointer hover:bg-white/20 rounded transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat Content - Zone principale flexible */}
                        {!isMinimized && (
                            <>
                                {/* Formulaire Email */}
                                {showEmailForm && (
                                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 min-h-0">
                                        <div className="w-full max-w-sm">
                                            <div className="text-center mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-800 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                                                    <MessageCircle className="w-8 h-8" />
                                                </div>
                                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                    Bonjour !
                                                </h2>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Je suis votre assistant spécialisé en IA et optimisation business. Démarrons notre conversation !
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <input
                                                        type="email"
                                                        value={userEmail}
                                                        onChange={(e) => setUserEmail(e.target.value)}
                                                        placeholder="Votre email professionnel *"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-800 dark:bg-gray-700 dark:text-white"
                                                    />
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        placeholder="Votre prénom (optionnel)"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-800 dark:bg-gray-700 dark:text-white"
                                                    />
                                                </div>

                                                <button
                                                    onClick={handleEmailSubmit}
                                                    className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl p-3 hover:shadow-lg transition-all duration-200 font-medium"
                                                >
                                                    Commencer l'assistance IA
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!showEmailForm && (
                                    <div className="flex-1 flex flex-col min-h-0">
                                        {/* Zone de contenu scrollable */}
                                        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 min-h-0">
                                            {activeTab === 'home' && (
                                                <div className="p-4">
                                                    <div className="text-center mb-6">
                                                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                            Salut{userName ? ` ${userName}` : ''} ! 👋
                                                        </h2>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Comment puis-je vous aider avec votre business aujourd'hui ?
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={() => setActiveTab('help')}
                                                            className="w-full cursor-pointer bg-gradient-to-r from-blue-800 to-indigo-600 text-white rounded-xl p-4 text-left hover:shadow-lg transition-all duration-200"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                                    <HelpCircle className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold">Questions par thématique</h3>
                                                                    <p className="text-sm opacity-90">Explorez nos conseils par secteur d'activité</p>
                                                                </div>
                                                            </div>
                                                        </button>

                                                        <button
                                                            onClick={() => setActiveTab('message')}
                                                            className="w-full cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                                                    <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-800 dark:text-white">Poser une question libre</h3>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Décrivez votre problématique spécifique</p>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </div>

                                                    {/* Articles populaires rapides */}
                                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                                                            <BookOpen className="w-4 h-4 mr-2" />
                                                            Articles tendance
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {popularArticles.slice(0, 3).map((article, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handlePredefinedQuestion(`Parlez-moi de l'article: ${article}`)}
                                                                    className="w-full text-left p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                                >
                                                                    • {article.title}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Option pour changer d'email */}
                                                    <button
                                                        onClick={clearUserData}
                                                        className="mt-6 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 w-full text-center"
                                                    >
                                                        Changer d'email ({userEmail})
                                                    </button>
                                                </div>
                                            )}

                                            {activeTab === 'help' && (
                                                <div className="p-4">
                                                    <div className="mb-4">
                                                        <div className="relative">
                                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                            <input
                                                                type="text"
                                                                placeholder="Rechercher une thématique..."
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-800 dark:bg-gray-700 dark:text-white"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {filteredCategories.map((category, categoryIndex) => (
                                                            <div key={categoryIndex}>
                                                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center text-sm">
                                                                    <span className="text-lg mr-2">{category.icon}</span>
                                                                    {category.category}
                                                                </h4>
                                                                <div className="space-y-1 ml-6">
                                                                    {category.questions.map((question, questionIndex) => (
                                                                        <button
                                                                            key={questionIndex}
                                                                            onClick={() => handlePredefinedQuestion(question)}
                                                                            className="w-full cursor-pointer text-left p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
                                                                        >
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                                                    {question}
                                                                                </p>
                                                                                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-all" />
                                                                            </div>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {filteredCategories.length === 0 && (
                                                            <div className="text-center py-8">
                                                                <div className="text-gray-400 mb-2">
                                                                    <Search className="w-8 h-8 mx-auto" />
                                                                </div>
                                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                                    Aucune question trouvée
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                        <button
                                                            onClick={() => setActiveTab('message')}
                                                            className="w-full bg-blue-800 cursor-pointer text-white rounded-xl p-3 hover:shadow-lg transition-all duration-200"
                                                        >
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <MessageSquare className="w-4 h-4" />
                                                                <span className="text-sm font-medium">Question personnalisée</span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}{activeTab === 'message' && (
                                                <div className="h-full flex flex-col">
                                                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                                        {messages.map((message) => (
                                                            <motion.div
                                                                key={message.id}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                                            >
                                                                <div className={`max-w-xs px-4 py-2 rounded-2xl ${message.isBot
                                                                    ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
                                                                    : 'bg-blue-800 text-white'
                                                                    }`}>
                                                                    <p className="text-sm">{message.text}</p>
                                                                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                        <div ref={messagesEndRef} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Zone d'input pour l'onglet message */}
                                        {activeTab === 'message' && (
                                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
                                                <div className="flex items-center space-x-2">
                                                    <textarea
                                                        value={inputMessage}
                                                        onChange={(e) => setInputMessage(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        placeholder="Tapez votre message..."
                                                        className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 dark:bg-gray-800 dark:text-white"
                                                        rows={1}
                                                    />
                                                    <button
                                                        onClick={handleSendMessage}
                                                        disabled={!inputMessage.trim()}
                                                        className="bg-gradient-to-r from-blue-800 to-indigo-600 cursor-pointer text-white p-2 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Send size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer Navigation */}
                                        <div className="bg-gray-100 dark:bg-gray-800 p-2 flex-shrink-0" style={{ minHeight: '60px' }}>
                                            <div className="flex justify-around">
                                                <button
                                                    onClick={() => setActiveTab('home')}
                                                    className={`flex flex-col cursor-pointer items-center p-2 rounded-lg transition-colors ${activeTab === 'home'
                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <Home size={18} />
                                                    <span className="text-xs mt-1">Accueil</span>
                                                </button>

                                                <button
                                                    onClick={() => setActiveTab('message')}
                                                    className={`flex flex-col cursor-pointer items-center p-2 rounded-lg transition-colors ${activeTab === 'message'
                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <MessageSquare size={18} />
                                                    <span className="text-xs mt-1">Messages</span>
                                                </button>

                                                <button
                                                    onClick={() => setActiveTab('help')}
                                                    className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-colors ${activeTab === 'help'
                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <HelpCircle size={18} />
                                                    <span className="text-xs mt-1">Aide</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatWidget; 