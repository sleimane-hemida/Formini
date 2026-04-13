import Header from "../../../composant/layout/header";
import Nav from "../navigation/nav";
import Footer from "../../../composant/layout/footer";
import { HiBookOpen, HiCheckCircle, HiPlay, HiClock } from "react-icons/hi2";
import { FiBarChart2, FiBook, FiDollarSign, FiStar } from "react-icons/fi";


export default function AcceuilPage() {
	return (
		<>
			<Header />
			<div className="pt-24 bg-white min-h-screen"> {/* espace pour header fixe - header height */}
				<Nav />
				<main className="max-w-7xl mx-auto px-4 py-8 text-black">{/* tout le texte de la page en noir */}
					{/* Contenu de la page d'accueil acheteur — à personnaliser */}
					<section className="text-center py-8">
						<h1 className="text-2xl sm:text-3xl font-bold">Bienvenue sur Formini</h1>
						<p className="mt-2 text-black">Découvrez des formations, suivez votre apprentissage et gérez votre compte.</p>
					</section>

					{/* Statistiques simples */}
					<section className="mt-8">
						<div className="max-w-7xl mx-auto px-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
									<div className="bg-blue-50 text-blue-600 p-3 rounded-md">
										<HiBookOpen className="w-6 h-6" />
									</div>
									<div>
										<div className="text-sm text-black">Total formations</div>
										<div className="text-xl font-bold">24</div>
									</div>
								</div>

								<div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
									<div className="bg-green-50 text-green-600 p-3 rounded-md">
										<HiCheckCircle className="w-6 h-6" />
									</div>
									<div>
										<div className="text-sm text-black">Formations terminées</div>
										<div className="text-xl font-bold">3</div>
									</div>
								</div>

								<div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
									<div className="bg-yellow-50 text-yellow-600 p-3 rounded-md">
										<HiPlay className="w-6 h-6" />
									</div>
									<div>
										<div className="text-sm text-black">En cours</div>
										<div className="text-xl font-bold">4</div>
									</div>
								</div>

								<div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
									<div className="bg-red-50 text-red-600 p-3 rounded-md">
										<HiClock className="w-6 h-6" />
									</div>
									<div>
										<div className="text-sm text-black">Pas commencé</div>
										<div className="text-xl font-bold">17</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
}

