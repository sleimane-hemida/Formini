"use client";
import CardFormateur from "./pages_common/card_formateur";
import { useRouter } from "next/navigation";
import { ROUTES } from "../utils/routes";

import Header from "../composant/layout/header";
import Sidebar from "../composant/layout/sidebar";
import Footer from "../composant/layout/footer";
import CategorieBar from "../composant/layout/categorie";

import HomeCommon from "./pages_common/home";
import Card, { CardLarge } from "./pages_common/card";
import PubFormateur from "./pages_common/pub_formateur";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="mt-28" />
      <CategorieBar />
      <HomeCommon />
      {/* Deux lignes de cartes normales (4 par ligne, 8 sur desktop, 4 sur mobile) */}
      <div className="flex flex-wrap justify-center gap-6 py-8 md:gap-8 lg:gap-10 xl:gap-12">
        {/* Show 4 cards on mobile, 8 on md+ */}
        {/* Mobile: first 4 cards only, md+: all 8 cards */}
        {Array.from({length: 8}).map((_, i) => (
          <Card
            key={"card-all-"+i}
            image="/images/users/formation.png"
            category={i < 4 ? "Design" : "Dev"}
            duration={i < 4 ? "3 mois" : "2 mois"}
            title={`Card normale ${i+1}`}
            description={i < 4 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" : "Autre description pour la deuxième ligne."}
            avatar="/images/users/profile.jpg"
            author="Lina"
            oldPrice={i < 4 ? "100 MRU" : "120 MRU"}
            price={i < 4 ? "800 MRU" : "900 MRU"}
            className={
              i < 4
                ? "block md:block"
                : "hidden md:block"
            }
          />
        ))}
      </div>

      {/* Lien vers le catalogue complet */}
      <div className="flex justify-center mt-6 mb-8">
        <button 
          onClick={() => router.push(ROUTES.BROWSE_COURSES)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0C8CE9] to-[#00A3FF] text-white font-semibold px-8 py-3 rounded-xl hover:from-[#0A71BC] hover:to-[#0080CC] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Explorer toutes les formations</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Bouton et titre centrés après les formations */}
      <div className="flex flex-col items-center justify-center w-full mt-8 mb-0.5">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00A3FF] mb-0 text-center leading-tight">N'importe où N'importe quand</h2>
      </div>

      {/* Section promotionnelle formateur */}
      <PubFormateur />


      {/* Une ligne de deux grandes cartes CardLarge */}
      <div className="flex flex-col md:flex-row justify-center gap-8 py-8">
        <CardLarge
          image="/images/users/formation.png"
          category="EdTech"
          duration="2 mois"
          title="Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution"
          description="Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively..."
          avatar="/images/users/profile.jpg"
          author="Lina"
          oldPrice="1000 MRU"
          price="800 MRU"
        />
        <CardLarge
          image="/images/users/formation.png"
          category="Design"
          duration="3 mois"
          title="AWS Certified solutions Architect"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          avatar="/images/users/profile.jpg"
          author="Lina"
          oldPrice="1200 MRU"
          price="900 MRU"
        />
      </div>
 {/* Trois cartes formateur côte à côte juste avant le footer */}
      <div className="flex flex-wrap justify-center gap-8 py-12">
        {/* Show 2 on mobile, 3 on md+ */}
        {[1,2,3].map((i) => (
          <CardFormateur
            key={i}
            image="/images/users/profile.jpg"
            date="1 - 25 Jan 2025"
            title={`UI UX Master the Art of Design ${i}`}
            description="Design intuitive interfaces and seamless user experiences that captivate, simplify interactions, and create meaningful connections between users and digital products"
            link="#"
            linkLabel="Formtions"
            className={
              i < 3 ? "block md:block" : "hidden md:block"
            }
          />
        ))}
      </div>


      {/*
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 bg-white">
          <p className="text-lg text-gray-700">Eden Hazard, né le 7 janvier 1991 à La Louvière en Belgique, est un footballeur international belge qui joue au poste d'ailier gauche entre 2007 et 2023. (Texte de démonstration)</p>
        </main>
      </div>
      */}
      <Footer />
    </div>
  );
}
// ...existing code...
