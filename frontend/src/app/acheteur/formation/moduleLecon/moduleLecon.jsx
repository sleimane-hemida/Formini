"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../../../../composant/layout/header";
import Nav from "../../navigation/nav";
import Footer from "../../../../composant/layout/footer";

import {
    FaRegClock,
    FaStar,
    FaRegStar,
    FaLaptopCode,
    FaChevronDown,
    FaChevronUp,
    FaPlayCircle,
    FaFileAlt,
    FaLock,
    FaCheckCircle,
    FaArrowLeft,
    FaUsers,
    FaGlobeAfrica,
    FaTag,
    FaPaintBrush,
} from "react-icons/fa";
import { FiAward, FiBookOpen, FiCalendar, FiBarChart2 } from "react-icons/fi";

// ─── Données mockées ──────────────────────────────────────────────────────────
const formationsDetail = {
    1: {
        id: 1,
        title: "Masterclass UX/UI Design — De zéro à Pro",
        category: "Design",
        categoryIcon: <FaPaintBrush size={14} />,
        duration: "3 Mois",
        description:
            "Apprenez à concevoir des interfaces modernes et engageantes avec Figma. Ce cours couvre tout le processus de conception, des wireframes aux prototypes interactifs, en passant par les principes fondamentaux du design thinking et de l'accessibilité numérique.",
        author: "Sarah Diallo",
        image: "/images/users/formation.jpg",
        avatar: "/images/users/profile.jpg",
        type: "promotion",
        oldPrice: "1200 MRU",
        price: "600 MRU",
        rating: 5,
        students: 1284,
        level: "Débutant → Avancé",
        language: "Français",
        lastUpdated: "Avril 2026",
        modules: [
            {
                id: 1,
                title: "Introduction au Design UX/UI",
                duration: "45 min",
                lecons: [
                    { id: 1, title: "Qu'est-ce que le UX Design ?", duration: "8 min", type: "video", done: true },
                    { id: 2, title: "Différence entre UX et UI", duration: "6 min", type: "video", done: true },
                    { id: 3, title: "Les outils du designer moderne", duration: "10 min", type: "video", done: false },
                    { id: 4, title: "Quiz — Fondamentaux UX", duration: "5 min", type: "quiz", done: false },
                ],
            },
            {
                id: 2,
                title: "Maîtriser Figma de A à Z",
                duration: "2h 10 min",
                lecons: [
                    { id: 5, title: "Prise en main de l'interface Figma", duration: "12 min", type: "video", done: false },
                    { id: 6, title: "Composants et variantes", duration: "18 min", type: "video", done: false },
                    { id: 7, title: "Auto Layout & Responsive Design", duration: "22 min", type: "video", done: false },
                    { id: 8, title: "Prototypage interactif", duration: "20 min", type: "video", done: false },
                    { id: 9, title: "Kit Figma complet (ressources)", duration: "", type: "file", done: false },
                ],
            },
            {
                id: 3,
                title: "Design Thinking & Recherche Utilisateur",
                duration: "1h 30 min",
                lecons: [
                    { id: 10, title: "Les 5 phases du Design Thinking", duration: "14 min", type: "video", done: false, locked: true },
                    { id: 11, title: "Créer des personas efficaces", duration: "16 min", type: "video", done: false, locked: true },
                    { id: 12, title: "Conduire des entretiens utilisateurs", duration: "18 min", type: "video", done: false, locked: true },
                ],
            },
            {
                id: 4,
                title: "Projet Final — Application Mobile",
                duration: "3h 00 min",
                lecons: [
                    { id: 13, title: "Brief du projet et livrables", duration: "10 min", type: "video", done: false, locked: true },
                    { id: 14, title: "Conception des wireframes", duration: "30 min", type: "video", done: false, locked: true },
                    { id: 15, title: "Maquette HD et système de design", duration: "45 min", type: "video", done: false, locked: true },
                    { id: 16, title: "Présentation finale", duration: "20 min", type: "video", done: false, locked: true },
                ],
            },
        ],
    },
};

