
"use client";
import { useState } from "react";
import { 
    FaFilter, 
    FaTimes, 
    FaEuroSign, 
    FaGraduationCap, 
    FaCalendarAlt, 
    FaGlobe, 
    FaTags,
    FaCode,
    FaPaintBrush,
    FaChartBar,
    FaCamera,
    FaMusic,
    FaBriefcase,
    FaLaptopCode,
    FaMobile,
    FaDatabase,
    FaRobot,
    FaGamepad,
    FaShoppingCart,
    FaFlagUsa,
    FaFlag
} from "react-icons/fa";

export default function Sidebar({ 
    isOpen, 
    onClose, 
    filters, 
    onFiltersChange, 
    onSearchReset, 
    onCategoryReset 
}) {
    const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 2000]);
    const [isDragging, setIsDragging] = useState({ min: false, max: false });
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        subcategory: false,
        date: false,
        language: false,
        promotion: false
    });

    // Styles pour les curseurs personnalisés
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
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        /* Empêcher tout débordement horizontal dans le sidebar */
        .sidebar-container {
            max-width: 100%;
            overflow-x: hidden !important;
        }
        
        .sidebar-container * {
            max-width: 100%;
            box-sizing: border-box;
        }

        /* Comportement de scroll adaptatif */
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

    const subcategories = {
        web: [
            { id: "frontend", name: "Frontend", icon: <FaLaptopCode className="text-gray-500" /> },
            { id: "backend", name: "Backend", icon: <FaDatabase className="text-gray-500" /> },
            { id: "mobile", name: "Mobile", icon: <FaMobile className="text-gray-500" /> },
            { id: "ai", name: "IA & Machine Learning", icon: <FaRobot className="text-gray-500" /> }
        ],
        design: [
            { id: "ui-ux", name: "UI/UX", icon: <FaPaintBrush className="text-gray-500" /> },
            { id: "graphic", name: "Design Graphique", icon: <FaPaintBrush className="text-gray-500" /> },
            { id: "web-design", name: "Web Design", icon: <FaLaptopCode className="text-gray-500" /> }
        ],
        marketing: [
            { id: "digital", name: "Marketing Digital", icon: <FaChartBar className="text-gray-500" /> },
            { id: "social", name: "Réseaux Sociaux", icon: <FaChartBar className="text-gray-500" /> },
            { id: "ecommerce", name: "E-commerce", icon: <FaShoppingCart className="text-gray-500" /> },
            { id: "seo", name: "SEO", icon: <FaChartBar className="text-gray-500" /> }
        ],
        photography: [
            { id: "portrait", name: "Portrait", icon: <FaCamera className="text-gray-500" /> },
            { id: "landscape", name: "Paysage", icon: <FaCamera className="text-gray-500" /> },
            { id: "commercial", name: "Commercial", icon: <FaCamera className="text-gray-500" /> }
        ],
        music: [
            { id: "production", name: "Production", icon: <FaMusic className="text-gray-500" /> },
            { id: "mixing", name: "Mix & Mastering", icon: <FaMusic className="text-gray-500" /> },
            { id: "composition", name: "Composition", icon: <FaMusic className="text-gray-500" /> }
        ],
        business: [
            { id: "entrepreneurship", name: "Entrepreneuriat", icon: <FaBriefcase className="text-gray-500" /> },
            { id: "management", name: "Management", icon: <FaBriefcase className="text-gray-500" /> },
            { id: "finance", name: "Finance", icon: <FaBriefcase className="text-gray-500" /> }
        ]
    };

    const languages = [
        { id: "fr", name: "Français", icon: <FaFlag className="text-gray-500" />, count: 145 },
        { id: "en", name: "English", icon: <FaFlagUsa className="text-gray-500" />, count: 89 },
        { id: "ar", name: "العربية", icon: <FaFlag className="text-gray-500" />, count: 67 }
    ];

    const dateOptions = [
        { id: "recent", name: "Récemment ajoutées", period: "7 derniers jours" },
        { id: "month", name: "Ce mois-ci", period: "30 derniers jours" },
        { id: "quarter", name: "Ce trimestre", period: "3 derniers mois" },
        { id: "year", name: "Cette année", period: "12 derniers mois" }
    ];

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

    // Fonctions pour le drag & drop du slider
    const handleSliderMouseDown = (e, type) => {
        e.preventDefault();
        setIsDragging({ ...isDragging, [type]: true });
        
        const handleMove = (moveEvent) => {
            const clientX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
            const sliderContainer = document.querySelector('.price-slider-container .bg-gray-200');
            
            if (sliderContainer && clientX) {
                const sliderRect = sliderContainer.getBoundingClientRect();
                const percentage = Math.max(0, Math.min(1, (clientX - sliderRect.left) / sliderRect.width));
                const value = Math.round(percentage * 2000 / 50) * 50; // Arrondi par pas de 50
                
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

    // Fonction pour cliquer directement sur la track
    const handleTrackClick = (e) => {
        const sliderContainer = e.currentTarget;
        const sliderRect = sliderContainer.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width));
        const clickValue = Math.round(percentage * 2000 / 50) * 50;
        
        // Détermine quel curseur est le plus proche
        const distanceToMin = Math.abs(clickValue - priceRange[0]);
        const distanceToMax = Math.abs(clickValue - priceRange[1]);
        
        if (distanceToMin <= distanceToMax) {
            // Plus proche du curseur minimum
            if (clickValue < priceRange[1]) {
                handlePriceChange([clickValue, priceRange[1]]);
            }
        } else {
            // Plus proche du curseur maximum  
            if (clickValue > priceRange[0]) {
                handlePriceChange([priceRange[0], clickValue]);
            }
        }
    };

    const clearFilters = () => {
        setPriceRange([0, 2000]);
        onFiltersChange({
            categories: [],
            subcategories: [],
            languages: [],
            dateRange: null,
            hasPromotion: false,
            priceRange: [0, 2000]
        });
        
        // Réinitialiser aussi la recherche et la catégorie sélectionnée
        if (onSearchReset) {
            onSearchReset();
        }
        if (onCategoryReset) {
            onCategoryReset();
        }
    };

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
            {isExpanded && <div className="mt-3">{children}</div>}
        </div>
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
            <div className={`sidebar-container fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-x-hidden ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:relative lg:translate-x-0 lg:shadow-lg lg:rounded-xl lg:h-auto lg:overflow-y-visible`}>
            
            {/* Header du sidebar */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                    <FaFilter className="text-gray-600 text-lg" />
                    <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
                </div>
            </div>

            <div className="sidebar-scroll-content h-full overflow-y-auto overflow-x-hidden p-6 pb-20 lg:h-auto lg:overflow-y-visible">
                {/* Bouton Clear All */}
                <button
                    onClick={clearFilters}
                    className="w-full mb-6 px-4 py-2 text-sm text-[#0C8CE9] border border-[#0C8CE9] rounded-lg hover:bg-[#0C8CE9] hover:text-white transition-all"
                >
                    Réinitialiser les filtres
                </button>

                {/* Prix */}
                <FilterSection
                    title="Prix"
                    icon={<FaEuroSign className="text-gray-600" />}
                    isExpanded={expandedSections.price}
                    onToggle={() => toggleSection('price')}
                >
                    <div className="space-y-6">
                        {/* Double Range Slider Interactif */}
                        <div className="price-slider-container relative px-2 py-12 max-w-full">
                            {/* Affichage des valeurs sélectionnées */}
                            <div className="flex justify-between mb-6 text-sm font-medium">
                                <div className="bg-[#0C8CE9] text-white px-3 py-1 rounded-full text-center min-w-[60px]">
                                    {priceRange[0]} MRU
                                </div>
                                <div className="bg-[#0C8CE9] text-white px-3 py-1 rounded-full text-center min-w-[60px]">
                                    {priceRange[1]} MRU
                                </div>
                            </div>

                            {/* Track principal */}
                            <div 
                                className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
                                onClick={handleTrackClick}
                            >
                                {/* Barre active entre les deux curseurs */}
                                <div
                                    className="absolute h-2 bg-[#0C8CE9] rounded-full transition-all duration-150"
                                    style={{
                                        left: `${(priceRange[0] / 2000) * 100}%`,
                                        width: `${((priceRange[1] - priceRange[0]) / 2000) * 100}%`
                                    }}
                                />
                                
                                {/* Curseur minimum */}
                                <div
                                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#0C8CE9] border-3 border-white rounded-full cursor-grab shadow-lg transition-all duration-150 hover:scale-110 ${
                                        isDragging.min ? 'scale-125 cursor-grabbing shadow-xl' : ''
                                    }`}
                                    style={{ left: `${(priceRange[0] / 2000) * 100}%` }}
                                    onMouseDown={(e) => handleSliderMouseDown(e, 'min')}
                                    onTouchStart={(e) => {
                                        const touch = e.touches[0];
                                        const mockEvent = { ...e, clientX: touch.clientX };
                                        handleSliderMouseDown(mockEvent, 'min');
                                    }}
                                />
                                
                                {/* Curseur maximum */}
                                <div
                                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#0C8CE9] border-3 border-white rounded-full cursor-grab shadow-lg transition-all duration-150 hover:scale-110 ${
                                        isDragging.max ? 'scale-125 cursor-grabbing shadow-xl' : ''
                                    }`}
                                    style={{ left: `${(priceRange[1] / 2000) * 100}%` }}
                                    onMouseDown={(e) => handleSliderMouseDown(e, 'max')}
                                    onTouchStart={(e) => {
                                        const touch = e.touches[0];
                                        const mockEvent = { ...e, clientX: touch.clientX };
                                        handleSliderMouseDown(mockEvent, 'max');
                                    }}
                                />
                            </div>

                            {/* Labels min/max */}
                            <div className="flex justify-between mt-4 text-sm text-gray-600">
                                <span>0 MRU</span>
                                <span>2000 MRU</span>
                            </div>
                        </div>

                        {/* Boutons de sélection rapide */}
                        <div className="grid grid-cols-2 gap-2 max-w-full">
                            <button
                                onClick={() => handlePriceChange([0, 500])}
                                className="px-2 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-[#0C8CE9] hover:text-white hover:border-[#0C8CE9] transition-colors truncate"
                            >
                                0-500 MRU
                            </button>
                            <button
                                onClick={() => handlePriceChange([500, 1000])}
                                className="px-2 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-[#0C8CE9] hover:text-white hover:border-[#0C8CE9] transition-colors truncate"
                            >
                                500-1000 MRU
                            </button>
                            <button
                                onClick={() => handlePriceChange([1000, 1500])}
                                className="px-2 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-[#0C8CE9] hover:text-white hover:border-[#0C8CE9] transition-colors truncate"
                            >
                                1000-1500 MRU
                            </button>
                            <button
                                onClick={() => handlePriceChange([1500, 2000])}
                                className="px-2 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-[#0C8CE9] hover:text-white hover:border-[#0C8CE9] transition-colors truncate"
                            >
                                1500-2000 MRU
                            </button>
                        </div>
                    </div>
                </FilterSection>

                {/* Sous-catégories */}
                {filters.categories?.length > 0 && (
                    <FilterSection
                        title="Sous-catégories"
                        icon={<FaCode className="text-gray-600" />}
                        isExpanded={expandedSections.subcategory}
                        onToggle={() => toggleSection('subcategory')}
                    >
                        <div className="space-y-2">
                            {filters.categories?.map(categoryId => 
                                subcategories[categoryId]?.map((sub) => (
                                    <label key={sub.id} className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filters.subcategories?.includes(sub.id) || false}
                                            onChange={(e) => {
                                                const newSubcategories = e.target.checked
                                                    ? [...(filters.subcategories || []), sub.id]
                                                    : (filters.subcategories || []).filter(id => id !== sub.id);
                                                handleFilterChange('subcategories', newSubcategories);
                                            }}
                                            className="w-4 h-4 text-[#0C8CE9] border-gray-300 rounded focus:ring-[#0C8CE9]"
                                        />
                                        {sub.icon}
                                        <span className="text-sm text-gray-700">{sub.name}</span>
                                    </label>
                                ))
                            )}
                        </div>
                    </FilterSection>
                )}

                {/* Date */}
                <FilterSection
                    title="Date d'ajout"
                    icon={<FaCalendarAlt className="text-gray-600" />}
                    isExpanded={expandedSections.date}
                    onToggle={() => toggleSection('date')}
                >
                    <div className="space-y-2">
                        {dateOptions.map((option) => (
                            <label key={option.id} className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="dateRange"
                                    value={option.id}
                                    checked={filters.dateRange === option.id}
                                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                    className="w-4 h-4 text-[#0C8CE9] border-gray-300 focus:ring-[#0C8CE9]"
                                />
                                <div>
                                    <div className="text-sm font-medium text-gray-700">{option.name}</div>
                                    <div className="text-xs text-gray-500">{option.period}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Langue */}
                <FilterSection
                    title="Langue"
                    icon={<FaGlobe className="text-gray-600" />}
                    isExpanded={expandedSections.language}
                    onToggle={() => toggleSection('language')}
                >
                    <div className="space-y-2">
                        {languages.map((lang) => (
                            <label key={lang.id} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={filters.languages?.includes(lang.id) || false}
                                        onChange={(e) => {
                                            const newLanguages = e.target.checked
                                                ? [...(filters.languages || []), lang.id]
                                                : (filters.languages || []).filter(id => id !== lang.id);
                                            handleFilterChange('languages', newLanguages);
                                        }}
                                        className="w-4 h-4 text-[#0C8CE9] border-gray-300 rounded focus:ring-[#0C8CE9]"
                                    />
                                    {lang.icon}
                                    <span className="text-sm text-gray-700">{lang.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">({lang.count})</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Promotions */}
                <FilterSection
                    title="Offres spéciales"
                    icon={<FaTags className="text-gray-600" />}
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
                        <label className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.isNew || false}
                                onChange={(e) => handleFilterChange('isNew', e.target.checked)}
                                className="w-4 h-4 text-[#0C8CE9] border-gray-300 rounded focus:ring-[#0C8CE9]"
                            />
                            <span className="text-sm text-gray-700">Nouveautés</span>
                        </label>
                    </div>
                </FilterSection>
            </div>
        </div>
        </>
    );
}
