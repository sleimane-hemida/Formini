"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Sidebar from '../../sidebar/sidebar';
import PageHeader from '../../dash_principale/PageHeader';
import Footer from '../../../../composant/layout/footer';
import { invoices } from '../mockInvoices';
import { FiSearch, FiDownload, FiCheckSquare } from 'react-icons/fi';

const Header = dynamic(() => import('../../../../composant/layout/header').then((m) => m.default || m), { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> });

export default function ListeFacturationPage() {
	const [query, setQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');

	const filtered = useMemo(() => {
		const q = String(query || '').trim().toLowerCase();
		return invoices.filter((inv) => {
			if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
			if (!q) return true;
			return (
				inv.ref.toLowerCase().includes(q) ||
				inv.instructor.toLowerCase().includes(q) ||
				String(inv.amount).includes(q) ||
				inv.date.includes(q)
			);
		});
	}, [query, statusFilter]);

	return (
		<>
			<div className="min-h-screen bg-gray-50 pt-24 text-black">
				<Header />
				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
									<div className="flex items-center justify-between mb-6">
										<PageHeader title="Liste des factures" actions={<></>} />
											<div className="flex items-center gap-3">
												<div className="relative">
													<FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
													<input aria-label="Recherche factures" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher (réf, formateur, montant, date)" className="pl-10 pr-4 py-2 border rounded-lg w-80" />
												</div>
												<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg bg-white">
													<option value="all">Tous</option>
													<option value="Payée">Payée</option>
													<option value="En attente">En attente</option>
													<option value="Annulée">Annulée</option>
												</select>
											</div>
									</div>

									<div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-semibold text-gray-600">Référence</th>
													<th scope="col" className="py-3 px-3 text-left text-xs font-semibold text-gray-600">Date</th>
													<th scope="col" className="py-3 px-3 text-left text-xs font-semibold text-gray-600">Formateur</th>
													<th scope="col" className="py-3 px-3 text-left text-xs font-semibold text-gray-600">Participants</th>
													<th scope="col" className="py-3 px-3 text-right text-xs font-semibold text-gray-600">Montant</th>
													<th scope="col" className="py-3 px-3 text-left text-xs font-semibold text-gray-600">Statut</th>
													<th scope="col" className="py-3 px-4 text-right text-xs font-semibold text-gray-600">Actions</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{filtered.map((inv) => (
													<tr key={inv.id} className="hover:bg-gray-50">
														<td className="py-4 pl-4 pr-3 align-top whitespace-nowrap">
															<p className="text-sm font-semibold">{inv.ref}</p>
															<p className="text-xs text-gray-500 mt-1">{inv.notes}</p>
														</td>
														<td className="py-4 px-3 align-top whitespace-nowrap text-sm text-gray-700">{inv.date}</td>
														<td className="py-4 px-3 align-top whitespace-nowrap text-sm">{inv.instructor}</td>
														<td className="py-4 px-3 align-top whitespace-nowrap text-sm">{inv.participants}</td>
														<td className="py-4 px-3 align-top whitespace-nowrap text-sm text-right">{Number(inv.amount).toLocaleString()} {inv.currency}</td>
														<td className="py-4 px-3 align-top whitespace-nowrap text-sm">
															<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${inv.status === 'Payée' ? 'bg-green-100 text-green-700' : inv.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
																{inv.status}
															</span>
														</td>
														<td className="py-4 px-4 align-top whitespace-nowrap text-right text-sm font-medium">
															<Link href={`/dash_formation/gestion_facture/facture_detail?invoiceId=${inv.id}`} className="text-[#0C8CE9] hover:underline mr-3">Voir</Link>
															<button aria-label={`Télécharger ${inv.ref}`} className="text-gray-600 hover:text-gray-800 mr-3"><FiDownload className="inline-block" /></button>
															<button aria-label={`Marquer payée ${inv.ref}`} className="text-gray-600 hover:text-gray-800"><FiCheckSquare className="inline-block" /></button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{filtered.length === 0 && <div className="mt-6 text-center text-gray-600">Aucune facture trouvée.</div>}

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
