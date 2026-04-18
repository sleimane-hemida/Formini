"use client";
import React, { useState, useEffect } from "react";
import { HiUser, HiCamera, HiPencil, HiCheck, HiXMark } from 'react-icons/hi2';
import dynamic from "next/dynamic";
// Dynamic import for Header with a visible fallback to avoid breaking the whole page
const Header = dynamic(
	() =>
		import("../../../composant/layout/header")
			.then((mod) => mod.default || mod)
			.catch((err) => {
				console.error("Failed to load Header:", err);
				return () => (
					<div className="w-full bg-red-100 text-red-700 p-4">Header indisponible</div>
				);
			}),
	{
		ssr: false,
		loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div>,
	}
);
import Sidebar from "../sidebar/sidebar";
import Footer from "../../../composant/layout/footer";
import PageHeader from "../dash_principale/PageHeader";

export default function Profile() {
	const [user, setUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [profileImage, setProfileImage] = useState(null);
	const [formData, setFormData] = useState({
		prenom: '',
		nom_de_famille: '',
		email: '',
		telephone: '',
		biographie: '',
		date_naissance: '',
		localisation: '',
		statut_actuel: '',
		loisirs_centres_interet: ''
	});

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) return;

				const response = await fetch('http://localhost:5000/api/user/profile', {
					headers: { 'Authorization': `Bearer ${token}` }
				});

				if (!response.ok) throw new Error('Erreur chargement profil');

				const userData = await response.json();
				setUser(userData);

				if (userData.avatar) {
					setProfileImage(`http://localhost:5000${userData.avatar}`);
				}

				setFormData({
					prenom: userData.prenom || '',
					nom_de_famille: userData.nom_de_famille || '',
					email: userData.email || '',
					telephone: userData.telephone || '',
					biographie: userData.biographie || '',
					date_naissance: userData.date_naissance ? userData.date_naissance.split('T')[0] : '',
					localisation: userData.localisation || '',
					statut_actuel: userData.statut_actuel || '',
					loisirs_centres_interet: userData.loisirs_centres_interet || ''
				});
			} catch (err) {
				console.error('❌ Erreur chargement profil:', err);
			}
		};

		loadProfile();
	}, []);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (file) {
			// Afficher preview local
			const reader = new FileReader();
			reader.onload = (event) => {
				setProfileImage(event.target.result);
			};
			reader.readAsDataURL(file);

			// Envoyer au backend
			try {
				const token = localStorage.getItem('token');
				const formDataUpload = new FormData();
				formDataUpload.append('avatar', file);

				const response = await fetch('http://localhost:5000/api/user/avatar', {
					method: 'POST',
					headers: { 'Authorization': `Bearer ${token}` },
					body: formDataUpload
				});

				if (!response.ok) throw new Error('Erreur upload');

				const result = await response.json();
				setProfileImage(`http://localhost:5000${result.avatar}`);
			} catch (err) {
				console.error('❌ Erreur upload avatar:', err);
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('Non authentifié');

			const response = await fetch('http://localhost:5000/api/user/profile', {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Erreur lors de la sauvegarde');
			}

			const updated = await response.json();
			setUser(updated.user);
			console.log('✅ Profil mis à jour:', updated);
			setIsEditing(false);
		} catch (err) {
			console.error('❌ Erreur sauvegarde:', err);
			alert('Erreur: ' + err.message);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		if (user) {
			setFormData({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
				phone: user.phone || '',
				bio: user.bio || '',
				birthDate: user.birthDate || '',
				location: user.location || ''
			});
		}
	};

	return (
		<>
			<div className="min-h-screen bg-white pt-24">
				<Header />

				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-4xl">
									{/* En-tête de page */}
								<PageHeader title="Mon Profil" subtitle="Gérez vos informations personnelles et préférences" actions={<></>} />

									{/* Card principale */}
									<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
										{/* Header avec photo de profil */}
										<div className="bg-gradient-to-r from-[#0C8CE9] to-[#0A71BC] p-8 text-white relative">
											<div className="flex flex-col md:flex-row items-center gap-6">
												{/* Photo de profil */}
												<div className="relative group">
													<div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
														{profileImage ? (
															<img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
														) : (
															<HiUser className="w-12 h-12 md:w-16 md:h-16 text-white" />
														)}
													</div>
													<input type="file" id="profileImageInput" accept="image/*" onChange={handleImageUpload} className="hidden" />
													<button onClick={() => document.getElementById('profileImageInput').click()} className="absolute bottom-0 right-0 w-8 h-8 bg-white text-[#0C8CE9] rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
														<HiCamera className="w-4 h-4" />
													</button>
												</div>

												{/* Infos principales */}
												<div className="text-center md:text-left">
													<h2 className="text-2xl md:text-3xl font-bold mb-2">{user?.firstName} {user?.lastName || 'Utilisateur'}</h2>
													<p className="text-white/80 mb-3">{user?.email}</p>
													<div className="flex flex-wrap gap-2 justify-center md:justify-start">
														<span className="px-3 py-1 bg-white/20 rounded-full text-sm">{user?.role === 'formateur' ? 'Formateur' : (user?.role === 'administrateur' ? 'Administrateur' : 'Apprenant')}</span>
											{user?.localisation && (<span className="px-3 py-1 bg-white/20 rounded-full text-sm">📍 {user.localisation}</span>)}
													</div>
												</div>

												{/* Bouton édition */}
												<div className="ml-auto">
													{!isEditing ? (
														<button onClick={() => setIsEditing(true)} className="bg-white text-[#0C8CE9] px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
															<HiPencil className="w-4 h-4" />
															Modifier
														</button>
													) : (
														<div className="flex gap-2">
															<button onClick={handleSave} className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
																<HiCheck className="w-4 h-4" />
																Enregistrer
															</button>
															<button onClick={handleCancel} className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
																<HiXMark className="w-4 h-4" />
																Annuler
															</button>
														</div>
													)}
												</div>
											</div>
										</div>

										{/* Formulaire */}
										<div className="p-8">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												{/* Prénom */}
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
													{isEditing ? (
														<input type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800" placeholder="Votre prénom" />
													) : (
														<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{formData.prenom || 'Non renseigné'}</div>
													)}
												</div>

												{/* Nom */}
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Nom de famille</label>
													{isEditing ? (
														<input type="text" name="nom_de_famille" value={formData.nom_de_famille} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800" placeholder="Votre nom" />
													) : (
														<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{formData.nom_de_famille || 'Non renseigné'}</div>
													)}
												</div>

												{/* Email */}
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
													{isEditing ? (
														<input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800" placeholder="votre@email.com" />
													) : (
														<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{formData.email || 'Non renseigné'}</div>
													)}
												</div>

												{/* Téléphone */}
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
													{isEditing ? (
														<input type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800" placeholder="+33 1 23 45 67 89" />
													) : (
														<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{formData.telephone || 'Non renseigné'}</div>
													)}
												</div>

												{/* Date de naissance */}
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
													{isEditing ? (
														<input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800" />
													) : (
														<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{formData.date_naissance ? new Date(formData.date_naissance).toLocaleDateString('fr-FR') : 'Non renseigné'}</div>
													)}
												</div>

												{/* Localisation */}
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
													{isEditing ? (
														<input type="text" name="localisation" value={formData.localisation} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all placeholder-gray-500 text-gray-800" placeholder="Paris, France" />
													) : (
														<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{formData.localisation || 'Non renseigné'}</div>
													)}
												</div>
											</div>

											{/* Bio */}
											<div className="mt-6">
												<label className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
												{isEditing ? (
													<textarea name="biographie" value={formData.biographie} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent outline-none transition-all resize-none placeholder-gray-500 text-gray-800" placeholder="Parlez-nous de vous, vos compétences, vos passions..." />
												) : (
													<div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 min-h-[100px]">{formData.biographie || 'Aucune biographie renseignée'}</div>
												)}
											</div>
										</div>
									</div>

									{/* Section supplémentaire - Statistiques */}
									{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
										<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
											<div className="text-3xl font-bold text-[#0C8CE9] mb-2">12</div>
											<div className="text-gray-600">Formations suivies</div>
										</div>
										<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
											<div className="text-3xl font-bold text-green-500 mb-2">8</div>
											<div className="text-gray-600">Certificats obtenus</div>
										</div>
										<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
											<div className="text-3xl font-bold text-orange-500 mb-2">245</div>
											<div className="text-gray-600">Heures de formation</div>
										</div>
									</div> */}
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

