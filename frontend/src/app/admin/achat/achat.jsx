"use client";
import React, { useState } from 'react';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { FaEllipsisV, FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaImage, FaClock, FaMinusCircle, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const mockAchats = [
  { id: 1, user: 'Amadou Diallo', trainer: 'Sidi Mohamed', course: 'Mastering React 2024', image: '/images/hero/dev-formation.png', status: 'validé', date: '12 Mars 2024', amount: '45,000 MRU', method: 'Virement bancaire', ref: 'TRX-99201' },
  { id: 2, user: 'Fatouma Sy', trainer: 'Oumar Kane', course: 'UI/UX Design Fundamentals', image: '/images/hero/design-formation.png', status: 'en attente', date: '13 Mars 2024', amount: '35,000 MRU', method: 'Cash', ref: 'TRX-99202' },
  { id: 3, user: 'Sidi Mohamed', trainer: 'Amadou Diallo', course: 'Node.js Backend Mastery', image: '/images/hero/data-formation.png', status: 'capture_reçue', date: '14 Mars 2024', amount: '50,000 MRU', method: 'Capture reçue', ref: 'TRX-99203' },
  { id: 4, user: 'Mouloud Ameine', trainer: 'Fatouma Sy', course: 'SEO pour Débutants', image: '/images/hero/data-formation.png', status: 'expiré', date: '11 Mars 2024', amount: '25,000 MRU', method: 'Bank Transfer', ref: 'TRX-99204' },
  { id: 5, user: 'Aminata Sow', trainer: 'Sidi Mohamed', course: 'Digital Marketing Essentials', image: '/images/hero/design-formation.png', status: 'rejeté', date: '15 Mars 2024', amount: '40,000 MRU', method: 'Credit Card', ref: 'TRX-99205' },
  { id: 6, user: 'Oumar Kane', trainer: 'Amadou Diallo', course: 'DevOps & Docker', image: '/images/hero/dev-formation.png', status: 'annulé', date: '10 Mars 2024', amount: '60,000 MRU', method: 'PayPal', ref: 'TRX-99206' },
];

export function AdminAchatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // { achatId, newStatus }
  const [selectedAchat, setSelectedAchat] = useState(null); // Pour la modale de détails

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

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        <AdminHeaderPage />

        <main className="p-8 space-y-6 overflow-y-auto">
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
                      onClick={() => setSelectedAchat(achat)}
                      className="hover:bg-gray-50 transition-colors group relative cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                            <img src={achat.image} alt={achat.course} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">{achat.course}</p>
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
            
            <div className="p-5 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white">
                <span>Page {currentPage} sur {totalPages} ({processedAchats.length} transactions)</span>
                
                <div className="flex items-center gap-1">
                   <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 border border-gray-100 rounded-lg transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                   >
                     Précédent
                   </button>

                   {/* Boutons Numériques */}
                   {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
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
                      className={`px-3 py-1.5 border border-gray-100 rounded-lg transition-colors ${currentPage === totalPages || totalPages === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                   >
                     Suivant
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
    </div>
  );
}
