"use client";
import React, { useState } from 'react';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { FaUserPlus, FaEllipsisV, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';

const mockUsers = [
  { id: 1, name: 'Amadou Diallo', email: 'amadou@formini.com', role: 'Formateur', status: 'Actif', date: '12 Mars 2024', avatar: 'AD' },
  { id: 2, name: 'Sidi Mohamed', email: 'sidi.mo@gmail.com', role: 'Formateur', status: 'Actif', date: '05 Jan 2024', avatar: 'SM' },
  { id: 3, name: 'Fatouma Sy', email: 'fatou@outlook.fr', role: 'Acheteur', status: 'Inactif', date: '28 Fév 2024', avatar: 'FS' },
  { id: 4, name: 'Oumar Kane', email: 'oumar.k@formini.com', role: 'Formateur', status: 'Actif', date: '15 Mars 2024', avatar: 'OK' },
  { id: 5, name: 'Mouloud Ameine', email: 'mouloud.s@gmail.com', role: 'Acheteur', status: 'Suspendu', date: '10 Fév 2024', avatar: 'MS' },
];

export function AdminUsersPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AdminSidebarPage 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        <AdminHeaderPage />

        <main className="p-8 space-y-6 overflow-y-auto">
          {/* En-tête de section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Gestion des Utilisateurs</h1>
              <p className="text-gray-500 text-sm">Gérez les comptes, les rôles et les accès de la plateforme.</p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-[#0C8CE9] hover:bg-[#0a70bb] text-white px-5 py-2.5 rounded-2xl font-bold transition-all">
              <FaUserPlus size={18} />
              <span>Nouvel Utilisateur</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            
            {/* Actual Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-50">
                    <th className="px-6 py-4">Utilisateur</th>
                    <th className="px-6 py-4">Rôle</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4">Date d'inscription</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0C8CE9]/10 text-[#0C8CE9] flex items-center justify-center font-bold text-xs uppercase">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{user.name}</p>
                            <p className="text-[11px] text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                          user.role === 'Administrateur' ? 'bg-purple-50 text-purple-600' : 
                          user.role === 'Formateur' ? 'bg-indigo-50 text-[#0C8CE9]' : 'bg-indigo-50 text-[#0C8CE9]'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-[11px] font-bold ${
                          user.status === 'Actif' ? 'text-emerald-500' : 
                          user.status === 'Inactif' ? 'text-gray-400' : 'text-rose-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            user.status === 'Actif' ? 'bg-emerald-500' : 
                            user.status === 'Inactif' ? 'bg-gray-400' : 'bg-rose-500'
                          }`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{user.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Modifier" className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                            <FaEdit size={14} />
                          </button>
                          <button title="Supprimer" className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Pagination */}
            <div className="p-5 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-medium">Affichage de 5 utilisateurs sur 1,250</p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-white border border-gray-100 rounded-lg opacity-50 cursor-not-allowed">Précédent</button>
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-[#0C8CE9] rounded-lg">1</button>
                <button className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-100 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-100 rounded-lg hover:bg-gray-50">Suivant</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
