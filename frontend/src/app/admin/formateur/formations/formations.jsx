"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebarPage } from '../../sidebar/sidebar';
import { AdminHeaderPage } from '../../headerAdmin/headerAdmin';
import { 
  FaArrowLeft, FaPlayCircle, FaUsers, FaStar, FaRegClock, FaRegStar, 
  FaTimes, FaBookOpen, FaGlobeAfrica, FaCertificate, FaImage,
  FaChevronDown, FaChevronUp, FaFileAlt, FaCheckCircle
} from 'react-icons/fa';
import { FiBookOpen, FiAward, FiBarChart2, FiCalendar } from 'react-icons/fi';

const mockFormations = [
  { 
    id: 1, 
    title: "Masterclass UX/UI Design — De zéro à Pro", 
    category: "Design", 
    price: "600 MRU", 
    students: 1284, 
    rating: 5, 
    image: "/images/hero/design-formation.png",
    duration: "3 Mois",
    level: "Débutant → Avancé",
    language: "Français",
    lastUpdated: "Avril 2026",
    description: "Apprenez à concevoir des interfaces modernes et engageantes avec Figma. Ce cours couvre tout le processus de conception, des wireframes aux prototypes interactifs.",
    whatYouWillLearn: [
      "Maîtriser les fondamentaux de l'UX Design",
      "Concevoir des interfaces UI professionnelles avec Figma",
      "Créer des prototypes interactifs et animés",
      "Mener des tests utilisateurs et itérer sur vos designs"
    ],
    modules: [
      {
        id: 1,
        title: "Introduction au Design UX/UI",
        duration: "45 min",
        lecons: [
          { id: 1, title: "Qu'est-ce que le UX Design ?", duration: "8 min", type: "video" },
          { id: 2, title: "Différence entre UX et UI", duration: "6 min", type: "video" },
          { id: 3, title: "Les outils du designer moderne", duration: "10 min", type: "video" },
          { id: 4, title: "Quiz — Fondamentaux UX", duration: "5 min", type: "quiz" },
        ],
      },
      {
        id: 2,
        title: "Maîtriser Figma de A à Z",
        duration: "2h 10 min",
        lecons: [
          { id: 5, title: "Prise en main de l'interface Figma", duration: "12 min", type: "video" },
          { id: 6, title: "Composants et variantes", duration: "18 min", type: "video" },
          { id: 7, title: "Auto Layout & Responsive Design", duration: "22 min", type: "video" },
        ],
      }
    ]
  },
  { 
    id: 2, 
    title: "Développement Web Fullstack React/Node", 
    category: "Développement", 
    price: "1200 MRU", 
    students: 850, 
    rating: 4.8, 
    image: "/images/hero/dev-formation.png",
    duration: "6 Mois",
    level: "Intermédiaire",
    language: "Français",
    lastUpdated: "Mars 2024",
    description: "Devenez un développeur complet en maîtrisant le frontend avec React et le backend avec Node.js et MongoDB.",
    whatYouWillLearn: [
      "Maîtriser React.js et la gestion d'état avec Redux",
      "Développer des API REST robustes avec Node.js et Express",
      "Utiliser MongoDB pour la persistance des données",
      "Déployer des applications web en production"
    ],
    modules: [
      {
        id: 1,
        title: "Architecture Frontend Moderne",
        duration: "1h 30 min",
        lecons: [
          { id: 1, title: "Introduction à React", duration: "15 min", type: "video" },
          { id: 2, title: "Hooks et Cycle de vie", duration: "25 min", type: "video" },
        ],
      }
    ]
  }
];

