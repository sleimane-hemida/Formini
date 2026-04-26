// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { 
//     FaPlay, 
//     FaPause, 
//     FaCheckCircle, 
//     FaChevronDown, 
//     FaChevronUp, 
//     FaClock, 
//     FaArrowLeft,
//     FaRegClock,
//     FaPaperPlane,
//     FaLock,
//     FaStar,
//     FaRegStar,
//     FaVolumeUp,
//     FaVolumeMute,
//     FaExpand,
//     FaUndoAlt,
//     FaRedoAlt,
//     FaFilePdf
// } from "react-icons/fa";

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// // ─── Sidebar Module Accordion ─────────────────────────────────────────────────
// function SidebarModule({ module, moduleIndex, isOpen, onToggle, activeLeconId, onSelectLecon }) {
//     const done = module.lecons.filter((l) => l.done).length;
//     const total = module.lecons.length;
//     const progress = Math.round((done / total) * 100);

//     return (
//         <div className="border-b border-slate-100 last:border-b-0">
//             <button
//                 onClick={onToggle}
//                 className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left"
//             >
//                 <span className="text-[10px] font-bold text-slate-400 mt-0.5 shrink-0 w-5">
//                     {String(moduleIndex + 1).padStart(2, "0")}
//                 </span>
//                 <div className="flex-1 min-w-0">
//                     <p className="text-xs font-semibold text-slate-700 leading-snug">{module.title}</p>
//                     <div className="flex items-center gap-2 mt-1.5">
//                         <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
//                             <div className="h-full bg-[#0C8CE9] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
//                         </div>
//                         <span className="text-[10px] text-slate-400 shrink-0">{done}/{total}</span>
//                     </div>
//                 </div>
//                 {isOpen ? <FaChevronUp size={10} className="text-slate-300 mt-1" /> : <FaChevronDown size={10} className="text-slate-300 mt-1" />}
//             </button>

//             {isOpen && (
//                 <div className="bg-slate-50/50 py-1">
//                     {module.lecons.map((lecon) => {
//                         const isActive = lecon.id === activeLeconId;
//                         return (
//                             <button
//                                 key={lecon.id}
//                                 onClick={() => !lecon.locked && onSelectLecon(lecon)}
//                                 className={`w-full flex items-center gap-3 px-8 py-2.5 text-xs transition-colors ${
//                                     isActive ? "bg-blue-50 text-[#0C8CE9] font-bold" : "text-slate-500 hover:text-slate-800"
//                                 } ${lecon.locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
//                             >
//                                 {lecon.locked ? (
//                                     <FaLock size={10} className="shrink-0" />
//                                 ) : lecon.done ? (
//                                     <FaCheckCircle size={12} className="text-emerald-500 shrink-0" />
//                                 ) : (
//                                     <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${isActive ? "border-[#0C8CE9]" : "border-slate-300"}`} />
//                                 )}
//                                 <span className={`flex-1 leading-snug text-left ${lecon.done ? "line-through opacity-50" : ""}`}>
//                                     {lecon.title}
//                                 </span>
//                                 {lecon.duration && (
//                                     <span className="text-slate-400 shrink-0 flex items-center gap-1">
//                                         <FaRegClock size={9} />
//                                         {lecon.duration}
//                                     </span>
//                                 )}
//                             </button>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// }

// // ─── Composant Principal ───────────────────────────────────────────────────────
// export default function Learning() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const formationId = searchParams.get("id");

//     const [formation, setFormation] = useState(null);
//     const [loadingFormation, setLoadingFormation] = useState(true);
//     const [activeLecon, setActiveLecon] = useState(null);
//     const [openModules, setOpenModules] = useState([0]);
//     // Ressources de la leçon active
//     const [videoUrl, setVideoUrl] = useState(null);
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [loadingResources, setLoadingResources] = useState(false);

//     // ── Charger la formation + modules + leçons ──
//     useEffect(() => {
//         if (!formationId) return;
//         const token = localStorage.getItem('token');
//         const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

//         const loadAll = async () => {
//             try {
//                 setLoadingFormation(true);
//                 // 1. Formation
//                 const fRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${formationId}`, { headers });
//                 const fData = await fRes.json();

//                 // 2. Modules
//                 const mRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${formationId}/modules`, { headers });
//                 const modulesData = await mRes.json();

//                 // 3. Leçons de chaque module
//                 const modulesWithLecons = await Promise.all(
//                     (Array.isArray(modulesData) ? modulesData : []).map(async (mod) => {
//                         const lRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules/${mod.id}/lessons`, { headers });
//                         const lessonsData = await lRes.json();
//                         return {
//                             ...mod,
//                             title: mod.titre || mod.title || `Module`,
//                             lecons: (Array.isArray(lessonsData) ? lessonsData : []).map(l => ({
//                                 ...l,
//                                 title: l.titre || l.title || 'Leçon',
//                                 duration: l.duree_minutes ? `${l.duree_minutes} min` : null,
//                                 done: false,
//                                 locked: false,
//                             }))
//                         };
//                     })
//                 );

