"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { invoices } from '../mockInvoices';

export default function FatureDetail({ invoiceId }) {
	const router = useRouter();
	const inv = invoices.find((i) => i.id === invoiceId) || invoices.find((i) => i.ref === invoiceId) || null;

	if (!inv) {
		return (
			<div className="bg-white p-6 rounded-2xl shadow-sm">
				<div className="text-sm text-gray-700">Facture introuvable.</div>
				<div className="mt-4">
					<button onClick={() => router.back()} className="px-4 py-2 rounded border hover:bg-gray-100">Retour</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm">
			<div className="flex justify-between items-start mb-4">
				<div>
					<h2 className="text-xl font-semibold">Facture {inv.ref}</h2>
					<div className="text-sm text-gray-600">{inv.date}</div>
				</div>
				<div className="text-right">
					<div className="text-sm text-gray-600">Statut</div>
					<div className={`font-medium ${inv.status === 'Payée' ? 'text-green-600' : inv.status === 'En attente' ? 'text-yellow-600' : 'text-red-600'}`}>{inv.status}</div>
				</div>
			</div>

			<div className="mb-4">
				<div className="text-sm text-gray-700">Formateur: <span className="font-medium">{inv.instructor}</span></div>
				<div className="text-sm text-gray-700">Participants: <span className="font-medium">{inv.participants}</span></div>
			</div>

			<table className="w-full text-sm mb-4">
				<thead className="text-left text-gray-600">
					<tr>
						<th className="pb-2">Description</th>
						<th className="pb-2">Quantité</th>
						<th className="pb-2">Prix unitaire</th>
						<th className="pb-2 text-right">Total</th>
					</tr>
				</thead>
				<tbody>
					{inv.items.map((it, idx) => (
						<tr key={idx} className="border-t">
							<td className="py-2">{it.desc}</td>
							<td className="py-2">{it.qty}</td>
							<td className="py-2">{it.unit} {inv.currency}</td>
							<td className="py-2 text-right">{it.total} {inv.currency}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-end items-center gap-4 mt-4">
				<div className="text-lg font-semibold">Total: {inv.amount} {inv.currency}</div>
				<button onClick={() => router.back()} className="px-4 py-2 rounded border hover:bg-gray-100">Retour</button>
			</div>
		</div>
	);
}
