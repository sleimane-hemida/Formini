"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../composant/layout/header";
import Footer from "../../../composant/layout/footer";
import { HiUser, HiStar, HiMagnifyingGlass, HiMapPin, HiAcademicCap, HiChevronRight, HiFunnel } from 'react-icons/hi2';

export default function FormateurListe() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("Tous");

  // Mock data for formateurs
  const mockFormateurs = [
    {
      id: 1,
      name: "Ahmed Mahmoud",
      title: "Expert en Marketing Digital",
      expertise: ["SEO", "Copywriting", "Ads"],
      rating: 4.9,
      reviews: 124,
      location: "Nouakchott, Mauritanie",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Spécialiste en stratégie digitale avec plus de 10 ans d'expérience."
    },
    {
      id: 2,
      name: "Sidi Mohamed",
      title: "Développeur Fullstack Senior",
      expertise: ["React", "Node.js", "Java"],
      rating: 4.8,
      reviews: 89,
      location: "Nouadhibou, Mauritanie",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Passionné par la création d'applications web performantes et scalables."
    },
    {
      id: 3,
      name: "Mariem Mint Ahmed",
      title: "Designer UI/UX & Graphiste",
      expertise: ["Figma", "Photoshop", "Branding"],
      rating: 5.0,
      reviews: 56,
      location: "Nouakchott, Mauritanie",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Donner vie à vos idées à travers des interfaces intuitives et esthétiques."
    },
    {
      id: 4,
      name: "Abdoulaye Kane",
      title: "Consultant en Gestion de Projet",
      expertise: ["Agile", "Scrum", "Management"],
      rating: 4.7,
      reviews: 42,
      location: "Rosso, Mauritanie",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Expert en méthodologies agiles pour optimiser la productivité des équipes."
    },
    {
        id: 5,
        name: "Fatimetou Zahra",
        title: "Formatrice en Soft Skills",
        expertise: ["Leadership", "Prise de parole", "Vente"],
        rating: 4.9,
        reviews: 78,
        location: "Kiffa, Mauritanie",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        bio: "Accompagner les professionnels dans le développement de leurs compétences humaines."
    },
    {
        id: 6,
        name: "Ousmane Sy",
        title: "Ingénieur Cloud & DevOps",
        expertise: ["AWS", "Docker", "Kubernetes"],
        rating: 4.6,
        reviews: 31,
        location: "Atar, Mauritanie",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
        bio: "Expert en infrastructure cloud et automatisation des déploiements."
    }
  ];

  const expertises = ["Tous", "Marketing", "Développement", "Design", "Management", "Soft Skills"];

  const filteredFormateurs = mockFormateurs.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = selectedExpertise === "Tous" || f.title.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header onSearchChange={setSearchTerm} searchValue={searchTerm} />

      <main className="pt-28 pb-20 pl-4 pr-4 sm:pl-8 sm:pr-8 w-full max-w-full">
        
        <div className="flex flex-col lg:flex-row gap-3 mt-8">
          
          {/* Sidebar Filters - 200px width for better spacing */}
          <aside className="w-full lg:w-[180px] flex-shrink-0">
            <div className="sticky top-28 space-y-6">
                <div>
                    <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <HiFunnel className="w-4 h-4" />
                        Catégories
                    </h3>
                    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0">
                        {expertises.map(exp => (
                            <button
                                key={exp}
                                onClick={() => setSelectedExpertise(exp)}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal text-left ${selectedExpertise === exp ? 'bg-[#0C8CE9] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-[#0C8CE9]'}`}
                            >
                                <span>{exp}</span>
                                <HiChevronRight className={`hidden lg:block w-4 h-4 transition-transform ${selectedExpertise === exp ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="hidden lg:block pt-6 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">
                        Trouvez l'expert idéal pour votre projet.
                    </p>
                </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-8">
                <div className="relative">
                    <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                    type="text" 
                    placeholder="Rechercher par nom ou titre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-gray-700 font-medium transition-all text-sm"
                    />
                </div>
            </div>

            {/* Grid of Cards - Responsive auto-fill with min 250px width */}
            {filteredFormateurs.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
                {filteredFormateurs.map((f) => (
                  <div 
                    key={f.id} 
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
                  >
                    {/* Card Header - Compact */}
                    <div className="relative h-32 bg-gradient-to-br from-[#0C8CE9] to-[#0A71BC] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                        <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                            {f.image ? (
                                <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                                    <HiUser className="w-10 h-10 text-[#0C8CE9]" />
                                </div>
                            )}
                        </div>
                        {/* Badge Rating */}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/20">
                            <HiStar className="w-3 h-3 text-yellow-400" />
                            <span className="text-[10px] font-bold text-gray-900">{f.rating}</span>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-0.5 group-hover:text-[#0C8CE9] transition-colors truncate">{f.name}</h3>
                      <p className="text-[#0C8CE9] font-bold text-[11px] mb-3 truncate">{f.title}</p>
                      
                      <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mb-3">
                        <HiMapPin className="w-3 h-3 text-gray-400" />
                        {f.location}
                      </div>

                      <div className="h-8 mb-4">
                        <p className="text-gray-600 text-[11px] line-clamp-2 leading-tight">
                            {f.bio}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5 min-h-[40px]">
                        {f.expertise.slice(0, 3).map(skill => (
                          <span key={skill} className="bg-gray-50 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-tight h-fit">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <button 
                            onClick={() => router.push(`/allFormateur/formateurDetails?id=${f.id}`)}
                            className="w-full flex items-center justify-center gap-2 bg-[#0C8CE9] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#0A71BC] transition-all shadow-sm active:scale-95"
                        >
                            Voir le profil
                            <HiAcademicCap className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <HiMagnifyingGlass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun formateur trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de filtrage.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
