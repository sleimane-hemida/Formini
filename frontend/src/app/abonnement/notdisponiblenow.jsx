"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "../../composant/layout/header";
import Footer from "../../composant/layout/footer";
import { HiOutlineRocketLaunch, HiArrowLeft } from "react-icons/hi2";

export default function NotDisponibleAbonnement() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-20 mt-[100px]">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <HiOutlineRocketLaunch className="w-10 h-10 text-[#0C8CE9]" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Service bientôt <span className="text-[#0C8CE9]">disponible</span>
          </h1>
          
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            Nous préparons une expérience d'abonnement exceptionnelle pour vous. Ce service sera accessible très prochainement.
          </p>

          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-[#0C8CE9] text-white py-4 rounded-2xl font-bold hover:bg-[#0A71BC] transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <HiArrowLeft className="w-5 h-5" />
            Retourner
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
