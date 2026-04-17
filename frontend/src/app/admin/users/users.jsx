"use client";
import React, { useState } from 'react';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { FaUserPlus, FaEdit, FaTrashAlt, FaExclamationTriangle, FaTimes, FaEllipsisV, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const mockUsers = [
  { id: 1, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 2, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 3, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 4, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 5, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
  { id: 6, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 7, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 8, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 9, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 10, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
  { id: 11, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 12, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 13, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 14, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 15, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
{ id: 16, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 17, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 18, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 19, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 20, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
{ id: 21, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 22, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 23, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 24, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 25, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
{ id: 26, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 27, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 28, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 29, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 30, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
];

export function AdminUsersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  
  // États pour le tri
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Logique de tri
  const sortedUsers = [...mockUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Calcul des données paginées basées sur les données triées
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(mockUsers.length / usersPerPage);

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setActiveMenuId(null);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Retour à la page 1 lors d'un tri
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="opacity-20 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === 'asc' ? <FaSortUp className="text-[#0C8CE9]" /> : <FaSortDown className="text-[#0C8CE9]" />;
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
              <h1 className="text-xl font-black text-gray-800 tracking-tight">Gestion des Utilisateurs</h1>
              <p className="text-gray-400 text-xs">Administrez les rôles et les accès de la plateforme.</p>
            </div>
            <button className="bg-[#0C8CE9] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0a70bb] transition-all">
              Nouvel Utilisateur
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-200">
                    <th 
                      onClick={() => requestSort('name')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Utilisateur {getSortIcon('name')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('role')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Rôle {getSortIcon('role')}
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
                    <th 
                      onClick={() => requestSort('date')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Date {getSortIcon('date')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group relative">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-xs text-[#0C8CE9] border border-gray-100">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 leading-none">{user.name}</p>
                            <p className="text-[11px] text-gray-400 mt-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-gray-500">
                           {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                          user.status === 'Actif' ? 'text-emerald-500' : 
                          user.status === 'Banni' ? 'text-gray-900 line-through opacity-50' :
                          user.status === 'Suspendu' ? 'text-rose-500' : 'text-gray-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                             user.status === 'Actif' ? 'bg-emerald-500' : 
                             user.status === 'Banni' ? 'bg-gray-900' :
                             user.status === 'Suspendu' ? 'bg-rose-500' : 'bg-gray-400'
                          }`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs text-gray-400 font-medium">{user.date}</span>
                      </td>
                      <td className="px-6 py-5 text-center relative">
                         <button 
                            onClick={(e) => toggleMenu(e, user.id)}
                            className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
                         >
                            <FaEllipsisV size={14} />
                         </button>

                         {/* MENU DROPDOWN (Plaçé à côté) */}
                         {activeMenuId === user.id && (
                           <div className="absolute right-12 top-1/2 -translate-y-1/2 z-[90] w-52 bg-white border border-gray-200 rounded-2xl p-2 animate-in fade-in slide-in-from-right-2 duration-150">
                              <p className="px-3 py-2 text-[10px] text-gray-400 font-black text-gray-300 uppercase tracking-widest border-b border-gray-50 mb-1">Actions rapides</p>
                              
                              <button className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors">Activer</button>
                              <button className="w-full text-left px-3 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">Désactiver (Inactif)</button>
                              <button className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">Suspendre</button>
                              <button className="w-full text-left px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200 rounded-xl transition-colors">Bannir</button>
                           </div>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer avec Navigation pagination numérique */}
            <div className="p-5 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white">
                <span className=" text-gray-400">Page {currentPage} sur {totalPages}</span>
                
                <div className="flex items-center gap-2">
                   <button 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-3 py-1.5 border rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed border-gray-50' : 'border-gray-100 hover:bg-gray-50 text-gray-400'}`}
                   >
                    Précédent
                   </button>

                   <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                            currentPage === page 
                            ? 'bg-[#0C8CE9] text-white' 
                            : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                   </div>

                   <button 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-3 py-1.5 border rounded-lg transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed border-gray-50' : 'border-gray-100 hover:bg-gray-50 text-gray-400'}`}
                   >
                    Suivant
                   </button>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
