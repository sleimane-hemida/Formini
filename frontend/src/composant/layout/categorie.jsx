"use client";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCode, FaPaintBrush, FaBriefcase, FaBullhorn, FaChartLine, FaLanguage, FaUserGraduate, FaBookOpen, FaHeartbeat, FaTools, FaBalanceScale, FaVideo, FaGraduationCap } from "react-icons/fa";

const categories = [
	{
		key: "foryou",
		label: "Pour vous",
		icon: <FaGraduationCap size={18} />,
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

export { categories };