//                 const built = {
//                     id: fData.id,
//                     title: fData.name || 'Formation',
//                     modules: modulesWithLecons,
//                 };
//                 setFormation(built);

//                 // Sélectionner la 1ère leçon
//                 const first = modulesWithLecons.flatMap(m => m.lecons).find(l => !l.locked);
//                 if (first) setActiveLecon(first);
//             } catch (err) {
//                 console.error('❌ Erreur chargement formation:', err);
//             } finally {
//                 setLoadingFormation(false);
//             }
//         };
//         loadAll();
//     }, [formationId]);

//     // ── Charger les ressources quand la leçon change ──
//     useEffect(() => {
//         if (!activeLecon) return;
//         const token = localStorage.getItem('token');
//         const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
//         setVideoUrl(null);
//         setPdfUrl(null);
//         setLoadingResources(true);
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${activeLecon.id}/resources`, { headers })
//             .then(r => r.json())
//             .then(resources => {
//                 if (Array.isArray(resources)) {
//                     const video = resources.find(r => r.type === 'video');
//                     const pdf = resources.find(r => r.type === 'pdf');
//                     if (video) setVideoUrl(`${process.env.NEXT_PUBLIC_API_URL}${video.url}`);
//                     if (pdf) setPdfUrl(`${process.env.NEXT_PUBLIC_API_URL}${pdf.url}`);
//                 }
//             })
//             .catch(err => console.error('❌ Erreur ressources:', err))
//             .finally(() => setLoadingResources(false));
//     }, [activeLecon?.id]);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [volume, setVolume] = useState(1);
//     const [isMuted, setIsMuted] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [currentTime, setCurrentTime] = useState("0:00");
//     const [duration, setDuration] = useState("0:00");
//     const [showControls, setShowControls] = useState(true);
//     const [comment, setComment] = useState("");
//     const videoRef = useRef(null);
//     const playerContainerRef = useRef(null);

//     useEffect(() => {
//         if (videoRef.current) {
//             if (isPlaying) {
//                 videoRef.current.play().catch(err => console.log("Playback error:", err));
//             } else {
//                 videoRef.current.pause();
//             }
//         }
//     }, [isPlaying]);

//     const handleTimeUpdate = () => {
//         if (videoRef.current) {
//             const current = videoRef.current.currentTime;
//             const total = videoRef.current.duration;
//             setProgress((current / total) * 100);
//             setCurrentTime(formatTime(current));
//         }
//     };

//     const handleLoadedMetadata = () => {
//         if (videoRef.current) {
//             setDuration(formatTime(videoRef.current.duration));
//         }
//     };

//     const formatTime = (time) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//     };

//     const handleProgressChange = (e) => {
//         const newTime = (e.target.value / 100) * videoRef.current.duration;
//         videoRef.current.currentTime = newTime;
//         setProgress(e.target.value);
//     };

//     useEffect(() => {
//         if (videoRef.current) {
//             videoRef.current.muted = isMuted;
//         }
//     }, [isMuted]);

//     const handleVolumeChange = (e) => {
//         const val = parseFloat(e.target.value);
//         setVolume(val);
//         if (videoRef.current) {
//             videoRef.current.volume = val;
//             videoRef.current.muted = val === 0;
//         }
//         setIsMuted(val === 0);
//     };

//     const toggleFullscreen = () => {
//         if (!document.fullscreenElement) {
//             playerContainerRef.current.requestFullscreen().catch(err => {
//                 alert(`Error attempting to enable full-screen mode: ${err.message}`);
//             });
//         } else {
//             document.exitFullscreen();
//         }
//     };

//     const skipForward = () => {
//         if (videoRef.current) videoRef.current.currentTime += 5;
//     };

//     const skipBackward = () => {
//         if (videoRef.current) videoRef.current.currentTime -= 5;
//     };

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            
//             if (e.key === 'ArrowRight') {
//                 skipForward();
//             } else if (e.key === 'ArrowLeft') {
//                 skipBackward();
//             } else if (e.key === ' ') {
//                 e.preventDefault();
//                 setIsPlaying(prev => !prev);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, []);

//     const [contentType, setContentType] = useState("video"); // 'video' ou 'pdf'
//     const [showRatingModal, setShowRatingModal] = useState(false);
//     const [userRating, setUserRating] = useState(0);

//     // Reset vers la vidéo quand on change de leçon — DOIT être avant tout return conditionnel
//     useEffect(() => {
//         setContentType("video");
//         setIsPlaying(false);
//     }, [activeLecon?.id]);

//     const toggleModule = (i) =>
//         setOpenModules((prev) =>
//             prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
//         );

//     // Affichage de chargement si pas encore prêt
//     if (loadingFormation || !formation || !activeLecon) {
//         return (
//             <div className="flex h-screen items-center justify-center bg-white">
//                 <div className="text-center">
//                     <div className="animate-spin w-10 h-10 border-4 border-slate-200 border-t-[#0C8CE9] rounded-full mx-auto mb-4" />
//                     <p className="text-slate-400 text-sm">Chargement de la formation...</p>
//                 </div>
//             </div>
//         );
//     }

//     const allLecons = formation.modules.flatMap((m) => m.lecons);
//     const totalDone = allLecons.filter((l) => l.done).length;
//     const totalLecons = allLecons.length;
//     const globalProgress = totalLecons > 0 ? Math.round((totalDone / totalLecons) * 100) : 0;

//     const unlocked = allLecons.filter((l) => !l.locked);
//     const activeIndex = unlocked.findIndex((l) => l.id === activeLecon.id);
//     const hasPrev = activeIndex > 0;
//     const hasNext = activeIndex < unlocked.length - 1;

//     const mockComments = [
//         { initiale: "S", nom: "Sarah D.", temps: "il y a 2 jours", texte: "Super explication ! Merci pour la clarification sur la différence entre UX et UI, c'était très clair.", color: "bg-pink-500" },
//         { initiale: "O", nom: "Oumar B.", temps: "il y a 5 jours", texte: "Est-ce que vous pouvez recommander des ressources complémentaires pour approfondir cette partie ?", color: "bg-emerald-500" },
//         { initiale: "L", nom: "Lina M.", temps: "il y a 1 semaine", texte: "J'avais du mal à comprendre ce concept avant ce cours. Maintenant tout est limpide. Excellente pédagogie !", color: "bg-amber-500" },
//     ];

//     return (
//         <div className="flex flex-col h-screen bg-white text-slate-900 overflow-hidden font-sans">
//             <style>{`
//                 .hide-scrollbar::-webkit-scrollbar { display: none; }
//                 .video-slider::-webkit-slider-thumb {
//                     -webkit-appearance: none;
//                     appearance: none;
//                     width: 12px;
//                     height: 12px;
//                     background: #0C8CE9;
//                     border-radius: 50%;
//                     cursor: pointer;
//                     border: 2px solid white;
//                 }
//             `}</style>

