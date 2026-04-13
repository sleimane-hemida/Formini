// Grande carte réutilisable, design inspiré de la capture fournie
export function CardLarge({
    		image = "/images/users/formation.png",
    		category = "Design",
    		categoryIcon = <FaPaintBrush size={18} className="text-[#B1B5C3]" />,
    		duration = "3 Month",
    		title = "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
    		description = "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...",
    		avatar = "/images/users/profile.jpg",
    		author = "Lina",
    		oldPrice = "",
    		price = "800 MRU",
    		rating = 4
    	}) {
		return (
			<div className="bg-[#F5F8FF] rounded-2xl shadow-sm p-5 w-full max-w-[520px] flex flex-col gap-4 cursor-pointer transition hover:shadow-lg mx-auto">
				{/* Image large en haut */}
				   {/* Image large en haut */}
				   <div className="rounded-xl overflow-hidden h-[200px] w-full mb-2">
					   <Image src={image} alt={title} width={520} height={200} className="object-cover w-full h-full" style={{height: 'auto'}} />
				   </div>
				   {/* Catégorie à gauche, durée à droite juste après l'image */}
				   <div className="flex items-center justify-between text-sm text-gray-400 mb-1 mt-2">
					   <span className="flex items-center gap-1">
						   {categoryIcon}
						   {category}
					   </span>
					   <span className="flex items-center gap-1">
						   <FaRegClock size={16} className="text-[#B1B5C3]" />
						   {duration}
					   </span>
				   </div>
				   {/* Titre */}
				   <div className="font-semibold text-lg md:text-xl text-[#363A3D] leading-snug">
					   {title}
				   </div>
				   {/* Description */}
				   <div className="text-[#7D8592] text-base leading-tight">
					   {description}
				   </div>
				   {/* Avis (étoiles) */}
				   <div className="flex items-center gap-1 text-yellow-400 mt-2">
					   {Array.from({ length: 5 }).map((_, i) => (
						   i < rating ? <FaStar key={i} className="w-4 h-4" /> : <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
					   ))}
				   </div>
				   {/* Bas de carte: avatar, nom, prix */}
				   <div className="flex items-center justify-between mt-auto pt-2">
					   <div className="flex items-center gap-2">
						   <Image src={avatar} alt={author} width={40} height={40} className="rounded-full border-2 border-white shadow-sm" style={{width: 'auto'}} />
						   <span className="font-medium text-[#363A3D] text-base">{author}</span>
					   </div>
					   <div className="flex items-center gap-2">
						   {oldPrice && <span className="line-through text-gray-400 text-sm">{oldPrice}</span>}
						   <span className="text-[#00B67A] font-bold text-base md:text-lg">{price}</span>
					   </div>
				   </div>
			</div>
		);
	}

import Image from "next/image";
import { FaPaintBrush, FaRegClock, FaStar, FaRegStar } from "react-icons/fa";

export default function Card({
	image = "/images/sample-course.jpg",
	category = "Design",
	categoryIcon = <FaPaintBrush size={16} className="text-[#B1B5C3]" />,
	duration = "3 Month",
	title = "AWS Certified solutions Architect",
	description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
	avatar = "/images/avatar-lina.jpg",
	author = "Lina",
	oldPrice = "100 MRU",
	price = "800 MRU",
	rating = 4,
	className = "",
	style = {}
}) {
	return (
		 <div className={`bg-[#F5F8FF] rounded-2xl shadow-sm p-3 w-[270px] max-w-full flex flex-col gap-2 cursor-pointer transition hover:shadow-lg ${className}`} style={style}>
			   <div className="rounded-xl overflow-hidden h-[90px] w-full mb-2">
				   <Image src={image} alt={title} width={250} height={90} className="object-cover w-full h-full" style={{height: 'auto'}} />
			   </div>
			<div className="flex items-center text-xs text-gray-400 gap-3 mb-1 justify-between">
				<span className="flex items-center gap-1">
					{categoryIcon}
					{category}
				</span>
				<span className="flex items-center gap-1">
					<FaRegClock size={16} className="text-[#B1B5C3]" />
					{duration}
				</span>
			</div>
			   <div className="font-bold text-base text-gray-900 leading-snug mb-1">{title}</div>
			   <div className="text-gray-400 text-xs mb-2 leading-tight">{description}</div>
			{/* Avis (étoiles) */}
			<div className="flex items-center gap-1 text-yellow-400 mb-2">
				{Array.from({ length: 5 }).map((_, i) => (
					i < rating ? <FaStar key={i} className="w-3 h-3" /> : <FaRegStar key={i} className="w-3 h-3 text-gray-300" />
				))}
			</div>
			   <div className="flex items-center gap-2 mt-auto">
				   <Image src={avatar} alt={author} width={28} height={28} className="rounded-full border-2 border-white shadow-sm" style={{width: 'auto'}} />
				   <span className="font-semibold text-gray-900 text-sm">{author}</span>
				   <span className="line-through text-gray-400 text-xs ml-2">{oldPrice}</span>
				   <span className="text-[#00B67A] font-bold text-sm ml-1">{price}</span>
			   </div>
		</div>
	);
}