function buildGenericFormation(id) {
    return {
        id,
        title: "Formation " + id,
        category: "Développement",
        categoryIcon: <FaLaptopCode size={14} />,
        duration: "2 Mois",
        description: "Une formation complète pour maîtriser les compétences essentielles et propulser votre carrière.",
        author: "Formateur Expert",
        image: "/images/users/formation.png",
        avatar: "/images/users/profile.jpg",
        type: "normal",
        oldPrice: "",
        price: "800 MRU",
        rating: 4,
        students: 342,
        level: "Tous niveaux",
        language: "Français",
        lastUpdated: "Avril 2026",
        modules: [
            {
                id: 1,
                title: "Module 1 — Fondamentaux",
                duration: "1h",
                lecons: [
                    { id: 1, title: "Introduction générale", duration: "10 min", type: "video", done: false },
                    { id: 2, title: "Les concepts clés", duration: "15 min", type: "video", done: false },
                ],
            },
        ],
    };
}

// ─── Accordéon Module ─────────────────────────────────────────────────────────
function ModuleAccordion({ module, index, isOpen, onToggle }) {
    const done = module.lecons.filter((l) => l.done).length;
    const total = module.lecons.length;

    const typeIcon = (lecon) => {
        if (lecon.locked) return <FaLock size={12} className="text-gray-400" />;
        if (lecon.done) return <FaCheckCircle size={14} className="text-[#0C8CE9]" />;
        if (lecon.type === "file") return <FaFileAlt size={13} className="text-gray-400" />;
        return <FaPlayCircle size={14} className="text-gray-400" />;
    };

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-gray-400 shrink-0 w-6">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{module.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {total} leçon{total > 1 ? "s" : ""} · {module.duration}
                            {done > 0 && (
                                <span className="text-[#0C8CE9] ml-2 font-medium">· {done}/{total} faites</span>
                            )}
                        </p>
                    </div>
                </div>
                <span className="text-gray-400 shrink-0 ml-4">
                    {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </span>
            </button>

            {isOpen && (
                <div className="border-t border-gray-100 bg-gray-50 divide-y divide-gray-100">
                    {module.lecons.map((lecon) => (
                        <div
                            key={lecon.id}
                            className={`flex items-center gap-3 px-5 py-3 text-sm ${
                                lecon.locked
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-white cursor-pointer transition-colors"
                            }`}
                        >
                            <span className="shrink-0">{typeIcon(lecon)}</span>
                            <span
                                className={`flex-1 ${
                                    lecon.done
                                        ? "line-through text-gray-400"
                                        : lecon.locked
                                        ? "text-gray-400"
                                        : "text-gray-700"
                                }`}
                            >
                                {lecon.title}
                            </span>
                            {lecon.duration && (
                                <span className="text-xs text-gray-400 shrink-0 flex items-center gap-1">
                                    <FaRegClock size={10} />
                                    {lecon.duration}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function ModuleLecon({ formationId }) {
    const router = useRouter();
    const id = formationId ? Number(formationId) : 1;
    const formation = formationsDetail[id] || buildGenericFormation(id);

    const [openModules, setOpenModules] = useState([0]);

    const toggleModule = (i) =>
        setOpenModules((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );

    const allOpen = openModules.length === formation.modules.length;
    const totalLecons = formation.modules.reduce((s, m) => s + m.lecons.length, 0);

    const badgeColor = {
        promotion: "bg-amber-100 text-amber-700",
        gratuit: "bg-green-100 text-green-700",
        normal: "bg-blue-100 text-blue-700",
    }[formation.type] || "bg-gray-100 text-gray-600";

    const badgeLabel = {
        promotion: "Promotion",
        gratuit: "Gratuit",
        normal: "Payant",
    }[formation.type] || "";

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans">
            <Header />
            <div className="pt-24">
                <Nav />

                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                    {/* Retour */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-6 transition-colors"
                    >
                        <FaArrowLeft size={12} />
                        Retour aux formations
                    </button>

                    {/* ── Image hero ── */}
                    <div className="relative w-full rounded-xl overflow-hidden mb-8 bg-gray-100" style={{ height: "380px" }}>
                        <Image
                            src={formation.image}
                            alt={formation.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay sobre en bas */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* Titre en bas du hero */}
                        <div className="absolute bottom-0 left-0 right-0 px-7 pb-7">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded ${badgeColor}`}>
                                    {formation.category}
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/20 text-white backdrop-blur-sm">
                                    {badgeLabel}
                                </span>
                            </div>
                            <h1 className="text-white text-2xl md:text-3xl font-bold leading-snug">
                                {formation.title}
                            </h1>
                            <div className="flex items-center gap-1 mt-2">
                                {Array.from({ length: 5 }).map((_, i) =>
                                    i < formation.rating
                                        ? <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
                                        : <FaRegStar key={i} className="w-3.5 h-3.5 text-white/40" />
                                )}
                                <span className="text-white/70 text-xs ml-1.5">{formation.students.toLocaleString()} étudiants</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Layout 2 colonnes ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Colonne principale */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* Description */}
                            <section className="border border-gray-200 rounded-xl p-6">
                                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <FiBookOpen size={16} className="text-[#0C8CE9]" />
                                    À propos de cette formation
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed">{formation.description}</p>

                                {/* 4 stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                                    {[
                                        { icon: <FiBookOpen size={15} className="text-[#0C8CE9]" />, label: "Modules", value: formation.modules.length },
                                        { icon: <FaPlayCircle size={15} className="text-[#0C8CE9]" />, label: "Leçons", value: totalLecons },
                                        { icon: <FaRegClock size={15} className="text-[#0C8CE9]" />, label: "Durée", value: formation.duration },
                                        { icon: <FaUsers size={15} className="text-[#0C8CE9]" />, label: "Étudiants", value: formation.students.toLocaleString() },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-[#F5F8FF] rounded-lg p-3 flex items-center gap-3">
                                            {s.icon}
                                            <div>
                                                <p className="text-xs text-gray-400">{s.label}</p>
                                                <p className="text-sm font-bold text-gray-900">{s.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Programme */}
                            <section className="border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                        <FiAward size={16} className="text-[#0C8CE9]" />
                                        Programme
                                        <span className="text-xs font-normal text-gray-400 ml-1">
                                            ({formation.modules.length} modules · {totalLecons} leçons)
                                        </span>
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setOpenModules(
                                                allOpen ? [] : formation.modules.map((_, i) => i)
                                            )
                                        }
                                        className="text-xs text-[#0C8CE9] hover:text-[#0A71BC] font-medium transition-colors"
                                    >
                                        {allOpen ? "Tout réduire" : "Tout afficher"}
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {formation.modules.map((module, index) => (
                                        <ModuleAccordion
                                            key={module.id}
                                            module={module}
                                            index={index}
                                            isOpen={openModules.includes(index)}
                                            onToggle={() => toggleModule(index)}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Colonne latérale — Sticky */}
                        <div className="flex flex-col gap-4">

                            {/* Carte Prix */}
                            <div className="border border-gray-200 rounded-xl p-6">

                                {/* Prix */}
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-bold text-gray-900">{formation.price}</span>
                                    {formation.oldPrice && (
                                        <span className="text-sm text-gray-400 line-through">{formation.oldPrice}</span>
                                    )}
                                </div>

                                {/* Boutons */}
                                <div className="flex flex-col gap-2 mt-4">
                                    <button
                                        onClick={() => router.push(`/acheteur/formation/learning?id=${formation.id}`)}
                                        className="w-full bg-[#0C8CE9] hover:bg-[#0A71BC] text-white text-sm font-semibold py-3 rounded-md transition-colors">
                                        Commencer la formation
                                    </button>
                                    <button className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-md transition-colors">
                                        Aperçu gratuit
                                    </button>
                                </div>

                                {/* Séparateur */}
                                <div className="border-t border-gray-100 my-5" />

                                {/* Détails */}
                                <div className="flex flex-col gap-3">
                                    {[
                                        { icon: <FaRegClock size={13} className="text-gray-400" />, label: "Depuis", value: formation.duration },
                                        { icon: <FiBarChart2 size={13} className="text-gray-400" />, label: "Niveau", value: formation.level },
                                        { icon: <FaGlobeAfrica size={13} className="text-gray-400" />, label: "Langue", value: formation.language },
                                        { icon: <FiCalendar size={13} className="text-gray-400" />, label: "Mis à jour", value: formation.lastUpdated },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span className="flex items-center gap-2 text-gray-500">
                                                {row.icon}
                                                {row.label}
                                            </span>
                                            <span className="font-semibold text-gray-800">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Carte Formateur */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Formateur</p>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={formation.avatar}
                                        alt={formation.author}
                                        width={44}
                                        height={44}
                                        className="rounded-lg object-cover border border-gray-200"
                                        style={{ width: "44px", height: "44px" }}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{formation.author}</p>
                                        <p className="text-xs text-gray-400">{formation.category} · Expert certifié</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                    {Array.from({ length: 5 }).map((_, i) =>
                                        i < formation.rating
                                            ? <FaStar key={i} className="w-3 h-3 text-amber-400" />
                                            : <FaRegStar key={i} className="w-3 h-3 text-gray-300" />
                                    )}
                                    <span className="text-xs text-gray-400 ml-1">{formation.rating}/5</span>
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
