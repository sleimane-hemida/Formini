"use client";
import React, { useState } from 'react';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { 
  FaEllipsisV, FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaImage, 
  FaClock, FaMinusCircle, FaSort, FaSortUp, FaSortDown,
  FaPlayCircle, FaUsers, FaStar, FaRegClock, FaRegStar, 
  FaBookOpen, FaGlobeAfrica, FaChevronDown, FaChevronUp, FaFileAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { FiBookOpen, FiBarChart2, FiCalendar } from 'react-icons/fi';

const mockAchats = [
  { id: 1, user: 'Amadou Diallo', trainer: 'Sidi Mohamed', course: 'Masterclass UX/UI Design — De zéro à Pro', image: '/images/hero/design-formation.png', status: 'validé', date: '12 Mars 2024', amount: '45,000 MRU', method: 'Virement bancaire', ref: 'TRX-99201' },
  { id: 2, user: 'Fatouma Sy', trainer: 'Oumar Kane', course: 'UI/UX Design Fundamentals', image: '/images/hero/design-formation.png', status: 'en attente', date: '13 Mars 2024', amount: '35,000 MRU', method: 'Cash', ref: 'TRX-99202' },
  { id: 3, user: 'Sidi Mohamed', trainer: 'Amadou Diallo', course: 'Développement Web Fullstack React/Node', image: '/images/hero/dev-formation.png', status: 'capture_reçue', date: '14 Mars 2024', amount: '50,000 MRU', method: 'Capture reçue', ref: 'TRX-99203' },
  { id: 4, user: 'Mouloud Ameine', trainer: 'Fatouma Sy', course: 'SEO pour Débutants', image: '/images/hero/data-formation.png', status: 'expiré', date: '11 Mars 2024', amount: '25,000 MRU', method: 'Bank Transfer', ref: 'TRX-99204' },
  { id: 5, user: 'Aminata Sow', trainer: 'Sidi Mohamed', course: 'Digital Marketing Essentials', image: '/images/hero/design-formation.png', status: 'rejeté', date: '15 Mars 2024', amount: '40,000 MRU', method: 'Credit Card', ref: 'TRX-99205' },
  { id: 6, user: 'Oumar Kane', trainer: 'Amadou Diallo', course: 'DevOps & Docker', image: '/images/hero/dev-formation.png', status: 'annulé', date: '10 Mars 2024', amount: '60,000 MRU', method: 'PayPal', ref: 'TRX-99206' },
];

const mockFormationsData = {
  "Masterclass UX/UI Design — De zéro à Pro": {
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
        ],
      }
    ]
  },
  "Développement Web Fullstack React/Node": {
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
    description: "Devenez un développeur complet en maîtrisant le frontend avec React et le backend avec Node.js.",
    whatYouWillLearn: [
      "Maîtriser React.js et Redux",
      "Développer des API avec Node.js",
    ],
    modules: [
      {
        id: 1,
        title: "Architecture Frontend Moderne",
        duration: "1h 30 min",
        lecons: [
          { id: 1, title: "Introduction à React", duration: "15 min", type: "video" },
        ],
      }
    ]
  }
};

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

