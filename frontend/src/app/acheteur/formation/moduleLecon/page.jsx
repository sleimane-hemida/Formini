import React from "react";
import ModuleLecon from "./moduleLecon";

export default function Page({ searchParams }) {
    const formationId = searchParams?.id ?? "1";
    return <ModuleLecon formationId={formationId} />;
}
