import Image from "next/image";
// import studentImg from "../../../public/student.png"; // Remplace par le bon chemin de ton image

export default function HomeCommon() {
		       return (
			       <div className="relative min-h-[500px] bg-white overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 gap-8 md:gap-0">
			{/* Cercles bleus décoratifs */}
			<div className="absolute top-10 left-1/2 w-6 h-6 bg-[#0C8CE9] rounded-full opacity-80" style={{transform: 'translateX(-50%)'}} />
			<div className="absolute top-1/4 left-2/5 w-8 h-8 bg-[#0C8CE9] rounded-full opacity-80" />
			<div className="absolute bottom-20 left-1/3 w-16 h-16 bg-[#0C8CE9] rounded-full opacity-40" />
			<div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[#0C8CE9] rounded-full opacity-80" />
			<div className="absolute bottom-10 right-1/3 w-8 h-8 bg-[#0C8CE9] rounded-full opacity-60" />
			<div className="absolute top-10 right-1/2 w-4 h-4 bg-[#0C8CE9] rounded-full opacity-80" style={{transform: 'translateX(50%)'}} />


			       {/* Logo et slogan */}
			       <div className="absolute top-8 left-8 flex flex-col items-start z-10" style={{marginLeft: '10px'}}>
					   {/* Losange blanc supprimé */}
					   {/* Cercle bleu à la place du slogan, centré et plus grand, positionné en haut */}
							<div className="w-16 h-16 bg-[#0C8CE9] rounded-full mx-auto mt-[-1rem] mb-4" style={{marginLeft: '0px'}} />
						   <div className="mt-8 font-bold text-3xl sm:text-5xl md:text-6xl max-w-xl leading-tight select-text text-center md:text-left">
							   <span className="text-black">Améliorer tes </span>
							   <span className="text-[#0C8CE9]">compétences</span><br />
							   <span className="text-black">Fait brillé </span>
							   <span className="text-[#0C8CE9]">ta carrière</span>
						   </div>
			       </div>

			{/* Bouton Apprendre */}
			   <div className="absolute bottom-16 left-8 z-30">
			   <button className="group flex items-center gap-2 bg-white text-[#0C8CE9] font-semibold px-5 py-2 rounded-lg shadow-lg text-base transition-colors duration-200 hover:bg-[#E6F1FA] hover:text-[#0A71BC] focus:outline-none cursor-pointer" type="button">
					Apprendre
					<span className="bg-[#0C8CE9] rounded-md p-1 transition-colors duration-200 group-hover:bg-[#0A71BC]">
						<svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</span>
				</button>
			</div>


			       {/* Image et cercle bleu */}
				       <div className="flex-1 flex justify-center md:justify-end items-center relative z-10 mt-8 md:mt-0">
					       <div className="relative">
						       <div className="w-48 h-48 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] bg-[#0C8CE9] rounded-full flex items-center justify-center relative">
							       <div className="absolute w-full h-full border-2 border-[#0C8CE9] rounded-full top-2 left-2 md:top-4 md:left-4" style={{zIndex: 1}} />
							       <Image src="/images/hero/woman_with_books.png" alt="Héros" width={380} height={380} className="w-40 h-40 sm:w-60 sm:h-60 md:w-[340px] md:h-[340px] object-cover object-top rounded-full z-10" />
						       </div>
					       </div>
				       </div>
		</div>
	);
}