function ModuleAccordion({ module, index, isOpen, onToggle }) {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[10px] font-black text-gray-300 shrink-0 w-6">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="font-black text-gray-800 text-sm truncate">{module.title}</p>
            <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">
              {module.lecons.length} leçons · {module.duration}
            </p>
          </div>
        </div>
        <span className="text-gray-300 shrink-0 ml-4">
          {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-50 bg-gray-50/30 divide-y divide-gray-50">
          {module.lecons.map((lecon) => (
            <div
              key={lecon.id}
              className="flex items-center gap-4 px-8 py-4 text-xs hover:bg-white transition-colors cursor-default"
            >
              <div className="w-12 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                <FaPlayCircle className="text-gray-300" size={14} />
              </div>
              <span className="flex-1 font-bold text-gray-600 truncate">
                {lecon.title}
              </span>
              {lecon.duration && (
                <span className="text-[10px] text-gray-400 font-bold shrink-0 flex items-center gap-1.5">
                  <FaRegClock size={10} />
                  {lecon.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FormateurFormationsAdmin({ formateurId }) {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [openModules, setOpenModules] = useState([0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFormations = mockFormations.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModule = (i) =>
    setOpenModules((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <AdminSidebarPage 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      <div className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <AdminHeaderPage 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <main className="p-4 sm:p-8 pb-20 lg:pb-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
              >
                <FaArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl font-black text-gray-800 tracking-tight">Formations du Formateur</h1>
                <p className="text-gray-400 text-xs">Liste des cours créés par ce formateur.</p>
              </div>
            </div>
            {/* Stats Bar simplified inside header */}
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span className="px-3 py-1 bg-blue-50 text-[#0C8CE9] rounded-lg border border-blue-100">{mockFormations.length} Formations</span>
            </div>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFormations.map((formation) => (
              <div 
                key={formation.id}
                onClick={() => setSelectedFormation(formation)}
                className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-50/50 transition-all cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={formation.image} alt={formation.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-[#0C8CE9]">
                      {formation.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-gray-800 text-sm leading-tight mb-3 line-clamp-2">{formation.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                      <FaUsers className="text-[#0C8CE9]" size={12} />
                      {formation.students}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                      <FaStar size={12} />
                      {formation.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-lg font-black text-[#0C8CE9]">{formation.price}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Voir détails</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* MODALE DE DÉTAILS (90vh w/h) */}
      {selectedFormation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[40px] w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header Modale */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-50 shrink-0 bg-white z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0C8CE9]">
                  <FaBookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-800 tracking-tight leading-none">Détails de la Formation</h2>
                  <p className="text-gray-400 text-xs mt-1">Aperçu complet du contenu et des statistiques.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedFormation(null);
                  setOpenModules([0]);
                }}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Corps Modale (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50/20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Colonne Gauche - Infos & Programme */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Banner */}
                  <div className="relative h-72 rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
                    <img src={selectedFormation.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#0C8CE9] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                          {selectedFormation.category}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tight">{selectedFormation.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">À propos de cette formation</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {selectedFormation.description}
                    </p>
                  </div>

                  {/* Ce que vous allez apprendre */}
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">Ce que vous allez apprendre</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFormation.whatYouWillLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                            <FaCheckCircle size={8} />
                          </div>
                          <p className="text-xs font-bold text-gray-600">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programme / Modules Accordion */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">Programme de la formation</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {selectedFormation.modules.length} modules · {selectedFormation.modules.reduce((acc, m) => acc + m.lecons.length, 0)} leçons
                      </p>
                    </div>
                    <div className="space-y-3">
                      {selectedFormation.modules.map((module, index) => (
                        <ModuleAccordion
                          key={module.id}
                          module={module}
                          index={index}
                          isOpen={openModules.includes(index)}
                          onToggle={() => toggleModule(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colonne Droite - Sidebar Modale */}
                <div className="space-y-6">
                  {/* Carte Prix & Info */}
                  <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Prix de vente</p>
                      <p className="text-3xl font-black text-[#0C8CE9] tracking-tight">{selectedFormation.price}</p>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-gray-100">
                      {[
                        { icon: <FiBarChart2 />, label: "Niveau", value: selectedFormation.level },
                        { icon: <FaGlobeAfrica />, label: "Langue", value: selectedFormation.language },
                        { icon: <FiCalendar />, label: "Mise à jour", value: selectedFormation.lastUpdated },
                        { icon: <FiBookOpen />, label: "Modules", value: selectedFormation.modules.length },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                            {row.icon}
                            {row.label}
                          </span>
                          <span className="font-black text-gray-700">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <button className="w-full py-4 bg-[#0C8CE9] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0a70bb] shadow-lg shadow-blue-100 transition-all">
                      Modifier la Formation
                    </button>
                    <button className="w-full py-4 bg-white text-gray-400 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      Voir la page publique
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
