import Image from "next/image";
import Link from "next/link";

export default function CardFormateur({
	image = "/images/users/profile.jpg",
	date = "1 - 25 Jan 2025",
	title = "UI UX Master the Art of Design",
	description = "Design intuitive interfaces and seamless user experiences that captivate, simplify interactions, and create meaningful connections between users and digital products",
	link = "#",
	linkLabel = "Formtions",
	className = ""
}) {
	return (
		 <div className={`bg-white rounded-2xl shadow p-0 max-w-xs w-full flex flex-col overflow-hidden mx-auto ${className}`}>
			{/* Image en haut */}
			<div className="w-full h-60 bg-gray-100 relative">
				<Image src={image} alt={title} fill className="object-cover rounded-t-2xl" />
			</div>
			<div className="flex flex-col gap-2 p-6">
				<span className="text-xs text-gray-400 mb-1">{date}</span>
				<h3 className="text-lg font-bold text-[#00A3FF] leading-snug mb-1">{title}</h3>
				<p className="text-gray-500 text-sm mb-2 leading-snug">{description}</p>
				<Link href={link} className="text-[#00A3FF] text-sm font-medium hover:underline w-fit">{linkLabel}</Link>
			</div>
		</div>
	);
}
