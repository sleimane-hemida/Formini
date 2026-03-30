
import Image from "next/image";
import { FaPaintBrush } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

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
	price = "800 MRU"
}) {
	return (
		<div className="bg-[#F5F8FF] rounded-2xl shadow-sm p-3 w-[250px] max-w-full flex flex-col gap-2 cursor-pointer transition hover:shadow-lg">
			   <div className="rounded-xl overflow-hidden h-[90px] w-full mb-2">
				   <Image src={image} alt={title} width={250} height={90} className="object-cover w-full h-full" />
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
			   <div className="flex items-center gap-2 mt-auto">
				   <Image src={avatar} alt={author} width={28} height={28} className="rounded-full border-2 border-white shadow-sm" />
				   <span className="font-semibold text-gray-900 text-sm">{author}</span>
				   <span className="line-through text-gray-400 text-xs ml-2">{oldPrice}</span>
				   <span className="text-[#00B67A] font-bold text-sm ml-1">{price}</span>
			   </div>
		</div>
	);
}
