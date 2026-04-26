import { Suspense } from 'react';
import ModuleLecon from './module';

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ModuleLecon />
    </Suspense>
  );
}
