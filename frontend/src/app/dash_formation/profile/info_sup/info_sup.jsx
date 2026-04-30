"use client";
import React, { useState, useEffect } from "react";
import { HiUser, HiCamera, HiCheck, HiArrowRight, HiArrowLeft, HiTrash, HiArrowPath, HiPencil, HiXMark } from 'react-icons/hi2';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import CustomModal from "../CustomModal/CustomModal";

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

import Sidebar from "../../sidebar/sidebar";
const Footer = dynamic(
	() => import("@/src/composant/layout/footer"),
	{ ssr: false, loading: () => <div className="h-20 bg-gray-50 animate-pulse rounded-xl" /> }
);
import PageHeader from "../../dash_principale/PageHeader";
import ProfileStepper from "../ProfileStepper";

// Supprimé: Stepper Component inline

export default function InfoSup() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [modalConfig, setModalConfig] = useState({
		isOpen: false,
		title: '',
		message: '',
		type: 'info',
		confirmText: 'OK',
		onConfirm: null
	});

	const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
	
	// Mock categories
	const [categories, setCategories] = useState([
		{id: 1, name: 'Marketing Digital'},
		{id: 2, name: 'Développement Web'},
		{id: 3, name: 'Design Graphique'},
		{id: 4, name: 'Gestion de Projet'},
	]);

	// Mock profile data
	const [user, setUser] = useState({
		prenom: 'Formateur',
		nom_de_famille: 'Demo'
	});

	const [formData, setFormData] = useState({
		titre_professionnel: 'Expert Marketing Digital',
		biographie_courte: 'Passionné par le marketing et les nouvelles technologies.',
		biographie_longue: 'Avec plus de 10 ans d\'expérience dans le domaine...',
		domaines_expertise: [{ id: 1, name: 'Marketing Digital' }],
		annees_experience: '10',
		langues_enseignement: 'Français, Arabe',
		linkedin_link: 'https://linkedin.com/in/demo',
	});

	const [backupData, setBackupData] = useState({...formData});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleExpertiseChange = (categoryId) => {
		if (!isEditing) return;
		const category = categories.find(c => c.id === parseInt(categoryId));
		if (!category) return;

		setFormData(prev => {
			const exists = prev.domaines_expertise.find(d => d.id === category.id);
			if (exists) {
				return {
					...prev,
					domaines_expertise: prev.domaines_expertise.filter(d => d.id !== category.id)
				};
			} else {
				if (prev.domaines_expertise.length >= 3) {
					setModalConfig({
						isOpen: true,
						title: 'Limite atteinte',
						message: 'Vous ne pouvez pas sélectionner plus de 3 domaines d\'expertise.',
						type: 'info',
						confirmText: 'Compris'
					});
					return prev;
				}
				return {
					...prev,
					domaines_expertise: [...prev.domaines_expertise, { id: category.id, name: category.name }]
				};
			}
		});
	};

	const handleSave = () => {
		setSaving(true);
		setTimeout(() => {
			setBackupData({...formData});
			setIsEditing(false);
			setSaving(false);
		}, 500);
	};

	const handleCancel = () => {
		setFormData({...backupData});
		setIsEditing(false);
	};

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
					handleSave();
					router.push('/dash_formation/profile/info_compte');
				}
			});
		} else {
			router.push('/dash_formation/profile/info_compte');
		}
	};

	if (loading) return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<HiArrowPath className="w-12 h-12 text-[#0C8CE9] animate-spin mb-4" />
			<p className="text-gray-500 font-medium">Chargement...</p>
		</div>
	);

	return (
		<>
			<div className="min-h-screen bg-[#F8FAFC] pt-24">
				<Header />

				<div className="flex w-full">
					<div className="lg:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
									<PageHeader title="Infos Complémentaires" subtitle="Étape 2 : Détaillez votre expertise professionnelle" actions={<></>} />

									{/* Stepper */}
									<ProfileStepper current={2} />

									{/* Card principale */}
									<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
										<div className="bg-gradient-to-r from-[#0C8CE9] to-[#0A71BC] p-8 text-white relative">
											<div className="flex flex-col md:flex-row items-center gap-6">
												<div className="relative group">
													<div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm border-4 border-white/30">
														<HiUser className="w-12 h-12 md:w-16 md:h-16 text-white" />
													</div>
													<button className="absolute bottom-0 right-0 w-10 h-10 bg-white text-[#0C8CE9] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95">
														<HiCamera className="w-5 h-5" />
													</button>
												</div>

												<div className="text-center md:text-left">
													<h2 className="text-2xl md:text-3xl font-bold mb-2">{user?.prenom} {user?.nom_de_famille}</h2>
													<p className="text-white/80 mb-3">{formData.titre_professionnel || 'Expert Formateur'}</p>
													<div className="flex flex-wrap gap-2 justify-center md:justify-start">
														<span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
															Étape 2 sur 3
														</span>
														{formData.domaines_expertise.map(d => (
															<span key={d.id} className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
																{d.name}
															</span>
														))}
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
																{saving ? '...' : 'Valider'}
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
												<div className="md:col-span-2">
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Titre professionnel</label>
													<input 
														type="text" 
														name="titre_professionnel" 
														value={formData.titre_professionnel} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="ex: Expert Marketing Digital" 
													/>
												</div>

												<div className="md:col-span-2">
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Biographie courte (2-3 lignes)</label>
													<textarea 
														name="biographie_courte" 
														value={formData.biographie_courte} 
														onChange={handleInputChange} 
														rows={3} 
														disabled={!isEditing}
														className={`w-full px-4 py-4 border rounded-xl outline-none transition-all resize-none font-medium leading-relaxed ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="Une brève présentation qui apparaîtra sur votre carte de profil..." 
													/>
												</div>

												<div className="md:col-span-2">
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Biographie longue (Page profil complète)</label>
													<textarea 
														name="biographie_longue" 
														value={formData.biographie_longue} 
														onChange={handleInputChange} 
														rows={6} 
														disabled={!isEditing}
														className={`w-full px-4 py-4 border rounded-xl outline-none transition-all resize-none font-medium leading-relaxed ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="Détaillez votre parcours, vos expériences marquantes, votre approche pédagogique..." 
													/>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Domaines d'expertise (Max 3)</label>
													<div className="relative">
														<select 
															onChange={(e) => handleExpertiseChange(e.target.value)}
															disabled={!isEditing}
															className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`}
															value=""
														>
															<option value="" disabled>Sélectionner un domaine</option>
															{categories.map(cat => (
																<option key={cat.id} value={cat.id}>{cat.name}</option>
															))}
														</select>
														<div className="mt-3 flex flex-wrap gap-2">
															{formData.domaines_expertise.map(d => (
																<span key={d.id} className="inline-flex items-center gap-1 bg-blue-50 text-[#0C8CE9] px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100">
																	{d.name}
																	{isEditing && (
																		<button onClick={() => handleExpertiseChange(d.id)} className="hover:text-red-500 transition-colors">
																			<HiTrash className="w-4 h-4" />
																		</button>
																	)}
																</span>
															))}
														</div>
													</div>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Années d'expérience</label>
													<input 
														type="number" 
														name="annees_experience" 
														value={formData.annees_experience} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="ex: 5" 
													/>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Langue(s) d'enseignement</label>
													<input 
														type="text" 
														name="langues_enseignement" 
														value={formData.langues_enseignement} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="ex: Français, Arabe" 
													/>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Lien LinkedIn (Optionnel)</label>
													<input 
														type="url" 
														name="linkedin_link" 
														value={formData.linkedin_link} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="https://linkedin.com/in/username" 
													/>
												</div>
											</div>

											<div className="mt-12 flex justify-between">
												<button 
													onClick={() => router.push('/dash_formation/profile')}
													className="flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
												>
													<HiArrowLeft className="w-5 h-5" />
													Précédent
												</button>
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
