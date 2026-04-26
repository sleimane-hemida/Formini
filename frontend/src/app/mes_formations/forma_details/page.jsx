import { Suspense } from 'react';
import FormaDetails from "./forma_details";

export default function FormaDetailsPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <FormaDetails />
        </Suspense>
    );
}