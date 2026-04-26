"use client";
import React, { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useAutoSave } from '../../../../../hooks/useAutoSave';
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const autoSaveTimer = useAutoSave(hasChanges, () => handleSave(), 30);

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
      setHasChanges(true);
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
    if (fId) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        console.error('❌ No token found');
        return;
      }

      // Load formation name
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${fId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) setFormationName(data.name || '');
        })
        .catch(err => console.error('❌ Error loading formation:', err));

      // Load modules from backend
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${fId}/modules`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('📊 Modules loaded from backend:', data);
          const moduleList = Array.isArray(data) ? data : [];
          setModules(moduleList);
          setModulesCount(moduleList.length);
          setHasChanges(false);
        })
        .catch(err => {
          console.error('❌ Error loading modules:', err);
          setModules([]);
          setModulesCount(0);
        });
    }
  }, [fId]);

  const handleTitleChange = (id, value) => {
    setModules(prev => {
      const next = prev.map(m => m.id === id ? { ...m, title: value } : m);
      saveDraft(next);
      setHasChanges(true);
      return next;
    });
  };

  const handleDescriptionChange = (id, value) => {
    setModules(prev => {
      const next = prev.map(m => m.id === id ? { ...m, description: value } : m);
      saveDraft(next);
      setHasChanges(true);
      return next;
    });
  };

  const addModule = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setMessage('Vous devez être connecté.');
      return;
    }

    try {
      const moduleIndex = modules.length + 1;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          formationId: fId,
          titre: `Module ${moduleIndex}`,
          ordre: moduleIndex
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newModule = await response.json();
      console.log('✅ Module created:', newModule);

      const next = [...modules, newModule];
      setModules(next);
      setModulesCount(next.length);
      setEditingId(newModule.id);
      setHasChanges(true);
    } catch (err) {
      console.error('❌ Error creating module:', err);
      setMessage('Erreur lors de la création du module');
    }
  };

  const goBackToModules = () => {
    window.location.href = window.location.pathname;
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setMessage('Vous devez être connecté.');
        setSaving(false);
        return;
      }

      console.log('📤 Saving modules:', modules);

      // Save each module to backend
      for (const mod of modules) {
        if (!mod.id) {
          // Create new module
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              formationId: fId,
              title: mod.title,
              description: mod.description
            })
          });
          if (!res.ok) {
            console.error('❌ Error creating module:', await res.text());
          }
        } else if (typeof mod.id === 'string' && mod.id.includes('api')) {
          // Already exists via API, skip
          console.log('✅ Module already saved:', mod.id);
        } else if (typeof mod.id === 'number' || typeof mod.id === 'string') {
          // Update existing module
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules/${mod.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              titre: mod.title || mod.titre,
              ordre: modules.indexOf(mod) + 1
            })
          });
          if (!res.ok) {
            console.error('❌ Error updating module:', await res.text());
          }
        }
      }

      console.log('✅ Modules saved successfully');
      setMessage('✅ Modules enregistrés avec succès! Continuez à ajouter des leçons ou cliquez "J\'ai terminé" pour continuer.');
      setHasChanges(false);
      // Do NOT redirect - stay on page for user to add lessons
    } catch (err) {
      console.error('❌ Error:', err);
      setMessage('❌ Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
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
                <div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
                  <ProgressStepper current={3} fId={fId} />
                  <PageHeader title={formationName || 'Modules & Leçons'} actions={
                    hasChanges ? (
                      <div className="flex items-center gap-3">
                        {autoSaveTimer !== null && autoSaveTimer > 0 && (
                          <span className="text-sm font-medium text-gray-500 animate-pulse">
                            Enregistrement automatique dans {autoSaveTimer} s
                          </span>
                        )}
                        <button onClick={handleSave} disabled={saving} className={`flex items - center justify - center w - 10 h - 10 bg - [#0C8CE9] hover: bg - [#0A71BC] text - white rounded - full transition - all shadow - md active: scale - 95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`} title="Enregistrer les modifications">
                          <FiSave className="w-5 h-5" />
                        </button>
                      </div>
                    ) : <></>
                  } />
                  <div className="bg-white p-6 rounded-2xl w-full text-black shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <button type="button" onClick={addModule} className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm bg-white hover:bg-gray-50">+ Ajouter un module</button>
                      <div className="text-sm text-gray-500">{modules.length} module(s)</div>
                    </div>

                    {modules.length === 0 ? (
                      <div className="text-sm text-gray-600">Aucun module défini. Cliquez sur "Ajouter un module" pour commencer.</div>
                    ) : (
                      <ol className="divide-y divide-gray-100">
                        {modules.map((m, index) => (
                          <li key={m.id} className="py-3">
                            <div className={`border - 2 rounded - lg p - 4 transition - shadow flex items - center justify - between ${editingId === m.id ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-blue-300'} `}>
                              <div className="flex items-center gap-4 flex-1">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-medium">{index + 1}</div>
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
                                  <div className="flex-1">
                                    <div className="text-lg font-medium">{m.title || `Module ${index + 1} `}</div>
                                    <div className="text-sm text-gray-500">{m.description || 'Pas de description'}</div>
                                  </div>
                                )}
                              </div>
                              <div className="flex-shrink-0 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const modulePath = `/ dash_formation / formations_formateurs / formation_completer / lecon ? fId = ${encodeURIComponent(fId)}& moduleId=${encodeURIComponent(m.id)} `;
                                    router.push(modulePath);
                                  }}
                                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                                >
                                  Voir les leçons
                                </button>
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
                                  aria-label={`Supprimer le module $ { m.title || m.id } `}
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
                      <div className="flex flex-col items-end gap-3">
                        {message && <div className="text-sm text-center w-full">{message}</div>}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => router.push(`/ dash_formation / formations_formateurs / formation_completer / tarification ? page = 1${fId ? `&fId=${fId}` : ''} `)}
                            className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg transition-colors"
                          >
                            Suivant
                          </button>
                        </div>
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
