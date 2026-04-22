"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../composant/layout/header";
import Footer from "../../../composant/layout/footer";
import { HiCheckCircle, HiLightBulb, HiCurrencyDollar, HiGlobeAlt, HiChevronDown, HiChevronUp, HiArrowRight } from 'react-icons/hi2';

export default function AvantageFormateur() {
    const [openFaq, setOpenFaq] = useState(null);
    const router = useRouter();

    const handleStartClick = () => {
        router.push('/dash_formation/dash_principale');
    };

    const faqs = [
        {
            question: "Comment puis-je commencer à enseigner sur Formini ?",
            answer: "C'est très simple ! Créez un compte formateur, complétez votre profil avec vos informations professionnelles, et vous pourrez immédiatement accéder à votre tableau de bord pour créer votre première formation."
        },
        {
            question: "Quels types de contenus puis-je proposer ?",
            answer: "Vous pouvez uploader des vidéos (format MP4 recommandé), des documents PDF, des fichiers ressources (ZIP, DOCX, etc.) et créer des quiz interactifs pour valider les acquis de vos élèves."
        },
        {
            question: "Comment sont fixés les prix des formations ?",
            answer: "Vous êtes totalement libre de fixer le prix de vos formations. Vous pouvez également proposer des prix promotionnels pour booster vos ventes lors de périodes spécifiques."
        },
        {
            question: "Comment suis-je payé et à quelle fréquence ?",
            answer: "Les revenus de vos ventes sont comptabilisés en temps réel. Vous pouvez demander un virement vers votre compte bancaire une fois par mois, dès que votre solde atteint le montant minimum requis."
        },
        {
            question: "Ai-je besoin de matériel professionnel pour filmer mes cours ?",
            answer: "Pas forcément ! Aujourd'hui, un bon smartphone et un micro-cravate abordable suffisent pour produire un contenu de qualité. L'important est la qualité et la clarté de votre voix."
        }
    ];

    const advantages = [
        {
            icon: <HiCurrencyDollar className="w-8 h-8 text-[#0C8CE9]" />,
            title: "Revenus attractifs & Passifs",
            description: "Gagnez de l'argent même en dormant. Une fois votre formation en ligne, vous percevez des commissions sur chaque vente, créant ainsi une source de revenus durable."
        },
        {
            icon: <HiGlobeAlt className="w-8 h-8 text-[#0C8CE9]" />,
            title: "Liberté Géographique",
            description: "Travaillez depuis votre salon, un café ou à l'autre bout du monde. Tout ce dont vous avez besoin, c'est de votre expertise et d'une connexion internet."
        },
        {
            icon: <HiLightBulb className="w-8 h-8 text-[#0C8CE9]" />,
            title: "Rayonnement & Autorité",
            description: "Devenir formateur sur Formini renforce votre image d'expert dans votre domaine. C'est une vitrine exceptionnelle pour votre carrière professionnelle."
        },
        {
            icon: <HiCheckCircle className="w-8 h-8 text-[#0C8CE9]" />,
            title: "Gestion Simplifiée",
            description: "Nous nous occupons de toute la partie technique : hébergement des vidéos, gestion des paiements, et support client. Vous vous concentrez uniquement sur l'enseignement."
        },
        {
            icon: <HiGlobeAlt className="w-8 h-8 text-[#0C8CE9]" />,
            title: "Audience de Milliers d'Élèves",
            description: "Accédez instantanément à une base d'apprenants motivés. Nous investissons massivement en marketing pour faire découvrir vos cours."
        },
        {
            icon: <HiLightBulb className="w-8 h-8 text-[#0C8CE9]" />,
            title: "Outils de Création Avancés",
            description: "Utilisez notre plateforme intuitive pour structurer vos cours, ajouter des quiz, des fichiers ressources et suivre la progression de vos élèves en temps réel."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50/50 -z-10" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 -z-10" />
                    
                    <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
                        <span className="inline-block bg-blue-100 text-[#0C8CE9] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                            Expertise & Liberté
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            Transformez votre savoir <br />
                            en une <span className="text-[#0C8CE9]">carrière florissante</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                            Pourquoi garder vos connaissances pour vous ? Enseignez sur Formini et impactez positivement des milliers de vies tout en construisant votre indépendance financière.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button 
                                onClick={handleStartClick}
                                className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                                Devenir formateur
                            </button>
                            <button 
                                onClick={() => document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white border-2 border-gray-100 hover:border-[#0C8CE9] text-gray-600 hover:text-[#0C8CE9] px-8 py-4 rounded-2xl font-bold text-lg transition-all"
                            >
                                Découvrir les avantages
                            </button>
                        </div>
                    </div>
                </section>

                {/* Advantages Grid */}
                <section id="advantages" className="py-24 max-w-7xl mx-auto px-6 sm:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Les avantages de nous rejoindre</h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto">Tout a été conçu pour que votre expérience en tant que formateur soit la plus simple et la plus gratifiante possible.</p>
                        <div className="w-20 h-1.5 bg-[#0C8CE9] mx-auto rounded-full mt-6" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {advantages.map((adv, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl group-hover:bg-[#0C8CE9] transition-colors duration-300">
                                    {React.cloneElement(adv.icon, { className: "w-8 h-8 text-[#0C8CE9] group-hover:text-white" })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{adv.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{adv.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-24 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-gray-900 mb-4">Questions Fréquentes</h2>
                            <p className="text-gray-500 font-medium">Tout ce que vous devez savoir pour bien démarrer votre activité.</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 shadow-sm hover:border-blue-100"
                                >
                                    <button 
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                                    >
                                        <span className="font-bold text-gray-800">{faq.question}</span>
                                        <div className={`p-1.5 rounded-full ${openFaq === index ? 'bg-blue-50 text-[#0C8CE9]' : 'text-gray-400'}`}>
                                            {openFaq === index ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                                        </div>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-gray-900 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0C8CE9]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            
                            <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Votre succès commence ici</h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                                Ne laissez pas votre expertise dormir. Partagez-la avec le monde et commencez à générer des revenus dès aujourd'hui.
                            </p>
                            <button 
                                onClick={handleStartClick}
                                className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl relative z-10 flex items-center gap-3 mx-auto"
                            >
                                Créer mon espace formateur
                                <HiArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
