"use client";
import React, { useState, useEffect } from "react";
import { HiUser, HiCamera, HiCheck, HiArrowRight, HiArrowPath, HiPencil, HiXMark } from 'react-icons/hi2';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import CustomModal from "./CustomModal/CustomModal";

// Dynamic import for Header
const Header = dynamic(
	() =>
		import("@/src/composant/layout/header")
			.then((mod) => mod.default || mod)
			.catch((err) => {
				console.error("Failed to load Header:", err);
				return () => (
					<div className="w-full bg-red-100 text-red-700 p-4">Header indisponible</div>
				);
			}),
	{
		ssr: false,
		loading: () => <div className="w-full bg-gray-200 p-4 animate-pulse">Chargement header...</div>,
	}
);

import Sidebar from "../sidebar/sidebar";
import Footer from "@/src/composant/layout/footer";
import PageHeader from "../dash_principale/PageHeader";
import ProfileStepper from "./ProfileStepper";

// Supprimé: Stepper Component inline

export default function Profile() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [profileImage, setProfileImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [formData, setFormData] = useState({
		prenom: '',
		nom_de_famille: '',
		email: '',
		telephone: '',
		biographie: '',
		date_naissance: '',
		localisation: '',
	});

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) return;

				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
					headers: { 'Authorization': `Bearer ${ token }` }
				});

				if (!response.ok) throw new Error('Erreur chargement profil');

				const userData = await response.json();
				setUser(userData);

				if (userData.avatar) {
					setProfileImage(`${ process.env.NEXT_PUBLIC_API_URL}${userData.avatar}`);
				}

				setFormData({
					prenom: userData.prenom || '',
					nom_de_famille: userData.nom_de_famille || '',
					email: userData.email || '',
					telephone: userData.telephone || '',
					biographie: userData.biographie || '',
					date_naissance: userData.date_naissance ? userData.date_naissance.split('T')[0] : '',
					localisation: userData.localisation || '',
				});
			} catch (err) {
				console.error('❌ Erreur chargement profil:', err);
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, []);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setProfileImage(event.target.result);
			};
			reader.readAsDataURL(file);

			try {
				const token = localStorage.getItem('token');
				const formDataUpload = new FormData();
				formDataUpload.append('avatar', file);

				const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL}/api/user/avatar`, {
					method: 'POST',
					headers: { 'Authorization': `Bearer ${token}` },
					body: formDataUpload
				});

	if (!response.ok) throw new Error('Erreur upload');

	const result = await response.json();
	setProfileImage(`${process.env.NEXT_PUBLIC_API_URL}${result.avatar}`);
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
	setSaving(true);
	try {
		const token = localStorage.getItem('token');
		if (!token) throw new Error('Non authentifié');

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${ token }`,
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
			setIsEditing(false);
		} catch (err) {
			console.error('❌ Erreur sauvegarde:', err);
			alert('Erreur: ' + err.message);
		} finally {
			setSaving(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		if (user) {
			setFormData({
				prenom: user.prenom || '',
				nom_de_famille: user.nom_de_famille || '',
				email: user.email || '',
				telephone: user.telephone || '',
				biographie: user.biographie || '',
				date_naissance: user.date_naissance ? user.date_naissance.split('T')[0] : '',
				localisation: user.localisation || '',
			});
		}
	};

	const [modalConfig, setModalConfig] = useState({
		isOpen: false,
		title: '',
		message: '',
		type: 'info',
		confirmText: 'OK',
		onConfirm: null
	});

	const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

	const handleNext = () => {
		if (isEditing) {
			setModalConfig({
				isOpen: true,
				title: 'Modifications non enregistrées',
				message: 'Voulez-vous enregistrer vos modifications avant de continuer vers l\'étape suivante ?',
				type: 'warning',
				confirmText: 'Enregistrer et continuer',
				cancelText: 'Annuler',
				onConfirm: () => {
					handleSave().then(() => router.push('/dash_formation/profile/info_sup'));
				}
			});
		} else {
			router.push('/dash_formation/profile/info_sup');
		}
	};

	if (loading) return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<HiArrowPath className="w-12 h-12 text-[#0C8CE9] animate-spin mb-4" />
			<p className="text-gray-500 font-medium">Chargement de votre profil...</p>
		</div>
	);

	return (
		<>
			<div className="min-h-screen bg-[#F8FAFC] pt-24">
				<Header />

				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
									<PageHeader title="Modification du Profil" subtitle="Étape 1 : Vos informations personnelles de base" actions={<></>} />

									{/* Stepper */}
									<ProfileStepper current={1} />

									{/* Card principale */}
									<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
										<div className="bg-gradient-to-r from-[#0C8CE9] to-[#0A71BC] p-8 text-white relative">
											<div className="flex flex-col md:flex-row items-center gap-6">
												<div className="relative group">
													<div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm border-4 border-white/30">
														{profileImage ? (
															<img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
														) : (
															<HiUser className="w-12 h-12 md:w-16 md:h-16 text-white" />
														)}
													</div>
													<input type="file" id="profileImageInput" accept="image/*" onChange={handleImageUpload} className="hidden" />
													<button onClick={() => document.getElementById('profileImageInput').click()} className="absolute bottom-0 right-0 w-10 h-10 bg-white text-[#0C8CE9] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95">
														<HiCamera className="w-5 h-5" />
													</button>
												</div>

												<div className="text-center md:text-left">
													<h2 className="text-2xl md:text-3xl font-bold mb-2">{formData.prenom} {formData.nom_de_famille || 'Formateur'}</h2>
													<p className="text-white/80 mb-3">{formData.email}</p>
													<div className="flex flex-wrap gap-2 justify-center md:justify-start">
														<span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
															Étape 1 sur 3
														</span>
														{formData.localisation && (
															<span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-1">
																📍 {formData.localisation}
															</span>
														)}
													</div>
												</div>

												<div className="ml-auto">
													{!isEditing ? (
														<button onClick={() => setIsEditing(true)} className="bg-white text-[#0C8CE9] px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
															<HiPencil className="w-5 h-5" />
															Modifier
														</button>
													) : (
														<div className="flex gap-3">
															<button onClick={handleSave} disabled={saving} className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
																<HiCheck className="w-5 h-5" />
																{saving ? '...' : 'Enregistrer'}
															</button>
															<button onClick={handleCancel} className="bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2 backdrop-blur-sm">
																<HiXMark className="w-5 h-5" />
																Annuler
															</button>
														</div>
													)}
												</div>
											</div>
										</div>

										<div className="p-8">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
												{/* Prénom */}
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Prénom</label>
													<input 
														type="text" 
														name="prenom" 
														value={formData.prenom} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w - full px - 4 py - 3.5 border rounded - xl outline - none transition - all font - medium ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
														placeholder="Votre prénom" 
													/>
												</div>

												{/* Nom */}
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Nom de famille</label>
													<input 
														type="text" 
														name="nom_de_famille" 
														value={formData.nom_de_famille} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w - full px - 4 py - 3.5 border rounded - xl outline - none transition - all font - medium ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
														placeholder="Votre nom" 
													/>
												</div>

												{/* Email */}
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Adresse email</label>
													<input 
														type="email" 
														name="email" 
														value={formData.email} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w - full px - 4 py - 3.5 border rounded - xl outline - none transition - all font - medium ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
														placeholder="votre@email.com" 
													/>
												</div>

												{/* Téléphone */}
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Téléphone</label>
													<input 
														type="tel" 
														name="telephone" 
														value={formData.telephone} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w - full px - 4 py - 3.5 border rounded - xl outline - none transition - all font - medium ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
														placeholder="+222 00 00 00 00" 
													/>
												</div>

												{/* Date de naissance */}
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Date de naissance</label>
													<input 
														type="date" 
														name="date_naissance" 
														value={formData.date_naissance} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w - full px - 4 py - 3.5 border rounded - xl outline - none transition - all font - medium ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
													/>
												</div>

												{/* Localisation */}
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Localisation</label>
													<input 
														type="text" 
														name="localisation" 
														value={formData.localisation} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w - full px - 4 py - 3.5 border rounded - xl outline - none transition - all font - medium ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
														placeholder="Nouakchott, Mauritanie" 
													/>
												</div>
											</div>

											{/* Bio */}
											<div className="mt-8">
												<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Biographie</label>
												<textarea 
													name="biographie" 
													value={formData.biographie} 
													onChange={handleInputChange} 
													rows={4} 
													disabled={!isEditing}
													className={`w - full px - 4 py - 4 border rounded - xl outline - none transition - all resize - none font - medium leading - relaxed ${ isEditing? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900': 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed' }`} 
													placeholder="Parlez-nous de vous, vos compétences, vos passions..." 
												/>
											</div>

											<div className="mt-12 flex justify-end">
												<button 
													onClick={handleNext}
													className="flex items-center gap-2 bg-[#0C8CE9] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#0A71BC] hover:shadow-xl hover:translate-x-1 transition-all active:scale-95"
												>
													Suivant
													<HiArrowRight className="w-5 h-5" />
												</button>
											</div>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
			<Footer />

			<CustomModal 
				isOpen={modalConfig.isOpen}
				onClose={closeModal}
				title={modalConfig.title}
				message={modalConfig.message}
				type={modalConfig.type}
				confirmText={modalConfig.confirmText}
				cancelText={modalConfig.cancelText}
				onConfirm={modalConfig.onConfirm}
			/>
		</>
	);
}