export function AdminAchatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // { achatId, newStatus }
  const [selectedAchat, setSelectedAchat] = useState(null); // Pour la modale de détails
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [openModules, setOpenModules] = useState([0]);

  // États pour le tri, le filtrage et la pagination
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleStatusRequest = (e, achatId, newStatus) => {
    e.stopPropagation();
    setConfirmAction({ achatId, newStatus });
    setActiveMenuId(null);
  };

  const executeStatusChange = () => {
    console.log(`Changement de statut pour ${confirmAction.achatId} vers ${confirmAction.newStatus}`);
    setConfirmAction(null);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="opacity-20 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === 'asc' ? <FaSortUp className="text-[#0C8CE9]" /> : <FaSortDown className="text-[#0C8CE9]" />;
  };

  // 1. Filtrage et Tri
  const processedAchats = [...mockAchats]
    .filter(achat => filterStatus === 'Tous' || achat.status === filterStatus)
    .sort((a, b) => {
      const aValue = sortConfig.key === 'course' ? a.course : a[sortConfig.key];
      const bValue = sortConfig.key === 'course' ? b.course : b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  // 2. Pagination
  const totalPages = Math.ceil(processedAchats.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAchats = processedAchats.slice(indexOfFirstItem, indexOfLastItem);

  const allStatuses = ['Tous', 'validé', 'en attente', 'capture_reçue', 'expiré', 'rejeté', 'annulé'];

  // Réinitialiser la page lors d'un changement de filtre
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'validé': return 'text-emerald-500 bg-emerald-50/50 border-emerald-100';
      case 'en attente': return 'text-gray-900 bg-gray-50 border-gray-100';
      case 'capture_reçue': return 'text-[#0C8CE9] bg-blue-50/50 border-blue-100';
      case 'expiré': return 'text-amber-500 bg-amber-50/50 border-amber-100';
      case 'rejeté': return 'text-rose-500 bg-rose-50/50 border-rose-100';
      case 'annulé': return 'text-gray-300 bg-white border-gray-100 line-through';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans" onClick={() => setActiveMenuId(null)}>
      <AdminSidebarPage 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      <div className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <AdminHeaderPage />

        <main className="p-4 sm:p-8 pb-20 lg:pb-8 space-y-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-gray-800 tracking-tight text-gray-700">Gestion des Achats</h1>
              <p className="text-gray-400 text-xs">Suivi des transactions et validation des paiements.</p>
            </div>
          </div>

          {/* BARRE DE FILTRES */}
          <div className="flex flex-wrap gap-2 py-2">
            {allStatuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filterStatus === status 
                  ? 'bg-[#0C8CE9] text-white border-[#0C8CE9]' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                {status.replace('_', ' ')}
                <span className={`ml-2 px-1.5 py-0.5 rounded-lg text-[9px] ${
                  filterStatus === status ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400'
                }`}>
                  {status === 'Tous' 
                    ? mockAchats.length 
                    : mockAchats.filter(a => a.status === status).length}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-200">
                    <th 
                      onClick={() => requestSort('course')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Formation {getSortIcon('course')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('user')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Utilisateur {getSortIcon('user')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('trainer')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Formateur {getSortIcon('trainer')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('date')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Date {getSortIcon('date')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('status')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Statut {getSortIcon('status')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedAchats.map((achat) => (
                    <tr 
                      key={achat.id} 
                      onClick={() => {
                        const detailed = mockFormationsData[achat.course] || {
                          title: achat.course,
                          category: "Formation",
                          price: achat.amount,
                          image: achat.image,
                          description: "Aperçu de la formation achetée.",
                          modules: []
                        };
                        setSelectedFormation(detailed);
                      }}
                      className="hover:bg-gray-50 transition-colors group relative cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-[#0C8CE9] transition-all">
                            <img src={achat.image} alt={achat.course} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-[#0C8CE9] transition-all">{achat.course}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-700">{achat.user}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{achat.trainer}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-400 font-medium">{achat.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl border ${getStatusStyle(achat.status)}`}>
                          {achat.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <button 
                          onClick={(e) => toggleMenu(e, achat.id)}
                          className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
                        >
                          <FaEllipsisV size={14} />
                        </button>

                        {/* MENU DROPDOWN PAIMENT (Filtré par état actuel) */}
                        {activeMenuId === achat.id && (
                          <div className="absolute right-12 top-1/2 -translate-y-1/2 z-[90] w-52 bg-white border border-gray-200 rounded-2xl p-2 animate-in fade-in slide-in-from-right-2 duration-150">
                            <p className="px-3 py-2 text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-gray-50 mb-1">Passer à l'état...</p>
                            
                            {achat.status !== 'validé' && (
                              <button 
                                onClick={(e) => handleStatusRequest(e, achat.id, 'validé')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-2"
                              >
                                <FaCheckCircle size={12} /> Valider
                              </button>
                            )}
                            
                            {achat.status !== 'en attente' && (
                              <button 
                                onClick={(e) => handleStatusRequest(e, achat.id, 'en attente')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2"
                              >
                                <FaClock size={12} /> En attente
                              </button>
                            )}

                            {achat.status !== 'capture_reçue' && (
                              <button 
                                onClick={(e) => handleStatusRequest(e, achat.id, 'capture_reçue')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-[#0C8CE9] hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-2"
                              >
                                <FaImage size={12} /> Voir capture
                              </button>
                            )}

                            {achat.status !== 'expiré' && (
                              <button 
                                onClick={(e) => handleStatusRequest(e, achat.id, 'expiré')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-amber-500 hover:bg-amber-50 rounded-xl transition-colors flex items-center gap-2"
                              >
                                <FaExclamationCircle size={12} /> Expirer
                              </button>
                            )}

                            {achat.status !== 'rejeté' && (
                              <button 
                                onClick={(e) => handleStatusRequest(e, achat.id, 'rejeté')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
                              >
                                <FaTimesCircle size={12} /> Rejeter
                              </button>
                            )}

                            {achat.status !== 'annulé' && (
                              <button 
                                onClick={(e) => handleStatusRequest(e, achat.id, 'annulé')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-300 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2"
                              >
                                <FaMinusCircle size={12} /> Annuler
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 sm:p-5 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white">
                <span>Page {currentPage} sur {totalPages} ({processedAchats.length} transactions)</span>
                
                <div className="flex items-center gap-1.5 sm:gap-1">
                   <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-2 sm:px-3 py-1.5 border border-gray-100 rounded-lg transition-colors flex items-center gap-1 ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                   >
                     <FaChevronLeft size={10} />
                     <span className="hidden sm:inline">Précédent</span>
                   </button>

                   {/* Boutons Numériques */}
                   {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border transition-all ${
                          currentPage === i + 1 
                          ? 'bg-[#0C8CE9] border-[#0C8CE9] text-white shadow-sm' 
                          : 'border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                   ))}

                   <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`px-2 sm:px-3 py-1.5 border border-gray-100 rounded-lg transition-colors flex items-center gap-1 ${currentPage === totalPages || totalPages === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                   >
                     <span className="hidden sm:inline">Suivant</span>
                     <FaChevronRight size={10} />
                   </button>
                </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODALE DE CONFIRMATION ULTRA-CLEAN */}
      {confirmAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-sm w-full space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-black text-gray-800 tracking-tight">Confirmer le changement ?</h3>
              <p className="text-sm text-gray-400">
                Voulez-vous vraiment passer ce paiement à l'état <span className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">"{confirmAction.newStatus.replace('_', ' ')}"</span> ?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setConfirmAction(null)}
                className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-gray-400 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={executeStatusChange}
                className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-white bg-[#0C8CE9] rounded-2xl hover:bg-[#0C8CE9] transition-all"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODALE DE DÉTAILS DE L'ACHAT (Ultra-Clean) */}
      {selectedAchat && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-[40px] p-10 max-w-2xl w-full space-y-8 relative overflow-hidden">
            <button 
              onClick={() => setSelectedAchat(null)}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <FaTimesCircle size={24} />
            </button>

            <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
              <div className="w-32 h-20 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0">
                <img src={selectedAchat.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border mb-3 inline-block ${getStatusStyle(selectedAchat.status)}`}>
                  {selectedAchat.status.replace('_', ' ')}
                </span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">{selectedAchat.course}</h2>
                <p className="text-gray-400 text-xs mt-1">Formateur : <span className="text-gray-600 font-bold">{selectedAchat.trainer}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">Détails Client</p>
                  <p className="text-sm font-bold text-gray-800">{selectedAchat.user}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">Date de transaction</p>
                  <p className="text-sm font-bold text-gray-800">{selectedAchat.date}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">Montant Payé</p>
                  <p className="text-xl font-black text-[#0C8CE9]">{selectedAchat.amount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1">Mode de paiement / Réf</p>
                  <p className="text-sm font-bold text-gray-800">{selectedAchat.method}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Référence : {selectedAchat.ref}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedAchat(null)}
                className="px-8 py-3 text-xs font-black uppercase tracking-widest text-white bg-gray-900 rounded-2xl hover:bg-black transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPEL DE LA MODALE DE DÉTAILS DE FORMATION */}
      <FormationDetailModal 
        selectedFormation={selectedFormation} 
        onClose={() => setSelectedFormation(null)}
        openModules={openModules}
        toggleModule={(i) => setOpenModules(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
      />
    </div>
  );
}

{/* MODALE DE DÉTAILS DE LA FORMATION (Intégrée dans Achat) */}
function FormationDetailModal({ selectedFormation, onClose, openModules, toggleModule }) {
  if (!selectedFormation) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[40px] w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-50 shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0C8CE9]">
              <FaBookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800 tracking-tight leading-none">Détails du Cours</h2>
              <p className="text-gray-400 text-xs mt-1">Programme et contenu de la formation.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-800">
            <FaTimesCircle size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="relative h-64 rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
                <img src={selectedFormation.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                  <span className="px-3 py-1 bg-[#0C8CE9] text-white rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-2">
                    {selectedFormation.category}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">{selectedFormation.title}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">Description</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{selectedFormation.description || "Aucune description disponible."}</p>
              </div>

              {selectedFormation.whatYouWillLearn && (
                <div className="space-y-5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">Au programme</h4>
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
              )}

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">Modules</h4>
                <div className="space-y-3">
                  {(selectedFormation.modules || []).map((module, index) => (
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

            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Prix</p>
                  <p className="text-3xl font-black text-[#0C8CE9] tracking-tight">{selectedFormation.price}</p>
                </div>
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Niveau</span>
                    <span className="font-black text-gray-700">{selectedFormation.level || "Tous niveaux"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Langue</span>
                    <span className="font-black text-gray-700">{selectedFormation.language || "Français"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

