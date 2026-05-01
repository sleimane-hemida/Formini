"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { FaSearch, FaUserPlus, FaEllipsisV, FaEnvelope, FaCertificate, FaTimes, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const initialFormateurs = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", Categorie: "Web Development", courses: 12, status: "Actif" },
  { id: 2, name: "Marie Curie", email: "marie.curie@example.com", Categorie: "Data Science", courses: 8, status: "Actif" },
  { id: 3, name: "Alan Turing", email: "alan.turing@example.com", Categorie: "Algorithmique", courses: 15, status: "En attente" },
  { id: 4, name: "Grace Hopper", email: "grace.hopper@example.com", Categorie: "COBOL Systems", courses: 5, status: "Actif" },
];

export default function FormateurAdmin() {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFormateur, setNewFormateur] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    Categorie: '',
    location: '',
    bio: ''
  });
  const [formateurs] = useState(initialFormateurs);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFormateur(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nouveau formateur:', newFormateur);
    // Logique API ici
    setIsModalOpen(false);
    setNewFormateur({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      Categorie: '',
      location: '',
      bio: ''
    });
  };

  const filteredFormateurs = formateurs
    .filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.Categorie.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-gray-800 tracking-tight text-gray-700">Gestion des Formateurs</h1>
              <p className="text-gray-400 text-xs">Gérez et suivez les formateurs de votre plateforme.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0C8CE9] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0a70bb] transition-all"
            >
              Nouveau Formateur
            </button>
          </div>

          {/* Stats Bar */}
          {/* <div className="bg-white p-4 px-6 rounded-3xl border border-gray-100 flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0C8CE9]">Liste des formateurs</h2>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="px-3 py-1 bg-blue-50 text-[#0C8CE9] rounded-lg border border-blue-100">{formateurs.length} Total</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-lg border border-emerald-100">{formateurs.filter(f => f.status === "Actif").length} Actifs</span>
            </div>
          </div> */}

          {/* Table */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-200">
                    <th 
                      onClick={() => requestSort('name')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Nom & Email {getSortIcon('name')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('Categorie')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                    >
                      <div className="flex items-center gap-2">
                        Catégorie {getSortIcon('Categorie')}
                      </div>
                    </th>
                    <th 
                      onClick={() => requestSort('courses')}
                      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none text-center"
                    >
                      <div className="flex items-center justify-center gap-2">
                        Formations {getSortIcon('courses')}
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
                  {filteredFormateurs.map((f) => (
                    <tr 
                      key={f.id} 
                      onClick={() => router.push(`/admin/formateur/formations?id=${f.id}`)}
                      className="hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0C8CE9] font-bold border border-blue-100">
                            {f.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 leading-tight">{f.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                              <FaEnvelope size={10} />
                              {f.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-gray-600 text-[11px] font-bold">
                          <FaCertificate className="text-amber-400" size={14} />
                          {f.Categorie}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-gray-700">{f.courses}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl border ${
                          f.status === 'Actif' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-amber-50 text-amber-500 border-amber-100'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all">
                          <FaEllipsisV size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredFormateurs.length === 0 && (
                <div className="py-20 text-center text-gray-400">
                  <p className="text-[10px] font-black uppercase tracking-widest">Aucun formateur trouvé.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* MODALE NOUVEAU FORMATEUR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-[32px] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">Ajouter un Nouveau Formateur</h2>
              <p className="text-gray-400 text-sm mt-1">Créez un profil pour un nouveau formateur.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prénom</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={newFormateur.firstName}
                    onChange={handleInputChange}
                    placeholder="Ex: Jean"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all"
                  />
                </div>

                {/* Nom */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom de famille</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={newFormateur.lastName}
                    onChange={handleInputChange}
                    placeholder="Ex: Dupont"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Adresse email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={newFormateur.email}
                    onChange={handleInputChange}
                    placeholder="jean.dupont@email.com"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all"
                  />
                </div>

                {/* Téléphone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Téléphone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={newFormateur.phone}
                    onChange={handleInputChange}
                    placeholder="+222 XX XX XX XX"
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all"
                  />
                </div>

                {/* Catégorie / Spécialité */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catégorie (Spécialité)</label>
                  <input 
                    type="text" 
                    name="Categorie"
                    value={newFormateur.Categorie}
                    onChange={handleInputChange}
                    placeholder="Ex: Développement Web"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all"
                  />
                </div>

                {/* Localisation */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Localisation</label>
                  <input 
                    type="text" 
                    name="location"
                    value={newFormateur.location}
                    onChange={handleInputChange}
                    placeholder="Nouakchott, Mauritanie"
                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Biographie & Expérience</label>
                <textarea 
                  name="bio"
                  value={newFormateur.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Décrivez le parcours et les compétences du formateur..."
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold text-gray-700 transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 text-xs font-black uppercase tracking-widest text-gray-400 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 text-xs font-black uppercase tracking-widest text-white bg-[#0C8CE9] rounded-2xl hover:bg-[#0a70bb] shadow-lg shadow-blue-100 transition-all"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
