"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiUser, FiBook, FiCreditCard, FiLogOut, FiBarChart2, FiTrendingUp } from "react-icons/fi";

export default function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const raw = localStorage.getItem("user");
			if (raw) {
				try {
					setUser(JSON.parse(raw));
				} catch (e) {
					setUser(null);
				}
			}
		}
	}, []);

	const nav = [
		{ id: "dashboard", label: "Tableau de bord", icon: FiBarChart2, href: "/dash_formation/dash_principale" },
		{ id: "profile", label: "Profil", icon: FiUser, href: "/dash_formation/profile" },
		// NB: le dossier actuel pour la liste des formations est `formations_liste`
		{ id: "formations", label: "Formations", icon: FiBook, href: "/dash_formation/formations_formateurs/formations_liste" },
		{ id: "facture", label: "Facture", icon: FiCreditCard, href: "/dash_formation/gestion_facture/liste_facturation" },
		{ id: "propulseur", label: "Propulseur", icon: FiTrendingUp, href: "/dash_formation/abonnement/notdisponiblenow" },
	];

	const isActive = (href) => {
		if (!pathname) return false;
		// Keep 'Formations' active for any route under /dash_formation/formations_formateurs
		if (href && href.startsWith('/dash_formation/formations_formateurs')) {
			return pathname === href || pathname.startsWith('/dash_formation/formations_formateurs');
		}

		// Keep 'Facturation' active for any route under /dash_formation/gestion_facture
		if (href && href.startsWith('/dash_formation/gestion_facture')) {
			return pathname === href || pathname.startsWith('/dash_formation/gestion_facture');
		}

		// Keep 'Propulseur' active for any route under /dash_formation/abonnement/notdisponiblenow
		if (href && href === '/dash_formation/abonnement/notdisponiblenow') {
			return pathname === href || pathname.startsWith('/dash_formation/abonnement/notdisponiblenow');
		}
		return pathname === href || pathname.startsWith(href + "/");
	};

	const handleSignOut = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			router.push("/");
		}
	};

	const initials = (name) => {
		if (!name) return "U";
		return name
			.split(" ")
			.map((p) => p[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	};

	return (
		<aside className="w-75 bg-[#14152D] rounded-md p-3 sticky top-6 border border-black/20 h-[calc(102vh-48px)]">
			<div className="flex flex-col h-full">
				<div className="flex items-center gap-3 px-2 py-3">
					<div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-lg font-bold overflow-hidden">
						{user?.photo ? (
							<img src={user.photo} alt="avatar" className="w-full h-full object-cover" />
						) : (
							<span>{initials(user?.name || user?.username)}</span>
						)}
					</div>
					<div>
						<div className="text-sm font-semibold text-white">{user?.name || user?.username || ''}</div>
						<div className="text-xs text-blue-100">{user?.role || ''}</div>
					</div>
				</div>

				<div className="my-3 border-b border-transparent" />

				<nav className="flex-1 py-2 space-y-2">
					{nav.map((item, idx) => {
						const Icon = item.icon;
						const active = isActive(item.href);
						return (
							<div
								key={item.id}
								className={`${idx !== nav.length - 1 ? 'border-b border-transparent' : ''} ${active ? 'bg-[#0C8CE9] rounded-md' : ''} -mx-3`}>
									<button
									onClick={() => router.push(item.href)}
									className={`w-full flex items-center gap-3 px-4 py-4 transition-colors ${active ? 'text-white font-bold' : 'text-white opacity-90 hover:bg-white/5 font-semibold'}`}>
									<span className={`inline-flex items-center justify-center w-9 h-9 rounded-md ${active ? 'bg-white/20' : 'bg-white/10'}`}>
										<Icon className={`${active ? 'text-white' : 'text-white opacity-90'} w-5 h-5`} />
									</span>
									<span className="ml-2 text-sm">{item.label}</span>
								</button>
							</div>
						);
						})}
				</nav>

				{/* Bouton Déconnexion en bas */}
				<div className="mt-auto px-2">
					<div className="mt-4 flex gap-2">
						<button onClick={handleSignOut} className="w-full px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center">
							<FiLogOut className="inline-block mr-2 w-4 h-4" /> Déconnexion
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}

