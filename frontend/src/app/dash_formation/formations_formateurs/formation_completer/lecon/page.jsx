import { Suspense } from 'react';
import LeconPage from './lecon';

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LeconPage />
    </Suspense>
  );
}
