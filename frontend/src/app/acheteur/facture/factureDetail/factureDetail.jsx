// Composant de détail de facture pour l'acheteur
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../../../composant/layout/header";
import Nav from "../../navigation/nav";
import Footer from "../../../../composant/layout/footer";
import { HiOutlineArrowLeft, HiOutlineArrowDownTray } from "react-icons/hi2";

const invoicesData = {
    "FAC-2026-001": {
        id: "FAC-2026-001",
        date: "10 Avril 2026",
        dueDate: "10 Avril 2026",
        formation: "Masterclass UX/UI Design - De zéro à Pro",
        description: "Accès complet à la formation Masterclass UX/UI Design incluant les ressources et le certificat.",
        price: "600 MRU",
        subtotal: "600 MRU",
        tax: "0 MRU",
        total: "600 MRU",
        status: "Payé",
        buyer: {
            name: "Lina Acheteur",
            email: "lina@example.com",
            address: "Nouakchott, Mauritanie"
        }
    },
    // Fallback data
    "default": {
        id: "FAC-XXXX-XXX",
        date: "Date inconnue",
        formation: "Formation non spécifiée",
        description: "Détails non disponibles.",
        price: "0 MRU",
        total: "0 MRU",
        status: "Inconnu",
        buyer: { name: "Client", email: "", address: "" }
    }
};

