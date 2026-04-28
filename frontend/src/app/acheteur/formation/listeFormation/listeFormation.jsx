"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../composant/layout/header";
import Nav from "../../navigation/nav";
import Footer from "../../../../composant/layout/footer";
import { CardLarge } from "../../../pages_common/card";

// Icônes de filtrage et catégories
import { FiFilter, FiTag, FiStar, FiGift } from "react-icons/fi";
import { FaLaptopCode, FaBullhorn, FaCamera, FaBriefcase, FaPaintBrush } from "react-icons/fa";

export default function ListeFormation() {
    // État pour le filtre actif et la recherche textuelle
    const [activeFilter, setActiveFilter] = useState("tous");
    const [searchQuery, setSearchQuery] = useState("");
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Charger les formations achetées depuis l'API
    useEffect(() => {
        const loadFormations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/auth/login');
                    return;
                }

                const response = await fetch('http://localhost:5000/api/orders/my-formations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors du chargement');
                }

                const data = await response.json();
                
                const resolveImage = (img) => {
                    if (!img) return null;
                    if (img.startsWith('data:') || img.startsWith('http')) return img;
                    if (img.startsWith('/uploads')) return `http://localhost:5000${img}`;
                    if (img.length > 500) return `data:image/png;base64,${img}`;
                    return `http://localhost:5000/uploads/${img}`;
                };

                // Transformer les données de l'API
                const formattedFormations = data.map(order => ({
                    id: order.Formation.id,
                    title: order.Formation.name,
                    category: order.Formation.Category?.name || "Non spécifié",
                    categoryIcon: <FaPaintBrush size={18} className="text-[#B1B5C3]" />,
                    views: order.Formation.nombre_vues || 0,
                    description: order.Formation.description,
                    author: order.Formation.trainer 
                        ? `${order.Formation.trainer.prenom} ${order.Formation.trainer.nom_de_famille}` 
                        : "Formateur inconnu",
                    image: resolveImage(order.Formation.image) || "/images/users/formation.png",
                    avatar: order.Formation.trainer?.avatar 
                        ? (order.Formation.trainer.avatar.startsWith('http') || order.Formation.trainer.avatar.startsWith('data:') 
                            ? order.Formation.trainer.avatar 
                            : `http://localhost:5000${order.Formation.trainer.avatar.replace('/api/avatar/', '/uploads/avatars/')}`) 
                        : null,
                    type: "normal",
                    oldPrice: "",
                    price: `${order.Formation.prix_normal || 0} MRU`,
                    rating: 5
                }));

                setFormations(formattedFormations);
            } catch (error) {
                console.error('Erreur:', error);
                setFormations([]);
            } finally {
                setLoading(false);
            }
        };

        loadFormations();
    }, [router]);

    // Filtrage des données
    const filteredFormations = formations.filter(formation => {
        const matchFilter = activeFilter === "tous" ? true : formation.type === activeFilter;
        const matchSearch = formation.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans">
            <Header searchValue={searchQuery} onSearchChange={setSearchQuery} />
            <div className="pt-24">
                <Nav />
                
                {/* Conteneur principal (Même design que l'accueil et le profil) */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    
                    {/* Le grand wrapper demandé avec border et shadow */}
                    <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-[2rem] p-6 lg:p-10 mb-8 min-h-[70vh]">
                        
                        {/* En-tête du catalogue */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
                            <div className="flex-1 w-full max-w-xl">
                                <h1 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight flex items-center gap-3">
                                    Découvrir les formations
                                </h1>
                                <p className="text-slate-500 mt-2 font-medium">
                                    Trouvez la formation idéale pour booster vos compétences. Filtrer par tarifs ou promotions spéciales.
                                </p>
                            </div>

                            {/* Système de Filtre */}
                            <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-sm w-fit">
                                <button
                                    onClick={() => setActiveFilter("tous")}
                                    className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 flex items-center gap-2 ${
                                        activeFilter === "tous" 
                                        ? "bg-slate-900 text-white shadow-md" 
                                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                                    }`}
                                >
                                    <FiFilter className="w-4 h-4" /> Tous
                                </button>
                                <button
                                    onClick={() => setActiveFilter("gratuit")}
                                    className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 flex items-center gap-2 ${
                                        activeFilter === "gratuit" 
                                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                                    }`}
                                >
                                    <FiGift className="w-4 h-4" /> Gratuit
                                </button>
                                <button
                                    onClick={() => setActiveFilter("promotion")}
                                    className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 flex items-center gap-2 ${
                                        activeFilter === "promotion" 
                                        ? "bg-amber-500 text-white shadow-md shadow-amber-500/20" 
                                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                                    }`}
                                >
                                    <FiStar className="w-4 h-4" /> Promotions
                                </button>
                                <button
                                    onClick={() => setActiveFilter("normal")}
                                    className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 flex items-center gap-2 ${
                                        activeFilter === "normal" 
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                                    }`}
                                >
                                    <FiTag className="w-4 h-4" /> Payant
                                </button>
                            </div>
                        </div>

                        {/* Grille des Cartes */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-16">
                                <div className="animate-spin w-10 h-10 border-4 border-slate-300 border-t-blue-600 rounded-full mb-4"></div>
                                <p className="text-slate-500">Chargement de vos formations...</p>
                            </div>
                        ) : filteredFormations.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                                {filteredFormations.map((formation) => (
                                    <div
                                        key={formation.id}
                                        onClick={() => router.push(`/acheteur/formation/moduleLecon?id=${formation.id}`)}
                                        className="cursor-pointer h-full"
                                    >
                                        <CardLarge
                                            image={formation.image}
                                            category={formation.category}
                                            categoryIcon={formation.categoryIcon}
                                            views={formation.views}
                                            title={formation.title}
                                            description={formation.description}
                                            avatar={formation.avatar}
                                            author={formation.author}
                                            oldPrice={formation.oldPrice}
                                            price={formation.price}
                                            rating={formation.rating}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-16 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                    <FiFilter className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Aucune formation trouvée</h3>
                                <p className="text-slate-500 text-sm">Nous n'avons trouvé aucune formation correspondant à ce filtre.</p>
                                <button 
                                    onClick={() => {
                                        setActiveFilter("tous");
                                        setSearchQuery("");
                                    }}
                                    className="mt-6 font-semibold text-blue-600 hover:text-blue-700 text-sm underline underline-offset-4"
                                >
                                    Réinitialiser les filtres et la recherche
                                </button>
                            </div>
                        )}

                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
