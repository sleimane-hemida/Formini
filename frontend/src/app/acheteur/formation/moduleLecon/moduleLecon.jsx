"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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

// ─── Accordéon Module ─────────────────────────────────────────────────────────
function ModuleAccordion({ module, index, isOpen, onToggle }) {
    const lecons = module.Lessons || [];
    const done = lecons.filter((l) => l.done).length;
    const total = lecons.length;

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
                    {lecons.map((lecon) => (
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
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || formationId;
    
    const [formation, setFormation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModules, setOpenModules] = useState([0]);

    // Charger la formation depuis l'API
    useEffect(() => {
        const loadFormation = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/auth/login');
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/formations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Formation non trouvée');
                }

                const data = await response.json();
                
                // Formater les données
                const formattedFormation = {
                    id: data.id,
                    title: data.name,
                    category: data.Category?.name || "Non spécifié",
                    description: data.description,
                    image: data.image || "/images/users/formation.png",
                    duration: `${data.duree_totale_minutes || 0} min`,
                    rating: 5,
                    students: 0,
                    type: "normal",
                    modules: data.Modules || []
                };

                setFormation(formattedFormation);
            } catch (error) {
                console.error('Erreur:', error);
                setFormation(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadFormation();
        }
    }, [id, router]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen text-gray-900 font-sans">
                <Header />
                <div className="pt-24">
                    <Nav />
                    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin w-10 h-10 border-4 border-slate-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-500">Chargement de la formation...</p>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (!formation) {
        return (
            <div className="bg-white min-h-screen text-gray-900 font-sans">
                <Header />
                <div className="pt-24">
                    <Nav />
                    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                        <div className="text-center py-12">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Formation non trouvée</h1>
                            <button 
                                onClick={() => router.back()}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Retour
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const toggleModule = (i) =>
        setOpenModules((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );

    const allOpen = openModules.length === formation.modules.length;
    const totalLecons = formation.modules.reduce((s, m) => s + (m.Lessons?.length || 0), 0);

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
                                <span className="text-white/70 text-xs ml-1.5">{formation.students.toLocaleString()} Ventes</span>
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
                                        { icon: <FaUsers size={15} className="text-[#0C8CE9]" />, label: "Ventes", value: formation.students.toLocaleString() },
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
