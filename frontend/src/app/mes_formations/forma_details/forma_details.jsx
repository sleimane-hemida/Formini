"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HiArrowLeft, HiPlay, HiBookOpen, HiClock, HiUser, HiStar, HiCheck, HiTrophy } from 'react-icons/hi2';
import Header from '../../../composant/layout/header';
import { FaPaintBrush, FaCode, FaChartBar, FaCamera } from 'react-icons/fa';

export default function FormaDetails() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formationId = parseInt(searchParams.get('id'));

    // Données complètes des formations (même base que forma_general avec plus de détails)
    const formations = [
        {
            id: 1,
            image: "/images/hero/design-formation.png",
            category: "Design",
            categoryIcon: <FaPaintBrush size={20} className="text-[#B1B5C3]" />,
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
            lastAccessed: "aujourd'hui",
            rating: 4.8,
            students: 1250,
            level: "Débutant à Intermédiaire",
            objectives: [
                "Maîtriser les principes fundamentaux du design UI/UX",
                "Créer des prototypes interactifs avec Figma",
                "Analyser et améliorer l'expérience utilisateur",
                "Comprendre les tendances actuelles du design",
                "Réaliser des tests d'utilisabilité"
            ],
            curriculum: [
                {
                    module: "Introduction au Design",
                    lessons: 8,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Théorie des couleurs et typographie",
                    lessons: 10,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Wireframing et prototypage",
                    lessons: 12,
                    duration: "3 semaines",
                    completed: true
                },
                {
                    module: "Design d'interface avancé",
                    lessons: 10,
                    duration: "2 semaines",
                    completed: false
                },
                {
                    module: "Tests utilisateur et itération",
                    lessons: 5,
                    duration: "1 semaine",
                    completed: false
                }
            ]
        },
        {
            id: 2,
            image: "/images/hero/dev-formation.png",
            category: "Développement",
            categoryIcon: <FaCode size={20} className="text-[#B1B5C3]" />,
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
            certificateUrl: "/certificates/certificate-1.pdf",
            rating: 4.9,
            students: 2100,
            level: "Intermédiaire à Avancé",
            objectives: [
                "Créer des applications React modernes",
                "Développer des APIs REST avec Node.js",
                "Gérer les bases de données avec MongoDB",
                "Implémenter l'authentification et la sécurité",
                "Déployer des applications en production"
            ],
            curriculum: [
                {
                    module: "Fondamentaux React",
                    lessons: 15,
                    duration: "3 semaines",
                    completed: true
                },
                {
                    module: "Node.js et Express",
                    lessons: 12,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Bases de données et MongoDB",
                    lessons: 10,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Authentification et sécurité",
                    lessons: 8,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Déploiement et optimisation",
                    lessons: 13,
                    duration: "3 semaines",
                    completed: true
                }
            ]
        },
        {
            id: 3,
            image: "/images/hero/data-formation.png",
            category: "Data Science",
            categoryIcon: <FaChartBar size={20} className="text-[#B1B5C3]" />,
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
            lastAccessed: "hier",
            rating: 4.7,
            students: 850,
            level: "Intermédiaire",
            objectives: [
                "Maîtriser Python pour l'analyse de données",
                "Utiliser les librairies pandas, numpy, matplotlib",
                "Implémenter des algorithmes de machine learning",
                "Créer des visualisations de données efficaces",
                "Déployer des modèles ML en production"
            ],
            curriculum: [
                {
                    module: "Python pour la data science",
                    lessons: 12,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Manipulation de données avec Pandas",
                    lessons: 15,
                    duration: "3 semaines",
                    completed: true
                },
                {
                    module: "Visualisation avec Matplotlib/Seaborn",
                    lessons: 8,
                    duration: "1 semaine",
                    completed: false
                },
                {
                    module: "Machine Learning avec Scikit-learn",
                    lessons: 20,
                    duration: "4 semaines",
                    completed: false
                },
                {
                    module: "Projets pratiques et déploiement",
                    lessons: 12,
                    duration: "2 semaines",
                    completed: false
                }
            ]
        },
        {
            id: 4,
            image: "/images/hero/photo-formation.png",
            category: "Photographie",
            categoryIcon: <FaCamera size={20} className="text-[#B1B5C3]" />,
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
            certificateUrl: "/certificates/certificate-4.pdf",
            rating: 4.6,
            students: 620,
            level: "Débutant à Intermédiaire",
            objectives: [
                "Maîtriser les techniques de prise de vue",
                "Comprendre la composition photographique",
                "Utiliser Lightroom pour le développement RAW",
                "Retoucher avec Photoshop",
                "Créer un portfolio professionnel"
            ],
            curriculum: [
                {
                    module: "Bases de la photographie",
                    lessons: 8,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Composition et cadrage",
                    lessons: 7,
                    duration: "1 semaine",
                    completed: true
                },
                {
                    module: "Lightroom : développement RAW",
                    lessons: 10,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Photoshop : retouche avancée",
                    lessons: 8,
                    duration: "2 semaines",
                    completed: true
                },
                {
                    module: "Portfolio et business",
                    lessons: 2,
                    duration: "1 semaine",
                    completed: true
                }
            ]
        }
    ];

    const formation = formations.find(f => f.id === formationId);

    if (!formation) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Formation introuvable</h1>
                    <button 
                        onClick={() => router.back()}
                        className="mt-4 bg-[#0C8CE9] text-white px-6 py-2 rounded-lg hover:bg-[#0A71BC] transition-colors"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="container mx-auto px-6 py-8">
                {/* Bouton retour */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                    <HiArrowLeft className="w-5 h-5" />
                    Retour aux formations
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale - Détails */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* En-tête de la formation */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                    {formation.categoryIcon}
                                    {formation.category}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                    <HiClock className="w-4 h-4" />
                                    {formation.duration}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                    Niveau {formation.level}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{formation.title}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">{formation.description}</p>
                            
                            {/* Statistiques */}
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <HiStar className="w-4 h-4 text-yellow-500" />
                                    <span className="font-medium">{formation.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HiUser className="w-4 h-4" />
                                    <span>{formation.students} étudiants</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HiBookOpen className="w-4 h-4" />
                                    <span>{formation.totalLessons} leçons</span>
                                </div>
                            </div>
                        </div>

                        {/* Image de la formation */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <img 
                                src={formation.image} 
                                alt={formation.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>

                        {/* Objectifs d'apprentissage */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Ce que vous allez apprendre</h2>
                            <ul className="space-y-3">
                                {formation.objectives?.map((objective, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <HiCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Programme de la formation */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Programme de la formation</h2>
                            <div className="space-y-4">
                                {formation.curriculum?.map((module, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-800">{module.module}</h3>
                                            {module.completed && (
                                                <span className="flex items-center gap-1 text-green-600 text-sm">
                                                    <HiCheck className="w-4 h-4" />
                                                    Terminé
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{module.lessons} leçons</span>
                                            <span>•</span>
                                            <span>{module.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* À propos de l'instructeur */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">À propos de l'instructeur</h2>
                            <div className="flex items-center gap-4">
                                <img 
                                    src={formation.avatar} 
                                    alt={formation.author}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-lg">{formation.author}</h3>
                                    <p className="text-gray-600">Expert en {formation.category}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <HiStar className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm text-gray-600">{formation.rating} • {formation.students} étudiants</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Actions et progression */}
                    <div className="space-y-6">
                        {/* Card de progression */}
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-gray-800 mb-1">{formation.price}</div>
                                {formation.status === 'completed' && formation.certificateUrl && (
                                    <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                                        <HiTrophy className="w-4 h-4" />
                                        Certificat obtenu
                                    </div>
                                )}
                            </div>

                            {/* Progression */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <span>Progression</span>
                                    <span>{formation.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className={`h-3 rounded-full ${
                                            formation.progress === 100 ? 'bg-green-500' : 'bg-[#0C8CE9]'
                                        }`}
                                        style={{ width: `${formation.progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {formation.completedLessons}/{formation.totalLessons} leçons terminées
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button className="w-full bg-[#0C8CE9] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#0A71BC] transition-colors flex items-center justify-center gap-2">
                                    <HiPlay className="w-5 h-5" />
                                    {formation.status === 'completed' ? 'Réviser' : 'Continuer la formation'}
                                </button>
                                
                                {formation.certificateUrl && formation.status === 'completed' && (
                                    <button className="w-full border border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <HiTrophy className="w-5 h-5" />
                                        Télécharger le certificat
                                    </button>
                                )}
                            </div>

                            {/* Informations supplémentaires */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Dernier accès :</span>
                                    <span className="text-gray-800">{formation.lastAccessed}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Statut :</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        formation.status === 'completed' 
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                    }`}>
                                        {formation.status === 'completed' ? 'Terminée' : 'En cours'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}