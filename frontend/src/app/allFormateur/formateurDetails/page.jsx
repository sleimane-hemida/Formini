import { Suspense } from 'react';
import FormateurDetails from "./formateurDetails";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <FormateurDetails />
    </Suspense>
  );
}
