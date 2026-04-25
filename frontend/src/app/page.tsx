"use client";
import { useEffect, useState } from "react";
import CardFormateur from "./pages_common/card_formateur";
import { useRouter } from "next/navigation";
import { ROUTES, buildRouteWithQuery } from "../utils/routes";

import Header from "../composant/layout/header";
import Sidebar from "../composant/layout/sidebar";
import Footer from "../composant/layout/footer";
import CategorieBar from "../composant/layout/categorie";

import HomeCommon from "./pages_common/home";
import Card, { CardLarge } from "./pages_common/card";
import PubFormateur from "./pages_common/pub_formateur";

export default function Home() {
  const router = useRouter();
  const [formations, setFormations] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/formations-all')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFormations(data);
        }
      })
      .catch(err => console.error("Error fetching formations:", err));
  }, []);

  const mockItems = Array.from({length: 10}).map((_, i) => ({
    isMock: true,
    id: `mock-${i}`,
    image: "/images/users/formation.png",
    category: i < 4 ? "Design" : "Dev",
    durationString: i < 4 ? "3 mois" : "2 mois",
    title: i < 8 ? `Card normale ${i+1}` : (i === 8 ? "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution" : "AWS Certified solutions Architect"),
    description: i < 4 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" : (i === 8 ? "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively..." : "Autre description pour la deuxième ligne."),
    avatar: "/images/users/profile.jpg",
    author: "Lina",
    oldPrice: i < 4 ? "100 MRU" : "120 MRU",
    price: i < 4 ? "800 MRU" : "900 MRU"
  }));

  const displayItems = [...formations, ...mockItems].slice(0, 10);
  const regularCards = displayItems.slice(0, 8);
  const largeCards = displayItems.slice(8, 10);

  // Helper pour formater l'URL de l'image de manière sécurisée
  const getValidImageUrl = (url: string | null | undefined, isMock: boolean, fallback: string | null) => {
    if (!url) return fallback;
    if (isMock) return url; // Image locale du frontend (ex: /images/...)
    
    // Remplacer les antislashs par des slashs (chemins Windows)
    const cleanUrl = url.replace(/\\/g, '/');
    
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:')) {
      return cleanUrl;
    }
    return cleanUrl.startsWith('/') ? `http://localhost:5000${cleanUrl}` : `http://localhost:5000/${cleanUrl}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="mt-28" />
      <CategorieBar
        onCategoryChange={(categoryKey) => {
          router.push(buildRouteWithQuery(ROUTES.BROWSE_COURSES, { category: categoryKey }));
        }}
      />
      <HomeCommon />
      {/* Deux lignes de cartes normales (4 par ligne, 8 sur desktop, 4 sur mobile) */}
      <div className="flex flex-wrap justify-center gap-6 py-8 md:gap-8 lg:gap-10 xl:gap-12">
        {/* Show 4 cards on mobile, 8 on md+ */}
        {/* Mobile: first 4 cards only, md+: all 8 cards */}
        {regularCards.map((form: any, i) => {
          const isMock = form.isMock;
          const authorName = isMock ? form.author : (form.trainer?.name || "Formateur");
          const avatarUrl = getValidImageUrl(form.trainer?.avatar || form.avatar, isMock, isMock ? "/images/users/profile.jpg" : null);
          const imageUrl = getValidImageUrl(form.image, isMock, "/images/users/formation.png");
          const priceStr = isMock ? form.price : (form.est_gratuite ? "Gratuit" : `${form.prix_promo || form.prix_normal || 0} MRU`);
          const oldPriceStr = isMock ? form.oldPrice : (form.prix_promo && form.prix_normal ? `${form.prix_normal} MRU` : "");
          const durationStr = isMock ? form.durationString : (form.duree_totale_minutes ? `${Math.round(form.duree_totale_minutes / 60)}h` : "N/A");
          const categoryStr = isMock ? form.category : (form.Category?.name || "Catégorie");

          return (
            <Card
              key={form.id || `reg-${i}`}
              image={imageUrl}
              category={categoryStr}
              duration={durationStr}
              title={form.name || form.title}
              description={form.description}
              avatar={avatarUrl}
              author={authorName}
              oldPrice={oldPriceStr}
              price={priceStr}
              className={i < 4 ? "block md:block" : "hidden md:block"}
              onClick={() => !isMock && router.push(`/acheteur/formation/learning?id=${form.id}`)}
            />
          );
        })}
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


      <div className="flex flex-col md:flex-row justify-center gap-8 py-8">
        {largeCards.map((form: any, i) => {
          const isMock = form.isMock;
          const authorName = isMock ? form.author : (form.trainer?.name || "Formateur");
          const avatarUrl = getValidImageUrl(form.trainer?.avatar || form.avatar, isMock, isMock ? "/images/users/profile.jpg" : null);
          const imageUrl = getValidImageUrl(form.image, isMock, "/images/users/formation.png");
          const priceStr = isMock ? form.price : (form.est_gratuite ? "Gratuit" : `${form.prix_promo || form.prix_normal || 0} MRU`);
          const oldPriceStr = isMock ? form.oldPrice : (form.prix_promo && form.prix_normal ? `${form.prix_normal} MRU` : "");
          const durationStr = isMock ? form.durationString : (form.duree_totale_minutes ? `${Math.round(form.duree_totale_minutes / 60)}h` : "N/A");
          const categoryStr = isMock ? form.category : (form.Category?.name || "Catégorie");

          return (
            <CardLarge
              key={form.id || `lrg-${i}`}
              image={imageUrl}
              category={categoryStr}
              duration={durationStr}
              title={form.name || form.title}
              description={form.description}
              avatar={avatarUrl}
              author={authorName}
              oldPrice={oldPriceStr}
              price={priceStr}
              onClick={() => !isMock && router.push(`/acheteur/formation/learning?id=${form.id}`)}
            />
          );
        })}
      </div>
      {/* Section promotionnelle avant les formateurs */}
      <div className="max-w-4xl mx-auto text-center mt-20 mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
          Apprenez avec les <span className="text-[#0C8CE9]">meilleurs formateurs</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Nos formateurs sont des experts passionnés, réputés pour leur savoir-faire et leur pédagogie, prêts à vous accompagner vers la réussite.
        </p>
      </div>

      {/* Trois cartes formateur côte à côte juste avant le footer */}
      <div className="flex flex-wrap justify-center gap-8 py-12">
        {/* Featured trainers on homepage */}
        {[
          {
            id: 1,
            name: "Ahmed Mahmoud",
            title: "Expert en Marketing Digital",
            location: "Nouakchott, Mauritanie",
            description: "Spécialiste en stratégie digitale avec plus de 10 ans d'expérience.",
            expertise: ["SEO", "Copywriting", "Ads"],
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          },
          {
            id: 2,
            name: "Sidi Mohamed",
            title: "Développeur Fullstack Senior",
            location: "Nouadhibou, Mauritanie",
            description: "Passionné par la création d'applications web performantes et scalables.",
            expertise: ["React", "Node.js", "Java"],
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
          },
          {
            id: 3,
            name: "Mariem Mint Ahmed",
            title: "Designer UI/UX & Graphiste",
            location: "Nouakchott, Mauritanie",
            description: "Donner vie à vos idées à travers des interfaces intuitives et esthétiques.",
            expertise: ["Figma", "Photoshop", "Branding"],
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
          },
          {
            id: 4,
            name: "Fatimetou Zahra",
            title: "Formatrice en Soft Skills",
            location: "Kiffa, Mauritanie",
            description: "Accompagner les professionnels dans le développement de leurs compétences humaines.",
            expertise: ["Leadership", "Vente"],
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
          }
        ].map((f, i) => (
          <CardFormateur
            key={f.id}
            id={f.id}
            name={f.name}
            title={f.title}
            location={f.location}
            description={f.description}
            expertise={f.expertise}
            rating={f.rating}
            image={f.image}
            className={i < 2 ? "block" : i < 3 ? "hidden sm:block" : "hidden lg:block"}
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
