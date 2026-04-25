"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../pages_common/card";
import Header from "../../composant/layout/header";
import Footer from "../../composant/layout/footer";
import Sidebar from "../../composant/layout/sidebar";
import CategorieBar from "../../composant/layout/categorie";
import { FaPaintBrush, FaCode, FaChartBar, FaCamera, FaMusic, FaGraduationCap, FaFilter, FaUsers, FaShoppingCart } from "react-icons/fa";
import { ROUTES } from "../../utils/routes";

export default function Catalogue() {
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("foryou");
    const [scrolled, setScrolled] = useState(false);
    const [formations, setFormations] = useState([]);
    const [filters, setFilters] = useState({
        subcategories: [],
        languages: [],
        dateRange: null,
        dateStart: null,
        dateEnd: null,
        hasPromotion: false,
        isFree: false,
        isNew: false,
        priceRange: [0, 10000]
    });

    // Charger les formations du backend
    useEffect(() => {
        const loadFormations = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/formations-all');
                if (!res.ok) throw new Error('Failed to load formations');
                const data = await res.json();
                
                // Adapter les données du backend au format de l'UI
                const adaptedFormations = data.map(f => {
                    // Compter les leçons à partir des modules
                    let lessonsCount = 0;
                    if (f.Modules && Array.isArray(f.Modules)) {
                        lessonsCount = f.Modules.reduce((total, module) => {
                            return total + (module.Lessons?.length || 0);
                        }, 0);
                    }
                    
                    return {
                        id: f.id,
                        image: f.image || "/images/users/formation.png",
                        category: f.Category?.name || "Non catégorisé",
                        categoryId: f.categoryId,
                        subcategoryId: f.subcategoryId,
                        categoryIcon: <FaCode size={16} className="text-[#B1B5C3]" />,
                        duration: f.duree_totale_minutes ? `${f.duree_totale_minutes} min` : "Durée non définie",
                        title: f.name,
                        description: f.description || "",
                        ce_que_vous_apprendrez: f.ce_que_vous_apprendrez || "",
                        avatar: "/images/users/profile.jpg",
                        author: f.trainer?.name || "Formateur",
                        oldPrice: f.prix_normal ? `${parseFloat(f.prix_normal).toLocaleString('fr-FR')} MRU` : "Gratuit",
                        price: f.est_gratuite ? "Gratuit" : (f.prix_promo ? `${parseFloat(f.prix_promo).toLocaleString('fr-FR')} MRU` : `${parseFloat(f.prix_normal || 0).toLocaleString('fr-FR')} MRU`),
                        priceNumeric: parseFloat(f.prix_promo || f.prix_normal || 0),
                        language: f.language || "fr",
                        modulesCount: f.Modules?.length || 0,
                        lessonsCount: lessonsCount,
                        niveau: f.niveau || "Non spécifié",
                        hasPromotion: !!f.prix_promo,
                        isFree: f.est_gratuite,
                        isNew: new Date(f.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                        dateAdded: new Date(f.createdAt).toISOString().split('T')[0]
                    };
                });
                
                // Calculer la plage de prix max automatiquement
                const prices = adaptedFormations.map(f => f.priceNumeric).filter(p => p > 0);
                const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000;
                
                console.log('✅ Formations chargées:', adaptedFormations.length);
                setFormations(adaptedFormations);
                setFilters(prev => ({ ...prev, priceRange: [0, maxPrice + 500] }));
            } catch (err) {
                console.error('Erreur chargement formations:', err);
                setFormations([]);
            }
        };
        
        loadFormations();
    }, []);

    const openModal = (formation) => {
        setSelectedFormation(formation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedFormation(null), 300); // Wait for transition
    };

    // Read category from query param (e.g. /formations?category=design)
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const cat = searchParams ? searchParams.get("category") : null;
        if (cat) {
            setSelectedCategory(cat);
        }
    }, [searchParams]);

    // Ouvrir le modal automatiquement si le paramètre openModal est présent dans l'URL
    useEffect(() => {
        if (!searchParams || formations.length === 0) return;
        
        const openModalId = searchParams.get("openModal");
        if (openModalId) {
            const formationToOpen = formations.find(f => f.id.toString() === openModalId.toString());
            if (formationToOpen) {
                // On utilise un setTimeout pour s'assurer que le rendu est terminé avant d'ouvrir le modal
                setTimeout(() => openModal(formationToOpen), 100);
                
                // Nettoyer l'URL pour éviter que le modal ne se rouvre si on rafraîchit la page ou qu'on ferme le modal
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete("openModal");
                window.history.replaceState({}, '', newUrl.toString());
            }
        }
    }, [searchParams, formations]);

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

    // Filtrage des formations basé sur la recherche et les filtres
    const filteredFormations = formations.filter(formation => {
        // Recherche par terme
        const matchesSearch = 
            formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtre par catégories (barre horizontale pilotant le sidebar)
        const matchesCategory = (() => {
            if (selectedCategory === "foryou") {
                return true;
            }

            // Les clés matchent maintenant directement (ex: "devtech", "design", etc.)
            return selectedCategory === formation.categoryId;
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

    // Log filtrage
    useEffect(() => {}, [filteredFormations]);

    const [purchaseFeedback, setPurchaseFeedback] = useState({ show: false, type: 'success', message: '' });

    // Fonction pour acheter une formation
    const handleBuyFormation = async (formationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ formationId })
            });

            const data = await response.json();

            if (!response.ok) {
                const isAlreadyOwned = data.error && data.error.includes('déjà acheté');
                setPurchaseFeedback({
                    show: true,
                    type: isAlreadyOwned ? 'info' : 'error',
                    message: data.error || 'Erreur lors de l\'achat'
                });
                return;
            }

            setPurchaseFeedback({
                show: true,
                type: 'success',
                message: 'Formation achetée avec succès ! Retrouvez-la dans votre espace personnel.'
            });
            
            // On attend un peu avant de fermer le modal de détails et rediriger
            setTimeout(() => {
                closeModal();
                router.push('/acheteur/formation/listeFormation');
            }, 2500);

        } catch (error) {
            console.error('Erreur:', error);
            setPurchaseFeedback({
                show: true,
                type: 'error',
                message: 'Une erreur réseau est survenue lors de l\'achat.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header 
                onSearchChange={setSearchTerm}
                searchValue={searchTerm}
            />
            
            {/* Barre de catégories fixe avec comportement scroll */}
            <div className={`fixed left-0 right-0 z-30 bg-white  transition-all duration-700 ease-in-out ${scrolled ? 'top-12 py-1' : 'top-20 sm:top-22 py-3 pb-6'}`}>
                <CategorieBar 
                    selectedCategory={selectedCategory}
                    onCategoryChange={(newCat) => {
                        setSelectedCategory(newCat);
                        setFilters(prev => ({ ...prev, subcategories: [] }));
                    }}
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
            <div className={`max-w-[1600px] mx-auto px-6 sm:px-10 py-8 transition-all duration-700 ease-in-out ${scrolled ? 'mt-[4.5rem]' : 'mt-40 sm:mt-44'}`}>
                <div className="flex gap-10 lg:items-start lg:-ml-12 transition-all duration-500">
                    {/* Sidebar unique - responsive */}
                    <div className={`lg:sticky ${scrolled ? 'lg:top-24' : 'lg:top-36'} transition-all duration-700 ease-in-out`}>
                        <Sidebar 
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                            filters={filters}
                            onFiltersChange={setFilters}
                            onSearchReset={() => setSearchTerm("")}
                            onCategoryReset={() => setSelectedCategory("foryou")}
                            activeCategory={selectedCategory}
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
                            {(selectedCategory !== "foryou" || filters.hasPromotion || filters.isFree || filters.isNew || filters.languages.length > 0 || filters.subcategories.length > 0) && (
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
                                        {/* {filters.isNew && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">nouveau</span>
                                        )} */}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Grille des formations */}
                        {filteredFormations.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 pb-20">
                                {filteredFormations.map((formation) => (
                                    <div key={formation.id} className="flex justify-center lg:justify-start">
                                        <Card
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
                                            hasPromotion={formation.hasPromotion}
                                            isFree={formation.isFree}
                                            isNew={formation.isNew}
                                            onClick={() => openModal(formation)}
                                        />
                                    </div>
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
                                                priceRange: [0, 10000]
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

            {/* ── Modal Détail Formation (Inspiré de moduleLecon) ── */}
            {selectedFormation && (
                <div 
                    className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={closeModal}
                    />

                    {/* Modal Content */}
                    <div 
                        className={`bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden relative shadow-2xl transition-all duration-500 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
                    >
                        {/* Bouton Fermer */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="h-full overflow-y-auto custom-scrollbar pb-10">
                            {/* 1. Hero Image Section */}
                            <div className="relative w-full h-[320px] bg-slate-100">
                                <img 
                                    src={selectedFormation.image} 
                                    alt={selectedFormation.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-3 py-1 bg-[#0C8CE9] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            {selectedFormation.category}
                                        </span>
                                        {/* {selectedFormation.isNew && (
                                            <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                
                                            </span>
                                        )} */}
                                        {selectedFormation.hasPromotion && (
                                            <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                Promotion
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                                        {selectedFormation.title}
                                    </h2>
                                </div>
                            </div>

                            {/* 2. Content Grid */}
                            <div className="px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Main Column */}
                                <div className="lg:col-span-2 space-y-10">
                                    <section>
                                        <h3 className="text-lg font-bold text-[#1e293b] mb-4 flex items-center gap-3 uppercase tracking-wider">
                                            <span className="w-1 h-6 bg-[#0C8CE9] rounded-full"></span>
                                            À propos de cette formation
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-base">
                                            {selectedFormation.description}
                                        </p>
                                    </section>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Durée</p>
                                            <p className="font-bold text-[#1e293b]">{selectedFormation.duration}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Modules</p>
                                            <p className="font-bold text-[#1e293b]">{selectedFormation.modulesCount || 0}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Leçons</p>
                                            <p className="font-bold text-[#1e293b]">{selectedFormation.lessonsCount || 0}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Langue</p>
                                            <p className="font-bold text-[#1e293b]">{selectedFormation.language === 'fr' ? 'Français' : selectedFormation.language === 'en' ? 'Anglais' : selectedFormation.language}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Niveau</p>
                                            <p className="font-bold text-[#1e293b] capitalize">{selectedFormation.niveau}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-1">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accès</p>
                                            <p className="font-bold text-[#1e293b]">Illimité</p>
                                        </div>
                                    </div>

                                    {/* Objectives */}
                                    <section>
                                        <h3 className="text-lg font-bold text-[#1e293b] mb-4 uppercase tracking-wider">Ce que vous allez apprendre</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedFormation.ce_que_vous_apprendrez ? 
                                                selectedFormation.ce_que_vous_apprendrez.split(',').map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                            <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        {item.trim()}
                                                    </li>
                                                ))
                                                :
                                                [
                                                    "Maîtriser les fondamentaux théoriques",
                                                    "Pratiquer sur des projets réels",
                                                    "Obtenir une certification reconnue",
                                                    "Rejoindre une communauté active"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                            <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </section>
                                </div>

                                {/* Sidebar Column */}
                                <div className="space-y-6">
                                    {/* Price Card */}
                                    <div className="bg-[#f8fafc] border border-slate-100 p-8 rounded-3xl shadow-sm">
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Tarif Premium</p>
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-4xl font-black text-[#1e293b]">{selectedFormation.price}</span>
                                                {selectedFormation.oldPrice && (
                                                    <span className="text-lg text-slate-400 line-through font-medium">{selectedFormation.oldPrice}</span>
                                                )}
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleBuyFormation(selectedFormation.id)}
                                            className="w-full mt-8 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            Acheter
                                            <FaShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Author Card */}
                                    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instructeur</p>
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={selectedFormation.avatar} 
                                                alt={selectedFormation.author}
                                                className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50"
                                            />
                                            <div>
                                                <p className="font-bold text-[#1e293b]">{selectedFormation.author}</p>
                                                <p className="text-xs text-[#0C8CE9] font-medium">Expert {selectedFormation.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-500 py-3 border-y border-slate-50">
                                            <p>Instructeur: <span className="font-semibold text-[#1e293b]">{selectedFormation.author}</span></p>
                                        </div>
                                        <button className="w-full py-3 text-[#0C8CE9] text-xs font-bold uppercase tracking-widest hover:bg-[#0C8CE9]/5 rounded-xl transition-colors">
                                            Voir le profil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Popup for Purchases */}
            {purchaseFeedback.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setPurchaseFeedback({ ...purchaseFeedback, show: false })}
                    />
                    <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-scale-in border border-slate-100">
                        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                            purchaseFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 
                            purchaseFeedback.type === 'info' ? 'bg-blue-50 text-[#0C8CE9]' : 
                            'bg-red-50 text-red-500'
                        }`}>
                            {purchaseFeedback.type === 'success' ? (
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : purchaseFeedback.type === 'info' ? (
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        
                        <h3 className={`text-xl font-black mb-3 ${
                            purchaseFeedback.type === 'success' ? 'text-emerald-600' : 
                            purchaseFeedback.type === 'info' ? 'text-[#0C8CE9]' : 
                            'text-red-600'
                        }`}>
                            {purchaseFeedback.type === 'success' ? 'Félicitations !' : 
                             purchaseFeedback.type === 'info' ? 'Information' : 
                             'Oups !'}
                        </h3>
                        
                        <p className="text-slate-600 font-medium leading-relaxed mb-8">
                            {purchaseFeedback.message}
                        </p>
                        
                        <div className="space-y-3">
                            <button 
                                onClick={() => {
                                    if (purchaseFeedback.type === 'info' || purchaseFeedback.type === 'success') {
                                        router.push('/acheteur/formation/listeFormation');
                                    }
                                    setPurchaseFeedback({ ...purchaseFeedback, show: false });
                                }}
                                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${
                                    purchaseFeedback.type === 'success' 
                                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200' 
                                        : purchaseFeedback.type === 'info'
                                        ? 'bg-[#0C8CE9] hover:bg-[#0A71BC] text-white shadow-blue-200'
                                        : 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'
                                }`}
                            >
                                {purchaseFeedback.type === 'success' ? 'Génial !' : 
                                 purchaseFeedback.type === 'info' ? 'Accéder à mes cours' : 
                                 'Réessayer'}
                            </button>
                            
                            {purchaseFeedback.type === 'info' && (
                                <button 
                                    onClick={() => setPurchaseFeedback({ ...purchaseFeedback, show: false })}
                                    className="w-full py-3 text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors"
                                >
                                    Fermer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}