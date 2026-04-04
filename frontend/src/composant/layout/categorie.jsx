"use client";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCode, FaPaintBrush, FaBriefcase, FaBullhorn, FaChartLine, FaLanguage, FaUserGraduate, FaBookOpen, FaHeartbeat, FaTools, FaBalanceScale, FaVideo, FaGraduationCap } from "react-icons/fa";

const categories = [
	{
		key: "foryou",
		label: "Pour vous",
		icon: <FaGraduationCap size={18} />,
		subcategories: [],
	},
	{
		key: "devtech",
		label: "Développement & Tech",
		icon: <FaCode size={18} />,
		subcategories: [
			"Développement web",
			"Développement mobile",
			"Intelligence artificielle & Machine learning",
			"Cybersécurité & Ethical hacking",
			"Bases de données",
			"DevOps & Cloud",
			"Programmation générale",
		],
	},
	{
		key: "design",
		label: "Design & Créativité",
		icon: <FaPaintBrush size={18} />,
		subcategories: [
			"UI/UX Design",
			"Graphic Design",
			"Montage vidéo",
			"Motion design & Animation",
			"Photographie & Retouche",
			"Modélisation 3D",
			"Illustration digitale",
		],
	},
	{
		key: "business",
		label: "Création d'entreprise & Startup",
		icon: <FaBriefcase size={18} />,
		subcategories: [
			"Gestion de projet",
			"Leadership & Management",
			"E-commerce & Vente en ligne",
			"Rédaction de business plan",
			"Comptabilité & Gestion d'entreprise",
			"Import / Export & Commerce international",
		],
	},
	{
		key: "marketing",
		label: "Marketing & Communication",
		icon: <FaBullhorn size={18} />,
		subcategories: [
			"Marketing digital",
			"Réseaux sociaux",
			"SEO & Référencement naturel",
			"Publicité en ligne",
			"Email marketing & Automation",
			"Copywriting & Rédaction web",
			"Community management",
		],
	},
	{
		key: "finance",
		label: "Finance & Investissement",
		icon: <FaChartLine size={18} />,
		subcategories: [
			"Finance personnelle & Épargne",
			"Comptabilité pratique",
			"Bourse & Trading",
			"Cryptomonnaies & Blockchain",
			"Gestion budgétaire",
			"Fiscalité & Impôts",
			"Investissement immobilier",
		],
	},
	{
		key: "langues",
		label: "Langues",
		icon: <FaLanguage size={18} />,
		subcategories: [
			"Anglais",
			"Français",
			"Arabe",
			"Espagnol",
			"Chinois mandarin",
			"Allemand",
			"Autres langues",
		],
	},
	{
		key: "devperso",
		label: "Développement personnel",
		icon: <FaUserGraduate size={18} />,
		subcategories: [
			"Productivité & Organisation",
			"Prise de parole en public",
			"Gestion du stress & Émotions",
			"Confiance en soi & Motivation",
			"Mémoire & Techniques d'apprentissage",
			"Méditation & Pleine conscience",
			"Relations interpersonnelles",
		],
	},
	{
		key: "education",
		label: "Éducation & Soutien scolaire",
		icon: <FaBookOpen size={18} />,
		subcategories: [
			"Mathématiques",
			"Sciences",
			"Français & Littérature",
			"Histoire & Géographie",
			"Préparation aux examens",
			"Méthodes d'apprentissage & Prise de notes",
		],
	},
	{
		key: "sante",
		label: "Santé & Bien-être",
		icon: <FaHeartbeat size={18} />,
		subcategories: [
			"Nutrition & Alimentation saine",
			"Fitness & Musculation",
			"Yoga & Stretching",
			"Psychologie & Santé mentale",
			"Premiers secours & Urgences",
			"Médecine naturelle & Plantes",
		],
	},
	{
		key: "pratique",
		label: "Métiers pratiques",
		icon: <FaTools size={18} />,
		subcategories: [
			"Électricité & Installations",
			"Plomberie & Sanitaire",
			"Menuiserie & Ébénisterie",
			"Couture, Mode & Broderie",
			"Cuisine & Pâtisserie",
			"Agriculture & Élevage",
			"Mécanique automobile",
		],
	},
	{
		key: "droit",
		label: "Droit & Juridique",
		icon: <FaBalanceScale size={18} />,
		subcategories: [
			"Droit des affaires",
			"Droit du travail",
			"Droit civil & Famille",
			"Rédaction de contrats",
			"Propriété intellectuelle",
		],
	},
	{
		key: "media",
		label: "Médias & Création de contenu",
		icon: <FaVideo size={18} />,
		subcategories: [
			"Création de contenu YouTube",
			"Podcasting",
			"Journalisme & Rédaction",
			"Radio & Audio",
			"Relations publiques & Communication",
		],
	},
];



