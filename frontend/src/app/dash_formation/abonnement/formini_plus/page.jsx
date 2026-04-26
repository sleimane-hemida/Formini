import { Suspense } from 'react';
import ForminiPlus from "./formini_plus";

export default function Page() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ForminiPlus />
        </Suspense>
    );
}
