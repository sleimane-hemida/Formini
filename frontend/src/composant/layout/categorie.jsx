"use client";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { 
	FaCode, FaPaintBrush, FaBriefcase, FaBullhorn, FaChartLine, 
	FaLanguage, FaUserGraduate, FaBookOpen, FaHeartbeat, FaTools, 
	FaBalanceScale, FaVideo, FaGraduationCap, FaUser, FaUtensils,
	FaMusic, FaHeart, FaPlane, FaCamera, FaDumbbell, FaSpa,
	FaCar, FaBuilding, FaHammer, FaLeaf, FaPaw, FaCalendarAlt, FaGem 
} from "react-icons/fa";

const categories = [
	{
		key: "foryou",
		label: "Pour vous",
		icon: <FaGraduationCap size={18} />,
	},
	{
		key: "webdev",
		label: "Développement Web",
		icon: <FaCode size={18} />,
	},
	{
		key: "design",
		label: "Design UX/UI",
		icon: <FaPaintBrush size={18} />,
	},
	{
		key: "business",
		label: "Business & Marketing",
		icon: <FaBriefcase size={18} />,
	},
	{
		key: "marketing",
		label: "Marketing Digital",
		icon: <FaBullhorn size={18} />,
	},
	{
		key: "data",
		label: "Data & IA",
		icon: <FaChartLine size={18} />,
	},
	{
		key: "language",
		label: "Langues",
		icon: <FaLanguage size={18} />,
	},
	{
		key: "softskills",
		label: "Soft Skills",
		icon: <FaUserGraduate size={18} />,
	},
	{
		key: "it",
		label: "Informatique & IT",
		icon: <FaTools size={18} />,
	},
	{
		key: "gaming",
		label: "Création de Jeux",
		icon: <FaVideo size={18} />,
	},
	{
		key: "coach",
		label: "Coaching & Mentoring",
		icon: <FaUser size={18} />,
	},
	{
		key: "cuisine",
		label: "Cuisine & Gastronomie",
		icon: <FaUtensils size={18} />,
	},
	{
		key: "musique",
		label: "Musique & Arts",
		icon: <FaMusic size={18} />,
	},
	{
		key: "danse",
		label: "Danse & Chorégraphie",
		icon: <FaHeart size={18} />,
	},
	{
		key: "voyage",
		label: "Voyage & Tourisme",
		icon: <FaPlane size={18} />,
	},
	{
		key: "photographie",
		label: "Photographie & Vidéo",
		icon: <FaCamera size={18} />,
	},
	{
		key: "fitness",
		label: "Fitness & Bien-être",
		icon: <FaDumbbell size={18} />,
	},
	{
		key: "yoga",
		label: "Yoga & Méditation",
		icon: <FaSpa size={18} />,
	},
	{
		key: "auto",
		label: "Auto & Moto",
		icon: <FaCar size={18} />,
	},
	{
		key: "immobilier",
		label: "Immobilier",
		icon: <FaBuilding size={18} />,
	},
	{
		key: "legal",
		label: "Droit & Juridique",
		icon: <FaBalanceScale size={18} />,
	},
	{
		key: "sante",
		label: "Santé & Nutrition",
		icon: <FaHeartbeat size={18} />,
	},
	{
		key: "elearning",
		label: "E-learning & Éducation",
		icon: <FaBookOpen size={18} />,
	},
	{
		key: "bricolage",
		label: "Bricolage & Bricolage",
		icon: <FaHammer size={18} />,
	},
	{
		key: "jardinage",
		label: "Jardinage & Paysagisme",
		icon: <FaLeaf size={18} />,
	},
	{
		key: "animaux",
		label: "Animaux de Compagnie",
		icon: <FaPaw size={18} />,
	},
	{
		key: "evenements",
		label: "Événements & Spectacles",
		icon: <FaCalendarAlt size={18} />,
	},
	{
		key: "beaute",
		label: "Beauté & Soins",
		icon: <FaGem size={18} />,
	},
];

export default function CategorieBar({ selectedCategory = "foryou", onCategoryChange = (categoryKey) => {}, scrolled = false }) {
    const [selected, setSelected] = useState(selectedCategory);
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Mettre à jour l'état local quand les props changent
    useEffect(() => {
        setSelected(selectedCategory);
    }, [selectedCategory]);

    // Sécurité pour le Drag : relâcher n'importe où
    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    const handleSelect = (categoryKey) => {
        setSelected(categoryKey);
        onCategoryChange(categoryKey);
    };

    // Auto-scroll logic
    useEffect(() => {
        let animationFrameId;
        const speed = 0.6; // Vitesse de l'auto-scroll

        const animate = () => {
            if (!isPaused && !isDragging && scrollRef.current) {
                const el = scrollRef.current;
                el.scrollLeft += speed;

                // Boucle infinie : si on arrive à la fin du premier set, on revient au début
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isDragging]);

    // Dragging logic
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // On double les catégories pour créer l'effet de boucle infinie visuelle
    const doubleCategories = [...categories, ...categories];

    return (
        <div className="w-full bg-white flex items-center relative overflow-hidden group/bar">
            {/* Dégradés sur les bords */}
            <div className="absolute left-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

            <nav
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {
                    onMouseUp();
                    setIsPaused(false);
                }}
                className={`w-full flex items-center overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none ${
                    scrolled ? "gap-4 sm:gap-6 h-12" : "gap-6 sm:gap-10 h-20"
                }`}
                style={{ scrollbarWidth: 'none' }}
            >
                {doubleCategories.map((cat, idx) => (
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
