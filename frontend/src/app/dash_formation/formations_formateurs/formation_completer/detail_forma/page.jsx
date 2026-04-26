import { Suspense } from 'react';
import DetailForma from './detail_forma';

export default function Page() {
	return (
		<Suspense fallback={<div>Chargement...</div>}>
			<DetailForma />
		</Suspense>
	);
}
