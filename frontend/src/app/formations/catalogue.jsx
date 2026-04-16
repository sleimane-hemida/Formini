"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../pages_common/card";
import Header from "../../composant/layout/header";
import Footer from "../../composant/layout/footer";
import Sidebar from "../../composant/layout/sidebar";
import CategorieBar from "../../composant/layout/categorie";
import { FaPaintBrush, FaCode, FaChartBar, FaCamera, FaMusic, FaGraduationCap, FaFilter } from "react-icons/fa";
import { ROUTES } from "../../utils/routes";

export default function Catalogue() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("foryou");
    const [scrolled, setScrolled] = useState(false);
    const [formations, setFormations] = useState([]);
    const [loadingFormations, setLoadingFormations] = useState(true);
    const [filters, setFilters] = useState({
        categories: [],
        subcategories: [],
        languages: [],
        dateRange: null,
        dateStart: null,
        dateEnd: null,
        hasPromotion: false,
        isFree: false,
        isNew: false,
        priceRange: [0, 2000]
    });

    // Read category from query param (e.g. /formations?category=design)
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const cat = searchParams ? searchParams.get("category") : null;
        if (cat) {
            setSelectedCategory(cat);
        }
    }, [searchParams]);

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

    // Récupérer les formations du backend
    useEffect(() => {
        setLoadingFormations(true);
        fetch('http://localhost:5000/api/formations')
            .then(res => res.json())
            .then(data => {
                // Mapper les données du backend au format du frontend
                const mappedFormations = data.map(formation => ({
                    id: formation.id,
                    image: "/images/users/formation.png",
                    category: formation.Category?.name || "Autre",
                    categoryId: formation.Category?.id || "other",
                    subcategoryId: formation.Subcategory?.id || "other",
                    duration: formation.duree_totale_minutes ? `${Math.round(formation.duree_totale_minutes / 60)} heures` : "Durée non spécifiée",
                    title: formation.name,
                    description: formation.description || formation.description_longue || "Description non disponible",
                    avatar: "/images/users/profile.jpg",
                    author: formation.Trainer?.name || "Formateur inconnu",
                    oldPrice: formation.prix_original ? `${formation.prix_original} MRU` : "",
                    price: formation.prix_vente ? `${formation.prix_vente} MRU` : "Gratuit",
                    priceNumeric: formation.prix_vente || 0,
                    language: formation.language || "fr",
                    hasPromotion: formation.prix_original && formation.prix_vente < formation.prix_original,
                    isFree: !formation.prix_vente || formation.prix_vente === 0,
                    isNew: new Date(formation.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    dateAdded: formation.createdAt
                }));
                setFormations(mappedFormations);
            })
            .catch(err => {
                console.error('Erreur lors du chargement des formations:', err);
                setFormations([]);
            })
            .finally(() => setLoadingFormations(false));
    }, []);

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

        // Filtre par date — supporte dateStart/dateEnd (prioritaires) et presets en fallback
        const matchesDate = (() => {
            // If explicit start/end provided, use interval filtering
            if (filters.dateStart || filters.dateEnd) {
                const addedDate = new Date(formation.dateAdded);
                if (filters.dateStart) {
                    const start = new Date(filters.dateStart);
                    start.setHours(0,0,0,0);
                    if (addedDate < start) return false;
                }
                if (filters.dateEnd) {
                    const end = new Date(filters.dateEnd);
                    end.setHours(23,59,59,999);
                    if (addedDate > end) return false;
                }
                return true;
            }

            // Fallback to existing presets (recent/month/quarter/year)
            if (!filters.dateRange) return true;
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
            <Header 
                onSearchChange={setSearchTerm}
                searchValue={searchTerm}
            />
            
            {/* Barre de catégories fixe avec comportement scroll */}
            <div className={`fixed left-0 right-0 z-30 bg-white border-b border-gray-200 transition-all duration-700 ease-in-out ${scrolled ? 'top-12 py-1 shadow-md' : 'top-20 sm:top-22 py-3 pb-6 shadow-sm'}`}>
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
            <div className={`container mx-auto px-4 py-8 transition-all duration-700 ease-in-out ${scrolled ? 'mt-[4.5rem]' : 'mt-40 sm:mt-44'}`}>
                <div className="flex gap-6 lg:items-start">
                    {/* Sidebar unique - responsive */}
                    <div className={`lg:sticky ${scrolled ? 'lg:top-24' : 'lg:top-36'} transition-all duration-700 ease-in-out`}>
                        <Sidebar 
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                            filters={filters}
                            onFiltersChange={setFilters}
                            onSearchReset={() => setSearchTerm("")}
                            onCategoryReset={() => setSelectedCategory("foryou")}
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
                                </div>
                            </div>
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
                                                dateStart: null,
                                                dateEnd: null,
                                                hasPromotion: false,
                                                isFree: false,
                                                isNew: false,
                                                priceRange: [0, 2000]
                                            });
                                            setSelectedCategory("foryou");
                                            // remove category query param from URL so useSearchParams updates
                                            router.replace(ROUTES.BROWSE_COURSES);
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