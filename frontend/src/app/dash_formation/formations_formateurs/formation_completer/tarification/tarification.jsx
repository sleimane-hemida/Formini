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

export default function TarificationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const fId = params ? params.get('fId') : null;

  const [price, setPrice] = useState('');
  const [promoPrice, setPromoPrice] = useState('');
  const [dateDebutPromo, setDateDebutPromo] = useState('');
  const [dateFinPromo, setDateFinPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [desiredNet, setDesiredNet] = useState('');
  const [computeMsg, setComputeMsg] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [confirmFreeOpen, setConfirmFreeOpen] = useState(false);
  const [confirmMode, setConfirmMode] = useState('activate');
  const [hasChanges, setHasChanges] = useState(false);


  useEffect(() => {
    if (fId) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        console.error('❌ No token found');
        return;
      }

      // Load data from backend
      fetch(`http://localhost:5000/api/formations/${fId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('📊 Tarification loaded data:', data);
          setIsFree(Boolean(data.est_gratuite));
          // Charger TOUJOURS les prix du backend, peu importe est_gratuite
          setPrice(data.prix_normal ? String(data.prix_normal) : '');
          setPromoPrice(data.prix_promo ? String(data.prix_promo) : '');
          setDateDebutPromo(data.date_debut_promo ? data.date_debut_promo.split('T')[0] : '');
          setDateFinPromo(data.date_fin_promo ? data.date_fin_promo.split('T')[0] : '');
          setHasChanges(false);
        })
        .catch(err => console.error('❌ Erreur lors du chargement:', err));
    } else {
      // Load from localStorage for new formations
      try {
        const key = `formation_draft_${fId || 'temp'}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          const draft = JSON.parse(raw);
          const t = draft.tarification || {};
          setPrice(t.price ?? '');
          setPromoPrice(t.promoPrice ?? '');
          setDateDebutPromo(t.dateDebutPromo ?? '');
          setDateFinPromo(t.dateFinPromo ?? '');
          setIsFree(Boolean(t.isFree));
          // validate loaded values: promo must be strictly less than price
          const p = Number(String(t.price ?? '').replace(',', '.'));
          const pp = Number(String(t.promoPrice ?? '').replace(',', '.'));
          if (Number.isFinite(p) && Number.isFinite(pp) && p > 0 && pp >= p) {
            setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
          }
          setHasChanges(false);
        }
      } catch (err) {
        // ignore
      }
    }
  }, [fId]);

  const saveDraft = (payload) => {
    try {
      const key = `formation_draft_${fId || 'temp'}`;
      const raw = localStorage.getItem(key);
      const draft = raw ? JSON.parse(raw) : {};
      draft.tarification = payload;
      localStorage.setItem(key, JSON.stringify(draft));
    } catch (err) {
      // ignore
    }
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Validation: si pas gratuit, le prix normal est OBLIGATOIRE
    if (!isFree && !price) {
      setPromoError('❌ Le prix normal est obligatoire pour une formation payante.');
      return;
    }
    
    // Validation: if promo price is set, validate it and optionally require dates
    if (!isFree && promoPrice) {
      const p = toNumber(price);
      const pp = toNumber(promoPrice);
      if (p > 0 && pp >= p) {
        setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
        return;
      }
      // Note: Backend will validate dates if prix_promo is set, so we don't need to check here
    }
    
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
        est_gratuite: isFree,
        prix_normal: isFree ? null : (price ? toNumber(price) : null),
        prix_promo: isFree || !promoPrice ? null : toNumber(promoPrice),
        date_debut_promo: (isFree || !promoPrice) ? null : (dateDebutPromo ? dateDebutPromo : null),
        date_fin_promo: (isFree || !promoPrice) ? null : (dateFinPromo ? dateFinPromo : null)
      };

      console.log('📤 Saving Tarification payload:', payload);

      const res = await fetch(`http://localhost:5000/api/formations/${fId}`, {
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
        try {
          const json = JSON.parse(text);
          if (json.errors && Array.isArray(json.errors)) {
            setMessage(`Erreur: ${json.errors.join(', ')}`);
          } else {
            setMessage(json.error || 'Erreur lors de l\'enregistrement.');
          }
        } catch {
          setMessage('Erreur lors de l\'enregistrement.');
        }
        setSaving(false);
        return;
      }

      setMessage('✅ Tarification enregistrée avec succès!');
      
      // Save draft locally for reference
      const draftPayload = { price: price, promoPrice: promoPrice, isFree };
      saveDraft(draftPayload);
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

  const autoSaveTimer = useAutoSave(hasChanges, (e) => handleSave(e), 30);

  const toNumber = (v) => {
    const n = Number(String(v).replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  };

  const priceNet = price !== '' ? (toNumber(price) * 0.9).toFixed(2) : '';
  const promoNet = promoPrice !== '' ? (toNumber(promoPrice) * 0.9).toFixed(2) : '';

  const handleComputeGross = () => {
    setComputeMsg('');
    const net = toNumber(desiredNet);
    if (net <= 0) {
      setComputeMsg('Entrez un montant net valide.');
      return;
    }
    const gross = net / 0.9; // reverse 10% commission
    const grossStr = (Math.round(gross * 100) / 100).toFixed(2);
    setPrice(grossStr);
    // re-validate promo
    if (promoPrice !== '' && toNumber(promoPrice) >= toNumber(grossStr)) {
      setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
    } else {
      setPromoError('');
    }
    setHasChanges(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24 text-black">
        <Header />
        <div className="flex w-full">
          <div className="pl-[17px] sm:pl-[17px]">
            <Sidebar />
          </div>

          <div className="flex-1 min-w-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <main>
                <div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
                  <ProgressStepper current={4} fId={fId} />
                  <PageHeader title="Tarification" actions={
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

                  <form onSubmit={handleSave} className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm w-full text-black overflow-hidden">
                    {message && <div className="mb-4 text-sm text-gray-700">{message}</div>}

                    <div className="mb-4">
                      <div className="text-sm text-gray-500">La commission appliquée est de 10%</div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-2">Gains souhaités (MRU)</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <div className="relative w-full sm:flex-1">
                          <input type="number" step="0.01" min="0" placeholder="1200" value={desiredNet} onChange={(e) => { setDesiredNet(e.target.value); setHasChanges(true); }} disabled={isFree} className="w-full pr-12 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">MRU</span>
                        </div>
                        <button type="button" onClick={handleComputeGross} className="w-full sm:w-auto px-6 py-3 bg-[#0C8CE9] text-white rounded-lg hover:bg-[#096bb3] font-semibold">Calculer le prix</button>
                      </div>
                      {computeMsg && <div className="mt-2 text-sm text-gray-600">{computeMsg}</div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Prix normal</label>
                        <div className="relative">
                          <input type="number" step="0.01" min="0" placeholder="0.00" value={price} onChange={(e) => {
                            const v = e.target.value;
                            setPrice(v);
                            // Effacer l'erreur quand l'utilisateur tape
                            if (v !== '') {
                              setPromoError('');
                            }
                            // Vérifier conflit promo vs prix
                            if (v !== '' && promoPrice !== '' && toNumber(promoPrice) >= toNumber(v)) {
                              setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
                            }
                            setHasChanges(true);
                          }} disabled={isFree} className="w-full pr-12 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">MRU</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Prix après commission (10%) : <span className="font-medium">{priceNet ? priceNet : '-'}</span></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Prix promotionnel</label>
                        <div className="relative">
                          <input type="number" step="0.01" min="0" placeholder="0.00" value={promoPrice} onChange={(e) => {
                            const v = e.target.value;
                            setPromoPrice(v);
                            // if price set and promo >= price, show persistent error
                            if (price !== '' && toNumber(v) >= toNumber(price)) {
                              setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
                            } else {
                              setPromoError('');
                            }
                            setHasChanges(true);
                          }} disabled={isFree} className="w-full pr-12 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">MRU</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Prix promo après commission (10%) : <span className="font-medium">{promoNet ? promoNet : '-'}</span></div>
                        {promoError && <div className="text-xs text-red-600 mt-2">{promoError}</div>}
                      </div>
                    </div>

                    {promoPrice && !isFree && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Date début promo</label>
                          <input 
                            type="date" 
                            value={dateDebutPromo} 
                            onChange={(e) => { setDateDebutPromo(e.target.value); setHasChanges(true); }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Date fin promo</label>
                          <input 
                            type="date" 
                            value={dateFinPromo} 
                            onChange={(e) => { setDateFinPromo(e.target.value); setHasChanges(true); }}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-4">
                      <button type="button" onClick={() => router.back()} className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition font-semibold text-center">Retour</button>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center justify-between w-full sm:w-auto gap-3 p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg border sm:border-none border-gray-200">
                          <span className="text-sm font-medium text-gray-700">{isFree ? 'Formation gratuite' : 'Rendre gratuite'}</span>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isFree}
                            onClick={() => { setConfirmMode(isFree ? 'deactivate' : 'activate'); setConfirmFreeOpen(true); }}
                            className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors focus:outline-none ${isFree ? 'bg-[#0C8CE9]' : 'bg-gray-300'}`}
                            aria-label={isFree ? 'Désactiver la gratuité' : 'Activer la gratuité'}
                          >
                            <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isFree ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>

                        <button type="button" onClick={() => router.push(`/dash_formation/formations_formateurs/formations_liste`)} className="w-full sm:w-auto bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-lg transition-colors font-bold text-center">
                          Terminer
                        </button>
                      </div>
                    </div>
                  </form>

                  {confirmFreeOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black opacity-40" onClick={() => setConfirmFreeOpen(false)} />
                      <div className="relative bg-white rounded-lg p-6 max-w-md mx-4 text-black shadow-lg z-10">
                        {confirmMode === 'activate' ? (
                          <>
                            <h3 className="text-lg font-semibold mb-2">Activer la gratuité</h3>
                            <div className="text-sm text-gray-700 mb-4">Les coûts d'une formation gratuite sont de 500 MRU pour 10 personnes. Veuillez consulter la session "formation gratuit" pour plus d'informations.</div>
                            <div className="flex justify-end gap-3">
                              <button onClick={() => setConfirmFreeOpen(false)} className="px-4 py-2 rounded border hover:bg-gray-100 transition">Annuler</button>
                              <button onClick={() => {
                                // clear inputs when activating free mode
                                setIsFree(true);
                                setPromoError('');
                                setPrice('');
                                setPromoPrice('');
                                setDesiredNet('');
                                setComputeMsg('');
                                saveDraft({ price: '', promoPrice: '', isFree: true });
                                setConfirmFreeOpen(false);
                                setHasChanges(true);
                              }} className="px-4 py-2 rounded bg-[#0C8CE9] text-white hover:bg-[#096bb3] transition">Activer</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold mb-2">Désactiver la gratuité</h3>
                            <div className="text-sm text-gray-700 mb-4">Voulez-vous vraiment désactiver la gratuité ? Les prix redeviendront modifiables.</div>
                            <div className="flex justify-end gap-3">
                              <button onClick={() => setConfirmFreeOpen(false)} className="px-4 py-2 rounded border hover:bg-gray-100 transition">Annuler</button>
                              <button onClick={() => {
                                setIsFree(false);
                                saveDraft({ price, promoPrice, isFree: false });
                                setConfirmFreeOpen(false);
                                setHasChanges(true);
                              }} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">Désactiver</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
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
