"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '../../../sidebar/sidebar';
import PageHeader from '../../../dash_principale/PageHeader';
import Footer from '../../../../../composant/layout/footer';
import ProgressStepper from '../../../../../composant/common/ProgressStepper';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Header = dynamic(
  () => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
  { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);

export default function ModuleLecon() {
  const params = useSearchParams();
  const router = useRouter();
  const fId = params ? params.get('fId') : null;

  const [modulesCount, setModulesCount] = useState(0);
  const [modules, setModules] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  const requestDeleteModule = (id) => {
    setModuleToDelete(id);
    setShowConfirmModal(true);
  };

  const cancelDelete = () => {
    setModuleToDelete(null);
    setShowConfirmModal(false);
  };

  const confirmDeleteModule = () => {
    const id = moduleToDelete;
    if (id == null) {
      cancelDelete();
      return;
    }
    setModules(prev => {
      if (prev.length <= 1) return prev; // always keep at least one
      const next = prev.filter(m => m.id !== id);
      saveDraft(next);
      return next;
    });
    if (editingId === id) setEditingId(null);
    setModuleToDelete(null);
    setShowConfirmModal(false);
  };
  const [formationName, setFormationName] = useState('');

  const saveDraft = (nextModules) => {
    try {
      const key = `formation_draft_${fId || 'temp'}`;
      const raw = localStorage.getItem(key);
      const draft = raw ? JSON.parse(raw) : {};
      draft.modules = nextModules;
      localStorage.setItem(key, JSON.stringify(draft));
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    // try to load draft from localStorage
    try {
      const key = `formation_draft_${fId || 'temp'}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const draft = JSON.parse(raw);
        // set formation name if present
        if (draft.name) setFormationName(draft.name);
        // build modules from draft but keep only one by default
        const count = Number(draft.modulesCount) || (draft.modules ? draft.modules.length : 0) || 1;
        setModulesCount(count);
        const arrFull = Array.from({ length: Math.max(1, count) }, (_, i) => ({ id: i + 1, title: draft.modules && draft.modules[i] ? draft.modules[i].title : `Module ${i + 1}` }));
        const arr = arrFull.slice(0, 1); // keep only one module as requested
        setModules(arr);
        // ensure saved draft modules exist
        saveDraft(arr);
        return;
      }
    } catch (err) {
      // ignore
    }

    // fallback: try query param
    // fallback: start with a single module by default
    const arr = [{ id: 1, title: 'Module 1' }];
    setModulesCount(1);
    setModules(arr);
    saveDraft(arr);
  }, [fId]);

  const handleTitleChange = (id, value) => {
    setModules(prev => {
      const next = prev.map(m => m.id === id ? { ...m, title: value } : m);
      saveDraft(next);
      return next;
    });
  };

  const handleDescriptionChange = (id, value) => {
    setModules(prev => {
      const next = prev.map(m => m.id === id ? { ...m, description: value } : m);
      saveDraft(next);
      return next;
    });
  };

  const addModule = () => {
    const nextId = modules.length ? Math.max(...modules.map(m => m.id)) + 1 : 1;
    const next = [...modules, { id: nextId, title: `Module ${nextId}` }];
    setModules(next);
    saveDraft(next);
    setEditingId(nextId);
  };

  const goToLessons = (moduleId) => {
    const base = '/dash_formation/formations_formateurs/formation_completer/lecon';
    const parts = [];
    if (fId) parts.push(`fId=${encodeURIComponent(fId)}`);
    if (moduleId != null) parts.push(`moduleId=${encodeURIComponent(moduleId)}`);
    const url = parts.length ? `${base}?${parts.join('&')}` : base;
    router.push(url);
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24 text-black">
        <Header />
        <div className="flex w-full">
          <div className="pl-[17px] sm:pl-[17px]">
            <Sidebar />
          </div>

          <div className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <main>
                <div className="container mx-auto px-4 py-8 pt-6 max-w-4xl">
                  <ProgressStepper current={3} fId={fId} />
                  <PageHeader title={formationName || ` (${modules.name})`} />
                  <div className="bg-white p-6 rounded-2xl w-full text-black shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <button type="button" onClick={addModule} className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm bg-white hover:bg-gray-50">+ Ajouter un module</button>
                      <div className="text-sm text-gray-500">{modules.length} module(s)</div>
                    </div>

                    {modules.length === 0 ? (
                      <div className="text-sm text-gray-600">Aucun module défini. Cliquez sur "Ajouter un module" pour commencer.</div>
                    ) : (
                      <ol className="divide-y divide-gray-100">
                        {modules.map(m => (
                          <li key={m.id} className="py-3">
                            <div onClick={() => goToLessons(m.id)} className={`border-2 rounded-lg p-3 transition-shadow flex items-center gap-4 ${editingId === m.id ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-blue-300'}`} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') goToLessons(m.id); }}>
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium">{m.id}</div>
                              {editingId === m.id ? (
                                <input
                                  autoFocus
                                  value={m.title}
                                  onClick={(e) => e.stopPropagation()}
                                  onFocus={(e) => e.stopPropagation()}
                                  onChange={(e) => handleTitleChange(m.id, e.target.value)}
                                  onBlur={() => setEditingId(null)}
                                  onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                                  className="flex-1 text-lg font-medium focus:outline-none"
                                />
                              ) : (
                                <div className="flex-1 text-lg font-medium">{m.title || `Module ${m.id}`}</div>
                              )}
                              <div className="flex-shrink-0 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setEditingId(m.id); }}
                                  title="Modifier le nom du module"
                                  className="p-2 rounded hover:bg-gray-100"
                                >
                                  <FiEdit className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); requestDeleteModule(m.id); }}
                                  title="Supprimer le module"
                                  aria-label={`Supprimer le module ${m.title || m.id}`}
                                  className="p-2 rounded text-red-500 hover:text-red-700"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition">Retour</button>
                      </div>
                      <div>
                        <button onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/tarification?page=1${fId?`&fId=${fId}`:''}`)} className="bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">Enregistrer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-black">Confirmer la suppression</h3>
            <p className="text-sm text-gray-700 mb-4">Voulez-vous vraiment supprimer ce module ? Cette action est irréversible.</p>
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 rounded bg-gray-100 text-black hover:bg-gray-200">Annuler</button>
              <button onClick={confirmDeleteModule} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
