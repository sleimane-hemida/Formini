"use client";
import React, { useState, useEffect } from 'react';
import { HiUser, HiCamera, HiPencil, HiCheck, HiXMark } from 'react-icons/hi2';
import Header from '../../composant/layout/header';

export default function ProfileGestion() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: '',
        birthDate: '',
        location: ''
    });

    // Charger les données utilisateur depuis localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setProfileImage(parsedUser.profileImage || null);
                setFormData({
                    firstName: parsedUser.firstName || '',
                    lastName: parsedUser.lastName || '',
                    email: parsedUser.email || '',
                    phone: parsedUser.phone || '',
                    bio: parsedUser.bio || '',
                    birthDate: parsedUser.birthDate || '',
                    location: parsedUser.location || ''
                });
            }
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Logique de sauvegarde sera ajoutée plus tard
        console.log('Données à sauvegarder:', formData);
        setIsEditing(false);
        // Simuler la mise à jour des données utilisateur
        setUser({ ...user, ...formData });
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Restaurer les données originales
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                bio: user.bio || '',
                birthDate: user.birthDate || '',
                location: user.location || ''
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="container mx-auto px-4 py-8 pt-20 max-w-4xl">
                {/* En-tête de page */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Mon Profil</h1>
                    <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
                </div>

                {/* Card principale */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header avec photo de profil */}
                    <div className="bg-gradient-to-r from-[#0C8CE9] to-[#0A71BC] p-8 text-white relative">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Photo de profil */}
                            <div className="relative group">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                                    {profileImage ? (
                                        <img 
                                            src={profileImage} 
                                            alt="Profile" 
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <HiUser className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <button 
                                    onClick={() => document.getElementById('profileImageInput').click()}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-white text-[#0C8CE9] rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                                >
                                    <HiCamera className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Infos principales */}
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                    {user?.firstName} {user?.lastName || 'Utilisateur'}
                                </h2>
                                <p className="text-white/80 mb-3">{user?.email}</p>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                        {user?.role === 'formateur' ? 'Formateur' : (user?.role === 'administrateur' ? 'Administrateur' : 'Apprenant')}
                                    </span>
                                    {user?.location && (
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                            📍 {user.location}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Bouton édition */}
                            <div className="ml-auto">
                                {!isEditing ? (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="bg-white text-[#0C8CE9] px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    >
                                        <HiPencil className="w-4 h-4" />
                                        Modifier
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={handleSave}
                                            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                                        >
                                            <HiCheck className="w-4 h-4" />
                                            Sauvegarder
                                        </button>
                                        <button 
                                            onClick={handleCancel}
                                            className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
                                        >
                                            <HiXMark className="w-4 h-4" />
                                            Annuler
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Prénom */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prénom
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800"
                                        placeholder="Votre prénom"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {formData.firstName || 'Non renseigné'}
                                    </div>
                                )}
                            </div>

                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom de famille
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800"
                                        placeholder="Votre nom"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {formData.lastName || 'Non renseigné'}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800"
                                        placeholder="votre@email.com"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {formData.email || 'Non renseigné'}
                                    </div>
                                )}
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Téléphone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800"
                                        placeholder="+33 1 23 45 67 89"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {formData.phone || 'Non renseigné'}
                                    </div>
                                )}
                            </div>

                            {/* Date de naissance */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date de naissance
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('fr-FR') : 'Non renseigné'}
                                    </div>
                                )}
                            </div>

                            {/* Localisation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Localisation
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800"
                                        placeholder="Paris, France"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {formData.location || 'Non renseigné'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Biographie
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all resize-none placeholder-gray-500 text-gray-800"
                                    placeholder="Parlez-nous de vous, vos compétences, vos passions..."
                                />
                            ) : (
                                <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 min-h-[100px]">
                                    {formData.bio || 'Aucune biographie renseignée'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section supplémentaire - Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-[#0C8CE9] mb-2">12</div>
                        <div className="text-gray-600">Formations suivies</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-green-500 mb-2">8</div>
                        <div className="text-gray-600">Certificats obtenus</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl font-bold text-orange-500 mb-2">245</div>
                        <div className="text-gray-600">Heures de formation</div>
                    </div>
                </div>
            </div>
        </div>
    );
}