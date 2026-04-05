"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../utils/routes";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError(""); // Effacer l'erreur lors de la saisie
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setSuccess('Connexion réussie !');
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                
                setTimeout(() => {
                    router.push(ROUTES.HOME || '/');
                }, 1500);
            } else {
                setError(result.error || result.message || 'Erreur lors de la connexion');
            }
        } catch (error) {
            setError('Erreur réseau ou serveur.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Côté gauche - Formulaire de connexion sur fond bleu */}
            <div className="flex-1 bg-gradient-to-br from-[#0C8CE9] to-[#1e40af] flex items-center justify-center p-8 relative overflow-hidden">
                
                <div className="w-full max-w-md relative z-10">
                    {/* Titre */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Bon retour !</h2>
                        <p className="text-white/80 text-sm mt-1">Connectez-vous à votre compte</p>
                    </div>

                    {/* Messages d'erreur/succès */}
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg mb-3 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded-lg mb-3 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="exp: example@gmail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100/90 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gray-50 text-gray-800 placeholder-gray-500 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1">Mot de passe</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="exp: MonMotDePasse123!"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-100/90 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gray-50 text-gray-800 placeholder-gray-500 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {showPassword ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Lien mot de passe oublié */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => router.push(ROUTES.FORGOT_PASSWORD || '/forgot-password')}
                                className="text-sm text-white/80 hover:text-white transition-colors underline"
                            >
                                Mot de passe oublié ?
                            </button>
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-100 hover:bg-blue-200 text-[#0C8CE9] py-2.5 px-6 rounded-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0C8CE9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion...
                                </div>
                            ) : (
                                'Se connecter'
                            )}
                        </button>

                        {/* Lien vers inscription */}
                        <div className="text-center mt-4">
                            <span className="text-white text-sm">
                                Pas de compte ?{" "}
                                <button
                                    type="button"
                                    onClick={() => router.push(ROUTES.SIGNUP)}
                                    className="text-white hover:text-gray-200 font-medium underline"
                                >
                                    s'inscrire
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Côté droit - Image et texte sur fond blanc */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 relative overflow-hidden">
                {/* Formes décoratives bleues */}
                <div className="absolute top-0 left-20 w-32 h-32 bg-[#0C8CE9]/20 rounded-full z-20"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#1e40af]/20 rounded-full z-20"></div>
                <div className="absolute bottom-40 left-10 w-16 h-16 bg-[#0C8CE9]/30 rounded-full z-20"></div>

                <div className="text-center text-gray-800 max-w-lg relative z-10 mt-20">
                    {/* Texte en haut */}
                    <h1 className="text-5xl font-bold mb-4 text-gray-800">Bon retour !</h1>
                    <p className="text-xl leading-relaxed text-gray-600 mb-2">
                        Reconnectez-vous à votre espace d'apprentissage
                    </p>
                    
                    {/* Logo de connexion en bas */}
                    <div className="mb-2">
                        <img 
                            src="/images/hero/login.svg" 
                            alt="Logo de connexion" 
                            className="w-140 h-90 mx-auto mb-6 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}