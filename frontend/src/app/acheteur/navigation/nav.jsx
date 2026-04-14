"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_ITEMS = [
	{ label: "Accueil", href: "/acheteur/acceuilAcheteur" },
	{ label: "Profil", href: "/acheteur/profile" },
	{ label: "Formation", href: "/acheteur/formation/listeFormation", activePrefix: "/acheteur/formation" },
	{ label: "Facture", href: "/acheteur/facture" },
	{ label: "Abonnement", href: "/acheteur/abonnement" },
];

export default function Nav() {
	const pathname = usePathname() || "";

	return (
		<nav className="w-full bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center h-12">
					<ul className="w-4/5 mx-auto grid grid-cols-5 gap-2 items-center">
						{NAV_ITEMS.map((item) => {
							const isActive =
								pathname === item.href ||
								pathname.startsWith(item.href + "/") ||
								(item.activePrefix && pathname.startsWith(item.activePrefix));

							return (
								<li key={item.href} className="text-center">
									<Link
										href={item.href}
										className={`block py-3 text-sm font-medium transition-colors ${
											isActive
												? "text-blue-600 bg-blue-50 rounded-md"
												: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
										}`}
										aria-current={isActive ? "page" : undefined}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
}
