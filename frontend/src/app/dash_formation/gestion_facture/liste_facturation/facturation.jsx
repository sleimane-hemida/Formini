"use client";
import React, { useMemo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Sidebar from '../../sidebar/sidebar';
import PageHeader from '../../dash_principale/PageHeader';
import Footer from '../../../../composant/layout/footer';
import { invoices } from '../mockInvoices';
import { FiEye, FiFilter } from 'react-icons/fi';

const Header = dynamic(() => import('../../../../composant/layout/header').then((m) => m.default || m), { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> });

export default function FacturationPage() {
	const [statusFilter, setStatusFilter] = useState('all');
	const [filterOpen, setFilterOpen] = useState(false);
	const filterRef = useRef(null);

	const filtered = useMemo(() => invoices.filter((inv) => (statusFilter === 'all' ? true : inv.status === statusFilter)), [statusFilter]);

	useEffect(() => {
		function handleClickOutside(e) {
			if (filterRef.current && !filterRef.current.contains(e.target)) {
				setFilterOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<>
			<div className="min-h-screen bg-gray-50 pt-24 text-black">
				<Header />

				<div className="flex w-full">
					<div className="lg:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1 min-w-0">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
									<div className="mb-6">
										<PageHeader
											title={<span className="text-2xl sm:text-3xl font-semibold">Liste des factures</span>}
											actions={
												<div className="relative" ref={filterRef}>
													<button onClick={() => setFilterOpen((v) => !v)} className="flex items-center gap-2 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white px-4 py-2 rounded-md shadow-sm">
														<FiFilter className="text-white" />
														Filtrer
													</button>

													{filterOpen && (
														<div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 p-3">
															<label className="text-xs text-gray-500">Statut</label>
															<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white mb-3">
																<option value="all">Tous</option>
																<option value="Payée">Payée</option>
																<option value="En attente">En attente</option>
																<option value="Annulée">Annulée</option>
															</select>

															<div className="flex justify-end gap-2">
																<button onClick={() => { setStatusFilter('all'); setFilterOpen(false); }} className="text-sm text-gray-600">Réinitialiser</button>
																<button onClick={() => setFilterOpen(false)} className="bg-[#0C8CE9] text-white px-3 py-1 rounded text-sm">Appliquer</button>
															</div>
														</div>
													)}
												</div>
											}
										/>
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
															<Link href={`/dash_formation/gestion_facture/facture_detail?invoiceId=${inv.id}`} aria-label={`Voir ${inv.ref}`} className="text-gray-600 hover:text-gray-700 inline-flex items-center justify-center p-2 rounded-md">
																<FiEye className="w-5 h-5" />
															</Link>
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
