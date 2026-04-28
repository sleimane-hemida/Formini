"use client";
import { useRef, useState, useEffect } from "react";
import { 
	FaCode, FaPaintBrush, FaBriefcase, FaBullhorn, FaChartLine, 
	FaLanguage, FaUserGraduate, FaBookOpen, FaHeartbeat, FaTools, 
	FaBalanceScale, FaVideo, FaGraduationCap, FaRocket
} from "react-icons/fa";

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

// Liste des noms officiels attendus
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

export default function CategorieBar({ selectedCategory = "foryou", onCategoryChange = (categoryKey) => {}, scrolled = false }) {
    const [categories, setCategories] = useState([
        { key: "foryou", label: "Pour vous", icon: <FaGraduationCap size={18} /> }
    ]);
    const [selected, setSelected] = useState(selectedCategory);
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/categories");
                if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
                const data = await response.json();
                
                // On filtre pour ne garder que les 12 catégories officielles demandées
                const filteredData = data.filter(cat => 
                    OFFICIAL_CATEGORIES.some(off => off.toLowerCase() === cat.name.toLowerCase())
                );

                const dynamicCategories = filteredData.map(cat => ({
                    key: cat.id,
                    label: cat.name,
                    icon: getIconForCategory(cat.name)
                }));

                setCategories([
                    { key: "foryou", label: "Pour vous", icon: <FaGraduationCap size={18} /> },
                    ...dynamicCategories
                ]);
            } catch (error) {
                console.error("Erreur catégories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        setSelected(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
            isDraggingRef.current = false;
        };
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    const handleSelect = (categoryKey) => {
        setSelected(categoryKey);
        onCategoryChange(categoryKey);
    };

    const isPausedRef = useRef(false);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        if (categories.length <= 1) return;
        let animationFrameId;
        const speed = 0.6;

        const animate = () => {
            if (!isPausedRef.current && !isDraggingRef.current && scrollRef.current) {
                const el = scrollRef.current;
                
                if (el.scrollWidth > el.clientWidth) {
                    el.scrollLeft += speed;
                    if (el.scrollLeft >= el.scrollWidth / 3) {
                        el.scrollLeft -= el.scrollWidth / 3;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [categories]); // Ne dépend que des catégories

    const onMouseDown = (e) => {
        setIsDragging(true);
        isDraggingRef.current = true;
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseUp = () => {
        setIsDragging(false);
        isDraggingRef.current = false;
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const tripleCategories = [...categories, ...categories, ...categories];

    return (
        <div className="w-full bg-white flex items-center relative overflow-hidden group/bar">
            <div className="absolute left-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

            <nav
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseEnter={() => {
                    setIsPaused(true);
                    isPausedRef.current = true;
                }}
                onMouseLeave={() => {
                    onMouseUp();
                    setIsPaused(false);
                    isPausedRef.current = false;
                }}
                className={`w-full flex items-center overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none ${
                    scrolled ? "gap-4 sm:gap-6 h-12" : "gap-6 sm:gap-10 h-20"
                }`}
                style={{ scrollbarWidth: 'none' }}
            >
                {tripleCategories.map((cat, idx) => (
                    <button
                        key={`${cat.key}-${idx}`}
                        onClick={() => handleSelect(cat.key)}
                        className={`flex flex-col items-center justify-center transition-all duration-300 ease-out group/btn
                            ${selected === cat.key ? "text-[#0C8CE9]" : "text-gray-500 hover:text-[#0C8CE9]"}
                            ${scrolled ? "px-3" : "px-4"}
                        `}
                    >
                        <div className={`flex items-center justify-center rounded-2xl transition-all duration-300 ${
                            selected === cat.key 
                                ? "bg-blue-50 text-[#0C8CE9] scale-110 shadow-sm" 
                                : "group-hover/btn:bg-blue-100/50 group-hover/btn:text-[#0C8CE9] group-hover/btn:scale-110"
                        } ${scrolled ? "p-1.5" : "p-3 mb-1"}`}>
                            {cat.icon}
                        </div>
                        
                        {!scrolled && (
                            <span className={`text-[11px] font-medium leading-tight text-center whitespace-nowrap transition-all duration-300 ${
                                selected === cat.key ? "opacity-100 font-bold" : "opacity-70 group-hover/btn:opacity-100"
                            }`}>
                                {cat.label}
                            </span>
                        )}

                        {selected === cat.key && (
                            <div className={`bg-[#0C8CE9] rounded-full mt-1.5 transition-all duration-300 animate-pulse ${
                                scrolled ? "w-1 h-1" : "w-1.5 h-1.5"
                            }`} />
                        )}
                    </button>
                ))}
            </nav>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { 
                    -ms-overflow-style: none; 
                    scrollbar-width: none; 
                    scroll-behavior: auto !important;
                }
            `}</style>
        </div>
    );
}

export { categories };
