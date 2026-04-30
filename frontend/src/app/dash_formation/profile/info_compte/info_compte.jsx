"use client";
import React, { useState, useEffect } from "react";
import { HiUser, HiCamera, HiCheck, HiArrowRight, HiArrowLeft, HiTrash, HiArrowPath, HiPencil, HiXMark, HiCreditCard } from 'react-icons/hi2';
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

export default function InfoCompte() {
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
	
	// Mock profile data
	const [user, setUser] = useState({
		prenom: 'Formateur',
		nom_de_famille: 'Demo'
	});

	const [formData, setFormData] = useState({
		mode_reception: 'Bankily',
		numero_compte: '',
		titulaire_compte: '',
	});

	const [backupData, setBackupData] = useState({...formData});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		setSaving(true);
		// Simulate API call
		setTimeout(() => {
			setBackupData({...formData});
			setIsEditing(false);
			setSaving(false);
			setModalConfig({
				isOpen: true,
				title: 'Succès',
				message: 'Vos informations bancaires ont été enregistrées avec succès.',
				type: 'success',
				confirmText: 'Génial'
			});
		}, 800);
	};

	const handleCancel = () => {
		setFormData({...backupData});
		setIsEditing(false);
	};

	const handleFinish = () => {
		if (isEditing) {
			setModalConfig({
				isOpen: true,
				title: 'Enregistrer avant de quitter ?',
				message: 'Souhaitez-vous enregistrer vos coordonnées bancaires avant de terminer la configuration de votre profil ?',
				type: 'warning',
				confirmText: 'Enregistrer et terminer',
				cancelText: 'Quitter sans enregistrer',
				onConfirm: () => {
					handleSave();
					router.push('/dash_formation/profile');
				}
			});
		} else {
			router.push('/dash_formation/profile');
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
									<PageHeader title="Infos Bancaires" subtitle="Étape 3 : Configurez vos informations de paiement" actions={<></>} />

									{/* Stepper */}
									<ProfileStepper current={3} />

									{/* Card principale */}
									<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
										<div className="bg-gradient-to-r from-[#0C8CE9] to-[#0A71BC] p-8 text-white relative">
											<div className="flex flex-col md:flex-row items-center gap-6">
												<div className="relative group">
													<div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm border-4 border-white/30">
														<HiCreditCard className="w-12 h-12 md:w-16 md:h-16 text-white" />
													</div>
												</div>

												<div className="text-center md:text-left">
													<h2 className="text-2xl md:text-3xl font-bold mb-2">Paiements & Facturation</h2>
													<p className="text-white/80 mb-3">Sécurisez la réception de vos honoraires</p>
													<div className="flex flex-wrap gap-2 justify-center md:justify-start">
														<span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
															Étape finale
														</span>
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
												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Mode de réception préféré</label>
													<select 
														name="mode_reception"
														value={formData.mode_reception} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`}
													>
														<option value="Bankily">Bankily (BPM)</option>
														<option value="Masrivi">Masrivi (BMCI)</option>
														<option value="Sedad">Sedad (BNM)</option>
													</select>
												</div>

												<div>
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Numéro {formData.mode_reception}</label>
													<input 
														type="text" 
														name="numero_compte" 
														value={formData.numero_compte} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="ex: 41234567" 
													/>
												</div>

												<div className="md:col-span-2">
													<label className="block text-sm font-bold text-gray-700 mb-2 px-1">Nom du titulaire du compte</label>
													<input 
														type="text" 
														name="titulaire_compte" 
														value={formData.titulaire_compte} 
														onChange={handleInputChange} 
														disabled={!isEditing}
														className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isEditing ? 'bg-white border-[#0C8CE9] ring-2 ring-blue-100 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-700 cursor-not-allowed'}`} 
														placeholder="Nom complet associé au numéro" 
													/>
												</div>
											</div>

											<div className="mt-12 flex justify-between">
												<button 
													onClick={() => router.push('/dash_formation/profile/info_sup')}
													className="flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
												>
													<HiArrowLeft className="w-5 h-5" />
													Précédent
												</button>
												<button 
													onClick={handleFinish}
													className="flex items-center gap-2 bg-[#0C8CE9] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#0A71BC] hover:shadow-xl hover:translate-x-1 transition-all active:scale-95"
												>
													Terminer
													<HiCheck className="w-5 h-5" />
												</button>
											</div>
										</div>
									</div>
									
									<div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
										<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
											<HiCreditCard className="w-6 h-6 text-[#0C8CE9]" />
										</div>
										<div>
											<h4 className="font-bold text-blue-900 mb-1">Sécurité de vos données</h4>
											<p className="text-blue-800/80 text-sm leading-relaxed">
												Vos informations de paiement sont chiffrées et stockées de manière sécurisée. Elles ne seront utilisées que pour le versement de vos revenus générés par vos formations vendues sur la plateforme.
											</p>
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
