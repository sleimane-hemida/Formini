import { Suspense } from 'react';
import GeneralForma from './general_forma';

export default function Page() {
	return (
		<Suspense fallback={<div>Chargement...</div>}>
			<GeneralForma />
		</Suspense>
	);
}
