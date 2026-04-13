"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    FaPlayCircle,
    FaCheckCircle,
    FaLock,
    FaFileAlt,
    FaChevronDown,
    FaChevronUp,
    FaArrowLeft,
    FaRegClock,
    FaVolumeUp,
    FaExpand,
    FaPause,
    FaPlay,
} from "react-icons/fa";
import { FiBookOpen, FiAward } from "react-icons/fi";

// ─── Données mockées ──────────────────────────────────────────────────────────
const formationsDetail = {
    1: {
        id: 1,
        title: "Masterclass UX/UI Design — De zéro à Pro",
        author: "Sarah Diallo",
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
        author: "Formateur Expert",
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

// ─── Sidebar Module Accordion ─────────────────────────────────────────────────
function SidebarModule({ module, moduleIndex, isOpen, onToggle, activeLeconId, onSelectLecon }) {
    const done = module.lecons.filter((l) => l.done).length;
    const total = module.lecons.length;
    const progress = Math.round((done / total) * 100);

    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left"
            >
                <span className="text-[10px] font-bold text-slate-400 mt-0.5 shrink-0 w-5">
                    {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 leading-snug">{module.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0C8CE9] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{done}/{total}</span>
                    </div>
                </div>
                <span className="text-slate-400 shrink-0 mt-0.5">
                    {isOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </span>
            </button>

            {isOpen && (
                <div className="pb-1 bg-slate-50/60">
                    {module.lecons.map((lecon) => {
                        const isActive = lecon.id === activeLeconId;
                        const IconEl = lecon.locked
                            ? <FaLock size={10} className="text-slate-300 shrink-0" />
                            : lecon.done
                            ? <FaCheckCircle size={11} className="text-[#0C8CE9] shrink-0" />
                            : lecon.type === "file"
                            ? <FaFileAlt size={11} className="text-slate-400 shrink-0" />
                            : <FaPlayCircle size={11} className={isActive ? "text-[#0C8CE9] shrink-0" : "text-slate-400 shrink-0"} />;

                        return (
                            <button
                                key={lecon.id}
                                disabled={lecon.locked}
                                onClick={() => !lecon.locked && onSelectLecon(lecon)}
                                className={`w-full flex items-center gap-3 px-4 pl-12 py-2.5 text-left transition-colors text-[11px] ${
                                    lecon.locked
                                        ? "opacity-40 cursor-not-allowed"
                                        : isActive
                                        ? "bg-blue-50 text-blue-600 border-r-2 border-[#0C8CE9]"
                                        : "hover:bg-white text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {IconEl}
                                <span className={`flex-1 leading-snug ${lecon.done ? "line-through opacity-50" : ""}`}>
                                    {lecon.title}
                                </span>
                                {lecon.duration && (
                                    <span className="text-slate-400 shrink-0 flex items-center gap-1">
                                        <FaRegClock size={9} />
                                        {lecon.duration}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ─── Composant Principal ───────────────────────────────────────────────────────
export default function Learning() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formationId = Number(searchParams.get("id") || "1");
    const formation = formationsDetail[formationId] || buildGenericFormation(formationId);

    const firstLecon = formation.modules.flatMap((m) => m.lecons).find((l) => !l.locked) || formation.modules[0].lecons[0];
    const [activeLecon, setActiveLecon] = useState(firstLecon);
    const [openModules, setOpenModules] = useState([0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [comment, setComment] = useState("");

    const toggleModule = (i) =>
        setOpenModules((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );

    const allLecons = formation.modules.flatMap((m) => m.lecons);
    const totalDone = allLecons.filter((l) => l.done).length;
    const totalLecons = allLecons.length;
    const globalProgress = Math.round((totalDone / totalLecons) * 100);

    const unlocked = allLecons.filter((l) => !l.locked);
    const activeIndex = unlocked.findIndex((l) => l.id === activeLecon.id);
    const hasPrev = activeIndex > 0;
    const hasNext = activeIndex < unlocked.length - 1;

    const mockComments = [
        { initiale: "S", nom: "Sarah D.", temps: "il y a 2 jours", texte: "Super explication ! Merci pour la clarification sur la différence entre UX et UI, c'était très clair.", color: "bg-pink-500" },
        { initiale: "O", nom: "Oumar B.", temps: "il y a 5 jours", texte: "Est-ce que vous pouvez recommander des ressources complémentaires pour approfondir cette partie ?", color: "bg-emerald-500" },
        { initiale: "L", nom: "Lina M.", temps: "il y a 1 semaine", texte: "J'avais du mal à comprendre ce concept avant ce cours. Maintenant tout est limpide. Excellente pédagogie !", color: "bg-amber-500" },
    ];

    return (
        <div className="flex flex-col h-screen bg-white text-slate-900 overflow-hidden font-sans">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            {/* ── Topbar ── */}
            <header className="h-14 flex items-center px-5 bg-white border-b border-slate-200 shrink-0 z-20 shadow-sm">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-medium transition-colors mr-6"
                >
                    <FaArrowLeft size={11} />
                    Retour
                </button>

                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{formation.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{activeLecon.title}</p>
                </div>

                <div className="hidden sm:flex items-center gap-3 mr-2">
                    <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0C8CE9] rounded-full transition-all duration-700" style={{ width: `${globalProgress}%` }} />
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium shrink-0">
                        {globalProgress}% — {totalDone}/{totalLecons} leçons
                    </span>
                </div>
            </header>

            {/* ── Corps principal ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ═══ Zone contenu principale — scrollable ══════════════════ */}
                <div className="flex flex-col flex-1 overflow-y-auto bg-slate-50 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="px-8 pt-6">

                        {/* ── Lecteur vidéo ── */}
                        <div
                            className="relative w-full bg-slate-900 rounded-2xl overflow-hidden mb-4"
                            style={{ height: "520px" }}
                        >
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                <div className="text-center">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300 mx-auto mb-6"
                                    >
                                        {isPlaying
                                            ? <FaPause className="text-white w-7 h-7" />
                                            : <FaPlay className="text-white w-7 h-7 ml-1" />
                                        }
                                    </button>
                                    <p className="text-white font-semibold text-lg">{activeLecon.title}</p>
                                    {activeLecon.duration && (
                                        <p className="text-white/50 text-sm mt-1 flex items-center justify-center gap-1.5">
                                            <FaRegClock size={12} /> {activeLecon.duration}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* Contrôles vidéo */}
                            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent flex items-center gap-4">
                                <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-blue-300 transition-colors">
                                    {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                                </button>
                                <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer group">
                                    <div className="h-full w-1/3 bg-[#0C8CE9] rounded-full relative">
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <span className="text-xs text-white/60 shrink-0">2:34 / {activeLecon.duration || "—"}</span>
                                <FaVolumeUp size={14} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                                <FaExpand size={13} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>

                        {/* ── Navigation leçon ── */}
                        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 mb-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <h2 className="text-sm font-bold text-slate-800 truncate">{activeLecon.title}</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">{formation.author} · {activeLecon.duration}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        disabled={!hasPrev}
                                        onClick={() => setActiveLecon(unlocked[activeIndex - 1])}
                                        className="px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-400 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        ← Précédent
                                    </button>
                                    <button
                                        disabled={!hasNext}
                                        onClick={() => setActiveLecon(unlocked[activeIndex + 1])}
                                        className="px-3 py-1.5 text-xs font-medium bg-[#0C8CE9] hover:bg-[#0A71BC] text-white rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Section Commentaires ── */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-[#0C8CE9] rounded-full inline-block"></span>
                                Commentaires & Questions
                            </h3>

                            {/* Zone de saisie */}
                            <div className="flex gap-3 mb-6">
                                <div className="w-9 h-9 rounded-full bg-[#0C8CE9] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    M
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        rows={3}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Posez une question ou laissez un commentaire sur cette leçon..."
                                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#0C8CE9] focus:ring-1 focus:ring-[#0C8CE9] resize-none placeholder-slate-400 text-slate-700 transition-colors"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={() => setComment("")}
                                            className="px-4 py-2 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white text-xs font-semibold rounded-lg transition-colors"
                                        >
                                            Envoyer
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Liste des commentaires */}
                            <div className="flex flex-col gap-4">
                                {mockComments.map((c, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                            {c.initiale}
                                        </div>
                                        <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:shadow-sm transition-shadow">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs font-bold text-slate-800">{c.nom}</span>
                                                <span className="text-[10px] text-slate-400">{c.temps}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{c.texte}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ═══ Sidebar — 20% ════════════════════════════════════════════ */}
                <aside className="w-[20%] min-w-[240px] max-w-[320px] flex flex-col bg-white border-l border-slate-200 shrink-0 overflow-hidden">

                    <div className="px-4 py-4 border-b border-slate-200 shrink-0">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                                <FiBookOpen size={12} className="text-[#0C8CE9]" />
                                Contenu
                            </h3>
                            <span className="text-[10px] text-slate-400">{formation.modules.length} modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0C8CE9] rounded-full transition-all duration-700" style={{ width: `${globalProgress}%` }} />
                            </div>
                            <span className="text-[10px] text-[#0C8CE9] font-bold shrink-0">{globalProgress}%</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {formation.modules.map((module, idx) => (
                            <SidebarModule
                                key={module.id}
                                module={module}
                                moduleIndex={idx}
                                isOpen={openModules.includes(idx)}
                                onToggle={() => toggleModule(idx)}
                                activeLeconId={activeLecon.id}
                                onSelectLecon={(lecon) => {
                                    setActiveLecon(lecon);
                                    setIsPlaying(false);
                                }}
                            />
                        ))}
                    </div>

                    <div className="border-t border-slate-200 px-4 py-4 shrink-0">
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors">
                            <FiAward size={14} />
                            Obtenir le certificat
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