//             {/* ── Topbar ── */}
//             <header className="h-14 flex items-center px-5 bg-white border-b border-slate-200 shrink-0 z-20 shadow-sm">
//                 <button
//                     onClick={() => router.back()}
//                     className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-medium transition-colors mr-6"
//                 >
//                     <FaArrowLeft size={11} />
//                     Retour
//                 </button>

//                 <div className="flex-1 min-w-0">
//                     <p className="text-xs font-bold text-slate-800 truncate">{formation.title}</p>
//                     <p className="text-[10px] text-slate-400 truncate">{activeLecon.title}</p>
//                 </div>

//                 <div className="hidden sm:flex items-center gap-3 mr-2">
//                     <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-[#0C8CE9] rounded-full transition-all duration-700" style={{ width: `${globalProgress}%` }} />
//                     </div>
//                     <span className="text-[11px] text-slate-500 font-medium shrink-0">
//                         {globalProgress}% — {totalDone}/{totalLecons} leçons
//                     </span>
//                 </div>
//             </header>

//             {/* ── Corps principal ── */}
//             <div className="flex flex-1 overflow-hidden">

//                 {/* ═══ Zone contenu principale — scrollable ══════════════════ */}
//                 <div className="flex flex-col flex-1 overflow-y-auto bg-slate-50 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//                     <div className="px-8 pt-6">

//                         {/* ── Sélecteur de type de contenu ── */}
//                         <div className="flex items-center gap-1 mb-4 bg-white/50 p-1 rounded-xl w-fit border border-slate-200 shadow-sm">
//                             <button
//                                 onClick={() => setContentType("video")}
//                                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${
//                                     contentType === "video" ? "bg-white text-[#0C8CE9] shadow-sm" : "text-slate-400 hover:text-slate-600"
//                                 }`}
//                             >
//                                 <FaPlay size={10} /> Vidéo
//                             </button>
//                             <button
//                                 onClick={() => setContentType("pdf")}
//                                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${
//                                     contentType === "pdf" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
//                                 }`}
//                             >
//                                 <FaFilePdf size={11} /> Support PDF
//                             </button>
//                         </div>

