"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../../sidebar/sidebar';
import Footer from '../../../../composant/layout/footer';
import FatureDetail from './fature_detail';
import { useSearchParams } from 'next/navigation';

const Header = dynamic(() => import('../../../../composant/layout/header').then((m) => m.default || m), { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> });

export default function FactureDetailPage() {
	const params = useSearchParams();
	const invoiceId = params ? params.get('invoiceId') : null;

	return (
		<>
			<div className="min-h-screen bg-white pt-24 text-black">
				<Header />
				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-4xl">
									<FatureDetail invoiceId={invoiceId} />
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
