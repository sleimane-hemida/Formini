"use client";
import React, { useState, useEffect } from 'react';
import { HiBookOpen, HiMagnifyingGlass } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import Header from '../../../composant/layout/header';
import { CardLarge } from '../../pages_common/card';
import { FaPaintBrush, FaCode, FaChartBar, FaCamera } from 'react-icons/fa';

export default function MesFormations() {
    const [filter, setFilter] = useState('all'); // all, in-progress, completed
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    // Données simulées des formations
    const [formations, setFormations] = useState([
        {
            id: 1,
            image: "/images/hero/design-formation.png",
            category: "Design",
            categoryIcon: <FaPaintBrush size={18} className="text-[#B1B5C3]" />,
            duration: "3 Mois",
            title: "Formation complète en Design UI/UX",
            description: "Apprenez les bases du design d'interface et de l'expérience utilisateur avec les outils professionnels comme Figma, Adobe XD.",
            avatar: "/images/users/profile.jpg",
            author: "Sarah Ahmed",
            price: "899 MRU",
            progress: 75,
            status: "in-progress",
            totalLessons: 45,
            completedLessons: 34,
            lastAccessed: "aujourd'hui"
        },
        {
            id: 2,
            image: "/images/hero/dev-formation.png",
            category: "Développement",
            categoryIcon: <FaCode size={18} className="text-[#B1B5C3]" />,
            duration: "4 Mois",
            title: "Développement Web Full Stack avec React et Node.js",
            description: "Maîtrisez le développement frontend avec React et le backend avec Node.js pour créer des applications web modernes.",
            avatar: "/images/users/profile.jpg",
            author: "Omar Hassan",
            price: "1199 MRU",
            progress: 100,
            status: "completed",
            totalLessons: 58,
            completedLessons: 58,
            lastAccessed: "la semaine dernière",
            certificateUrl: "/certificates/certificate-1.pdf"
        },
        {
            id: 3,
            image: "/images/hero/data-formation.png",
            category: "Data Science",
            categoryIcon: <FaChartBar size={18} className="text-[#B1B5C3]" />,
            duration: "6 Mois",
            title: "Analyse de données avec Python et Machine Learning",
            description: "Découvrez le monde de la data science, de l'analyse exploratoire au machine learning avancé avec Python.",
            avatar: "/images/users/profile.jpg",
            author: "Thomas Leroy",
            price: "1299 MRU",
            progress: 30,
            status: "in-progress",
            totalLessons: 67,
            completedLessons: 20,
            lastAccessed: "hier"
        },
        {
            id: 4,
            image: "/images/hero/photo-formation.png",
            category: "Photographie",
            categoryIcon: <FaCamera size={18} className="text-[#B1B5C3]" />,
            duration: "3 Mois",
            title: "Photographie professionnelle et retouche",
            description: "Maîtrisez l'art de la photographie, de la prise de vue à la retouche professionnelle avec Lightroom et Photoshop.",
            avatar: "/images/users/profile.jpg",
            author: "Marie Blanc",
            price: "749 MRU",
            progress: 100,
            status: "completed",
            totalLessons: 35,
            completedLessons: 35,
            lastAccessed: "il y a 2 semaines",
            certificateUrl: "/certificates/certificate-4.pdf"
        }
    ]);

    // Filtrer les formations
    const filteredFormations = formations.filter(formation => {
        const matchesFilter = filter === 'all' || formation.status === filter;
        const matchesSearch = !searchTerm || 
            formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    // Fonction pour naviguer vers les détails
    const handleFormationClick = (formationId) => {
        router.push(`/mes_formations/forma_details?id=${formationId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="container mx-auto px-6 py-8">
                {/* Header simple */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Formations</h1>
                    <p className="text-gray-600">Suivez vos progrès et continuez votre apprentissage</p>
                </div>

                {/* Filtres et recherche */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Filtres */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'all' 
                                        ? 'bg-[#0C8CE9] text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Toutes
                            </button>
                            <button 
                                onClick={() => setFilter('in-progress')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'in-progress' 
                                        ? 'bg-[#0C8CE9] text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                En cours
                            </button>
                            <button 
                                onClick={() => setFilter('completed')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'completed' 
                                        ? 'bg-[#0C8CE9] text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Terminées
                            </button>
                        </div>

                        {/* Recherche */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher une formation..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Liste des formations */}
                <div>
                    {filteredFormations.length === 0 ? (
                        <div className="text-center py-12">
                            <HiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-800 mb-2">
                                {filter === 'all' ? 'Aucune formation trouvée' : `Aucune formation ${filter === 'in-progress' ? 'en cours' : 'terminée'}`}
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm ? 'Essayez de modifier votre recherche.' : 'Découvrez notre catalogue de formations pour commencer à apprendre !'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFormations.map((formation) => (
                                <div 
                                    key={formation.id} 
                                    onClick={() => handleFormationClick(formation.id)}
                                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                                >
                                    <CardLarge
                                        image={formation.image}
                                        category={formation.category}
                                        categoryIcon={formation.categoryIcon}
                                        duration={formation.duration}
                                        title={formation.title}
                                        description={formation.description}
                                        avatar={formation.avatar}
                                        author={formation.author}
                                        price={formation.price}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}