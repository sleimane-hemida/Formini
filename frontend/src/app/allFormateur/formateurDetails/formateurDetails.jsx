"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../../composant/layout/header";
import Footer from "../../../composant/layout/footer";
import { HiUser, HiStar, HiMapPin, HiEnvelope, HiPhone, HiArrowLeft, HiCheckBadge } from 'react-icons/hi2';

export default function FormateurDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // In a real app, you would fetch based on ID. 
  // Here we'll show a default "Profile not found" or mock data.
  const formateur = {
    id: id || 1,
    name: "Ahmed Mahmoud",
    title: "Expert en Marketing Digital & Stratégie",
    expertise: ["SEO", "Copywriting", "Ads Google", "Meta Ads", "Inbound Marketing"],
    rating: 4.9,
    reviews: 124,
    location: "Nouakchott, Mauritanie",
    bio: "Spécialiste en stratégie digitale avec plus de 10 ans d'expérience. J'aide les entreprises et les particuliers à accroître leur visibilité en ligne et à optimiser leur retour sur investissement à travers des campagnes marketing ciblées.",
    email: "ahmed.mahmoud@email.mr",
    phone: "+222 44 44 44 44",
    students: 1540,
    courses: 12,
    languages: ["Arabe", "Français", "Anglais"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0C8CE9] font-bold mb-8 transition-colors group"
        >
          <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à la liste
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                  {formateur.image ? (
                      <img src={formateur.image} alt={formateur.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0C8CE9] to-[#0A71BC] flex items-center justify-center">
                        <HiUser className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full z-10" title="En ligne" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                {formateur.name}
                <HiCheckBadge className="w-6 h-6 text-[#0C8CE9]" />
              </h2>
              <p className="text-[#0C8CE9] font-bold text-sm mb-6">{formateur.title}</p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center px-4">
                  <div className="text-xl font-bold text-gray-900">{formateur.rating}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Note</div>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="text-center px-4">
                  <div className="text-xl font-bold text-gray-900">{formateur.students}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Élèves</div>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="text-center px-4">
                  <div className="text-xl font-bold text-gray-900">{formateur.courses}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cours</div>
                </div>
              </div>

              <button className="w-full bg-[#0C8CE9] text-white py-4 rounded-2xl font-bold hover:bg-[#0A71BC] transition-all shadow-lg shadow-blue-100 active:scale-95 mb-4">
                Etre informer des nouveaux cours
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <HiEnvelope className="w-5 h-5 text-[#0C8CE9]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Email</div>
                    <div className="text-sm font-semibold text-gray-700">{formateur.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <HiPhone className="w-5 h-5 text-[#0C8CE9]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Téléphone</div>
                    <div className="text-sm font-semibold text-gray-700">{formateur.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <HiMapPin className="w-5 h-5 text-[#0C8CE9]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Localisation</div>
                    <div className="text-sm font-semibold text-gray-700">{formateur.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">À propos de moi</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                "{formateur.bio}"
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-4">Mes domaines d'expertise</h4>
              <div className="flex flex-wrap gap-3 mb-10">
                {formateur.expertise.map(skill => (
                  <span key={skill} className="bg-blue-50 text-[#0C8CE9] px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-2">Langues parlées</div>
                  <div className="flex gap-2">
                    {formateur.languages.map(l => (
                      <span key={l} className="text-gray-700 font-bold text-sm bg-white px-3 py-1 rounded-lg border border-gray-100">{l}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-2">Membre depuis</div>
                  <div className="text-gray-700 font-bold text-sm">Janvier 2024</div>
                </div>
              </div>
            </div>

            {/* Courses section placeholder */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Formations proposées</h3>
                <button className="text-[#0C8CE9] font-bold text-sm hover:underline">Voir tout</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="w-24 h-16 bg-blue-100 rounded-lg flex-shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-1">Stratégie Marketing Avancée</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <HiStar className="text-yellow-400 w-3 h-3" />
                        4.8 (45 avis)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
