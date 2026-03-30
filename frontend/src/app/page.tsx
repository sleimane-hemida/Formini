
import Header from "../composant/layout/header";
import Sidebar from "../composant/layout/sidebar";
import Footer from "../composant/layout/footer";
import CategorieBar from "../composant/layout/categorie";

import HomeCommon from "./pages_common/home";
import Card from "./pages_common/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="mt-28" />
      <CategorieBar />
      <HomeCommon />
      <div className="flex flex-wrap justify-center gap-6 py-8 md:gap-8 lg:gap-10 xl:gap-12">
        <Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        />
        <Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        />
        <Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        />
        <Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        />
        <Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        />
        <Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        /><Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        /><Card 
          image="/images/users/formation.png"
          avatar="/images/users/profile.jpg"
        />
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
