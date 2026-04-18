import React from "react";
import FactureApercu from "./factureApercu";

export default async function Page({ searchParams }) {
    await searchParams;
    return <FactureApercu />;
}
