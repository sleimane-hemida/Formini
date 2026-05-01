"use client";
import { useState, useEffect } from "react";
import {
    FaFilter,
    FaEuroSign,
    FaTags,
    FaFlagUsa,
    FaFlag
} from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi2";
import { FaGraduationCap, FaBookOpen, FaBullhorn, FaHeartbeat, FaUserGraduate, FaBalanceScale, FaTools, FaLanguage, FaChartLine, FaVideo, FaPaintBrush, FaCode, FaRocket, FaTag } from "react-icons/fa";

// Liste officielle des 12 catégories pour le mapping des icônes
const getIconForCategory = (name) => {
    const n = name.toLowerCase();
    if (n.includes("éducation") || n.includes("soutien")) return <FaBookOpen size={18} />;
    if (n.includes("marketing") || n.includes("communication")) return <FaBullhorn size={18} />;
    if (n.includes("santé") || n.includes("bien-être")) return <FaHeartbeat size={18} />;
    if (n.includes("développement personnel")) return <FaUserGraduate size={18} />;
    if (n.includes("droit") || n.includes("juridique")) return <FaBalanceScale size={18} />;
    if (n.includes("métiers pratiques")) return <FaTools size={18} />;
    if (n.includes("langue")) return <FaLanguage size={18} />;
    if (n.includes("finance") || n.includes("investissement")) return <FaChartLine size={18} />;
    if (n.includes("médias") || n.includes("contenu")) return <FaVideo size={18} />;
    if (n.includes("design") || n.includes("créativité")) return <FaPaintBrush size={18} />;
    if (n.includes("développement") || n.includes("tech")) return <FaCode size={18} />;
    if (n.includes("entreprise") || n.includes("startup")) return <FaRocket size={18} />;
    return <FaGraduationCap size={18} />;
};

const OFFICIAL_CATEGORIES = [
    "Éducation & Soutien scolaire",
    "Marketing & Communication",
    "Santé & Bien-être",
    "Développement personnel",
    "Droit & Juridique",
    "Métiers pratiques",
    "Langues",
    "Finance & Investissement",
    "Médias & Création de contenu",
    "Design & Créativité",
    "Développement & Tech",
    "Création d'entreprise & Startup"
];

