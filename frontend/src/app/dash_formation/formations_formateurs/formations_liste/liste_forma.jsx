"use client";
import React from "react";
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

  const rows = [
    { id: 'ph1', name: 'Exemple — Initiation React', description: 'Introduction aux composants, props et états', price: 'Gratuit', status: 'Publié' },
    { id: 'ph2', name: 'Exemple — CSS Avancé', description: 'Flexbox, Grid et animations pratiques', price: '50 €', status: 'Brouillon' },
    { id: 'ph3', name: 'Exemple — Productivité Dev', description: 'Outils et méthodes pour développeurs', price: '20 €', status: 'Publié' }
  ];

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
                <div className="container mx-auto px-4 py-8 pt-6 max-w-4xl">
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
                    {rows.map((f, idx) => (
                      <article
                        key={f.id || idx}
                        className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-6 transition"
                      >
                        <div className="flex items-center gap-6 min-w-0">
                          <div className="text-sm text-gray-500 w-20">{f.id}</div>
                          <div className="min-w-0">
                            <div className="font-medium truncate text-gray-900">{f.name}</div>
                            <div className="text-xs text-gray-500 mt-1 truncate">{f.description}</div>
                          </div>
                        </div>

                        <div className="text-center w-36 text-gray-700 hidden sm:block">{f.price}</div>

                        <div className="w-36 text-right">
                          <span className={`px-3 py-1 rounded-full text-sm ${f.status === 'Publié' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{f.status}</span>
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
    </>
  );
}
