"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { invoices } from '../mockInvoices';
import { FiDownload } from 'react-icons/fi';

export default function FatureDetail({ invoiceId }) {
	const router = useRouter();
	const inv = invoices.find((i) => i.id === invoiceId) || invoices.find((i) => i.ref === invoiceId) || null;

	const printCss = `@media print {
  @page { size: A4 portrait; margin: 8mm; }
  html, body { height: auto !important; margin: 0; padding: 0; }
  /* Hide all content by default, then reveal the invoice */
  body * { visibility: hidden !important; }
  #invoice-root, #invoice-root * { visibility: visible !important; }
  #invoice-root { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; box-shadow: none !important; background: #fff !important; padding: 6mm !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 11px !important; line-height: 1.15 !important; }
  /* Hide interactive / nav elements */
  #invoice-root .no-print { display: none !important; }
  /* Avoid breaking inside key sections */
  #invoice-root header, #invoice-root section, #invoice-root table { page-break-inside: avoid !important; }
  #invoice-root table { width: 100% !important; border-collapse: collapse !important; }
  #invoice-root td, #invoice-root th { padding: 6px 8px !important; }
  /* Slight scaling to try fit a single page on various printers */
  @supports (zoom: 1) { #invoice-root { zoom: 0.92; } }
  @supports not (zoom: 1) { #invoice-root { transform: scale(0.92); transform-origin: top left; width: calc(100% / 0.92) !important; } }
}
`;

	const ensurePrintStyle = () => {
		if (typeof document === 'undefined') return;
		if (!document.getElementById('print-invoice-style')) {
			const el = document.createElement('style');
			el.id = 'print-invoice-style';
			el.innerHTML = printCss;
			document.head.appendChild(el);
		}
	};

	const handleDownload = () => {
		if (typeof window === 'undefined') return;
		ensurePrintStyle();
		const root = document.getElementById('invoice-root');
		if (!root) {
			setTimeout(() => window.print(), 80);
			return;
		}

		// Clone invoice into a top-level print wrapper to avoid layout issues
		const clone = root.cloneNode(true);
		const wrapper = document.createElement('div');
		wrapper.id = 'invoice-print-wrapper';
		wrapper.style.cssText = 'width:210mm;margin:0 auto;background:#fff;height:297mm;display:flex;flex-direction:column;justify-content:space-between;padding:6mm;box-sizing:border-box;';
		wrapper.appendChild(clone);

		// Temporary style to hide other content and show only the wrapper
		const printOnlyStyleId = 'invoice-print-only-style';
		let printOnlyStyle = document.getElementById(printOnlyStyleId);
		if (!printOnlyStyle) {
			printOnlyStyle = document.createElement('style');
			printOnlyStyle.id = printOnlyStyleId;
			printOnlyStyle.innerHTML = `body.print-only > * { display:none !important; } body.print-only #invoice-print-wrapper { display:block !important; } @page { size: A4 portrait; margin: 8mm; }`;
			document.head.appendChild(printOnlyStyle);
		}

		document.body.appendChild(wrapper);
		document.body.classList.add('print-only');

		const cleanup = () => {
			document.body.classList.remove('print-only');
			if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
			const el = document.getElementById(printOnlyStyleId);
			if (el) el.remove();
			window.removeEventListener('afterprint', cleanup);
		};

		window.addEventListener('afterprint', cleanup);
		setTimeout(() => window.print(), 120);
	};

	React.useEffect(() => {
		if (typeof document === 'undefined') return;
		const css = `@media print {
  @page { size: A4 portrait; margin: 8mm; }
  html, body { height: auto; }
  body * { visibility: hidden !important; }
  #invoice-root, #invoice-root * { visibility: visible !important; }
  #invoice-root { position: absolute; left: 0; top: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 6mm !important; font-size: 11px !important; box-shadow: none !important; }
  #invoice-root .no-print { display: none !important; }
  #invoice-root header, #invoice-root section, #invoice-root table { page-break-inside: avoid; }
  #invoice-root table { width: 100% !important; border-collapse: collapse; }
  #invoice-root .text-3xl { font-size: 20px !important; }
  #invoice-root .text-lg { font-size: 12px !important; }
  #invoice-root .w-20 { width: 44px !important; height: 44px !important; }
  #invoice-root .mt-6 { margin-top: 6px !important; }
}`;
		let el = document.getElementById('print-invoice-style');
		if (!el) {
			el = document.createElement('style');
			el.id = 'print-invoice-style';
			el.innerHTML = css;
			document.head.appendChild(el);
		}
		return () => {
			const existing = document.getElementById('print-invoice-style');
			if (existing) existing.remove();
		};
	}, []);

	if (!inv) {
		return (
			<div className="min-h-screen bg-gray-50 py-12 px-4">
				<div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
					<div className="text-sm text-gray-700">Facture introuvable.</div>
					<div className="mt-4">
						<button onClick={() => router.back()} className="px-4 py-2 rounded border hover:bg-gray-100">Retour</button>
					</div>
				</div>
			</div>
		);
	}

	const format = (n) => `${Number(n).toLocaleString('fr-FR')} ${inv.currency}`;
	const total = Number(inv.amount || 0);
	const commission = Math.round(total * 0.2 * 100) / 100;
	const net = Math.round((total - commission) * 100) / 100;
	const formationName = inv.items && inv.items.length ? inv.items[0].desc : '—';

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-3xl mx-auto mb-4 flex items-center justify-between px-2">
				<h2 className="text-lg font-semibold">Facture {inv.ref}</h2>
				<div className="flex items-center gap-2">
					<button onClick={handleDownload} aria-label="Télécharger la facture" className="inline-flex items-center justify-center p-2 rounded-md bg-white border hover:bg-gray-100">
						<FiDownload className="w-5 h-5 text-black" />
					</button>
				</div>
			</div>
			<div id="invoice-root" className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
				<header className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">F</div>
						<div>
							<h3 className="text-lg font-bold">FORMINI</h3>
							<div className="text-sm text-gray-600 mt-2 leading-relaxed">
								123 Rue de l'Éducation<br />
								75000 Paris, France<br />
								Email : contact@formini.com<br />
								Téléphone : +33 1 23 45 67 89<br />
								Site web : www.formini.com
							</div>
						</div>
					</div>

					<div className="text-right">
						<div className="text-3xl font-serif tracking-wide">FACTURE</div>
						<div className="text-sm text-gray-600 mt-3">Numéro de facture : <span className="font-medium">{inv.ref}</span></div>
						<div className="text-sm text-gray-600">Date : <span className="font-medium">{inv.date}</span></div>
					</div>
				</header>

				<hr className="my-6" />

				<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="text-sm font-semibold mb-2">Facturé à :</h4>
						<div className="text-sm text-gray-700">Nom du formateur : <span className="font-medium">{inv.instructor || '—'}</span></div>
						<div className="text-sm text-gray-700">Email : <span className="font-medium">{inv.instructorEmail || '—'}</span></div>
					</div>

					<div>
						<h4 className="text-sm font-semibold mb-2">Client :</h4>
						<div className="text-sm text-gray-700">Nom de l’apprenant : <span className="font-medium">{inv.clientName || '—'}</span></div>
						<div className="text-sm text-gray-700">Email : <span className="font-medium">{inv.clientEmail || '—'}</span></div>
					</div>
				</section>

				<section className="mt-6">
					<h4 className="text-sm font-semibold mb-3">Description de la transaction :</h4>
					<div className="text-sm text-gray-700">Formation : <span className="font-medium">{formationName}</span></div>
					<div className="text-sm text-gray-700">Prix total : <span className="font-medium">{format(total)}</span></div>
					<div className="text-sm text-gray-700">Commission plateforme (20%) : <span className="font-medium">{format(commission)}</span></div>
					<div className="text-sm text-gray-700">Montant versé au formateur : <span className="font-medium">{format(net)}</span></div>
				</section>

				<section className="mt-6">
					<div className="overflow-hidden rounded-md border">
						<table className="min-w-full table-fixed">
							<thead className="bg-blue-900 text-white">
								<tr>
									<th className="text-left px-4 py-2">Description</th>
									<th className="text-right px-4 py-2 w-40">Prix</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								<tr className="border-b">
									<td className="px-4 py-3">Vente formation</td>
									<td className="px-4 py-3 text-right">{format(total)}</td>
								</tr>
								<tr className="border-b">
									<td className="px-4 py-3">Commission (20%)</td>
									<td className="px-4 py-3 text-right text-red-600">-{format(commission)}</td>
								</tr>
								<tr className="bg-blue-50">
									<td className="px-4 py-3 font-semibold">TOTAL NET</td>
									<td className="px-4 py-3 text-right font-semibold">{format(net)}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="mt-4 text-sm text-gray-700">
						<div>Montant total payé par l’apprenant : <span className="font-medium">{format(total)}</span></div>
						<div>Commission plateforme : <span className="font-medium">{format(commission)}</span></div>
						<div>Montant net pour le formateur : <span className="font-medium">{format(net)}</span></div>
					</div>
				</section>

				<section className="mt-6 text-sm text-gray-700">
					<p>Cette facture confirme la vente d'une formation sur la plateforme. Le montant net sera versé au formateur selon les conditions définies par la plateforme. Merci de votre confiance.</p>
				</section>

				<div className="mt-8 flex items-end justify-between">
					<div />
					<div className="text-right">
						<div className="text-sm text-gray-600">Signature :</div>
						<div className="mt-4 font-semibold">FORMINI</div>
					</div>
				</div>

				<div className="mt-6 flex justify-start no-print">
					<button onClick={() => router.back()} className="px-4 py-2 rounded border hover:bg-gray-100">Retour</button>
				</div>
			</div>
		</div>
	);
}
