"use client";
import React, { useState } from 'react';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { FaUsers, FaBook, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

export function AdminDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const stats = [
    { label: 'Utilisateurs', value: '1,250', icon: FaUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Formations', value: '48', icon: FaBook, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Revenus', value: '15,200 MRU', icon: FaMoneyBillWave, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Croissance', value: '+12%', icon: FaChartLine, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar avec gestion du toggle */}
      <AdminSidebarPage 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      {/* Zone de contenu principale - Padding dynamique selon l'état de la sidebar */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        <AdminHeaderPage />

        <main className="p-8 space-y-8 overflow-y-auto">
          {/* Header de la page */}
          <div>
            <h1 className="text-2xl font-black text-gray-800">Tableau de bord</h1>
            <p className="text-gray-500 text-sm">Vue d'ensemble de l'activité de la plateforme.</p>
          </div>

          {/* Grille de Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={22} />
                  </div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+4%</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white h-96 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center border-dashed border-2">
              <span className="text-gray-300 font-bold uppercase tracking-widest text-center px-4">Graphique d'activité</span>
            </div>
            <div className="bg-white h-96 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center border-dashed border-2">
              <span className="text-gray-300 font-bold uppercase tracking-widest text-center px-4">Activités récentes</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
