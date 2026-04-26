import { Suspense } from 'react';
import TarificationPage from './tarification';

export default function PageRoute() {
	return (
		<Suspense fallback={<div>Chargement...</div>}>
			<TarificationPage />
		</Suspense>
	);
}

