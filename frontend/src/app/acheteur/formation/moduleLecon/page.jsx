import React from "react";
import ModuleLecon from "./moduleLecon";

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    const formationId = sp?.id ?? "1";
    return <ModuleLecon formationId={formationId} />;
}
