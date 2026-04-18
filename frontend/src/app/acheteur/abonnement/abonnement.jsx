"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../../../composant/layout/header";
import Nav from "../navigation/nav";
import Footer from "../../../composant/layout/footer";
import { HiOutlineArrowLeft, HiOutlineSparkles } from "react-icons/hi2";

export default function Abonnement() {
    const router = useRouter();

    return (
        <div className="bg-[#ffffff] min-h-screen text-slate-800 font-sans selection:bg-blue-100 overflow-hidden relative">
            <Header />
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="pt-20 relative z-10 flex flex-col min-h-screen">
                <Nav />

                <main className="flex-grow flex items-center justify-center px-6 py-12">
                    <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        
                        {/* Icon Container */}
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-[#2563eb]/10 rounded-3xl flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0 duration-500">
                                <HiOutlineSparkles className="w-12 h-12 text-[#2563eb]" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563eb]">Prochainement</h2>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium text-[#1e293b] tracking-tight leading-tight">
                                Abonnements & <br /> Formules Premium
                            </h1>
                            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                                <span className="font-bold text-[#1e293b]">Ce service sera bientôt disponible.</span>
                            </p>
                        </div>

                        {/* Back Button */}
                        <div className="pt-4">
                            <button 
                                onClick={() => router.back()}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e293b] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#2563eb] hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all duration-300"
                            >
                                <HiOutlineArrowLeft className="w-4 h-4" />
                                Retour au tableau de bord
                            </button>
                        </div>

                        {/* Progress Indicator */}
                        <div className="pt-8 flex justify-center gap-1.5">
                            <div className="w-8 h-1 bg-[#2563eb] rounded-full"></div>
                            <div className="w-2 h-1 bg-slate-200 rounded-full"></div>
                            <div className="w-2 h-1 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