//                         {/* ── Zone d'affichage (Vidéo ou PDF) ── */}
//                         <div
//                             ref={playerContainerRef}
//                             className="relative group w-full bg-slate-900 rounded-2xl overflow-hidden mb-4 shadow-2xl border border-slate-200"
//                             style={{ height: "520px" }}
//                         >
//                             {contentType === "video" ? (
//                                 <>
//                                     {loadingResources ? (
//                                         <div className="w-full h-full flex items-center justify-center">
//                                             <div className="animate-spin w-10 h-10 border-4 border-white/20 border-t-[#0C8CE9] rounded-full" />
//                                         </div>
//                                     ) : videoUrl ? (
//                                         <video
//                                             ref={videoRef}
//                                             src={videoUrl}
//                                             className="w-full h-full object-contain"
//                                             onTimeUpdate={handleTimeUpdate}
//                                             onLoadedMetadata={handleLoadedMetadata}
//                                             onPlay={() => setIsPlaying(true)}
//                                             onPause={() => setIsPlaying(false)}
//                                             onClick={() => setIsPlaying(!isPlaying)}
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
//                                             <FaPlay size={40} className="mb-3 opacity-30" />
//                                             <p className="text-sm">Aucune vidéo disponible pour cette leçon</p>
//                                         </div>
//                                     )}
                                    
//                                     {/* Overlay de lecture au centre */}
//                                     {!isPlaying && videoUrl && (
//                                         <div 
//                                             className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] cursor-pointer"
//                                             onClick={() => setIsPlaying(true)}
//                                         >
//                                             <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
//                                                 <FaPlay className="text-white w-8 h-8 ml-1" />
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* Barre de contrôles Custom (Glassmorphism) */}
//                                     <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                                        
//                                         {/* Barre de progression */}
//                                         <div className="relative flex items-center gap-4 mb-4">
//                                             <span className="text-[10px] font-bold text-white/80 tabular-nums w-8 text-right">{currentTime}</span>
//                                             <div className="flex-1 relative h-6 flex items-center">
//                                                 <input
//                                                     type="range"
//                                                     min="0"
//                                                     max="100"
//                                                     value={progress}
//                                                     onChange={handleProgressChange}
//                                                     className="video-slider w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer outline-none"
//                                                     style={{
//                                                         background: `linear-gradient(to right, #0C8CE9 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
//                                                     }}
//                                                 />
//                                             </div>
//                                             <span className="text-[10px] font-bold text-white/80 tabular-nums w-8">{duration}</span>
//                                         </div>

//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center gap-6">
//                                                 {/* Skip Backward */}
//                                                 <button onClick={skipBackward} className="text-white/80 hover:text-white transition-all transform hover:scale-110">
//                                                     <FaUndoAlt size={16} />
//                                                 </button>

//                                                 {/* Play/Pause */}
//                                                 <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-[#0C8CE9] transition-all transform hover:scale-110">
//                                                     {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-0.5" />}
//                                                 </button>

//                                                 {/* Skip Forward */}
//                                                 <button onClick={skipForward} className="text-white/80 hover:text-white transition-all transform hover:scale-110">
//                                                     <FaRedoAlt size={16} />
//                                                 </button>

//                                                 {/* Volume */}
//                                                 <div className="flex items-center gap-3 group/vol">
//                                                     <button onClick={() => setIsMuted(!isMuted)} className="text-white/80 hover:text-white transition-colors">
//                                                         {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
//                                                     </button>
//                                                     <input
//                                                         type="range"
//                                                         min="0"
//                                                         max="1"
//                                                         step="0.01"
//                                                         value={isMuted ? 0 : volume}
//                                                         onChange={handleVolumeChange}
//                                                         className="video-slider w-0 group-hover/vol:w-20 transition-all duration-300 h-1 bg-white/20 rounded-full appearance-none cursor-pointer overflow-hidden"
//                                                         style={{
//                                                             background: `linear-gradient(to right, #fff ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
//                                                         }}
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center gap-6">
//                                                 <span className="hidden md:block text-[11px] font-bold text-white/50 uppercase tracking-widest">{activeLecon.title}</span>
//                                                 <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition-all transform hover:scale-110">
//                                                     <FaExpand size={18} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </>
//                             ) : pdfUrl ? (
//                                 <iframe
//                                     src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
//                                     className="w-full h-[calc(100%+60px)] -mt-[60px] bg-white border-none"
//                                     title="Support PDF"
//                                     style={{ pointerEvents: 'auto' }}
//                                 />
//                             ) : (
//                                 <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
//                                     <FaFilePdf size={40} className="mb-3 opacity-30" />
//                                     <p className="text-sm">Aucun PDF disponible pour cette leçon</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* ── Barre d'actions vidéo ── */}
//                         <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
//                             <div className="flex items-center gap-4">
//                                 <button
//                                     disabled={!hasPrev}
//                                     onClick={() => setActiveLecon(unlocked[activeIndex - 1])}
//                                     className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
//                                         hasPrev ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "opacity-30 cursor-not-allowed"
//                                     }`}
//                                 >
//                                     Précédent
//                                 </button>
//                                 <button
//                                     disabled={!hasNext}
//                                     onClick={() => setActiveLecon(unlocked[activeIndex + 1])}
//                                     className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
//                                         hasNext ? "bg-[#0C8CE9] text-white hover:bg-blue-600 shadow-md shadow-blue-100" : "opacity-30 cursor-not-allowed"
//                                     }`}
//                                 >
//                                     Suivant
//                                 </button>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leçon {activeIndex + 1} / {unlocked.length}</span>
//                             </div>
//                         </div>

