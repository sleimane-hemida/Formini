import { Suspense } from 'react';
import VenteRevenu from "./vente_revenu";

export default function Page() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <VenteRevenu />
        </Suspense>
    );
}
