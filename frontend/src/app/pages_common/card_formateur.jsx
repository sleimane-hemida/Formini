import React from "react";
import { HiUser, HiStar, HiMapPin, HiAcademicCap } from 'react-icons/hi2';
import { useRouter } from "next/navigation";

export default function CardFormateur({
    id,
    name = "Nom du Formateur",
    title = "Expertise principale",
    image = "/images/users/profile.jpg",
    rating = 5.0,
    location = "Lieu",
    description = "Brève biographie du formateur...",
    expertise = [],
    className = ""
}) {
    const router = useRouter();

    return (
        <div className={`group bg-white rounded-2xl border border-gray-200 transition-all duration-300 overflow-hidden flex flex-col h-full max-w-xs w-full ${className} card-premium-hover`}>
            {/* Card Header - Compact */}
            <div className="relative h-32 bg-gradient-to-br from-[#0C8CE9] to-[#0A71BC] flex items-center justify-center overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/30 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {image ? (
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                            <HiUser className="w-10 h-10 text-[#0C8CE9]" />
                        </div>
                    )}
                </div>
                {/* Badge Rating */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/20">
                    <HiStar className="w-3 h-3 text-yellow-400" />
                    <span className="text-[10px] font-bold text-gray-900">{rating}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-0.5 group-hover:text-[#0C8CE9] transition-colors truncate">{name}</h3>
                <p className="text-[#0C8CE9] font-bold text-[11px] mb-3 truncate">{title}</p>
                
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mb-3">
                    <HiMapPin className="w-3 h-3 text-gray-400" />
                    {location}
                </div>

                <div className="h-8 mb-4">
                    <p className="text-gray-600 text-[11px] line-clamp-2 leading-tight">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5 min-h-[40px]">
                    {expertise.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-gray-50 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-tight h-fit">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="mt-auto">
                    <button 
                        onClick={() => router.push(`/allFormateur/formateurDetails?id=${id}`)}
                        className="w-full flex items-center justify-center gap-2 bg-[#0C8CE9] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#0A71BC] transition-all active:scale-95"
                    >
                        Voir le profil
                        <HiAcademicCap className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
