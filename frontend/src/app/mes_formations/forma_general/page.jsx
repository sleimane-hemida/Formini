import { Suspense } from 'react';
import MesFormations from "./mes_formations";

export default function MesFormationsPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <MesFormations />
        </Suspense>
    );
}