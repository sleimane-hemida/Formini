"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../utils/routes";

export default function Signup() {
	const router = useRouter();
	const [showRoleModal, setShowRoleModal] = useState(true);
	const [role, setRole] = useState("");
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");

	const handleRoleSelect = (selectedRole) => {
		setRole(selectedRole);
		setShowRoleModal(false);
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		if (form.password !== form.confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}
		// TODO: Envoyer les données au backend
		alert("Inscription réussie !");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white px-4">
			{/* Modal de choix du rôle */}
			{showRoleModal && (
				<div className="fixed inset-0 bg-white flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all relative">
						{/* Bouton de fermeture */}
						<button
							onClick={() => router.push(ROUTES.HOME)}
							className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</button>
						
						{/* Header avec logo */}
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-r from-[#0C8CE9] to-[#00A3FF] rounded-full mx-auto mb-4 flex items-center justify-center">
								<span className="text-white font-bold text-2xl">F</span>
							</div>
							<h2 className="text-3xl font-bold text-gray-800 mb-2">Rejoignez Formini</h2>
							<p className="text-gray-600">Choisissez votre parcours d'apprentissage</p>
						</div>
						
						{/* Boutons de choix */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
							<button
								className="group bg-gradient-to-r from-[#0C8CE9] to-[#0A71BC] text-white px-6 py-3 rounded-xl hover:from-[#0A71BC] hover:to-[#0C8CE9] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
								onClick={() => handleRoleSelect("formateur")}
							>
								<span>Devenir Formateur</span>
							</button>
							<button
								className="group bg-gradient-to-r from-[#00A3FF] to-[#0080CC] text-white px-6 py-3 rounded-xl hover:from-[#0080CC] hover:to-[#00A3FF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
								onClick={() => handleRoleSelect("apprenant")}
							>
								<span>Devenir Apprenant</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Formulaire d'inscription */}
			{!showRoleModal && (
				<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all">
					{/* Header du formulaire */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-[#0C8CE9] to-[#00A3FF] rounded-full mx-auto mb-4 flex items-center justify-center">
							<span className="text-white font-bold text-2xl">F</span>
						</div>
						<h2 className="text-3xl font-bold text-gray-800 mb-2">
							Inscription {role === "formateur" ? "Formateur" : "Apprenant"}
						</h2>
						<p className="text-gray-600">
						{role === "formateur" ? "Créez et partagez vos formations" : "Commencez votre apprentissage"}
						</p>
					</div>

					{/* Formulaire */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<div className="relative">
								<input
									type="text"
									name="username"
									placeholder="Nom d'utilisateur"
									value={form.username}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent transition-all duration-300 placeholder-gray-400 bg-gray-50 hover:bg-white"
									required
								/>
							</div>

							<div className="relative">
								<input
									type="email"
									name="email"
									placeholder="Adresse email"
									value={form.email}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent transition-all duration-300 placeholder-gray-400 bg-gray-50 hover:bg-white"
									required
								/>
							</div>

							<div className="relative">
								<input
									type="password"
									name="password"
									placeholder="Mot de passe sécurisé"
									value={form.password}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent transition-all duration-300 placeholder-gray-400 bg-gray-50 hover:bg-white"
									required
								/>
							</div>

							<div className="relative">
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirmer le mot de passe"
									value={form.confirmPassword}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C8CE9] focus:border-transparent transition-all duration-300 placeholder-gray-400 bg-gray-50 hover:bg-white"
									required
								/>
							</div>
						</div>

						{/* Message d'erreur */}
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
								<span>{error}</span>
							</div>
						)}

						{/* Bouton d'inscription */}
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-[#0C8CE9] to-[#00A3FF] text-white py-3 px-6 rounded-xl hover:from-[#0A71BC] hover:to-[#0080CC] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-2"
						>
							<span>Créer mon compte</span>
						</button>

						<div className="text-center pt-4">
							<p className="text-gray-600 text-sm">
								Déjà un compte ? 
								<a href="/connexion/login" className="text-[#0C8CE9] hover:text-[#0A71BC] font-semibold ml-1 transition-colors">
									Se connecter
								</a>
							</p>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
