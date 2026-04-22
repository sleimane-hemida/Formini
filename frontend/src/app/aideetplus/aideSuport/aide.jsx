"use client";
import React, { useState } from "react";
import Header from "../../../composant/layout/header";
import Footer from "../../../composant/layout/footer";
import { 
    HiMagnifyingGlass, 
    HiUserCircle, 
    HiCreditCard, 
    HiTicket, 
    HiAcademicCap, 
    HiBriefcase, 
    HiCpuChip,
    HiEnvelope,
    HiBookOpen,
    HiCheckBadge,
    HiLightBulb
} from 'react-icons/hi2';

export default function AideSupport() {
    const [searchTerm, setSearchTerm] = useState("");

    const categories = [
        { id: "compte", name: "Gestion du Compte", icon: <HiUserCircle className="w-7 h-7" /> },
        { id: "paiement", name: "Paiements & Commandes", icon: <HiCreditCard className="w-7 h-7" /> },
        { id: "abonnements", name: "Abonnements", icon: <HiTicket className="w-7 h-7" /> },
        { id: "formations", name: "Espace Apprenant", icon: <HiAcademicCap className="w-7 h-7" /> },
        { id: "formateurs", name: "Guide du Formateur", icon: <HiBriefcase className="w-7 h-7" /> },
        { id: "technique", name: "Support Technique", icon: <HiCpuChip className="w-7 h-7" /> },
    ];

    const guides = [
        // Compte
        { 
            category: "compte", 
            title: "Créer et configurer votre compte apprenant", 
            steps: [
                "Cliquez sur le bouton 'S'inscrire' en haut à droite de l'écran.",
                "Remplissez le formulaire avec un email valide et un mot de passe sécurisé.",
                "Validez votre inscription via le lien envoyé sur votre boîte mail.",
                "Conseil : Complétez votre profil avec une photo pour une expérience personnalisée."
            ]
        },
        { 
            category: "compte", 
            title: "Passer du mode Apprenant au mode Formateur", 
            steps: [
                "Assurez-vous d'être connecté à votre compte de base.",
                "Cliquez sur 'Devenir formateur' dans le menu de votre profil.",
                "Remplissez les informations professionnelles demandées.",
                "Votre tableau de bord formateur sera activé instantanément."
            ]
        },
        // Paiement
        { 
            category: "paiement", 
            title: "Guide pour l'achat d'une formation", 
            steps: [
                "Choisissez votre formation dans le catalogue.",
                "Cliquez sur le bouton 'Acheter' pour l'ajouter à votre commande.",
                "Sélectionnez votre moyen de paiement local (Bankily, Masrivi, etc.).",
                "Effectuez le transfert vers le numéro indiqué."
            ]
        },
        { 
            category: "paiement", 
            title: "Valider votre paiement par capture d'écran", 
            steps: [
                "Prenez une capture d'écran de la confirmation de transaction.",
                "Rendez-vous dans 'Mes commandes' puis 'Envoyer la preuve'.",
                "Téléchargez votre image et validez l'envoi.",
                "Notre équipe activera votre accès sous 1 à 4 heures."
            ]
        },
        // Abonnements
        { 
            category: "abonnements", 
            title: "Comprendre les plans d'abonnement Formini", 
            steps: [
                "Plan Mensuel : Accès illimité au catalogue pendant 30 jours.",
                "Plan Annuel : La solution la plus économique (2 mois offerts).",
                "Note : L'abonnement est parfait pour explorer plusieurs domaines en même temps."
            ]
        },
        // Espace Apprenant
        { 
            category: "formations", 
            title: "Accéder à vos cours et suivre votre progression", 
            steps: [
                "Vos formations validées se trouvent dans l'onglet 'Mes Cours'.",
                "Le lecteur vidéo mémorise automatiquement votre progression par leçon.",
                "Chaque module validé fait avancer votre barre de complétion.",
                "Conseil : Utilisez les ressources PDF fournies pour approfondir vos connaissances."
            ]
        },
        // Formateurs
        { 
            category: "formateurs", 
            title: "Publier votre première formation", 
            steps: [
                "Structurez votre cours en modules logiques et progressifs.",
                "Uploadez des vidéos de qualité (image stable et son clair).",
                "Ajoutez une description captivante pour attirer les élèves.",
                "Soumettez pour révision : notre équipe valide votre cours sous 48h."
            ]
        },
        // Technique
        { 
            category: "technique", 
            title: "Résoudre les problèmes de lecture vidéo", 
            steps: [
                "Vérifiez que votre connexion internet est suffisamment stable.",
                "Réduisez la qualité de la vidéo (720p ou 480p) si le chargement est lent.",
                "Mettez à jour votre navigateur ou essayez d'ouvrir la page en navigation privée.",
                "Videz le cache de votre navigateur si le blocage persiste."
            ]
        }
    ];

    const filteredGuides = guides.filter(g => 
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.steps.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            <main className="pt-24 pb-20">
                {/* Hero Section Épurée */}
                <section className="bg-[#0F172A] py-20 px-6 text-center relative border-b border-white/5">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="flex items-center justify-center gap-2 text-blue-400/80 mb-4">
                            <HiBookOpen className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-[0.4em] text-[10px]">Documentation & Aide</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">
                            Comment pouvons-nous vous aider ?
                        </h1>
                        
                        <div className="relative max-w-xl mx-auto">
                            <HiMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Rechercher une étape, un guide..."
                                className="w-full py-4 pl-14 pr-6 rounded-xl bg-white/5 border border-white/10 text-white text-base focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <div className="w-[90%] md:w-[85%] mx-auto px-4 py-16">
                    
                    {categories.map((cat) => {
                        const catGuides = filteredGuides.filter(g => g.category === cat.id);
                        if (catGuides.length === 0) return null;

                        return (
                            <section key={cat.id} className="mb-24 last:mb-0">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="text-[#0C8CE9]">
                                        {cat.icon}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{cat.name}</h2>
                                </div>

                                <div className="space-y-12">
                                    {catGuides.map((guide, idx) => (
                                        <div key={idx} className="border-l-2 border-gray-100 pl-8 md:pl-12 transition-all duration-300 hover:border-[#0C8CE9]">
                                            <div className="flex items-center gap-4 mb-8">
                                                <HiCheckBadge className="w-6 h-6 text-[#0C8CE9]" />
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">{guide.title}</h3>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {guide.steps.map((step, i) => (
                                                    <div key={i} className={`flex gap-4 p-5 rounded-xl border transition-all duration-200 ${step.startsWith("Conseil") || step.startsWith("Note") ? 'bg-amber-50/50 border-amber-100 col-span-1 md:col-span-2' : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/30'}`}>
                                                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${step.startsWith("Conseil") || step.startsWith("Note") ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                            {step.startsWith("Conseil") || step.startsWith("Note") ? <HiLightBulb className="w-4 h-4" /> : (i + 1)}
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${step.startsWith("Conseil") || step.startsWith("Note") ? 'font-bold text-amber-900 italic' : 'text-gray-600 font-medium'}`}>
                                                            {step}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {/* Section Contact Footer - Plus discrète */}
                    <section className="mt-40 p-10 md:p-16 bg-gray-50 rounded-[32px] text-center relative border border-gray-100">
                        <HiEnvelope className="w-12 h-12 text-[#0C8CE9]/30 mx-auto mb-6" />
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Besoin d'aide ?</h3>
                        <p className="text-gray-500 mb-10 max-w-xl mx-auto text-base leading-relaxed">
                            Nos experts sont disponibles pour vous guider personnellement si vous rencontrez une difficulté spécifique.
                        </p>
                        <div className="bg-white border border-gray-200 text-[#0C8CE9] px-12 py-4 rounded-xl font-black text-xl inline-block">
                            contact@formini.com
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
