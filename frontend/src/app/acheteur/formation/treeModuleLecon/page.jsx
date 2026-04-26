import { Suspense } from 'react';
import TreeModuleLecon from "./treeModuleLecon";

export default function Page() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <TreeModuleLecon />
        </Suspense>
    );
}
