import Image from "next/image";
import { FaThLarge, FaRegClone, FaUsers } from "react-icons/fa";

export default function PubFormateur() {
	return (
		<section className="w-full py-12 px-2 md:px-0 flex justify-center">
			<div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-8">
				{/* Illustration à gauche */}
				<div className="flex-1 flex justify-center md:justify-start mb-8 md:mb-0">
					<Image
						src="/images/hero/pana.png"
						alt="Illustration formation"
						width={420}
						height={320}
						className="w-full max-w-[420px] h-auto"
						style={{ height: 'auto' }}
						priority
					/>
				</div>
				   {/* Texte et avantages */}
				   <div className="flex flex-col items-center justify-center w-full max-w-xl">
					
					<ul className="flex flex-col gap-6 w-full">
						<li className="flex items-start gap-4">
							  <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#00A3FF] text-[#00A3FF] text-2xl mt-1 bg-white" style={{boxSizing: 'border-box', padding: '0.25rem'}}>
								<FaThLarge />
							</span>
							<div>
								<div className="text-black text-base font-normal mb-1">Achetez une formation vous aurez l’accès total au formation avec ces modules et ces leçons</div>
							</div>
						</li>
						<li className="flex items-start gap-4">
							  <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#00A3FF] text-[#00A3FF] text-2xl mt-1 bg-white" style={{boxSizing: 'border-box', padding: '0.25rem'}}>
								<FaRegClone />
							</span>
							<div>
								<div className="text-black text-base font-normal mb-1">Abonné vous pour plus de fromation de cours de modules et de leçons gratuitement</div>
							</div>
						</li>
						<li className="flex items-start gap-4">
							  <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#00A3FF] text-[#00A3FF] text-2xl mt-1 bg-white" style={{boxSizing: 'border-box', padding: '0.25rem'}}>
								<FaUsers />
							</span>
							<div>
								<div className="text-black text-base font-normal mb-1">Devenez formateurs en exposant des formation avec leurs prix et leurs secteurs</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
