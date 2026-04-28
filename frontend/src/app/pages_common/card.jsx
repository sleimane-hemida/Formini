// Grande carte réutilisable, design inspiré de la capture fournie
export function CardLarge({
    		image = "/images/users/formation.png",
    		category = "Design",
    		categoryIcon = <FaPaintBrush size={18} className="text-[#B1B5C3]" />,
    		views = "0",
    		title = "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
    		description = "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...",
    		avatar = "/images/users/profile.jpg",
    		author = "Lina",
    		oldPrice = "",
    		price = "800 MRU",
    		rating = 4,
    		onClick
    	}) {
		return (
			<div 
				onClick={onClick}
				className="bg-[#F5F8FF] rounded-2xl border border-gray-200 p-5 w-full max-w-[520px] h-full flex flex-col gap-4 cursor-pointer transition-all duration-300 mx-auto card-premium-hover"
			>
				{/* Image large en haut */}
				   <div className="rounded-xl overflow-hidden h-[200px] w-full mb-2 shrink-0">
					   <Image src={image} alt={title || "Formation"} width={520} height={200} className="object-cover w-full h-full" style={{ width: 'auto', height: 'auto' }} />
				   </div>
				   {/* Catégorie à gauche, durée à droite juste après l'image */}
				   <div className="flex items-center justify-between text-sm text-gray-400 mb-1 mt-2 shrink-0">
					   <span className="flex items-center gap-1">
						   {categoryIcon}
						   {category}
					   </span>
					   <span className="flex items-center gap-1">
						   <FiEye size={16} className="text-[#B1B5C3]" />
						   {views} vues
					   </span>
				   </div>
				   {/* Titre */}
				   <div className="font-semibold text-lg md:text-xl text-[#363A3D] leading-snug line-clamp-2 break-words shrink-0">
					   {title}
				   </div>
				   {/* Description */}
				   <div className="text-[#7D8592] text-base leading-tight line-clamp-3 break-words flex-1">
					   {description}
				   </div>
				   {/* Avis (étoiles) */}
				   <div className="flex items-center gap-1 text-yellow-400 mt-2 shrink-0">
					   {Array.from({ length: 5 }).map((_, i) => (
						   i < rating ? <FaStar key={i} className="w-4 h-4" /> : <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
					   ))}
				   </div>
				   {/* Bas de carte: avatar, nom, prix */}
				   <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 shrink-0">
					   <div className="flex items-center gap-2">
						   {avatar ? (
							   <Image src={avatar} alt={author || "Avatar"} width={48} height={48} className="rounded-full border-2 border-white shadow-sm w-12 h-12 object-cover" />
						   ) : (
							   <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-gradient-to-br from-[#0C8CE9] to-[#00A3FF] flex items-center justify-center text-white text-base font-bold">
								   {author?.charAt(0)?.toUpperCase()}
							   </div>
						   )}
						   <span className="font-medium text-[#363A3D] text-base truncate max-w-[150px]">{author}</span>
					   </div>
					   <div className="flex items-center gap-2 shrink-0">
						   {oldPrice && <span className="line-through text-gray-400 text-sm">{oldPrice}</span>}
						   <span className="text-[#00B67A] font-bold text-base md:text-lg">{price}</span>
					   </div>
				   </div>
			</div>
		);
	}

import Image from "next/image";
import { FaPaintBrush, FaRegClock, FaStar, FaRegStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

export default function Card({
	image = "/images/sample-course.jpg",
	category = "Design",
	categoryIcon = <FaPaintBrush size={16} className="text-[#B1B5C3]" />,
	views = "0",
	title = "AWS Certified solutions Architect",
	description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
	avatar = "/images/avatar-lina.jpg",
	author = "Lina",
	oldPrice = "100 MRU",
	price = "800 MRU",
	rating = 4,
	className = "",
	style = {},
	onClick
}) {
	return (
		 <div 
		 	onClick={onClick}
		 	className={`bg-[#F5F8FF] rounded-2xl border border-gray-200 p-3 w-[270px] max-w-full h-full flex flex-col gap-2 cursor-pointer transition-all duration-300 ${className} card-premium-hover`} style={style}
		 >
			   <div className="rounded-xl overflow-hidden h-[120px] w-full mb-2 shrink-0">
				   <Image src={image} alt={title || "Formation"} width={250} height={120} className="object-cover w-full h-full" style={{ width: 'auto', height: 'auto' }} />
			   </div>
			<div className="flex items-center text-xs text-gray-400 gap-3 mb-1 justify-between shrink-0">
				<span className="flex items-center gap-1">
					{categoryIcon}
					{category}
				</span>
				<span className="flex items-center gap-1">
					<FiEye size={16} className="text-[#B1B5C3]" />
					{views}
				</span>
			</div>
			   <div className="font-bold text-base text-gray-900 leading-snug mb-1 line-clamp-2 break-words shrink-0">{title}</div>
			   <div className="text-gray-400 text-xs mb-2 leading-tight line-clamp-3 break-words flex-1">{description}</div>
			{/* Avis (étoiles) */}
			<div className="flex items-center gap-1 text-yellow-400 mb-2 shrink-0">
				{Array.from({ length: 5 }).map((_, i) => (
					i < rating ? <FaStar key={i} className="w-3 h-3" /> : <FaRegStar key={i} className="w-3 h-3 text-gray-300" />
				))}
			</div>
			   <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-gray-100 shrink-0">
				   {avatar ? (
					   <Image src={avatar} alt={author || "Avatar"} width={32} height={32} className="rounded-full border-2 border-white shadow-sm w-8 h-8 object-cover shrink-0" />
				   ) : (
					   <div className="w-8 h-8 shrink-0 rounded-full border-2 border-white shadow-sm bg-gradient-to-br from-[#0C8CE9] to-[#00A3FF] flex items-center justify-center text-white text-xs font-bold">
						   {author?.charAt(0)?.toUpperCase()}
					   </div>
				   )}
				   <span className="font-semibold text-gray-900 text-[11px] truncate max-w-[80px]">{author}</span>
				   <div className="ml-auto flex items-center gap-1.5 shrink-0">
					   {oldPrice && <span className="line-through text-gray-400 text-[9px]">{oldPrice}</span>}
					   <span className="text-[#00B67A] font-bold text-sm">{price}</span>
				   </div>
			   </div>
		</div>
	);
}
