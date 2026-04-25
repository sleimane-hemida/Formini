"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../utils/routes";

export default function Signup() {
	const router = useRouter();
	const [showRoleModal, setShowRoleModal] = useState(true); // Modal pour choisir le rôle
	const [role, setRole] = useState(""); // Rôle choisi
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleRoleSelection = (selectedRole) => {
		setRole(selectedRole);
		setShowRoleModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (form.password.length < 8) {
			setError("Le mot de passe doit contenir au moins 8 caractères (lettres et/ou chiffres).");
			setSuccess("");
			return;
		}

		if (form.password !== form.confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			setSuccess("");
			return;
		}

		// Préparer les données à envoyer au backend
		const data = {
			name: form.username,
			email: form.email,
			password: form.password,
			role: role === "apprenant" ? "acheteur" : "formateur"
		};

		try {
			const response = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const result = await response.json();
			if (response.ok) {
				setSuccess('Inscription réussie !');
				setError("");
				setTimeout(() => {
					router.push(ROUTES.LOGIN);
				}, 1500);
			} else {
				setError(result.error || result.message || 'Erreur lors de l\'inscription');
				setSuccess("");
			}
		} catch (error) {
			setError('Erreur réseau ou serveur.');
			setSuccess("");
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Modal pour sélectionner le rôle */}
			{showRoleModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
						{/* Flèche de retour */}
						<div className="flex justify-start mb-4">
							<button
								onClick={() => router.back()}
								className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
								title="Retour"
							>
								<svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							</button>
						</div>
						
						<div className="text-center mb-8">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Choisissez votre rôle</h2>
							<p className="text-gray-600">Quel type de compte souhaitez-vous créer ?</p>
						</div>
						
						<div className="space-y-4">
							{/* Bouton Apprenant */}
							<button
								onClick={() => handleRoleSelection("apprenant")}
								className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group text-left"
							>
								<div className="flex items-start">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 mt-1">
										<svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-800 text-lg mb-1">Apprenant</h3>
										<p className="text-sm text-gray-600 mb-2">Je veux suivre des formations</p>
										<p className="text-xs text-gray-500 leading-relaxed">
											• Accéder au catalogue de formations<br/>
											• S'inscrire aux cours qui m'intéressent<br/>
											• Suivre mon progression et obtenir des certificats<br/>
											• Interagir avec les formateurs et autres étudiants
										</p>
									</div>
								</div>
							</button>

							{/* Bouton Formateur */}
							<button
								onClick={() => handleRoleSelection("formateur")}
								className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 group text-left"
							>
								<div className="flex items-start">
									<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 mt-1">
										<svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-800 text-lg mb-1">Formateur</h3>
										<p className="text-sm text-gray-600 mb-2">Je veux créer et vendre des formations</p>
										<p className="text-xs text-gray-500 leading-relaxed">
											• Créer et publier mes propres formations<br/>
											• Définir les prix et gérer mes ventes<br/>
											• Communiquer avec mes étudiants<br/>
											• Analyser les statistiques de mes cours et revenus
										</p>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Côté gauche - Formulaire d'inscription sur fond bleu */}
			<div className="flex-1 bg-gradient-to-br from-[#0C8CE9] to-[#1e40af] flex items-center justify-center p-8 relative overflow-hidden">
				
				{!showRoleModal && (
					<div className="w-full max-w-md relative z-10">
						{/* Titre */}
						<div className="text-center mb-4">
							<h2 className="text-xl font-bold text-white">Inscription</h2>
						</div>

						{/* Messages d'erreur/succès */}
						{error && (
							<div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg mb-3 text-sm">
								{error}
							</div>
						)}
						{success && (
							<div className="bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded-lg mb-3 text-sm">
								{success}
							</div>
						)}

						{/* Formulaire */}
						<form onSubmit={handleSubmit} className="space-y-2">
						{/* Nom d'utilisateur */}
						<div>
									<label className="block text-sm font-semibold text-white mb-1">Nom d'utilisateur</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
								<input
									type="text"
									name="username"
									placeholder="Votre nom d'utilisateur"
									value={form.username}
									onChange={handleChange}
									autoComplete="off"
										className="w-full pl-10 pr-4 py-2 bg-gray-100/90 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gray-50 text-gray-800 placeholder-gray-500 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
									required
								/>
							</div>
						</div>

						{/* Email */}
						<div>
									<label className="block text-sm font-semibold text-white mb-1">Email</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2.881l-6.172 6.172a2.828 2.828 0 01-4 0L1.414 4.639A1 1 0 011 3.829V3a1 1 0 011-1h14a1 1 0 011 1v.829a1 1 0 01-.414.81zM22 6l-.172.172a2.003 2.003 0 01-2.828 0L18 5.172a2.003 2.003 0 00-2.828 0L14 6.172a1 1 0 01-1.414 0L11.414 5l-.828.828a1 1 0 01-1.414 0L8.828 5.414a1 1 0 00-1.414 0L6.828 6v14a1 1 0 001 1h14a1 1 0 001-1V6z" />
									</svg>
								</div>
								<input
									type="email"
									name="email"
									placeholder="votre.email@exemple.com"
									value={form.email}
									onChange={handleChange}
									autoComplete="off"
									className="w-full pl-10 pr-4 py-2.5 bg-gray-100/90 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gray-50 text-gray-800 placeholder-gray-500 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
									required
								/>
							</div>
						</div>

						{/* Mot de passe */}
						<div>
									<label className="block text-sm font-semibold text-white mb-1">Mot de passe</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m6-6v4m-6-10V9a5 5 0 00-10 0v6h14z" />
									</svg>
								</div>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Votre mot de passe"
									value={form.password}
									onChange={handleChange}
									autoComplete="new-password"
										className="w-full pl-10 pr-10 py-2 bg-gray-100/90 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gray-50 text-gray-800 placeholder-gray-500 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
								>
									<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										{showPassword ? (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
										) : (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										)}
									</svg>
								</button>
							</div>
						</div>

						{/* Confirmer mot de passe */}
						<div>
									<label className="block text-sm font-semibold text-white mb-1">Confirmer mot de passe</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									placeholder="Confirmer votre mot de passe"
									value={form.confirmPassword}
									onChange={handleChange}
									autoComplete="new-password"
									className="w-full pl-10 pr-10 py-2.5 bg-gray-100/90 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-gray-50 text-gray-800 placeholder-gray-500 font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
									required
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
								>
									<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										{showConfirmPassword ? (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
										) : (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										)}
									</svg>
								</button>
							</div>
						</div>

						{/* Rôle sélectionné (verrouillé) */}
						<div>
									<label className="block text-sm font-semibold text-white mb-1">Rôle sélectionné</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									{role === "apprenant" ? (
										<svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									) : (
										<svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
										</svg>
									)}
								</div>
								<input
									type="text"
									value={role === "apprenant" ? "Apprenant" : "Formateur"}
									readOnly
										className="w-full pl-10 pr-10 py-2 bg-gray-200/90 backdrop-blur-sm border-0 rounded-lg text-gray-700 font-medium shadow-md cursor-not-allowed"
								/>
								<div className="absolute inset-y-0 right-0 pr-4 flex items-center">
									<button
										type="button"
										onClick={() => setShowRoleModal(true)}
										className="text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
										title="Changer le rôle"
									>
										<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
									</button>
								</div>
							</div>
						</div>

						{/* Bouton d'inscription */}
						<button
							type="submit"
								className="w-full bg-blue-100 hover:bg-blue-200 text-[#0C8CE9] py-2 px-6 rounded-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl mt-3"
						>
							S'inscrire
						</button>

						{/* Lien vers connexion */}
						<div className="text-center mt-3">
							<span className="text-white text-sm">
								J'ai un compte{" "}
								<button
									type="button"
									onClick={() => router.push(ROUTES.LOGIN)}
									className="text-white hover:text-gray-200 font-medium underline"
								>
									se connecter
								</button>
							</span>
						</div>
					</form>
				</div>
			)}
			</div>

			{/* Côté droit - Image et texte sur fond blanc */}
			<div className="flex-1 bg-white flex items-center justify-center p-8 relative overflow-hidden">
				{/* Formes décoratives bleues */}
			<div className="absolute top-0 left-20 w-32 h-32 bg-[#0C8CE9]/20 rounded-full z-20"></div>
			<div className="absolute bottom-20 right-20 w-24 h-24 bg-[#1e40af]/20 rounded-full z-20"></div>
			<div className="absolute bottom-40 left-10 w-16 h-16 bg-[#0C8CE9]/30 rounded-full z-20"></div>
				<div className="text-center text-gray-800 max-w-lg relative z-10 mt-20">
					{/* Texte en haut */}
					<h1 className="text-5xl font-bold mb-4 text-gray-800">Bienvenue</h1>
					<p className="text-xl leading-relaxed text-gray-600 mb-0">
						vous êtes sur l'endroit parfait pour soit vous améliorer soit 
						aider votre prochais à s'améliorer
					</p>
					
					{/* Logo de connexion en bas */}
					<div className="mb-0">
						<img 
							src="/images/hero/login.svg" 
							alt="Logo de connexion" 
							className="w-150 h-90 mx-auto mb-6 object-contain top-10"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}