// Composant interne déplacé à l'extérieur pour éviter les re-montages inutiles
const FilterSection = ({ title, icon, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
        <button
            onClick={onToggle}
            className="flex items-center justify-between w-full py-2 text-left hover:text-[#0C8CE9] transition-colors group"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-semibold text-gray-800">{title}</span>
            </div>
            <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                <svg className="w-4 h-4 text-black group-hover:text-[#0C8CE9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </button>
        {isExpanded && <div className="mt-1">{children}</div>}
    </div>
);

export default function Sidebar({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    onSearchReset,
    onCategoryReset,
    activeCategory
}) {
    const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 30000]);
    const [isDragging, setIsDragging] = useState({ min: false, max: false });
    const [subcategories, setSubcategories] = useState([]);
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        subcategory: true,
        date: false,
        language: false,
        promotion: false
    });

    const [dateStart, setDateStart] = useState(filters.dateStart || "");
    const [dateEnd, setDateEnd] = useState(filters.dateEnd || "");

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`;
                if (activeCategory && activeCategory !== "foryou") {
                    url += `?categoryId=${activeCategory}`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error("Erreur sous-catégories");
                const data = await response.json();
                setSubcategories(data);
            } catch (error) {
                console.error("Erreur Sidebar sous-catégories:", error);
            }
        };
        fetchSubcategories();
    }, [activeCategory]);

    useEffect(() => {
        setDateStart(filters.dateStart || "");
        setDateEnd(filters.dateEnd || "");
    }, [filters.dateStart, filters.dateEnd]);

    const sliderStyles = `
        .price-slider-container {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            overflow: hidden;
        }
        .price-slider-container * {
            user-select: none;
        }
        .sidebar-container {
            max-width: 100%;
            overflow-x: hidden !important;
        }
        @media (min-width: 1024px) {
            .sidebar-container {
                position: relative !important;
                height: auto !important;
                overflow-y: visible !important;
                transform: none !important;
            }
            .sidebar-scroll-content {
                overflow-y: visible !important;
                height: auto !important;
            }
        }
    `;

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleFilterChange = (filterType, value) => {
        onFiltersChange({
            ...filters,
            [filterType]: value
        });
    };

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
        handleFilterChange('priceRange', newRange);
    };

    const handleSliderMouseDown = (e, type) => {
        e.preventDefault();
        setIsDragging({ ...isDragging, [type]: true });

        const handleMove = (moveEvent) => {
            const clientX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
            const sliderContainer = document.querySelector('.price-slider-container .bg-gray-200');

            if (sliderContainer && clientX) {
                const sliderRect = sliderContainer.getBoundingClientRect();
                const percentage = Math.max(0, Math.min(1, (clientX - sliderRect.left) / sliderRect.width));
                const value = Math.round(percentage * 10000 / 100) * 100;

                if (type === 'min' && value < priceRange[1]) {
                    handlePriceChange([value, priceRange[1]]);
                } else if (type === 'max' && value > priceRange[0]) {
                    handlePriceChange([priceRange[0], value]);
                }
            }
        };

        const handleEnd = () => {
            setIsDragging({ min: false, max: false });
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    };

    const handleTrackClick = (e) => {
        const sliderContainer = e.currentTarget;
        const sliderRect = sliderContainer.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width));
        const clickValue = Math.round(percentage * 10000 / 100) * 100;

        const distanceToMin = Math.abs(clickValue - priceRange[0]);
        const distanceToMax = Math.abs(clickValue - priceRange[1]);

        if (distanceToMin <= distanceToMax) {
            if (clickValue < priceRange[1]) handlePriceChange([clickValue, priceRange[1]]);
        } else {
            if (clickValue > priceRange[0]) handlePriceChange([priceRange[0], clickValue]);
        }
    };

    const clearFilters = () => {
        setPriceRange([0, 10000]);
        setDateStart("");
        setDateEnd("");
        onFiltersChange({
            subcategories: [],
            languages: [],
            dateRange: null,
            dateStart: null,
            dateEnd: null,
            hasPromotion: false,
            priceRange: [0, 10000]
        });
        if (onSearchReset) onSearchReset();
        if (onCategoryReset) onCategoryReset();
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
            <div className={`sidebar-container fixed inset-y-0 left-0 z-[70] w-[85vw] max-w-[320px] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out overflow-x-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:relative lg:w-80 lg:translate-x-0 lg:z-10 lg:border lg:border-gray-200 lg:rounded-xl lg:h-auto lg:overflow-y-visible`}>

                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <FaFilter className="text-gray-600 text-lg" />
                        <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all shadow-sm"
                        aria-label="Fermer les filtres"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="sidebar-scroll-content h-full overflow-y-auto overflow-x-hidden p-6 pb-20 lg:h-auto lg:overflow-y-visible">
                    <button
                        onClick={clearFilters}
                        className="w-full mb-6 px-4 py-2 text-sm text-[#0C8CE9] border border-[#0C8CE9] rounded-lg hover:bg-[#0C8CE9] hover:text-white transition-all"
                    >
                        Réinitialiser les filtres
                    </button>

                    <FilterSection
                        title="Prix"
                        icon={<FaEuroSign className="text-gray-600" />}
                        isExpanded={expandedSections.price}
                        onToggle={() => toggleSection('price')}
                    >
                        <div className="price-slider-container relative px-4 py-4 max-w-full">
                            <div className="flex justify-between mb-4 text-sm font-medium">
                                <div className="bg-[#0C8CE9] text-white px-3 py-1 rounded-full text-center min-w-[60px]">
                                    {priceRange[0]} MRU
                                </div>
                                <div className="bg-[#0C8CE9] text-white px-3 py-1 rounded-full text-center min-w-[60px]">
                                    {priceRange[1]} MRU
                                </div>
                            </div>

                            <div className="relative h-2 bg-gray-200 rounded-full cursor-pointer" onClick={handleTrackClick}>
                                <div
                                    className="absolute h-2 bg-[#0C8CE9] rounded-full transition-all duration-150"
                                    style={{
                                        left: `${(priceRange[0] / 10000) * 100}%`,
                                        width: `${((priceRange[1] - priceRange[0]) / 10000) * 100}%`
                                    }}
                                />
                                <div
                                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#0C8CE9] border-2 border-white rounded-full cursor-grab shadow-md transition-all duration-150 hover:scale-110 ${isDragging.min ? 'scale-125 cursor-grabbing shadow-lg' : ''}`}
                                    style={{ left: `${(priceRange[0] / 10000) * 100}%` }}
                                    onMouseDown={(e) => handleSliderMouseDown(e, 'min')}
                                />
                                <div
                                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#0C8CE9] border-2 border-white rounded-full cursor-grab shadow-md transition-all duration-150 hover:scale-110 ${isDragging.max ? 'scale-125 cursor-grabbing shadow-lg' : ''}`}
                                    style={{ left: `${(priceRange[1] / 10000) * 100}%` }}
                                    onMouseDown={(e) => handleSliderMouseDown(e, 'max')}
                                />
                            </div>

                            <div className="flex justify-between mt-4 text-sm text-gray-600">
                                <span>0 MRU</span>
                                <span>10000 MRU</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {[
                                { label: "0-1000", range: [0, 1000] },
                                { label: "1000-3000", range: [1000, 3000] },
                                { label: "3000-6000", range: [3000, 6000] },
                                { label: "6000-10000", range: [6000, 10000] }
                            ].map((btn, i) => (
                                <button
                                    key={`price-btn-${i}`}
                                    onClick={() => handlePriceChange(btn.range)}
                                    className="px-2 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-[#0C8CE9] hover:text-white hover:border-[#0C8CE9] transition-colors truncate"
                                >
                                    {btn.label} MRU
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {activeCategory && activeCategory !== "foryou" && (
                        <FilterSection
                            title="Sous-catégories"
                            icon={<FaTag className="text-gray-600" />}
                            isExpanded={expandedSections.subcategory}
                            onToggle={() => toggleSection('subcategory')}
                        >
                            <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {subcategories.length > 0 ? (
                                    subcategories.map((sub, idx) => (
                                        <label
                                            key={`sub-${sub.id || idx}`}
                                            className={`flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer transition-all ${filters.subcategories?.includes(sub.id)
                                                ? 'bg-blue-50 text-[#0C8CE9] font-bold'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={filters.subcategories?.includes(sub.id)}
                                                onChange={(e) => {
                                                    const current = filters.subcategories || [];
                                                    const next = e.target.checked
                                                        ? [...current, sub.id]
                                                        : current.filter(id => id !== sub.id);
                                                    handleFilterChange('subcategories', next);
                                                }}
                                            />
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.subcategories?.includes(sub.id)
                                                ? 'bg-[#0C8CE9] border-[#0C8CE9]'
                                                : 'border-gray-300 bg-white'
                                                }`}>
                                                {filters.subcategories?.includes(sub.id) && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-sm flex-1">{sub.name}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-500 py-4 text-center italic">
                                        Aucune sous-catégorie disponible
                                    </p>
                                )}
                            </div>
                        </FilterSection>
                    )}

                    <FilterSection
                        title="Options"
                        icon={<HiLightBulb className="text-gray-600" />}
                        isExpanded={expandedSections.promotion}
                        onToggle={() => toggleSection('promotion')}
                    >
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.hasPromotion || false}
                                    onChange={(e) => handleFilterChange('hasPromotion', e.target.checked)}
                                    className="w-4 h-4 text-[#0C8CE9] border-gray-300 rounded focus:ring-[#0C8CE9]"
                                />
                                <span className="text-sm text-gray-700">Avec promotion</span>
                            </label>
                            <label className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.isFree || false}
                                    onChange={(e) => handleFilterChange('isFree', e.target.checked)}
                                    className="w-4 h-4 text-[#0C8CE9] border-gray-300 rounded focus:ring-[#0C8CE9]"
                                />
                                <span className="text-sm text-gray-700">Formations gratuites</span>
                            </label>
                        </div>
                    </FilterSection>
                </div>
            </div>
        </>
    );
}
