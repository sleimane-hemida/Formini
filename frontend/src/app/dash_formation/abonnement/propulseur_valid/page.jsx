import { Suspense } from 'react';
import PropulseurValid from './propulseur_valid';

export default function Page() {
	return (
		<Suspense fallback={<div>Chargement...</div>}>
			<PropulseurValid />
		</Suspense>
	);
}
