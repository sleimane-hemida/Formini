"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Header from "../../../../composant/layout/header";
import Sidebar from "../../sidebar/sidebar";
import Footer from "../../../../composant/layout/footer";
import PageHeader from "../../dash_principale/PageHeader";

export default function AbonnementAccueil() {
	const [mode, setMode] = useState("promote");
	const [budget, setBudget] = useState(100);
	const [days, setDays] = useState(7);
	const [message, setMessage] = useState("");

	const formatPrice = (n) => `${Number(n).toLocaleString("fr-FR")} MRU`;

	const handlePromote = () => {
		try {
			if (typeof window !== "undefined") localStorage.setItem("formini_promotion_demo", JSON.stringify({ budget, days, ts: Date.now() }));
		} catch (e) {}
		setMessage(`Service propulsé — ${formatPrice(budget)} / ${days} jours.`);
		setTimeout(() => setMessage(""), 3500);
	};

	// Modal + formations state
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formations, setFormations] = useState([]);
	const [selectedFormation, setSelectedFormation] = useState(null);

	useEffect(() => {
		// try to fetch real formations, fallback to sample list
		fetch('/api/formations')
			.then((r) => r.json())
			.then((data) => {
				if (Array.isArray(data)) setFormations(data);
				else setFormations([]);
			})
			.catch(() => {
				setFormations([
					{ id: 'f1', title: 'Formation Développement Web', description: 'Apprenez HTML, CSS, JS et frameworks modernes.' },
					{ id: 'f2', title: 'Formation Design UX', description: "Principes d'UX/UI et prototypage rapide." },
					{ id: 'f3', title: 'Formation Marketing Digital', description: 'Stratégies de visibilité et acquisition.' },
				]);
			});
	}, []);

	const handlePromoteSubmit = (formation) => {
		const payload = { formationId: formation?.id, formationTitle: formation?.title, budget, days, ts: Date.now() };
		try {
			if (typeof window !== 'undefined') localStorage.setItem('formini_promotion_demo', JSON.stringify(payload));
		} catch (e) {}
		setMessage(`Service propulsé — ${formatPrice(budget)} / ${days} jours.` + (formation ? ` Formation: ${formation.title}` : ''));
		setTimeout(() => setMessage(''), 3500);
		setIsModalOpen(false);
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
							<PageHeader title="Abonnements & Propulsions" subtitle="Gérez vos abonnements ou mettez en avant un service" actions={<></>} />

							<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
								{/* Top navigation like ProgressStepper */}
								<nav aria-label="Navigation abonnements" className="w-full mb-6">
									<div className="flex items-center w-full">
										{[
											{ id: 1, key: 'promote', label: 'Propulseur', path: '/dash_formation/abonnement/propulseur' },
											{ id: 2, key: 'formini_plus', label: 'Formini Plus', path: '/dash_formation/abonnement/formini_plus' }
										].map((s, i, arr) => {
											const active = s.key === mode;
											const completed = arr.findIndex(x => x.key === mode) > i;
											return (
												<React.Fragment key={s.id}>
													<Link href={s.path} onClick={() => setMode(s.key)} className="flex items-center select-none">
														<div className={`w-9 h-9 rounded-full flex items-center justify-center ${completed ? 'bg-green-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
															<span className="font-semibold">{s.id}</span>
														</div>
														<div className={`ml-3 ${active ? 'font-semibold text-black' : 'text-gray-600'} text-sm`}>{s.label}</div>
													</Link>

													{i < arr.length - 1 && (
														<div className={`flex-1 h-0.5 mx-4 ${completed ? 'bg-blue-300' : 'bg-gray-200'}`} />
													)}
												</React.Fragment>
											);
										})}
									</div>
								</nav>

								<section>
									<h3 className="text-lg font-semibold mb-3">Propulser un service</h3>
									<div className="w-full mb-4 flex justify-center">
										<img src="/images/hero/propulser.jpg" alt="Propulser" className="w-full max-w-2xl h-auto rounded-lg object-cover" />
									</div>
									<div className="max-w-2xl mx-auto mb-4 text-gray-700 text-base leading-relaxed px-4 text-center">
										Donnez plus de visibilité à votre service : mettez-le en avant auprès d'utilisateurs ciblés pour augmenter les contacts et les demandes. Cliquez sur « Propulser » pour lancer la promotion.
									</div>
									<div className="flex justify-end">
										<button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#0C8CE9] hover:bg-[#096bb3] text-white rounded">Choisir une formation</button>
									</div>

								</section>

								{message && <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded">{message}</div>}

								{isModalOpen && (
									<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
										<div className="bg-white w-full max-w-4xl rounded-lg p-6">
											<div className="flex items-center justify-between mb-4">
												<h3 className="text-lg font-semibold">Choisir une formation</h3>
												<button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">✕</button>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
												{formations.length ? formations.map((f) => (
													<div key={f.id} onClick={() => setSelectedFormation(f)} className={`p-3 border rounded cursor-pointer ${selectedFormation?.id === f.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
														<div className="font-semibold">{f.title}</div>
														{f.description && <div className="text-sm text-gray-600 mt-1">{f.description}</div>}
													</div>
												)) : <div className="text-gray-600">Aucune formation trouvée.</div>}
											</div>
											<div className="mt-4 flex justify-end gap-2">
												<button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Annuler</button>
												<button disabled={!selectedFormation} onClick={() => handlePromoteSubmit(selectedFormation)} className="px-4 py-2 rounded text-white bg-[#0C8CE9] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#096bb3]">
													Propulser
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</main>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
