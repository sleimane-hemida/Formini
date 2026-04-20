"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiClock, FiArrowLeft } from 'react-icons/fi';
import Header from "../../../../composant/layout/header";
import Sidebar from "../../sidebar/sidebar";
import Footer from "../../../../composant/layout/footer";
import PageHeader from "../../dash_principale/PageHeader";

export default function NotDisponible() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Header />

      <div className="flex w-full">
        <div className="pl-[17px] sm:pl-[17px]">
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <main>
              <PageHeader 
                title="Service de Propulsion" 
                subtitle="Mettez en avant vos formations" 
              />

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center mt-8 max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                    <FiClock className="w-10 h-10 text-[#0C8CE9]" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Bientôt disponible !
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Cette fonctionnalité est en cours de développement. Elle sera disponible très prochainement pour vous permettre de booster la visibilité de vos formations.
                </p>

                <button 
                  onClick={() => router.push('/dash_formation/dash_principale')}
                  className="inline-flex items-center gap-2 bg-[#0C8CE9] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0A71BC] transition-colors"
                >
                  <FiArrowLeft className="w-5 h-5" />
                  Retour au tableau de bord
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
