'use client'

import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ChevronRight } from 'lucide-react'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsLoading(true)

        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.1
            }}></div>

            <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                <div className="hidden lg:block text-white space-y-8 px-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                                AuraTwin
                            </h1>
                        </div>
                        <p className="text-2xl font-light text-blue-100">
                            Bienvenue dans l'avenir de la gestion des données
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <ChevronRight className="h-5 w-5 text-blue-300" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Analyse en temps réel</h3>
                                <p className="text-blue-200 text-sm">Visualisez vos données instantanément avec des tableaux de bord interactifs</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <ChevronRight className="h-5 w-5 text-cyan-300" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Optimisation avancée</h3>
                                <p className="text-blue-200 text-sm">Algorithmes intelligents pour optimiser vos plans d'achat</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <ChevronRight className="h-5 w-5 text-purple-300" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Sécurité maximale</h3>
                                <p className="text-blue-200 text-sm">Vos données protégées par les dernières technologies de chiffrement</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12">
                        <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">AuraTwin</h1>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-white">Connexion</h2>
                                <p className="text-blue-200">Accédez à votre espace de travail</p>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-100">
                                        Adresse email
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300 transition-colors" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="vous@exemple.com"
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-100">
                                        Mot de passe
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300 transition-colors" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-cyan-500 border-white/20 rounded focus:ring-cyan-400 focus:ring-2 bg-white/10"
                                        />
                                        <span className="text-sm text-blue-100 group-hover:text-white transition-colors">
                                            Se souvenir de moi
                                        </span>
                                    </label>
                                    <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                        Mot de passe oublié ?
                                    </button>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Connexion en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Se connecter</span>
                                            <ArrowRight className="h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-transparent text-blue-200">ou</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-blue-200">
                                    Vous n'avez pas de compte ?{' '}
                                    <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                        Créer un compte
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-blue-300">
                        <p>© 2024 AuraTwin. Tous droits réservés.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;