"use client";
import { useState, useRef, useEffect } from "react";
import Card from "../pages_common/card";
import Header from "../../composant/layout/header";
import Footer from "../../composant/layout/footer";
import Sidebar from "../../composant/layout/sidebar";
import CategorieBar from "../../composant/layout/categorie";
import { FaPaintBrush, FaCode, FaChartBar, FaCamera, FaMusic, FaGraduationCap, FaFilter } from "react-icons/fa";

export default function Catalogue() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("foryou");
    const [scrolled, setScrolled] = useState(false);
    const [filters, setFilters] = useState({
        categories: [],
        subcategories: [],
        languages: [],
        dateRange: null,
        hasPromotion: false,
        isFree: false,
        isNew: false,
        priceRange: [0, 2000]
    });

    // Gestion du scroll pour la barre de catégories (même logique que le header)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Données d'exemple des formations
    const formations = [
        {
            id: 1,
            image: "/images/users/formation.png",
            category: "Développement Web",
            categoryId: "web",
            subcategoryId: "frontend",
            categoryIcon: <FaCode size={16} className="text-[#B1B5C3]" />,
            duration: "4 Mois",
            title: "Formation React & Next.js Complète",
            description: "Apprenez React et Next.js de zéro jusqu'au niveau avancé avec des projets réels",
            avatar: "/images/users/profile.jpg",
            author: "Sarah Martin",
            oldPrice: "1200 MRU",
            price: "900 MRU",
            priceNumeric: 900,
            language: "fr",
            hasPromotion: true,
            isFree: false,
            isNew: false,
            dateAdded: "2026-03-15"
        },
        {
            id: 2,
            image: "/images/users/formation.png",
            category: "Design",
            categoryId: "design",
            subcategoryId: "ui-ux",
            categoryIcon: <FaPaintBrush size={16} className="text-[#B1B5C3]" />,
            duration: "3 Mois",
            title: "UI/UX Design Masterclass",
            description: "Maîtrisez les principes du design et créez des interfaces utilisateur modernes",
            avatar: "/images/users/profile.jpg",
            author: "Ahmed Benali",
            oldPrice: "800 MRU",
            price: "600 MRU",
            priceNumeric: 600,
            language: "fr",
            hasPromotion: true,
            isFree: false,
            isNew: true,
            dateAdded: "2026-03-25"
        },
        {
            id: 3,
            image: "/images/users/formation.png",
            category: "Marketing",
            categoryId: "marketing",
            subcategoryId: "digital",
            categoryIcon: <FaChartBar size={16} className="text-[#B1B5C3]" />,
            duration: "2 Mois",
            title: "Marketing Digital & Réseaux Sociaux",
            description: "Stratégies complètes pour réussir votre marketing en ligne et sur les réseaux",
            avatar: "/images/users/profile.jpg",
            author: "Fatima Zahra",
            oldPrice: "600 MRU",
            price: "450 MRU",
            priceNumeric: 450,
            language: "fr",
            hasPromotion: true,
            isFree: false,
            isNew: false,
            dateAdded: "2026-02-10"
        },
        {
            id: 4,
            image: "/images/users/formation.png",
            category: "Photographie",
            categoryId: "photography",
            subcategoryId: "portrait",
            categoryIcon: <FaCamera size={16} className="text-[#B1B5C3]" />,
            duration: "6 Semaines",
            title: "Photographie Professionnelle",
            description: "Techniques avancées de photographie pour devenir un photographe professionnel",
            avatar: "/images/users/profile.jpg",
            author: "Mohamed Alami",
            oldPrice: "500 MRU",
            price: "350 MRU",
            priceNumeric: 350,
            language: "ar",
            hasPromotion: true,
            isFree: false,
            isNew: false,
            dateAdded: "2026-01-20"
        },
        {
            id: 5,
            image: "/images/users/formation.png",
            category: "Musique",
            categoryId: "music",
            subcategoryId: "production",
            categoryIcon: <FaMusic size={16} className="text-[#B1B5C3]" />,
            duration: "8 Semaines",
            title: "Production Musicale & Mix",
            description: "Apprenez à composer, enregistrer et mixer votre propre musique",
            avatar: "/images/users/profile.jpg",
            author: "Karim Elmansar",
            oldPrice: "700 MRU",
            price: "550 MRU",
            priceNumeric: 550,
            language: "en",
            hasPromotion: true,
            isFree: false,
            isNew: false,
            dateAdded: "2026-03-01"
        },
        {
            id: 6,
            image: "/images/users/formation.png",
            category: "Business",
            categoryId: "business",
            subcategoryId: "entrepreneurship",
            categoryIcon: <FaGraduationCap size={16} className="text-[#B1B5C3]" />,
            duration: "5 Mois",
            title: "Entrepreneuriat & Création d'Entreprise",
            description: "Guide complet pour créer et développer votre propre entreprise",
            avatar: "/images/users/profile.jpg",
            author: "Laila Bennani",
            oldPrice: "1000 MRU",
            price: "750 MRU",
            priceNumeric: 750,
            language: "fr",
            hasPromotion: true,
            isFree: false,
            isNew: true,
            dateAdded: "2026-03-20"
        },
        {
            id: 7,
            image: "/images/users/formation.png",
            category: "Développement Web",
            categoryId: "web",
            subcategoryId: "backend",
            categoryIcon: <FaCode size={16} className="text-[#B1B5C3]" />,
            duration: "3 Mois",
            title: "Python & Django pour Débutants",
            description: "Maîtrisez Python et créez des applications web avec Django",
            avatar: "/images/users/profile.jpg",
            author: "Youssef Taha",
            oldPrice: "",
            price: "0 MRU",
            priceNumeric: 0,
            language: "en",
            hasPromotion: false,
            isFree: true,
            isNew: true,
            dateAdded: "2026-03-28"
        },
        {
            id: 8,
            image: "/images/users/formation.png",
            category: "Design",
            categoryId: "design",
            subcategoryId: "graphic",
            categoryIcon: <FaPaintBrush size={16} className="text-[#B1B5C3]" />,
            duration: "4 Semaines",
            title: "Illustrator & Photoshop Avancé",
            description: "Devenez expert en design graphique avec les outils Adobe",
            avatar: "/images/users/profile.jpg",
            author: "Nadia Senhaji",
            oldPrice: "600 MRU",
            price: "400 MRU",
            priceNumeric: 400,
            language: "ar",
            hasPromotion: true,
            isFree: false,
            isNew: false,
            dateAdded: "2026-02-28"
        }
    ];

    // Filtrage des formations basé sur la recherche et les filtres
    const filteredFormations = formations.filter(formation => {
        // Recherche par terme
        const matchesSearch = 
            formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtre par catégories (barre horizontale)
        const matchesCategory = (() => {
            // Si "Pour vous" est sélectionné, on affiche toutes les formations
            if (selectedCategory === "foryou") {
                return true;
            }
            // Sinon, on filtre selon la catégorie sélectionnée dans la barre horizontale
            // Mapping des catégories de la barre vers les IDs des formations
            const categoryMapping = {
                "devtech": ["web"],
                "design": ["design"],
                "business": ["business"],
                "marketing": ["marketing"],
                "finance": ["finance"],
                "langues": ["languages"],
                "devperso": ["development"],
                "education": ["education"],
                "sante": ["health"],
                "pratique": ["practical"],
                "droit": ["law"],
                "media": ["media"]
            };
            
            const mappedCategories = categoryMapping[selectedCategory] || [];
            return mappedCategories.includes(formation.categoryId);
        })();

        // Filtre par sous-catégories
        const matchesSubcategory = filters.subcategories.length === 0 || 
            filters.subcategories.includes(formation.subcategoryId);

        // Filtre par langues
        const matchesLanguage = filters.languages.length === 0 || 
            filters.languages.includes(formation.language);

        // Filtre par prix
        const matchesPrice = formation.priceNumeric >= filters.priceRange[0] && 
            formation.priceNumeric <= filters.priceRange[1];

        // Filtre par promotion
        const matchesPromotion = !filters.hasPromotion || formation.hasPromotion;

        // Filtre par formations gratuites
        const matchesFree = !filters.isFree || formation.isFree;

        // Filtre par nouveautés
        const matchesNew = !filters.isNew || formation.isNew;

        // Filtre par date
        const matchesDate = !filters.dateRange || (() => {
            const addedDate = new Date(formation.dateAdded);
            const now = new Date();
            const diffTime = Math.abs(now - addedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            switch (filters.dateRange) {
                case 'recent': return diffDays <= 7;
                case 'month': return diffDays <= 30;
                case 'quarter': return diffDays <= 90;
                case 'year': return diffDays <= 365;
                default: return true;
            }
        })();

        return matchesSearch && matchesCategory && matchesSubcategory && 
               matchesLanguage && matchesPrice && matchesPromotion && 
               matchesFree && matchesNew && matchesDate;
    });

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Barre de catégories fixe avec comportement scroll */}
            <div className={`fixed left-0 right-0 z-30 bg-white border-b border-gray-200 transition-all duration-300 ${scrolled ? 'top-12 py-1 shadow-md' : 'top-20 sm:top-22 py-3 pb-6 shadow-sm'}`}>
                <CategorieBar 
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    scrolled={scrolled}
                />
            </div>
            
            {/* Overlay pour mobile uniquement quand sidebar est ouvert */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Section principale avec sidebar et contenu */}
            <div className={`container mx-auto px-4 py-8 transition-all duration-300 ${scrolled ? 'mt-[4.5rem]' : 'mt-40 sm:mt-54'}`}>
                <div className="flex gap-6 lg:items-start">
                    {/* Sidebar unique - responsive */}
                    <div className={`lg:sticky ${scrolled ? 'lg:top-24' : 'lg:top-60'} transition-all duration-300`}>
                        <Sidebar 
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                    </div>

                    {/* Contenu principal */}
                    <div className="flex-1 min-w-0">
                        {/* Statistiques et informations */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
                                    </h2>
                                    {/* Champ de recherche déplacé ici */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent text-gray-700 text-sm"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {searchTerm && (
                                <p className="text-gray-600 mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Résultats pour "{searchTerm}"
                                </p>
                            )}
                            {(selectedCategory !== "foryou" || filters.categories.length > 0 || filters.hasPromotion || filters.isFree || filters.isNew || filters.languages.length > 0) && (
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <FaFilter size={14} />
                                        <span className="font-medium">Filtres actifs:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedCategory !== "foryou" && (
                                            <span className="px-2 py-1 bg-[#0C8CE9] text-white rounded-full text-xs font-medium">
                                                {selectedCategory}
                                            </span>
                                        )}
                                        {filters.categories.map(cat => (
                                            <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                {cat}
                                            </span>
                                        ))}
                                        {filters.languages.map(lang => (
                                            <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                {lang}
                                            </span>
                                        ))}
                                        {filters.hasPromotion && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">promotion</span>
                                        )}
                                        {filters.isFree && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">gratuit</span>
                                        )}
                                        {filters.isNew && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">nouveau</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Grille des formations */}
                        {filteredFormations.length > 0 ? (
                            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                                {filteredFormations.map((formation) => (
                                    <Card
                                        key={formation.id}
                                        image={formation.image}
                                        category={formation.category}
                                        categoryIcon={formation.categoryIcon}
                                        duration={formation.duration}
                                        title={formation.title}
                                        description={formation.description}
                                        avatar={formation.avatar}
                                        author={formation.author}
                                        oldPrice={formation.oldPrice}
                                        price={formation.price}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-xl">
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        Aucune formation trouvée
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Aucun résultat ne correspond à vos critères de recherche.
                                        <br />Essayez de modifier vos filtres ou votre recherche.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setFilters({
                                                categories: [],
                                                subcategories: [],
                                                languages: [],
                                                dateRange: null,
                                                hasPromotion: false,
                                                isFree: false,
                                                isNew: false,
                                                priceRange: [0, 2000]
                                            });
                                        }}
                                        className="px-6 py-2 bg-[#0C8CE9] text-white rounded-lg hover:bg-[#0A71BC] transition-colors font-medium"
                                    >
                                        Réinitialiser tous les filtres
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}