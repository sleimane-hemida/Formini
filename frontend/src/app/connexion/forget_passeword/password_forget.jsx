"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../utils/routes";

export default function PasswordForget() {
    const router = useRouter();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef([]);

    // Gérer le minuteur de renvoi
    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        
        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        // Auto-focus le suivant
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Retour arrière : focus le précédent
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResend = () => {
        if (resendTimer === 0) {
            setResendTimer(60); // 60 secondes d'attente
            console.log("Code renvoyé !");
            // Appeler l'API de renvoi ici
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        if (verificationCode.length !== 6) return;

        setIsLoading(true);
        console.log("Validation du code:", verificationCode);
        
        // Simuler une validation API
        setTimeout(() => {
            setIsLoading(false);
            // router.push("/connexion/reset_password");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex">
            {/* Côté gauche - Formulaire sur fond bleu */}
            <div className="flex-1 bg-gradient-to-br from-[#0C8CE9] to-[#1e40af] flex items-center justify-center p-8 relative overflow-hidden text-white">
                
                {/* Formes décoratives */}
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">Vérification</h2>
                        <p className="text-white/80 text-sm mt-3 leading-relaxed">
                            Nous avons envoyé un code de 6 chiffres à votre adresse e-mail. <br />
                            Veuillez le saisir ci-dessous pour continuer.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 6 cases séparées */}
                        <div className="flex justify-between gap-2 md:gap-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl focus:outline-none focus:border-white focus:bg-white focus:text-[#0C8CE9] transition-all duration-300 placeholder-white/50"
                                    required
                                />
                            ))}
                        </div>

                        {/* Renvoyer le code */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendTimer > 0}
                                className={`text-sm font-medium underline transition-colors ${
                                    resendTimer > 0 ? "text-white/50 cursor-not-allowed" : "text-blue-100 hover:text-white"
                                }`}
                            >
                                {resendTimer > 0 ? `Renvoyer le code (${resendTimer}s)` : "Renvoyer le code"}
                            </button>
                        </div>

                        {/* Bouton Valider */}
                        <button
                            type="submit"
                            disabled={isLoading || code.some(d => d === "")}
                            className="w-full bg-blue-100 hover:bg-blue-200 text-[#0C8CE9] py-3 px-6 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0C8CE9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Validation...
                                </div>
                            ) : (
                                "Valider"
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <button
                                type="button"
                                onClick={() => router.push(ROUTES.LOGIN || "/connexion/login")}
                                className="text-white/70 hover:text-white text-sm transition-colors"
                            >
                                Retour à la connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Côté droit - Branding sur fond blanc */}
            <div className="hidden lg:flex flex-1 bg-white items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-20 right-20 w-32 h-32 bg-[#0C8CE9]/10 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#1e40af]/10 rounded-full"></div>
                
                <div className="text-center text-gray-800 max-w-lg relative z-10">
                    <h1 className="text-5xl font-bold mb-6 tracking-tight text-[#1e40af]">Sécurité</h1>
                    <p className="text-xl leading-relaxed text-gray-500 mb-8 font-medium">
                        Récupérez l'accès à votre compte en toute sécurité avec Formini.
                    </p>
                    
                    <div className="relative group">
                        <img 
                            src="/images/hero/login.svg" 
                            alt="Sécurité" 
                            className="w-full h-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