//                         {/* ── Infos Leçon & Commentaires ── */}
//                         <div className="max-w-4xl">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h1 className="text-2xl font-bold text-slate-800">{activeLecon.title}</h1>
//                                 <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
//                                     <FaCheckCircle /> Complété
//                                 </div>
//                             </div>
                            
//                             <p className="text-slate-500 text-sm leading-relaxed mb-10 border-l-4 border-[#0C8CE9] pl-6 py-1">
//                                 Dans cette leçon, nous allons explorer en détail les principes fondamentaux de la thématique. 
//                                 Prenez des notes et n'hésitez pas à poser vos questions dans l'espace commentaires ci-dessous.
//                             </p>

//                             <hr className="border-slate-200 mb-10" />

//                             {/* Section Commentaires */}
//                             <div className="mb-20">
//                                 <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
//                                     Discussion <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">12</span>
//                                 </h3>
                                
//                                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
//                                     <div className="flex gap-4">
//                                         <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">M</div>
//                                         <div className="flex-1">
//                                             <textarea
//                                                 value={comment}
//                                                 onChange={(e) => setComment(e.target.value)}
//                                                 placeholder="Posez une question ou laissez un avis..."
//                                                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0C8CE9] transition-all min-h-[100px]"
//                                             />
//                                             <div className="flex justify-end mt-3">
//                                                 <button className="flex items-center gap-2 bg-[#0C8CE9] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-100">
//                                                     Envoiyer <FaPaperPlane size={10} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-6">
//                                     {mockComments.map((c, i) => (
//                                         <div key={i} className="flex gap-4 group">
//                                             <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
//                                                 {c.initiale}
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-1">
//                                                     <span className="font-bold text-sm text-slate-800">{c.nom}</span>
//                                                     <span className="text-[10px] text-slate-400">• {c.temps}</span>
//                                                 </div>
//                                                 <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 group-hover:border-slate-200 transition-all">
//                                                     {c.texte}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ═══ Sidebar de navigation ═════════════════════════════════ */}
//                 <aside className="w-80 border-l border-slate-200 bg-white flex flex-col shrink-0 z-10 shadow-xl">
//                     <div className="p-5 border-b border-slate-100 bg-slate-50/50">
//                         <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-tight">Sommaire du cours</h2>
//                         <p className="text-[10px] text-slate-400 font-medium">Parcourez les modules et progressez à votre rythme</p>
//                     </div>
                    
//                     <div className="flex-1 overflow-y-auto hide-scrollbar">
//                         {formation.modules.map((module, i) => (
//                             <SidebarModule
//                                 key={module.id}
//                                 module={module}
//                                 moduleIndex={i}
//                                 isOpen={openModules.includes(i)}
//                                 onToggle={() => toggleModule(i)}
//                                 activeLeconId={activeLecon.id}
//                                 onSelectLecon={setActiveLecon}
//                             />
//                         ))}
//                     </div>
                    
//                     <div className="p-4 border-t border-slate-100 bg-slate-50">
//                         <button 
//                             onClick={() => setShowRatingModal(true)}
//                             className="w-full flex items-center justify-center gap-2 bg-white text-[#0C8CE9] border border-blue-100 py-3 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm"
//                         >
//                             <FaStar size={12} className="text-amber-400" /> Notez cette formation
//                         </button>
//                     </div>
//                 </aside>

//             </div>

