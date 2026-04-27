"use client";
import React, { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useAutoSave } from '../../../../../hooks/useAutoSave';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../../sidebar/sidebar';
import PageHeader from '../../../dash_principale/PageHeader';
import Footer from '../../../../../composant/layout/footer';
import ProgressStepper from '../../../../../composant/common/ProgressStepper';

const Header = dynamic(
  () => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
  { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);

export default function DetailForma() {
  const router = useRouter();
  const params = useSearchParams();
  const fId = params ? params.get('fId') : null;

  const ALL_AUDIENCES = [
    "Collégiens & Lycéens",
    "Étudiants en licence",
    "Demandeurs d'emploi",
    "Salariés",
    "Freelances & indépendants",
    "Fonctionnaires",
    "Jeune",
    "Personne âgée",
    "Sans diplôme",
    "Parent",
    "Femme au foyer"
  ];
  const MAX_AUDIENCES = 4;

  const [form, setForm] = useState({
    minutes: '',
    outcomes: '',
    prerequisites: ''
  });
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);


  useEffect(() => {
    if (fId) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        console.error('❌ No token found');
        return;
      }

      // Load existing data from backend
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${fId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('📊 DetailForma loaded data:', data);
          setForm(prev => ({
            ...prev,
            minutes: data.duree_totale_minutes || '',
            outcomes: data.ce_que_vous_apprendrez || '',
            prerequisites: data.prerequis || ''
          }));
          if (data.public_cible && Array.isArray(data.public_cible)) {
            setSelectedAudiences(data.public_cible);
          }
          setHasChanges(false);
        })
        .catch(err => console.error('❌ Erreur lors du chargement:', err));
    }
  }, [fId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const validate = () => {
    const err = {};
    const mins = Number(form.minutes);
    if (!Number.isInteger(mins) || mins <= 0) err.duration = 'La durée doit être un entier de minutes supérieur à 0.';

    // modules/lessons count are managed on the Modules page

    return { ok: Object.keys(err).length === 0, errors: err };
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const { ok, errors } = validate();
    if (!ok) return setErrors(errors);
    setErrors({});
    setSaving(true);
    setMessage(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setMessage('Vous devez être connecté.');
        setSaving(false);
        return;
      }

      const payload = {
        duree_totale_minutes: Number(form.minutes),
        ce_que_vous_apprendrez: form.outcomes,
        prerequis: form.prerequisites,
        public_cible: selectedAudiences
      };

      console.log('📤 Saving DetailForma payload:', payload);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations/${fId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('❌ Backend error:', text);
        setMessage('Erreur lors de l\'enregistrement.');
        setSaving(false);
        return;
      }

      setMessage('✅ Détails enregistrés avec succès!');
      setHasChanges(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (err) {
      console.error('❌ Error:', err);
      setMessage('Erreur réseau lors de l\'enregistrement.');
    } finally {
      setSaving(false);
    }
  };

  const autoSaveTimer = useAutoSave(hasChanges, handleSave, 30);

  const handleAddAudience = (value) => {
    if (!value) return;
    setSelectedAudiences(prev => {
      if (prev.includes(value)) return prev;
      if (prev.length >= MAX_AUDIENCES) {
        setErrors(errs => ({ ...errs, audiences: `Vous ne pouvez sélectionner que ${MAX_AUDIENCES} publics cibles au maximum.` }));
        return prev;
      }
      // clear any previous audience error
      setErrors(errs => ({ ...errs, audiences: undefined }));
      setHasChanges(true);
      return [...prev, value];
    });
  };

  const handleRemoveAudience = (value) => {
    setSelectedAudiences(prev => prev.filter(v => v !== value));
    setErrors(errs => ({ ...errs, audiences: undefined }));
    setHasChanges(true);
  };

  const totalMinutes = Number(form.minutes || 0);
  const formattedTotal = (() => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    if (totalMinutes === 0) return '0 minute';
    if (h > 0) {
      const hLabel = h === 1 ? 'heure' : 'heures';
      const mLabel = m === 1 ? 'minute' : 'minutes';
      return `${h} ${hLabel}${m > 0 ? ` ${m} ${mLabel}` : ''}`;
    }
    const mLabel = totalMinutes === 1 ? 'minute' : 'minutes';
    return `${totalMinutes} ${mLabel}`;
  })();

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
                  <ProgressStepper current={2} fId={fId} />
                  <PageHeader title="Détails de la formation" actions={
                    hasChanges ? (
                      <div className="flex items-center gap-3">
                        {autoSaveTimer !== null && autoSaveTimer > 0 && (
                          <span className="text-sm font-medium text-gray-500 animate-pulse">
                            Enregistrement automatique dans {autoSaveTimer} s
                          </span>
                        )}
                        <button onClick={handleSave} disabled={saving} className={`flex items-center justify-center w-10 h-10 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white rounded-full transition-all shadow-md active:scale-95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`} title="Enregistrer les modifications">
                          <FiSave className="w-5 h-5" />
                        </button>
                      </div>
                    ) : <></>
                  } />

                  <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl shadow-sm w-full text-black">
                    {message && <div className="mb-4 text-sm text-gray-700">{message}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-semibold mb-2">Durée (minutes) <span className="text-red-600 ml-1">*</span></label>
                        <input name="minutes" type="number" min={1} value={form.minutes} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" aria-required="true" />
                      </div>

                      <div className="md:col-span-1">
                        <label className="block text-sm font-semibold mb-2">&nbsp;</label>
                        <div className="text-sm text-gray-600 px-4 py-3">Total: {formattedTotal}</div>
                      </div>

                      {/* Nombre de modules et nombre de leçons supprimés — gérés dans Modules */}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Ce que l'utilisateur va apprendre</label>
                        <textarea name="outcomes" value={form.outcomes} onChange={handleChange} rows={4} placeholder="exp:avec cette formation vous allez apprendrez..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Prérequis</label>
                        <textarea name="prerequisites" value={form.prerequisites} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Public cible</label>
                        <div className="mb-2">
                          <select onChange={(e) => { handleAddAudience(e.target.value); e.target.value = ''; }} className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" aria-label="Sélectionner un public cible">
                            <option value="">Tout le monde</option>
                            {ALL_AUDIENCES.filter(a => !selectedAudiences.includes(a)).map(a => (
                              <option key={a} value={a}>{a}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedAudiences.map(a => (
                            <span key={a} className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-sm">
                              <span>{a}</span>
                              <button type="button" onClick={() => handleRemoveAudience(a)} className="text-gray-500 hover:text-gray-700">×</button>
                            </span>
                          ))}
                        </div>
                        {errors.audiences && <div className="text-xs text-red-600 mt-2">{errors.audiences}</div>}
                        {selectedAudiences.length >= MAX_AUDIENCES && <div className="text-xs text-gray-600 mt-2">Limite atteinte ({MAX_AUDIENCES}). Supprimez un public pour en ajouter un autre.</div>}
                      </div>
                    </div>

                    {errors.duration && <div className="text-xs text-red-600 mt-4">{errors.duration}</div>}

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition">Retour</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/module?fId=${fId}`)} className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg transition-colors">Suivant</button>
                      </div>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        /* Remove spinner arrows from number inputs (Chrome, Edge, Safari) */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Remove spinner in Firefox */
        input[type=number] {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `}</style>
    </>
  );
}
