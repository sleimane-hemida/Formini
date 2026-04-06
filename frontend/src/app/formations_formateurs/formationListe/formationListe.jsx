"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../composant/layout/header';

export default function FormationListe() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [formations, setFormations] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const u = localStorage.getItem('user');
			if (u) setUser(JSON.parse(u));
		}
	}, []);

	useEffect(() => {
		const fetchFormations = async () => {
			if (!user) return;
			setLoading(true);
			try {
				const res = await fetch('http://localhost:5000/api/formations');
				const data = await res.json();
				// Filtrer par formateur (trainerId ou trainer.id selon l'API)
				const filtered = Array.isArray(data)
					? data.filter(
							(f) =>
								(f.trainerId && f.trainerId === user.id) ||
								(f.trainer && f.trainer.id === user.id)
						)
					: [];
				setFormations(filtered);
			} catch (err) {
				console.error('Erreur fetch formations:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchFormations();
	}, [user]);

	return (
		<div className="min-h-screen bg-gray-50 text-black">
			<Header />
			<div className="container mx-auto px-6 py-8 pt-20">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">Mes formations (Formateur)</h1>
					<button
						onClick={() => router.push('/formations_formateurs/formationAjouter')}
						className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white px-4 py-2 rounded-md transition"
					>
						Ajouter une formation
					</button>
				</div>

				{loading ? (
					<p className="text-black">Chargement...</p>
				) : (
					<div>
						{formations.length === 0 ? (
							<p className="text-black">Aucune formation trouvée pour votre compte.</p>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{formations.map((f) => (
									<div key={f.id} className="bg-white p-4 rounded-lg shadow-sm">
										<h2 className="font-semibold text-lg text-black">{f.name || f.title}</h2>
										<p className="text-sm text-black">{f.description || f.summary || ''}</p>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
