"use client";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCode, FaPaintBrush, FaBriefcase, FaBullhorn, FaChartLine, FaLanguage, FaUserGraduate, FaBookOpen, FaHeartbeat, FaTools, FaBalanceScale, FaVideo } from "react-icons/fa";

const categories = [
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



	export default function CategorieBar() {
	       const [selected, setSelected] = useState("foryou");
	       const scrollRef = useRef(null);

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
				       className="hidden sm:flex items-center justify-center h-10 w-8 absolute left-0 z-10 bg-gradient-to-r from-white via-white/80 to-transparent hover:bg-white/90 text-[#0C8CE9]"
				       style={{ pointerEvents: 'auto' }}
				       onClick={() => scroll("left")}
				       aria-label="Scroll left"
			       >
			       <FaChevronLeft size={18} />
			       </button>
			       <nav
				       ref={scrollRef}
				       className="w-full flex items-center px-2 sm:px-4 overflow-x-auto gap-1 sm:gap-0 no-scrollbar scroll-smooth"
				       style={{ scrollbarWidth: 'none' }}
			       >
			       {categories.map((cat) => (
				       <button
					       key={cat.key}
					       onClick={() => setSelected(cat.key)}
					       className={`flex flex-col items-center justify-center px-2 sm:px-4 py-2 mx-0 sm:mx-1 focus:outline-none transition-colors
						       ${selected === cat.key ? "text-black font-bold" : "text-gray-700"}
						       min-w-[64px] sm:min-w-[80px]
					       `}
					       >
					       <span className="mb-1">{cat.icon}</span>
					       <span className="text-[10px] leading-tight text-center break-words">{cat.label}</span>
					       {selected === cat.key && (
						       <span className="block w-6 h-1 bg-black rounded-full mt-1" />
					       )}
					       </button>
			       ))}
			       </nav>
			       <button
				       className="hidden sm:flex items-center justify-center h-10 w-8 absolute right-0 z-10 bg-gradient-to-l from-white via-white/80 to-transparent hover:bg-white/90 text-[#0C8CE9]"
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