export default function FactureDetail({ invoiceId }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isGenerating, setIsGenerating] = useState(false);
    
    const id = invoiceId || searchParams.get("id") || "FAC-2026-001";
    
    // Simulating enriched data
    const invoice = {
        ...invoicesData[id] || { ...invoicesData.default, id: id },
        trainer: "Ali Diop",
        commissionRate: 0.2,
    };

    // Calculations
    const priceValue = parseFloat(invoice.price.replace(/[^\d.]/g, '')) || 1200;
    const commissionValue = priceValue * invoice.commissionRate;
    const netValue = priceValue - commissionValue;
    const currency = "MRU";

    // Pre-load the library
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.html2pdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    const handleDownload = async () => {
        if (typeof window === 'undefined' || !window.html2pdf) {
            alert("La bibliothèque de téléchargement est encore en cours de chargement... Veuillez réessayer dans un instant.");
            return;
        }

        const element = document.getElementById("invoice-content");
        if (!element) return;

        setIsGenerating(true);

        const opt = {
            margin:       [10, 10, 10, 10],
            filename:     `Facture_${id}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true,
                letterRendering: true,
                logging: false,
                onclone: (clonedDoc) => {
                    // Supprimer toutes les variables CSS de Tailwind qui pourraient contenir du 'lab' ou 'oklch'
                    // qui font planter html2canvas
                    const style = clonedDoc.createElement('style');
                    style.innerHTML = `
                        * { 
                            --tw-ring-color: transparent !important;
                            --tw-ring-offset-color: transparent !important;
                            --tw-shadow-color: transparent !important;
                            --tw-border-opacity: 1 !important;
                            --tw-text-opacity: 1 !important;
                            --tw-bg-opacity: 1 !important;
                            outline-color: transparent !important;
                        }
                    `;
                    clonedDoc.head.appendChild(style);
                }
            },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            const html2pdf = window.html2pdf;
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("Erreur PDF:", error);
            alert("Une erreur est survenue lors de la génération du PDF. Tentative de secours...");
            // Backup fallback if html2pdf really fails
            window.print();
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-blue-100">
            <Header />
            <div className="pt-20">
                <Nav />

                <main className="max-w-4xl mx-auto px-6 py-6 font-sans">
                    {/* Top Actions - Keep these for UX */}
                    <div className="flex items-center justify-between mb-4 no-print">
                        <button 
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold"
                        >
                            <HiOutlineArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                        
                        <button 
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all text-xs font-bold shadow-sm ${
                                isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'
                            }`}
                        >
                            <HiOutlineArrowDownTray className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
                            {isGenerating ? 'Génération...' : 'Télécharger PDF'}
                        </button>
                    </div>

                    {/* Invoice Document Card */}
                    <div id="invoice-content" className="bg-[#ffffff] border border-[#f1f5f9] p-10 relative overflow-hidden">
                        
                        {/* 1. Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-6">
                            {/* Logo & Info */}
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-[#ffffff] font-serif font-black text-3xl">F</span>
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Formini</h1>
                                    <div className="text-[11px] text-[#64748b] space-y-0.5 leading-tight">
                                        <p>123 Avenue de l'Éducation</p>
                                        <p>Nouakchott, Mauritanie</p>
                                        <p>Email : contact@formini.com</p>
                                        <p>Téléphone : +222 4X XX XX XX</p>
                                        <p>Site web : www.formini.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Title & Metadata */}
                            <div className="md:text-right space-y-1">
                                <h1 className="text-4xl font-serif font-medium text-[#1e293b] tracking-tight">FACTURE</h1>
                                <div className="text-[12px] text-[#64748b] space-y-1 font-medium">
                                    <p>Numéro de facture : <span className="text-[#1e293b]">{invoice.id}</span></p>
                                    <p>Date : <span className="text-[#1e293b]">{invoice.date}</span></p>
                                </div>
                                <div className="inline-flex mt-2 px-2.5 py-1 bg-[#f0fdf4] text-[#059669] text-[10px] font-black uppercase tracking-widest rounded-md ring-1 ring-[#059669]/20">
                                    STATUT: {invoice.status}
                                </div>
                            </div>
                        </div>

                        {/* Thick Separator Line */}
                        <div className="h-0.5 bg-[#1e293b] mb-8"></div>

                        {/* 2. Stakeholders Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
                            <div>
                                <h3 className="text-sm font-bold text-[#1e293b] mb-3 border-b border-[#f1f5f9] pb-1 uppercase tracking-tight">Facturé à :</h3>
                                <div className="text-sm space-y-1.5 text-[#64748b]">
                                    <p>Nom du formateur : <span className="font-semibold text-[#1e293b]">{invoice.trainer}</span></p>
                                    <p>Email : <span className="text-[#94a3b8]">—</span></p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1e293b] mb-3 border-b border-[#f1f5f9] pb-1 uppercase tracking-tight">Client :</h3>
                                <div className="text-sm space-y-1.5 text-[#64748b]">
                                    <p>Nom de l'apprenant : <span className="font-semibold text-[#1e293b]">{invoice.buyer.name}</span></p>
                                    <p>Email : <span className="font-semibold text-[#1e293b]">{invoice.buyer.email}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Transaction Summary text */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-[#1e293b] mb-4 tracking-tight uppercase tracking-widest text-[10px]">Description de la transaction :</h3>
                            <div className="text-sm text-[#64748b] space-y-1.5 pl-3 border-l-2 border-[#2563eb]">
                                <p>Formation : <span className="font-medium text-[#1e293b]">{invoice.formation}</span></p>
                                <p>Prix total : <span className="font-medium text-[#1e293b]">{priceValue} {currency}</span></p>
                                <p>Commission plateforme (20%) : <span className="font-medium text-[#1e293b]">{commissionValue} {currency}</span></p>
                                <p>Montant versé au formateur : <span className="font-medium text-[#1e293b]">{netValue} {currency}</span></p>
                            </div>
                        </div>

                        {/* 4. Professional Table */}
                        <div className="mb-10 overflow-hidden rounded-lg border border-[#e2e8f0]">
                            <table className="w-full text-left">
                                <thead className="bg-[#1e293b] text-[#ffffff]">
                                    <tr>
                                        <th className="px-5 py-2.5 text-xs font-bold">Description</th>
                                        <th className="px-5 py-2.5 text-xs font-bold text-right">Prix</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e2e8f0] text-sm">
                                    <tr>
                                        <td className="px-5 py-3 text-[#475569]">Vente formation</td>
                                        <td className="px-5 py-3 text-right text-[#1e293b] font-medium">{priceValue} {currency}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 text-[#475569]">Commission (20%)</td>
                                        <td className="px-5 py-3 text-right text-[#f43f5e] font-medium">-{commissionValue} {currency}</td>
                                    </tr>
                                    <tr className="bg-[#f8fafc]">
                                        <td className="px-5 py-3 font-bold text-[#1e293b] uppercase text-xs">Total Net</td>
                                        <td className="px-5 py-3 text-right font-black text-[#1e293b]">{netValue} {currency}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 5. Summary & Signature Section */}
                        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12">
                            <div className="text-xs text-[#64748b] space-y-1 w-full md:w-auto">
                                <p>Montant total payé par l'apprenant : <span className="font-bold text-[#1e293b]">{priceValue} {currency}</span></p>
                                <p>Commission plateforme : <span className="font-bold text-[#1e293b]">{commissionValue} {currency}</span></p>
                                <p>Montant net pour le formateur : <span className="font-bold text-[#1e293b]">{netValue} {currency}</span></p>
                            </div>

                            <div className="md:text-right space-y-2 pb-4 pr-4">
                                <p className="text-[10px] font-bold text-[#1e293b] uppercase tracking-widest">Cachet et Signature</p>
                                <div className="space-y-1">
                                    <p className="font-serif italic text-2xl text-[#2563eb] opacity-80 select-none leading-none">Formini</p>
                                    <div className="h-0.5 w-32 bg-[#2563eb] opacity-30 md:ml-auto"></div>
                                    <p className="text-[9px] font-bold text-[#64748b] uppercase tracking-tighter">Signé Formini</p>
                                </div>
                            </div>
                        </div>

                        {/* 6. Legal Footer */}
                        <div className="pt-8 border-t border-[#f1f5f9]">
                            <p className="text-[11px] text-[#94a3b8] italic leading-relaxed text-center md:text-left">
                                Cette facture confirme la vente d'une formation sur la plateforme Formini. <br className="hidden md:block" />
                                Le montant net sera versé au formateur selon les conditions définies par la plateforme. Merci de votre confiance.
                            </p>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
