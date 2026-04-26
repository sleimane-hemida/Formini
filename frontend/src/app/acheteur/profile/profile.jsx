"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../composant/layout/header";
import Nav from "../navigation/nav";
import Footer from "../../../composant/layout/footer";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiHeart, FiCamera, FiSave } from "react-icons/fi";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const [profileData, setProfileData] = useState({
        prenom: '',
        nom_de_famille: '',
        email: '',
        telephone: '',
        date_naissance: '',
        localisation: '',
        biographie: '',
        loisirs_centres_interet: '',
        statut_actuel: 'Étudiant(e)'
    });

    // Charger les données du user au montage
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Non authentifié');
                    setLoading(false);
                    return;
                }

                const response = await fetch('https://formini-yx2w.onrender.com/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Erreur lors du chargement du profil');

                const user = await response.json();
                setProfileData({
                    prenom: user.prenom || '',
                    nom_de_famille: user.nom_de_famille || '',
                    email: user.email || '',
                    telephone: user.telephone || '',
                    date_naissance: user.date_naissance ? user.date_naissance.split('T')[0] : '',
                    localisation: user.localisation || '',
                    biographie: user.biographie || '',
                    loisirs_centres_interet: user.loisirs_centres_interet || '',
                    statut_actuel: user.statut_actuel || 'Étudiant(e)'
                });
                if (user.avatar) {
                    setProfileImage(`https://formini-yx2w.onrender.com${user.avatar}`);
                }
                setSuccess('Profil chargé avec succès');
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                console.error('❌ Erreur chargement profil:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSave = async () => {
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Non authentifié');

            const response = await fetch('https://formini-yx2w.onrender.com/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erreur lors de la sauvegarde');
            }

            const updated = await response.json();
            setSuccess('Profil mis à jour avec succès!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('❌ Erreur sauvegarde:', err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Afficher un aperçu local immédiatement
            setProfileImage(URL.createObjectURL(file));

            // Envoyer l'image au backend
            try {
                const token = localStorage.getItem('token');
                const formData = new FormData();
                formData.append('avatar', file);

                const response = await fetch('https://formini-yx2w.onrender.com/api/user/avatar', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'upload');
                }

                const result = await response.json();
                setProfileImage(`https://formini-yx2w.onrender.com${result.avatar}`);
                setSuccess('Photo de profil mise à jour!');
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                console.error('❌ Erreur upload avatar:', err);
                setError('Erreur lors de l\'upload de la photo');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <p className="text-slate-600 text-lg">Chargement du profil...</p>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans">
            <Header />
            <div className="pt-24"> 
                <Nav />
                {/* Conteneur principal élargi pour utiliser plus d'espace */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    
                    {/* Le grand wrapper demandé avec border et shadow */}
                    <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-[2rem] p-6 sm:p-10 mb-8">
                        
                        {/* En-tête de la page */}
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="text-3xl font-extrabold text-slate-900">Mon Profil</h1>
                            <p className="text-slate-500 mt-2 font-medium">Gérez vos informations personnelles et personnalisez votre expérience.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
                            
                            {/* Colonne Gauche : Photo de Profil et Résumé */}
                            <div className="w-full md:w-1/3 xl:w-1/4">
                                <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col items-center sticky top-28">
                                    
                                    {/* Photo de profil (Input de type file) */}
                                    <label className="relative group cursor-pointer mb-5 block">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200 relative flex items-center justify-center">
                                            {profileImage ? (
                                                <img 
                                                    src={profileImage} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover"
                                                    onError={() => setProfileImage(null)}
                                                />
                                            ) : (
                                                <FiUser className="w-12 h-12 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FiCamera className="text-white w-8 h-8" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 bg-blue-600 p-2.5 rounded-full border-4 border-white shadow-sm hover:bg-blue-700 transition">
                                            <FiCamera className="text-white w-4 h-4" />
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>

                                    <h2 className="text-[18px] font-bold text-slate-900 text-center">{profileData.prenom} {profileData.nom_de_famille}</h2>
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mt-2">
                                        {profileData.statut_actuel || 'Apprenant'}
                                    </span>
                                    
                                    <div className="w-full mt-8 space-y-4 pt-6 border-t border-slate-200">
                                        <div className="flex items-center text-[13px] font-medium text-slate-600">
                                            <div className="bg-white p-2 rounded-lg border border-slate-200 mr-3 shadow-sm">
                                                <FiMail className="w-4 h-4 text-slate-500" />
                                            </div>
                                            <span className="truncate">{profileData.email}</span>
                                        </div>
                                        <div className="flex items-center text-[13px] font-medium text-slate-600">
                                            <div className="bg-white p-2 rounded-lg border border-slate-200 mr-3 shadow-sm">
                                                <FiMapPin className="w-4 h-4 text-slate-500" />
                                            </div>
                                            <span className="truncate">{profileData.localisation || "Non renseigné"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Colonne Droite : Formulaire */}
                            <div className="w-full md:w-2/3 xl:w-3/4">
                                <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-6 lg:p-8">
                                    <h3 className="text-[16px] font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                                        Informations Personnelles
                                    </h3>
                                    
                                    <form className="space-y-6">
                                        
                                        {/* Grille de 2 colonnes pour les formulaires standards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                            
                                            {/* Prénom */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Prénom</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiUser className="text-slate-400" />
                                                    </div>
                                                    <input type="text" name="prenom" value={profileData.prenom} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" placeholder="Votre prénom" />
                                                </div>
                                            </div>

                                            {/* Nom de famille */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Nom de famille</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiUser className="text-slate-400" />
                                                    </div>
                                                    <input type="text" name="nom_de_famille" value={profileData.nom_de_famille} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" placeholder="Votre nom" />
                                                </div>
                                            </div>

                                            {/* Adresse Email */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Adresse Email</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiMail className="text-slate-400" />
                                                    </div>
                                                    <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" placeholder="nom@exemple.com" />
                                                </div>
                                            </div>

                                            {/* Téléphone */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Téléphone</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiPhone className="text-slate-400" />
                                                    </div>
                                                    <input type="tel" name="telephone" value={profileData.telephone} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" placeholder="+33 6 00 00 00 00" />
                                                </div>
                                            </div>

                                            {/* Date de naissance */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Date de naissance</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiCalendar className="text-slate-400" />
                                                    </div>
                                                    <input type="date" name="date_naissance" value={profileData.date_naissance} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" />
                                                </div>
                                            </div>

                                            {/* Localisation */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Localisation</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiMapPin className="text-slate-400" />
                                                    </div>
                                                    <input type="text" name="localisation" value={profileData.localisation} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" placeholder="Ville, Pays" />
                                                </div>
                                            </div>

                                            {/* Statut social */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Statut Actuel</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiBriefcase className="text-slate-400" />
                                                    </div>
                                                    <select name="statut_actuel" value={profileData.statut_actuel} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 appearance-none">
                                                        <option value="Étudiant(e)">Étudiant(e)</option>
                                                        <option value="Employé(e)">Employé(e)</option>
                                                        <option value="Indépendant(e)">Indépendant(e)</option>
                                                        <option value="En recherche d'emploi">En recherche d'emploi</option>
                                                        <option value="Autre">Autre</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Loisirs */}
                                            <div>
                                                <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">Loisirs & Centres d'intérêt</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiHeart className="text-slate-400" />
                                                    </div>
                                                    <input type="text" name="loisirs_centres_interet" value={profileData.loisirs_centres_interet} onChange={handleChange} className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-800" placeholder="Musique, Sport, Lecture..." />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Biographie complète (Pleine largeur) */}
                                        <div className="pt-2">
                                            <label className="block text-[13px] font-bold text-slate-700 mb-2 drop-shadow-sm">À propos de moi (Biographie)</label>
                                            <textarea name="biographie" rows="4" value={profileData.biographie} onChange={handleChange} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-[13px] shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y font-medium text-slate-800 leading-relaxed" placeholder="Dites-nous en plus sur vous..."></textarea>
                                        </div>

                                        {/* Messages d'erreur/succès */}
                                        {error && (
                                            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 mt-4">
                                                {error}
                                            </div>
                                        )}
                                        {success && (
                                            <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4 mt-4">
                                                {success}
                                            </div>
                                        )}

                                        {/* Bouton de sauvegarde */}
                                        <div className="flex justify-end pt-4 border-t border-slate-200 mt-8">
                                            <button type="button" onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors active:scale-95 duration-200">
                                                <FiSave className="w-4 h-4" />
                                                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
