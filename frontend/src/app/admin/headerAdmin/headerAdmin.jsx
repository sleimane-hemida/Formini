"use client";
import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBars, 
  FaBell,
  FaChevronDown,
  FaCircle,
  FaClock
} from 'react-icons/fa';

const mockNotifications = [
  { id: 1, title: "Nouveau paiement", desc: "Amadou Diallo a envoyé une capture", time: "2 min", type: "payment" },
  { id: 2, title: "Nouvel instructeur", desc: "Sidi Mohamed souhaite s'inscrire", time: "1h", type: "user" },
  { id: 3, title: "Cours expiré", desc: "La formation UX/UI de Fatouma est expirée", time: "3h", type: "alert" },
];

export function AdminHeaderPage({ searchTerm, onSearchChange }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="h-17 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Search Section */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0C8CE9] transition-colors">
            <FaSearch size={18} />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0C8CE9]/20 focus:border-[#0C8CE9] transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Section: Menu & Notifications */}
      <div className="flex items-center gap-4">
        {/* Burger Menu Icon */}
        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
          <FaBars size={18} />
        </button>

        {/* Notifications Section */}
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`flex items-center gap-3 p-1.5 pr-3 rounded-2xl transition-all group ${isNotifOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            {/* Notification Icon with Badge */}
            <div className="relative w-9 h-9 bg-[#0C8CE9] text-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <FaBell size={18} />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-700">Notifications</span>
              <FaChevronDown size={12} className={`text-gray-400 transition-transform duration-200 ${isNotifOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsNotifOpen(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-[32px] shadow-2xl shadow-blue-900/10 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-black text-gray-800 tracking-tight">Notifications</h3>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-[9px] font-black uppercase rounded-md border border-rose-100">3 Nouvelles</span>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-50 last:border-0">
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'payment' ? 'bg-emerald-400' : n.type === 'user' ? 'bg-[#0C8CE9]' : 'bg-rose-400'}`}></div>
                        <div className="space-y-1 min-w-0">
                          <p className="text-xs font-black text-gray-800 truncate">{n.title}</p>
                          <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{n.desc}</p>
                          <div className="flex items-center gap-1.5 text-[9px] text-gray-300 font-bold uppercase tracking-widest pt-1">
                            <FaClock size={10} />
                            {n.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9] bg-blue-50/30 hover:bg-blue-50 transition-colors">
                  Voir tout traiter
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
