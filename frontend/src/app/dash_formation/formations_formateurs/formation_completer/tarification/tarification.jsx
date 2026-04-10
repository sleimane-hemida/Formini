"use client";
import React, { useEffect, useState } from 'react';
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
  const [promoError, setPromoError] = useState('');
  const [desiredNet, setDesiredNet] = useState('');
  const [computeMsg, setComputeMsg] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [confirmFreeOpen, setConfirmFreeOpen] = useState(false);
  const [confirmMode, setConfirmMode] = useState('activate');

  useEffect(() => {
    try {
      const key = `formation_draft_${fId || 'temp'}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const draft = JSON.parse(raw);
        const t = draft.tarification || {};
        setPrice(t.price ?? '');
        setPromoPrice(t.promoPrice ?? '');
        setIsFree(Boolean(t.isFree));
        // validate loaded values: promo must be strictly less than price
        const p = Number(String(t.price ?? '').replace(',', '.'));
        const pp = Number(String(t.promoPrice ?? '').replace(',', '.'));
        if (Number.isFinite(p) && Number.isFinite(pp) && p > 0 && pp >= p) {
          setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
        }
      }
    } catch (err) {
      // ignore
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
    e && e.preventDefault && e.preventDefault();
    // final validation
    if (!isFree) {
      const p = toNumber(price);
      const pp = toNumber(promoPrice);
      if (p > 0 && pp >= p) {
        setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
        return;
      }
    }
    setSaving(true);
    setMessage(null);
    try {
      const payload = { price: price, promoPrice: promoPrice, isFree };
      saveDraft(payload);
      await new Promise(res => setTimeout(res, 400));
      setMessage('Tarification sauvegardée (local).');
    } catch (err) {
      setMessage('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

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
                  <ProgressStepper current={4} fId={fId} />
                  <PageHeader title="Tarification" actions={<></>} />

                  <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl shadow-sm w-full text-black">
                    {message && <div className="mb-4 text-sm text-gray-700">{message}</div>}

                    <div className="mb-4">
                      <div className="text-sm text-gray-500">La commission appliquée est de 10%</div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-2">Gains souhaités (MRU)</label>
                      <div className="flex gap-3 items-center">
                        <div className="relative flex-1">
                          <input type="number" step="0.01" min="0" placeholder="1200" value={desiredNet} onChange={(e) => setDesiredNet(e.target.value)} disabled={isFree} className="w-full pr-12 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">MRU</span>
                        </div>
                        <button type="button" onClick={handleComputeGross} className="px-4 py-2 bg-[#0C8CE9] text-white rounded-lg hover:bg-[#096bb3]">Calculer le prix</button>
                      </div>
                      {computeMsg && <div className="mt-2 text-sm text-gray-600">{computeMsg}</div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Prix normal</label>
                        <div className="relative">
                          <input type="number" step="0.01" min="0" placeholder="0.00" value={price} onChange={(e) => {
                            const v = e.target.value;
                            setPrice(v);
                            // if promo exists and is >= new price, show persistent error
                            if (v !== '' && promoPrice !== '' && toNumber(promoPrice) >= toNumber(v)) {
                              setPromoError('Le prix promotionnel doit être strictement inférieur au prix normal.');
                            } else {
                              setPromoError('');
                            }
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
                          }} disabled={isFree} className="w-full pr-12 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">MRU</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Prix promo après commission (10%) : <span className="font-medium">{promoNet ? promoNet : '-'}</span></div>
                        {promoError && <div className="text-xs text-red-600 mt-2">{promoError}</div>}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition">Retour</button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          {/* Toggle switch placed before Enregistrer */}
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

                          <span className="text-sm text-gray-700">{isFree ? 'Formation gratuite activée' : 'Rendre la formation gratuite'}</span>
                        </div>

                        <button type="submit" disabled={saving} className="bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
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
                                // save an empty draft for prices
                                saveDraft({ price: '', promoPrice: '', isFree: true });
                                setConfirmFreeOpen(false);
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
