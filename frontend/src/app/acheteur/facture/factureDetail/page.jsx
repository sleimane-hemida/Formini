import React from "react";
import FactureDetail from "./factureDetail";

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    const id = sp?.id || "FAC-2026-001";
    return <FactureDetail invoiceId={id} />;
}
