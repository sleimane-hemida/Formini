import Image from "next/image";
// import studentImg from "../../../public/student.png"; // Remplace par le bon chemin de ton image

export default function HomeCommon() {
	       return (
		       <div className="relative min-h-[500px] bg-white overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 gap-8 md:gap-0">
			{/* Cercles bleus décoratifs - 6 points, proches du texte mais sans le toucher */}
			{/* Top left, proche du texte */}
			<div className="absolute top-16 left-2 w-5 h-5 md:w-8 md:h-8 bg-[#0C8CE9] rounded-full opacity-80" />
			{/* Top center, au-dessus du texte */}
			<div className="absolute top-8 left-1/2 w-6 h-6 md:w-10 md:h-10 bg-[#0C8CE9] rounded-full opacity-80" style={{transform: 'translateX(-50%)'}} />
			{/* Top right, proche du texte */}
			<div className="absolute top-16 right-2 w-5 h-5 md:w-8 md:h-8 bg-[#0C8CE9] rounded-full opacity-80" />
			{/* Milieu gauche */}
			<div className="absolute top-1/2 left-120 w-4 h-4 md:w-7 md:h-7 bg-[#0C8CE9] rounded-full opacity-60" />
			{/* Milieu droite */}
			<div className="absolute top-1/2 right-4 w-4 h-4 md:w-7 md:h-7 bg-[#0C8CE9] rounded-full opacity-60" />
			{/* Bas centre */}
			<div className="absolute bottom-30 left-1/2 w-5 h-5 md:w-8 md:h-8 bg-[#0C8CE9] rounded-full opacity-40" style={{transform: 'translateX(-50%)'}} />


				   {/* Logo et slogan */}
				   <div className="relative z-10 flex flex-col items-start w-full md:w-1/2 md:pl-2 lg:pl-4 xl:pl-8">
					  {/* Losange blanc supprimé */}
					  {/* Cercle bleu à la place du slogan, centré et plus grand, positionné en haut */}
						   <div className="w-16 h-16 bg-[#0C8CE9] rounded-full mx-auto mt-[-1rem] mb-4" style={{marginLeft: '0px'}} />
						  <div className="mt-8 font-bold text-3xl sm:text-5xl md:text-6xl max-w-xl leading-tight select-text text-left">
							  <span className="text-black">Améliorer tes </span>
							  <span className="text-[#0C8CE9]">compétences</span><br />
							  <span className="text-black">Fait brillé </span>
							  <span className="text-[#0C8CE9]">ta carrière</span>
						  </div>
				   </div>

			{/* Bouton Apprendre */}
			   <div className="absolute bottom-6 md:bottom-0 left-8 z-30">
			   <button className="hidden md:flex group items-center gap-2 bg-white text-[#0C8CE9] font-semibold px-5 py-2 rounded-lg shadow-lg text-base transition-colors duration-200 hover:bg-[#E6F1FA] hover:text-[#0A71BC] focus:outline-none cursor-pointer" type="button">
					Apprendre
					<span className="bg-[#0C8CE9] rounded-md p-1 transition-colors duration-200 group-hover:bg-[#0A71BC]">
						<svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
							<path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</span>
				</button>
			</div>


				   {/* Image et cercle bleu */}
						   <div className="flex-1 flex justify-center md:justify-end items-center relative z-10 mt-8 md:mt-0 hidden md:flex">
							   <div className="relative">
								   <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] xl:w-[400px] xl:h-[400px] bg-[#0C8CE9] rounded-full flex items-center justify-center relative">
									   <div className="absolute w-full h-full border-2 border-[#0C8CE9] rounded-full top-2 left-2 md:top-4 md:left-4" style={{zIndex: 1}} />
									   <Image src="/images/hero/woman_with_books.png" alt="Héros" width={260} height={260} className="w-32 h-32 sm:w-48 sm:h-48 md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] xl:w-[340px] xl:h-[340px] object-cover object-top rounded-full z-10" />
								   </div>
							   </div>
						   </div>
		</div>
	);
}