export default function CategorieBar({ selectedCategory = "foryou", onCategoryChange = () => {}, scrolled = false }) {
       const [selected, setSelected] = useState(selectedCategory);
       const scrollRef = useRef(null);

       // Mettre à jour l'état local quand les props changent
       useEffect(() => {
           setSelected(selectedCategory);
       }, [selectedCategory]);

       const handleSelect = (categoryKey) => {
           setSelected(categoryKey);
           onCategoryChange(categoryKey);
       };

	       // Fonction pour scroller la barre
	       const scroll = (direction) => {
		       const el = scrollRef.current;
		       if (!el) return;
		       const scrollAmount = 120;
		       if (direction === "left") {
			       el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
		       } else {
			       el.scrollBy({ left: scrollAmount, behavior: "smooth" });
		       }
	       };

	       return (
		       <div className="w-full bg-white border-b flex items-center relative">
			       <button
				       className="hidden sm:flex items-center justify-center h-10 w-10 absolute left-0 z-10 bg-gradient-to-r from-white via-white/90 to-transparent hover:bg-white/95 text-[#0C8CE9] rounded-r-lg"
				       style={{ pointerEvents: 'auto' }}
				       onClick={() => scroll("left")}
				       aria-label="Scroll left"
			       >
			       <FaChevronLeft size={18} />
			       </button>
			       <nav
				       ref={scrollRef}
				       className={`w-full flex items-center overflow-x-auto no-scrollbar scroll-smooth ${
				           scrolled 
				               ? "px-4 sm:px-8 gap-4 sm:gap-6" 
				               : "px-6 sm:px-12 gap-6 sm:gap-8"
				       }`}
				       style={{ scrollbarWidth: 'none' }}
			       >
			       {categories.map((cat) => (
				       <button
					       key={cat.key}
					       onClick={() => handleSelect(cat.key)}
					       className={`flex flex-col items-center justify-center transition-all duration-700 ease-in-out hover:text-[#0C8CE9] rounded-lg
						       ${selected === cat.key ? "text-[#0C8CE9] font-bold" : "text-gray-700"}
						       ${scrolled 
						           ? "px-4 sm:px-6 py-2 min-w-[60px] sm:min-w-[80px]" 
						           : "px-6 sm:px-8 py-3 min-w-[100px] sm:min-w-[120px]"
						       }
					       `}
					       >
					       <span className={`transition-all duration-700 ease-in-out ${scrolled ? "mb-0" : "mb-1"}`}>{cat.icon}</span>
					       {!scrolled && (
					           <span className="text-[10px] leading-tight text-center break-words transition-opacity duration-700 ease-in-out">{cat.label}</span>
					       )}
					       {selected === cat.key && (
				       <span className={`block bg-[#0C8CE9] rounded-full mt-1 transition-all duration-700 ease-in-out ${
						           scrolled ? "w-4 h-0.5" : "w-6 h-1"
						       }`} />
					       )}
					       </button>
			       ))}
			       </nav>
			       <button
				       className="hidden sm:flex items-center justify-center h-10 w-10 absolute right-0 z-10 bg-gradient-to-l from-white via-white/90 to-transparent hover:bg-white/95 text-[#0C8CE9] rounded-l-lg"
				       style={{ pointerEvents: 'auto' }}
				       onClick={() => scroll("right")}
				       aria-label="Scroll right"
			       >
			       <FaChevronRight size={18} />
			       </button>
			       <style jsx global>{`
				       .no-scrollbar::-webkit-scrollbar { display: none; }
				       .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
			       `}</style>
		       </div>
	       );
	}
