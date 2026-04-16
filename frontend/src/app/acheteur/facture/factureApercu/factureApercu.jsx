"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../composant/layout/header";
import Nav from "../../navigation/nav";
import Footer from "../../../../composant/layout/footer";
import { HiOutlineEye, HiOutlineClipboardDocumentList } from "react-icons/hi2";

const invoicesMock = [
    {
        id: "FAC-2026-001",
        date: "10 Avril 2026",
        formation: "Masterclass UX/UI Design - De zéro à Pro",
        price: "600 MRU",
        status: "Payé",
    },
    {
        id: "FAC-2026-002",
        date: "12 Avril 2026",
        formation: "Développement Web Front-end",
        price: "0 MRU",
        status: "Payé",
    },
    {
        id: "FAC-2026-003",
        date: "14 Avril 2026",
        formation: "Marketing Digital Avancé",
        price: "850 MRU",
        status: "Payé",
    }
];

export default function FactureApercu() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredInvoices = invoicesMock.filter(invoice => 
        invoice.formation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans">
            <Header searchValue={searchTerm} onSearchChange={setSearchTerm} />
            <div className="pt-24">
                <Nav />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    {/* Header de la page */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <HiOutlineClipboardDocumentList className="text-blue-600 w-8 h-8" />
                            Mes Factures
                        </h1>
                        <p className="text-slate-500 mt-1">Consultez et téléchargez l'historique de vos factures de formation.</p>
                    </div>

                    {/* Zone d'infos */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm">
                        <div className="text-sm text-slate-500 font-medium">
                            {filteredInvoices.length} facture{filteredInvoices.length > 1 ? "s" : ""} trouvée{filteredInvoices.length > 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* Tableau des factures */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">N° Facture</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Formation</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredInvoices.length > 0 ? (
                                        filteredInvoices.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-semibold text-slate-700">{invoice.id}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                    {invoice.date}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                                                    {invoice.formation}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                                                    {invoice.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => router.push(`/acheteur/facture/factureDetail?id=${invoice.id}`)}
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            title="Voir les détails"
                                                        >
                                                            <HiOutlineEye className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                                Aucune facture trouvée pour votre recherche.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
