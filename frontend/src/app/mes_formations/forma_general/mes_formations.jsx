"use client";
import React, { useState, useEffect } from 'react';
import { HiBookOpen, HiMagnifyingGlass } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import Header from '../../../composant/layout/header';
import { CardLarge } from '../../pages_common/card';
import { FaPaintBrush, FaCode, FaChartBar, FaCamera } from 'react-icons/fa';

export default function MesFormations() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadFormations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/auth/login');
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-formations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);

                const data = await response.json();

                if (!data || data.length === 0) {
                    setFormations([]);
                    setLoading(false);
                    return;
                }

                const formattedFormations = data.map(order => ({
                    id: order.Formation.id,
                    image: order.Formation.image || "/images/users/formation.png",
                    category: order.Formation.Category?.name || "Non spécifié",
                    categoryIcon: <FaCode size={18} className="text-[#B1B5C3]" />,
                    duration: `${order.Formation.duree_totale_minutes || 0} min`,
                    title: order.Formation.name,
                    description: order.Formation.description,
                    avatar: "/images/users/profile.jpg",
                    author: "Formateur",
                    price: `${order.Formation.prix_normal || 0} MRU`,
                    progress: 0,
                    status: order.status === 'validée' ? 'in-progress' : 'not-started',
                    totalLessons: order.Formation.Modules?.reduce((total, m) => total + (m.Lessons?.length || 0), 0) || 0,
                    completedLessons: 0,
                    lastAccessed: "jamais"
                }));

                setFormations(formattedFormations);
            } catch (error) {
                console.error('Erreur complète:', error);
                setFormations([]);
            } finally {
                setLoading(false);
            }
        };

        loadFormations();
    }, [router]);

    const filteredFormations = formations.filter(formation => {
        const matchesFilter = filter === 'all' || formation.status === filter;
        const matchesSearch = !searchTerm ||
            formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // ✅ URL corrigée sans espaces
    const handleFormationClick = (formationId) => {
        router.push(`/acheteur/formation/moduleLecon?id=${formationId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Formations</h1>
                    <p className="text-gray-600">Suivez vos progrès et continuez votre apprentissage</p>
                </div>

                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2">
                            {[
                                { key: 'all', label: 'Toutes' },
                                { key: 'in-progress', label: 'En cours' },
                                { key: 'completed', label: 'Terminées' },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === key
                                        ? 'bg-[#0C8CE9] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
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

                <div>
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Chargement de vos formations...</p>
                        </div>
                    ) : filteredFormations.length === 0 ? (
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