//             {/* Popup de Notation (Inline pour éviter les rechargements) */}
//             {showRatingModal && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//                     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRatingModal(false)} />
//                     <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-scale-in">
//                         <div className="text-center">
//                             <h2 className="text-xl font-bold text-slate-800 mb-6">Votre note</h2>
//                             <div className="flex justify-center gap-2 mb-8">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                     <button
//                                         key={star}
//                                         onClick={() => setUserRating(star)}
//                                     >
//                                         {star <= userRating ? (
//                                             <FaStar className="w-8 h-8 text-amber-400" />
//                                         ) : (
//                                             <FaRegStar className="w-8 h-8 text-slate-200" />
//                                         )}
//                                     </button>
//                                 ))}
//                             </div>
//                             <button 
//                                 onClick={() => setShowRatingModal(false)}
//                                 className="w-full bg-[#0C8CE9] text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
//                             >
//                                 Valider
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
    FaPlay, 
    FaPause, 
    FaCheckCircle, 
    FaChevronDown, 
    FaChevronUp, 
    FaClock, 
    FaArrowLeft,
    FaRegClock,
    FaPaperPlane,
    FaLock,
    FaStar,
    FaRegStar,
    FaVolumeUp,
    FaVolumeMute,
    FaExpand,
    FaUndoAlt,
    FaRedoAlt,
    FaFilePdf
} from "react-icons/fa";

