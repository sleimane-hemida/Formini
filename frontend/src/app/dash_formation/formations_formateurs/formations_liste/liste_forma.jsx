"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMoreVertical, FiSend, FiEdit, FiFileText, FiTrash2, FiExternalLink, FiTrendingUp } from 'react-icons/fi';
import { BsGripVertical } from 'react-icons/bs';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
// Dynamic Header import with visible fallback (match pattern used in profile.jsx)
const Header = dynamic(
  () =>
    import("../../../../composant/layout/header")
      .then((mod) => mod.default || mod)
      .catch((err) => {
        console.error("Failed to load Header:", err);
        return () => (
          <div className="w-full bg-red-100 text-red-700 p-4">Header indisponible</div>
        );
      }),
  { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);
import Sidebar from '../../sidebar/sidebar';
import Footer from '../../../../composant/layout/footer';
import PageHeader from '../../dash_principale/PageHeader';

export default function ListeForma() {
  const router = useRouter();

  const initialRows = [
    { id: 'ph1', name: 'Exemple — Initiation React', description: 'Introduction aux composants, props et états', price: 'Gratuit', status: 'Publié', active: true, image: 'https://picsum.photos/seed/ph1/320/180', promotionStatus: 'pending' },
    { id: 'ph2', name: 'Exemple — CSS Avancé', description: 'Flexbox, Grid et animations pratiques', price: '50 €', status: 'Brouillon', active: false, image: 'https://picsum.photos/seed/ph2/320/180' },
    { id: 'ph3', name: 'Exemple — Productivité Dev', description: 'Outils et méthodes pour développeurs', price: '20 €', status: 'Publié', active: true, image: 'https://picsum.photos/seed/ph3/320/180', promotionStatus: 'approved' }
  ];

  const [formations, setFormations] = useState(initialRows);
  const [menuOpen, setMenuOpen] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [promotionStatuses, setPromotionStatuses] = useState({});
  const [draggingItem, setDraggingItem] = useState(null);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });
  const [ghostWidth, setGhostWidth] = useState(null);
  const ghostListenerRef = useRef(null);
  const containerRef = useRef(null);
  const containerRectRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuOpen !== null) {
        const el = document.querySelector(`[data-menu-id="${menuOpen}"]`);
        if (el && !el.contains(e.target)) setMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  const toggleActive = (id) => {
    setFormations(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
    // TODO: call backend to persist activation state
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    setDraggingItem(formations[index]);
    setGhostPos({ x: e.clientX, y: e.clientY });
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', index);
      // hide default drag image so we can show our custom preview
      const img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      e.dataTransfer.setDragImage(img, 0, 0);
    } catch (err) {}
    // measure the article width to match preview width
    try {
      const btn = e.currentTarget;
      const articleEl = btn && btn.closest ? btn.closest('article') : null;
      if (articleEl) {
        const rect = articleEl.getBoundingClientRect();
        setGhostWidth(rect.width);
      } else {
        setGhostWidth(520);
      }
    } catch (err) {
      setGhostWidth(520);
    }
    // measure container bounds so preview can't go over the sidebar
    try {
      if (containerRef.current) containerRectRef.current = containerRef.current.getBoundingClientRect();
    } catch (err) {
      containerRectRef.current = null;
    }
    const onWindowDrag = (ev) => {
      setGhostPos({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('dragover', onWindowDrag);
    ghostListenerRef.current = onWindowDrag;
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = draggedIndex != null ? draggedIndex : parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (Number.isNaN(fromIndex)) { setDraggedIndex(null); setDragOverIndex(null); return; }
    if (fromIndex === index) { setDraggedIndex(null); setDragOverIndex(null); return; }
    setFormations(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(index, 0, moved);
      return arr;
    });
    // cleanup drag state and listeners
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDraggingItem(null);
    setGhostWidth(null);
    if (ghostListenerRef.current) {
      window.removeEventListener('dragover', ghostListenerRef.current);
      ghostListenerRef.current = null;
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDraggingItem(null);
    setGhostWidth(null);
    if (ghostListenerRef.current) {
      window.removeEventListener('dragover', ghostListenerRef.current);
      ghostListenerRef.current = null;
    }
  };

  // compute preview position to avoid overflow
  const computePreviewPosition = () => {
    const width = ghostWidth || 520;
    let left = ghostPos.x + 12;
    let top = ghostPos.y + 12;
    const height = 88; // approx preview height
    if (typeof window !== 'undefined') {
      const cRect = containerRectRef.current;
      if (cRect) {
        // clamp horizontally inside container
        const minLeft = cRect.left + 8;
        const maxLeft = cRect.right - width - 8;
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;
        // clamp vertically inside container
        const minTop = cRect.top + 8;
        const maxTop = cRect.bottom - height - 8;
        if (top < minTop) top = minTop;
        if (top > maxTop) top = maxTop;
      } else {
        if (left + width > window.innerWidth - 12) {
          left = Math.max(12, ghostPos.x - width - 12);
        }
        if (top + height > window.innerHeight - 12) {
          top = Math.max(12, window.innerHeight - 120);
        }
      }
    }
    return { left, top, width };
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24">
        <Header />

        <div className="flex w-full">
          <div className="pl-[17px] sm:pl-[17px]">
            <Sidebar />
          </div>

          <div className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <main>
                <div ref={containerRef} className="container mx-auto px-4 py-8 pt-6 max-w-4xl">
                  <PageHeader
                    title="Mes formations"
                    actions={(
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => router.push('/dash_formation/formations_formateurs/formationAjouter')}
                          className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white px-4 py-2 rounded-md transition"
                        >
                          Ajouter une formation
                        </button>
                      </div>
                    )}
                  />

                  <div className="space-y-4">
                    {formations.map((f, idx) => (
                      <article
                        key={f.id || idx}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/dash_formation/formations_formateurs/formation_completer/general_forma?fId=${f.id}`); }}
                        onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/general_forma?fId=${f.id}`)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDrop={(e) => handleDrop(e, idx)}
                        className={`relative bg-[#F8F8FA] p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-6 cursor-pointer hover:shadow-md hover:bg-white transition ${dragOverIndex === idx ? 'border-dashed border-gray-400' : ''} ${draggedIndex === idx ? 'opacity-40' : ''}`}
                      >
                        {(() => {
                          const pStatus = (f && f.promotionStatus) || (promotionStatuses && promotionStatuses[f.id]);
                          if (!pStatus) return null;
                          return (
                            <span
                              className={`${pStatus === 'approved' ? 'bg-[#0C8CE9]' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center w-[30px] h-[30px] absolute top-[10px] left-[10px] -translate-x-1/2 -translate-y-1/2 z-20 ring-2 ring-white shadow`}
                              title={pStatus === 'approved' ? 'Propulsé' : 'En attente de paiement'}
                              aria-hidden="true"
                            >
                              {pStatus === 'approved' ? (<FiTrendingUp className="w-4 h-4" />) : (<span className="text-sm font-semibold">!</span>)}
                            </span>
                          );
                        })()}
                        <div className="flex items-center gap-4 min-w-0">
                          <button
                            draggable
                            onClick={(e) => e.stopPropagation()}
                            onDragStart={(e) => handleDragStart(e, idx)}
                            onDragEnd={handleDragEnd}
                            className="cursor-grab p-1 text-gray-600 hover:text-gray-800 mr-1 font-semibold"
                            title="Déplacer"
                          >
                            <BsGripVertical className="w-6 h-6" />
                          </button>
                          <img src={f.image} alt={f.name} className="w-20 h-12 object-cover rounded-md" />
                          <div className="text-sm text-gray-500 w-20">{f.id}</div>
                          <div className="min-w-0">
                            <div className="font-medium truncate text-gray-900">{f.name}</div>
                            <div className="text-xs text-gray-500 mt-1 truncate">{f.description}</div>
                            <div className="text-xs text-gray-500 mt-1">{f.price}</div>
                          </div>
                        </div>

                        {/* price moved under title; thumbnail on the left */}

                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-md text-sm font-medium ${f.active ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            {f.active ? (<><FiTrendingUp className="inline-block mr-1 w-4 h-4"/>En vente</>) : 'Désactivée'}
                          </span>

                          <button
                            onClick={(e) => { e.stopPropagation(); toggleActive(f.id); }}
                            aria-pressed={f.active}
                            className={`relative inline-flex items-center h-6 w-12 rounded-full p-1 transition-colors ${f.active ? 'bg-black' : 'bg-gray-200'}`}
                          >
                            <span className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform ${f.active ? 'translate-x-6' : 'translate-x-0'}`} />
                          </button>

                          {/* Action menu */}
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === f.id ? null : f.id); }} className="p-2 rounded hover:bg-gray-50">
                              <FiMoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                            {menuOpen === f.id && (
                              <div data-menu-id={f.id} onClick={(e) => e.stopPropagation()} className="absolute right-0 top-10 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-sm py-1">
                                <button onClick={(e) => { e.stopPropagation(); const q = `formationId=${encodeURIComponent(f.id)}&budget=${encodeURIComponent(100)}&days=${encodeURIComponent(30)}`; router.push(`/dash_formation/abonnement/propulseur_valid?${q}`); setMenuOpen(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 text-black">
                                  <FiSend className="w-4 h-4 text-gray-500" />
                                  <span>Propulser</span>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); router.push(`/dash_formation/formations_formateurs/formationAjouter?edit=${f.id}`); setMenuOpen(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 text-black">
                                  <FiEdit className="w-4 h-4 text-gray-500" />
                                  <span>Modifier</span>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setFormations(prev => prev.map(x => x.id === f.id ? { ...x, status: 'Brouillon', active: false } : x)); setMenuOpen(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 text-black">
                                  <FiFileText className="w-4 h-4 text-gray-500" />
                                  <span>Brouillons</span>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); router.push(`/formation/${f.id}`); setMenuOpen(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 text-black">
                                  <FiExternalLink className="w-4 h-4 text-gray-500" />
                                  <span>Voir en ligne</span>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); if (confirm('Supprimer cette formation ?')) setFormations(prev => prev.filter(x => x.id !== f.id)); setMenuOpen(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-50 text-red-600">
                                  <FiTrash2 className="w-4 h-4 text-red-600" />
                                  <span className="text-red-600">Supprimer</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* Drag preview that follows the cursor (full row) */}
      {draggingItem && (() => {
        const pos = computePreviewPosition();
        return (
                <div style={{ position: 'fixed', left: pos.left, top: pos.top, pointerEvents: 'none', zIndex: 60, width: pos.width }}>
          <article className="bg-[#F8F8FA] p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-6 shadow-lg opacity-95">
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-1 text-gray-600 font-semibold">
                <BsGripVertical className="w-6 h-6" />
              </div>
              <img src={draggingItem.image} alt={draggingItem.name} className="w-20 h-12 object-cover rounded-md" />
              <div className="text-sm text-gray-500 w-20">{draggingItem.id}</div>
              <div className="min-w-0">
                <div className="font-medium truncate text-gray-900">{draggingItem.name}</div>
                <div className="text-xs text-gray-500 mt-1 truncate">{draggingItem.description}</div>
                <div className="text-xs text-gray-500 mt-1">{draggingItem.price}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${draggingItem.active ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {draggingItem.active ? (<><FiTrendingUp className="inline-block mr-1 w-4 h-4"/>En vente</>) : 'Désactivée'}
              </span>
            </div>
          </article>
        </div>
        );
      })()}
    </>
  );
}
