"use client";
import React from "react";
import Link from "next/link";
import Header from "../../composant/layout/header";
import Footer from "../../composant/layout/footer";
import { 
    HiAcademicCap, 
    HiBriefcase, 
    HiMagnifyingGlass, 
    HiCreditCard, 
    HiTrophy,
    HiUserPlus,
    HiCloudArrowUp,
    HiCurrencyDollar,
    HiArrowRight
} from "react-icons/hi2";

export default function CommentCaMarche() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-24">
                {/* Hero Section */}
                <section className="py-20 bg-slate-50 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <span className="inline-block bg-blue-100 text-[#0C8CE9] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                            Guide Complet
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            Comment fonctionne <br />
                            la plateforme <span className="text-[#0C8CE9]">Formini ?</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                            Découvrez comment tirer le meilleur parti de notre écosystème, que vous soyez là pour apprendre ou pour partager votre expertise.
                        </p>
                    </div>
                </section>

                {/* Role Switcher Section */}
                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* PARCOURS APPRENANT */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-blue-50 rounded-2xl text-[#0C8CE9]">
                                    <HiAcademicCap className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Je suis un Apprenant</h2>
                            </div>

                            <div className="space-y-8 relative before:absolute before:left-7 before:top-10 before:bottom-10 before:w-0.5 before:bg-gray-100">
                                <StepItem 
                                    number="1"
                                    icon={<HiMagnifyingGlass className="w-6 h-6" />}
                                    title="Explorez le catalogue"
                                    description="Parcourez des centaines de formations dans divers domaines (Tech, Design, Marketing, etc.) et trouvez celle qui correspond à vos objectifs."
                                />
                                <StepItem 
                                    number="2"
                                    icon={<HiCreditCard className="w-6 h-6" />}
                                    title="Achetez ou Abonnez-vous"
                                    description="Choisissez l'achat à l'unité pour une formation spécifique ou optez pour un abonnement afin d'accéder à l'intégralité du catalogue en illimité."
                                />
                                <StepItem 
                                    number="3"
                                    icon={<HiTrophy className="w-6 h-6" />}
                                    title="Apprenez et Certifiez-vous"
                                    description="Suivez les cours à votre rythme. Une fois la formation terminée, téléchargez votre certificat de réussite pour valoriser vos compétences."
                                />
                            </div>

                            <div className="pt-6">
                                <Link 
                                    href="/formations"
                                    className="inline-flex items-center gap-3 bg-[#0C8CE9] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#0A71BC] transition-all shadow-lg shadow-blue-100"
                                >
                                    Explorer le catalogue
                                    <HiArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* PARCOURS FORMATEUR */}
                        <div className="space-y-12 bg-gray-50/50 p-8 md:p-12 rounded-[40px] border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-gray-900 rounded-2xl text-white">
                                    <HiBriefcase className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Je suis un Formateur</h2>
                            </div>

                            <div className="space-y-8 relative before:absolute before:left-7 before:top-10 before:bottom-10 before:w-0.5 before:bg-gray-200">
                                <StepItem 
                                    number="1"
                                    icon={<HiUserPlus className="w-6 h-6" />}
                                    title="Créez votre profil"
                                    description="Inscrivez-vous gratuitement et complétez votre profil professionnel pour présenter votre expertise à la communauté."
                                    isTrainer
                                />
                                <StepItem 
                                    number="2"
                                    icon={<HiCloudArrowUp className="w-6 h-6" />}
                                    title="Publiez vos cours"
                                    description="Utilisez nos outils intuitifs pour uploader vos vidéos, documents et quiz. Notre équipe vous accompagne pour garantir la qualité du contenu."
                                    isTrainer
                                />
                                <StepItem 
                                    number="3"
                                    icon={<HiCurrencyDollar className="w-6 h-6" />}
                                    title="Générez des revenus"
                                    description="Fixez vos prix et percevez des commissions sur chaque vente. Suivez vos performances en temps réel via votre tableau de bord dédié."
                                    isTrainer
                                />
                            </div>

                            <div className="pt-6">
                                <Link 
                                    href="/allFormateur/avantageFormateur"
                                    className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
                                >
                                    Devenir formateur
                                    <HiArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FAQ Quick Link */}
                <section className="py-20 text-center">
                    <div className="max-w-3xl mx-auto px-6 bg-blue-50 rounded-3xl p-10 border border-blue-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Vous avez encore des questions spécifiques ?</h3>
                        <p className="text-gray-500 mb-8">Consultez notre centre d'aide détaillé pour trouver toutes les réponses techniques.</p>
                        <Link 
                            href="/aideetplus/aideSuport"
                            className="text-[#0C8CE9] font-black underline hover:text-[#0A71BC]"
                        >
                            Voir le Centre d'aide
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function StepItem({ number, icon, title, description, isTrainer = false }) {
    return (
        <div className="flex gap-6 relative z-10">
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm border ${isTrainer ? 'bg-white text-gray-900 border-gray-200' : 'bg-[#0C8CE9] text-white border-[#0C8CE9]'}`}>
                {number}
            </div>
            <div className="pt-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className={isTrainer ? 'text-gray-400' : 'text-[#0C8CE9]'}>{icon}</span>
                    <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
}
