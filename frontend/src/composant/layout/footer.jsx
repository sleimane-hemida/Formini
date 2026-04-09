import Link from "next/link";
import { useTranslation } from "../common/useTranslation";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation('fr');
  return (
    <footer className="w-full bg-[#0C8CE9] text-white pt-10 pb-4 px-4 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-6 border-b border-white/20">
        {/* Bloc 1 — Identité */}
        <div className="flex flex-col gap-3">
          <span className="text-3xl font-extrabold tracking-tight">Formini</span>
          <span className="text-sm opacity-80">La plateforme qui connecte formateurs et apprenants pour progresser ensemble.</span>
        </div>
        {/* Bloc 2 — Explorer */}
        <div>
          <div className="font-bold mb-2">Explorer</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-white/90 text-sm">Catalogue des formations</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Catégories</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Formateurs</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Tarifs & abonnements</a></li>
          </ul>
        </div>
        {/* Bloc 3 — Devenir formateur */}
        <div>
          <div className="font-bold mb-2">Devenir formateur</div>
          <ul className="space-y-1">
            <li>
              <Link href="/dash_formation/dash_principale" className="hover:underline text-white/90 text-sm">
                Tableau de bord
              </Link>
            </li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Comment ça marche</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Créer mon espace formateur</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Les avantages formateur</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">FAQ formateur</a></li>
          </ul>
        </div>
        {/* Bloc 4 — Aide & Support */}
        <div>
          <div className="font-bold mb-2">Aide & Support</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-white/90 text-sm">Centre d'aide / FAQ</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Nous contacter</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Signaler un problème</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Comment payer</a></li>
          </ul>
        </div>
        {/* Bloc 5 — Légal */}
        <div>
          <div className="font-bold mb-2">Légal</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-white/90 text-sm">Conditions générales d'utilisation</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Politique de remboursement</a></li>
            <li><a href="#" className="hover:underline text-white/90 text-sm">Mentions légales</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-4 text-center text-xs text-white/70">
        &copy; {new Date().getFullYear()} Formini — Tous droits réservés.
      </div>
    </footer>
  );
}