// ✅ Helper : gère les URLs Cloudinary (absolues) et les anciennes URLs locales
const resolveUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

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
                {isOpen ? <FaChevronUp size={10} className="text-slate-300 mt-1" /> : <FaChevronDown size={10} className="text-slate-300 mt-1" />}
            </button>

            {isOpen && (
                <div className="bg-slate-50/50 py-1">
                    {module.lecons.map((lecon) => {
                        const isActive = lecon.id === activeLeconId;
                        return (
                            <button
                                key={lecon.id}
                                onClick={() => !lecon.locked && onSelectLecon(lecon)}
                                className={`w-full flex items-center gap-3 px-8 py-2.5 text-xs transition-colors ${
                                    isActive ? "bg-blue-50 text-[#0C8CE9] font-bold" : "text-slate-500 hover:text-slate-800"
                                } ${lecon.locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {lecon.locked ? (
                                    <FaLock size={10} className="shrink-0" />
                                ) : lecon.done ? (
                                    <FaCheckCircle size={12} className="text-emerald-500 shrink-0" />
                                ) : (
                                    <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${isActive ? "border-[#0C8CE9]" : "border-slate-300"}`} />
                                )}
                                <span className={`flex-1 leading-snug text-left ${lecon.done ? "line-through opacity-50" : ""}`}>
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
    const formationId = searchParams.get("id");

    const [formation, setFormation] = useState(null);
    const [loadingFormation, setLoadingFormation] = useState(true);
    const [activeLecon, setActiveLecon] = useState(null);
    const [openModules, setOpenModules] = useState([0]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loadingResources, setLoadingResources] = useState(false);

    // ── Charger la formation + modules + leçons ──
    useEffect(() => {
        if (!formationId) return;
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const loadAll = async () => {
            try {
                setLoadingFormation(true);
                const fRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${formationId}`, { headers });
                const fData = await fRes.json();

                const mRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${formationId}/modules`, { headers });
                const modulesData = await mRes.json();

                const modulesWithLecons = await Promise.all(
                    (Array.isArray(modulesData) ? modulesData : []).map(async (mod) => {
                        const lRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules/${mod.id}/lessons`, { headers });
                        const lessonsData = await lRes.json();
                        return {
                            ...mod,
                            title: mod.titre || mod.title || `Module`,
                            lecons: (Array.isArray(lessonsData) ? lessonsData : []).map(l => ({
                                ...l,
                                title: l.titre || l.title || 'Leçon',
                                duration: l.duree_minutes ? `${l.duree_minutes} min` : null,
                                done: false,
                                locked: false,
                            }))
                        };
                    })
                );

                const built = {
                    id: fData.id,
                    title: fData.name || 'Formation',
                    modules: modulesWithLecons,
                };
                setFormation(built);

                const first = modulesWithLecons.flatMap(m => m.lecons).find(l => !l.locked);
                if (first) setActiveLecon(first);
            } catch (err) {
                console.error('❌ Erreur chargement formation:', err);
            } finally {
                setLoadingFormation(false);
            }
        };
        loadAll();
    }, [formationId]);

    // ── Charger les ressources quand la leçon change ──
    useEffect(() => {
        if (!activeLecon) return;
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        setVideoUrl(null);
        setPdfUrl(null);
        setLoadingResources(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${activeLecon.id}/resources`, { headers })
            .then(r => r.json())
            .then(resources => {
                if (Array.isArray(resources)) {
                    const video = resources.find(r => r.type === 'video');
                    const pdf = resources.find(r => r.type === 'pdf');
                    // ✅ resolveUrl gère les URLs Cloudinary et les anciennes URLs locales
                    if (video) setVideoUrl(resolveUrl(video.url));
                    if (pdf) setPdfUrl(resolveUrl(pdf.url));
                }
            })
            .catch(err => console.error('❌ Erreur ressources:', err))
            .finally(() => setLoadingResources(false));
    }, [activeLecon?.id]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [showControls, setShowControls] = useState(true);
    const [comment, setComment] = useState("");
    const videoRef = useRef(null);
    const playerContainerRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(err => console.log("Playback error:", err));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setProgress((current / total) * 100);
            setCurrentTime(formatTime(current));
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(formatTime(videoRef.current.duration));
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.volume = val;
            videoRef.current.muted = val === 0;
        }
        setIsMuted(val === 0);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const skipForward = () => {
        if (videoRef.current) videoRef.current.currentTime += 5;
    };

    const skipBackward = () => {
        if (videoRef.current) videoRef.current.currentTime -= 5;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowRight') skipForward();
            else if (e.key === 'ArrowLeft') skipBackward();
            else if (e.key === ' ') { e.preventDefault(); setIsPlaying(prev => !prev); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const [contentType, setContentType] = useState("video");
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        setContentType("video");
        setIsPlaying(false);
    }, [activeLecon?.id]);

    const toggleModule = (i) =>
        setOpenModules((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );

    if (loadingFormation || !formation || !activeLecon) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-slate-200 border-t-[#0C8CE9] rounded-full mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Chargement de la formation...</p>
                </div>
            </div>
        );
    }

    const allLecons = formation.modules.flatMap((m) => m.lecons);
    const totalDone = allLecons.filter((l) => l.done).length;
    const totalLecons = allLecons.length;
    const globalProgress = totalLecons > 0 ? Math.round((totalDone / totalLecons) * 100) : 0;

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
                .video-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    background: #0C8CE9;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid white;
                }
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

                {/* ═══ Zone contenu principale ══════════════════ */}
                <div className="flex flex-col flex-1 overflow-y-auto bg-slate-50 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="px-8 pt-6">

                        {/* ── Sélecteur Vidéo / PDF ── */}
                        <div className="flex items-center gap-1 mb-4 bg-white/50 p-1 rounded-xl w-fit border border-slate-200 shadow-sm">
                            <button
                                onClick={() => setContentType("video")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${
                                    contentType === "video" ? "bg-white text-[#0C8CE9] shadow-sm" : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                <FaPlay size={10} /> Vidéo
                            </button>
                            <button
                                onClick={() => setContentType("pdf")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${
                                    contentType === "pdf" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                <FaFilePdf size={11} /> Support PDF
                            </button>
                        </div>

                        {/* ── Zone d'affichage ── */}
                        <div
                            ref={playerContainerRef}
                            className="relative group w-full bg-slate-900 rounded-2xl overflow-hidden mb-4 shadow-2xl border border-slate-200"
                            style={{ height: "520px" }}
                        >
                            {contentType === "video" ? (
                                <>
                                    {loadingResources ? (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="animate-spin w-10 h-10 border-4 border-white/20 border-t-[#0C8CE9] rounded-full" />
                                        </div>
                                    ) : videoUrl ? (
                                        <video
                                            ref={videoRef}
                                            src={videoUrl}
                                            className="w-full h-full object-contain"
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            onClick={() => setIsPlaying(!isPlaying)}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                                            <FaPlay size={40} className="mb-3 opacity-30" />
                                            <p className="text-sm">Aucune vidéo disponible pour cette leçon</p>
                                        </div>
                                    )}

                                    {/* Overlay lecture */}
                                    {!isPlaying && videoUrl && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] cursor-pointer"
                                            onClick={() => setIsPlaying(true)}
                                        >
                                            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                                                <FaPlay className="text-white w-8 h-8 ml-1" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Contrôles */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="relative flex items-center gap-4 mb-4">
                                            <span className="text-[10px] font-bold text-white/80 tabular-nums w-8 text-right">{currentTime}</span>
                                            <div className="flex-1 relative h-6 flex items-center">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={progress}
                                                    onChange={handleProgressChange}
                                                    className="video-slider w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer outline-none"
                                                    style={{ background: `linear-gradient(to right, #0C8CE9 ${progress}%, rgba(255,255,255,0.2) ${progress}%)` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-white/80 tabular-nums w-8">{duration}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <button onClick={skipBackward} className="text-white/80 hover:text-white transition-all transform hover:scale-110">
                                                    <FaUndoAlt size={16} />
                                                </button>
                                                <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-[#0C8CE9] transition-all transform hover:scale-110">
                                                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-0.5" />}
                                                </button>
                                                <button onClick={skipForward} className="text-white/80 hover:text-white transition-all transform hover:scale-110">
                                                    <FaRedoAlt size={16} />
                                                </button>
                                                <div className="flex items-center gap-3 group/vol">
                                                    <button onClick={() => setIsMuted(!isMuted)} className="text-white/80 hover:text-white transition-colors">
                                                        {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                                                    </button>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={isMuted ? 0 : volume}
                                                        onChange={handleVolumeChange}
                                                        className="video-slider w-0 group-hover/vol:w-20 transition-all duration-300 h-1 bg-white/20 rounded-full appearance-none cursor-pointer overflow-hidden"
                                                        style={{ background: `linear-gradient(to right, #fff ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="hidden md:block text-[11px] font-bold text-white/50 uppercase tracking-widest">{activeLecon.title}</span>
                                                <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition-all transform hover:scale-110">
                                                    <FaExpand size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : loadingResources ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="animate-spin w-10 h-10 border-4 border-white/20 border-t-[#0C8CE9] rounded-full" />
                                </div>
                            ) : pdfUrl ? (
                                // ✅ Google Docs Viewer pour les PDFs Cloudinary (raw)
                                <div className="w-full h-full flex flex-col">
                                    <iframe
                                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                                        className="w-full flex-1 bg-white border-none"
                                        title="Support PDF"
                                    />
                                    <div className="bg-slate-800 px-4 py-2 flex justify-end">
                                        <a
                                            href={pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-300 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <FaFilePdf size={11} /> Ouvrir dans un nouvel onglet
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                                    <FaFilePdf size={40} className="mb-3 opacity-30" />
                                    <p className="text-sm">Aucun PDF disponible pour cette leçon</p>
                                </div>
                            )}
                        </div>

                        {/* ── Navigation leçons ── */}
                        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-4">
                                <button
                                    disabled={!hasPrev}
                                    onClick={() => setActiveLecon(unlocked[activeIndex - 1])}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                        hasPrev ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "opacity-30 cursor-not-allowed"
                                    }`}
                                >
                                    Précédent
                                </button>
                                <button
                                    disabled={!hasNext}
                                    onClick={() => setActiveLecon(unlocked[activeIndex + 1])}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                                        hasNext ? "bg-[#0C8CE9] text-white hover:bg-blue-600 shadow-md shadow-blue-100" : "opacity-30 cursor-not-allowed"
                                    }`}
                                >
                                    Suivant
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leçon {activeIndex + 1} / {unlocked.length}</span>
                            </div>
                        </div>

                        {/* ── Infos & Commentaires ── */}
                        <div className="max-w-4xl">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-slate-800">{activeLecon.title}</h1>
                                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                    <FaCheckCircle /> Complété
                                </div>
                            </div>

                            <p className="text-slate-500 text-sm leading-relaxed mb-10 border-l-4 border-[#0C8CE9] pl-6 py-1">
                                Dans cette leçon, nous allons explorer en détail les principes fondamentaux de la thématique.
                                Prenez des notes et n'hésitez pas à poser vos questions dans l'espace commentaires ci-dessous.
                            </p>

                            <hr className="border-slate-200 mb-10" />

                            {/* Commentaires */}
                            <div className="mb-20">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    Discussion <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">12</span>
                                </h3>

                                {/* commentaire pour le deploiement */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">M</div>
                                        <div className="flex-1">
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Posez une question ou laissez un avis..."
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0C8CE9] transition-all min-h-[100px]"
                                            />
                                            <div className="flex justify-end mt-3">
                                                <button className="flex items-center gap-2 bg-[#0C8CE9] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-100">
                                                    Envoyer <FaPaperPlane size={10} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {mockComments.map((c, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                                                {c.initiale}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-sm text-slate-800">{c.nom}</span>
                                                    <span className="text-[10px] text-slate-400">• {c.temps}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 group-hover:border-slate-200 transition-all">
                                                    {c.texte}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ Sidebar navigation ═════════════════════════════════ */}
                <aside className="w-80 border-l border-slate-200 bg-white flex flex-col shrink-0 z-10 shadow-xl">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-tight">Sommaire du cours</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Parcourez les modules et progressez à votre rythme</p>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar">
                        {formation.modules.map((module, i) => (
                            <SidebarModule
                                key={module.id}
                                module={module}
                                moduleIndex={i}
                                isOpen={openModules.includes(i)}
                                onToggle={() => toggleModule(i)}
                                activeLeconId={activeLecon.id}
                                onSelectLecon={setActiveLecon}
                            />
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50">
                        <button
                            onClick={() => setShowRatingModal(true)}
                            className="w-full flex items-center justify-center gap-2 bg-white text-[#0C8CE9] border border-blue-100 py-3 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm"
                        >
                            <FaStar size={12} className="text-amber-400" /> Notez cette formation
                        </button>
                    </div>
                </aside>
            </div>

            {/* Modal Notation */}
            {showRatingModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRatingModal(false)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Votre note</h2>
                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} onClick={() => setUserRating(star)}>
                                        {star <= userRating ? (
                                            <FaStar className="w-8 h-8 text-amber-400" />
                                        ) : (
                                            <FaRegStar className="w-8 h-8 text-slate-200" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="w-full bg-[#0C8CE9] text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                            >
                                Valider
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
