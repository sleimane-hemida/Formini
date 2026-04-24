"use client";
import Header from "../../composant/layout/header";
import Footer from "../../composant/layout/footer";
import { useRouter } from "next/navigation";
import { HiRocketLaunch, HiLightBulb, HiShieldCheck, HiUserGroup, HiGlobeAlt } from "react-icons/hi2";

export default function AboutContent() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="mt-24 md:mt-32" />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-50/50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Redéfinir l'apprentissage <span className="text-[#0C8CE9]">ensemble</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Formini est la plateforme leader qui connecte les passionnés du savoir avec les experts les plus qualifiés pour une expérience éducative sans précédent.
          </p>
        </div>
      </section>

      {/* Notre Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                Notre Mission
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#0C8CE9] rounded-full"></span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Chez Formini, nous croyons que l'éducation de qualité doit être accessible à tous, partout. Notre mission est de briser les barrières géographiques et financières pour offrir à chacun la possibilité de monter en compétences.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nous fournissons les outils technologiques les plus avancés pour permettre aux formateurs de partager leur expertise et aux apprenants de réussir leur parcours professionnel.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" 
                alt="Équipe travaillant" 
                className="w-full h-full object-cover aspect-video md:aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Valeurs Fondamentales</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Ce qui nous guide au quotidien dans le développement de notre plateforme.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<HiRocketLaunch className="w-8 h-8" />}
              title="Innovation"
              description="Nous repoussons sans cesse les limites technologiques pour améliorer l'apprentissage."
            />
            <ValueCard 
              icon={<HiShieldCheck className="w-8 h-8" />}
              title="Excellence"
              description="Nous sélectionnons rigoureusement nos formateurs pour garantir un contenu de haute qualité."
            />
            <ValueCard 
              icon={<HiUserGroup className="w-8 h-8" />}
              title="Communauté"
              description="L'échange et le partage sont au cœur de l'expérience Formini."
            />
            <ValueCard 
              icon={<HiLightBulb className="w-8 h-8" />}
              title="Accessibilité"
              description="Apprendre n'importe où, n'importe quand, sur n'importe quel appareil."
            />
          </div>
        </div>
      </section>

      {/* Statistiques (Dummy) */}
      <section className="py-16 bg-[#0C8CE9] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15k+</div>
              <div className="text-blue-100 uppercase text-sm font-semibold tracking-wider">Apprenants</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100 uppercase text-sm font-semibold tracking-wider">Formateurs</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100 uppercase text-sm font-semibold tracking-wider">Formations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100 uppercase text-sm font-semibold tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Prêt à transformer votre avenir ?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => router.push("/formations")}
              className="bg-[#0C8CE9] text-white font-bold py-4 px-10 rounded-xl hover:bg-[#0A71BC] transition-all transform hover:scale-105 shadow-lg shadow-blue-200"
            >
              Commencer à apprendre
            </button>
            <button 
              onClick={() => router.push("/connexion/signup")}
              className="bg-white text-[#0C8CE9] border-2 border-[#0C8CE9] font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Devenir formateur
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section (New) */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Infos de contact */}
            <div className="bg-[#0C8CE9] p-12 md:w-1/3 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
                <p className="text-blue-100 mb-12">
                  Une question ? Un projet ? Notre équipe est là pour vous accompagner.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <HiGlobeAlt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Adresse</p>
                      <p className="font-medium text-sm">Nouakchott, Mauritanie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <HiRocketLaunch className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Téléphone</p>
                      <p className="font-medium text-sm">+222 44 44 44 44</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <HiUserGroup className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Email</p>
                      <p className="font-medium text-sm">contact@formini.mr</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <span className="font-bold">in</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <span className="font-bold">fb</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <span className="font-bold">tw</span>
                </div>
              </div>
            </div>

            {/* Formulaire simplifié ou Message de bienvenue */}
            <div className="p-12 md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nom complet</label>
                    <input type="text" placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0C8CE9] focus:ring-1 focus:ring-[#0C8CE9] outline-none transition-all placeholder-black text-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <input type="email" placeholder="votre@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0C8CE9] focus:ring-1 focus:ring-[#0C8CE9] outline-none transition-all placeholder-black text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Sujet</label>
                  <input type="text" placeholder="Comment pouvons-nous vous aider ?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0C8CE9] focus:ring-1 focus:ring-[#0C8CE9] outline-none transition-all placeholder-black text-black" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea rows="4" placeholder="Votre message..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0C8CE9] focus:ring-1 focus:ring-[#0C8CE9] outline-none transition-all resize-none placeholder-black text-black"></textarea>
                </div>
                <button className="w-full bg-[#0C8CE9] text-white font-bold py-4 rounded-xl hover:bg-[#0A71BC] transition-all shadow-lg shadow-blue-200">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-[#0C8CE9] group-hover:bg-[#0C8CE9] group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
