"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../../../composant/layout/header";
import Sidebar from "../../sidebar/sidebar";
import Footer from "../../../../composant/layout/footer";
import PageHeader from "../../dash_principale/PageHeader";

export default function PropulseurValid() {
  const search = useSearchParams();
  const router = useRouter();
  const formationId = search.get("formationId");
  const budget = search.get("budget") || '';
  const daysParam = search.get("days") || '';

  const [formation, setFormation] = useState(null);
  const [checked, setChecked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const parsedDays = parseInt(daysParam, 10);
  const initialDays = !isNaN(parsedDays) && parsedDays > 0 ? parsedDays : 30;
  const [durationDays, setDurationDays] = useState(initialDays);
  const [months, setMonths] = useState(Math.max(1, Math.ceil(initialDays / 30)));

  useEffect(() => {
    // try to read formation from localStorage promotion payload first
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('formini_promotion_demo') : null;
      if (raw) {
        const payload = JSON.parse(raw);
        if (payload.formationId === formationId) {
          setFormation({ id: payload.formationId, title: payload.formationTitle || 'Formation sélectionnée' });
          // restore months/days from demo payload when available
          if (payload.months) {
            const m = parseInt(payload.months, 10) || 1;
            setMonths(m);
            setDurationDays(m * 30);
          } else if (payload.days) {
            const d = parseInt(payload.days, 10) || initialDays;
            setDurationDays(d);
            setMonths(Math.max(1, Math.ceil(d / 30)));
          }
          return;
        }
      }
    } catch (e) {}

    // fallback sample
    const samples = [
      { id: 'f1', title: 'Formation Développement Web', description: 'Apprenez HTML, CSS, JS et frameworks modernes.' },
      { id: 'f2', title: 'Formation Design UX', description: "Principes d'UX/UI et prototypage rapide." },
      { id: 'f3', title: 'Formation Marketing Digital', description: 'Stratégies de visibilité et acquisition.' },
    ];
    const found = samples.find((s) => s.id === formationId) || samples[0];
    setFormation(found);
  }, [formationId]);

  const handleConfirm = () => {
    // store final promotion payload (simulate)
    try {
      const pricePerMonth = 200;
      const payload = { formationId: formation?.id, formationTitle: formation?.title, budget, days: durationDays, months, pricePerMonth, totalCost: (months || 1) * pricePerMonth, ts: Date.now() };
      if (typeof window !== 'undefined') localStorage.setItem('formini_promotion_final', JSON.stringify(payload));
    } catch (e) {}
    setConfirmOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 text-black">
      <Header />

      <div className="flex w-full">
        <div className="pl-[17px] sm:pl-[17px]">
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <main>
              <PageHeader title="Valider la propulsion" actions={<></>} />

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-lg font-semibold">Vous allez propulser :</h2>
                  <div className="mt-3 p-4 border border-[#0C8CE9] rounded-md bg-gray-50">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900">{formation?.title}</div>
                        {formation?.description && <div className="text-sm text-gray-600 mt-1 truncate">{formation.description}</div>}
                        <div className="text-sm text-gray-600 mt-2">Durée : <span className="font-medium">{durationDays || '—'}</span> jours — Prix : <span className="font-medium">200 MRU par mois</span></div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <label htmlFor="months" className="text-sm text-gray-700">Mois</label>
                        <input
                          id="months"
                          type="number"
                          min={1}
                          value={months}
                          onChange={(e) => {
                            const m = Math.max(1, parseInt(e.target.value || '1', 10));
                            setMonths(m);
                            setDurationDays(m * 30);
                          }}
                          className="w-20 p-2 text-sm text-right border border-[#0C8CE9] rounded focus:outline-none focus:ring-2 focus:ring-[#0C8CE9]"
                        />

                        {/* <label htmlFor="days" className="text-sm text-gray-700">Jours</label>
                        <input
                          id="days"
                          type="number"
                          min={1}
                          value={durationDays}
                          onChange={(e) => {
                            const d = Math.max(1, parseInt(e.target.value || '1', 10));
                            setDurationDays(d);
                            setMonths(Math.max(1, Math.ceil(d / 30)));
                          }}
                          className="w-24 p-2 text-sm text-right border border-[#0C8CE9] rounded focus:outline-none focus:ring-2 focus:ring-[#0C8CE9]"
                        /> */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="p-4 border border-[#0C8CE9] rounded-md bg-gray-50">
                      <h3 className="font-semibold text-gray-900">Politique d'utilisation</h3>
                      <p className="mt-2 text-sm text-gray-800 leading-relaxed">En cochant la case ci‑dessous vous acceptez que cette formation soit propulsée sur la plateforme. <span className="font-semibold">Aucune demande de remboursement ne sera possible une fois le paiement effectué.</span> Veuillez vous assurer que toutes les informations sont correctes avant de poursuivre.</p>

                      <div className="mt-4 flex items-start gap-3">
                        <input id="agree" type="checkbox" className="mt-1" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                        <label htmlFor="agree" className="text-sm text-gray-800 font-semibold">J'ai compris</label>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button onClick={() => router.back()} className="mr-3 px-4 py-2 bg-gray-200 rounded">Annuler</button>
                      <button disabled={!checked} onClick={handleConfirm} className={`px-4 py-2 rounded text-white ${checked ? 'bg-[#0C8CE9] hover:bg-[#096bb3]' : 'bg-[#0C8CE9]/40 cursor-not-allowed'}`}>
                        Propulser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white max-w-md w-full rounded-lg p-6 text-center">
            <h4 className="text-xl font-semibold">Formation propulsée</h4>
            <p className="mt-3 text-sm text-gray-700">La formation a été propulsée et est en attente de paiement. Vous recevrez une notification une fois le paiement confirmé.</p>
            <div className="mt-6 flex justify-center">
              <button onClick={() => { setConfirmOpen(false); router.push('/dash_formation/abonnement/propulseur'); }} className="px-4 py-2 bg-[#0C8CE9] text-white rounded">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
