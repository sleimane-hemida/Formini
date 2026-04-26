import { Suspense } from 'react';
import Catalogue from "./catalogue";

export default function FormationsPage() {
	return (
		<Suspense fallback={<div>Chargement...</div>}>
			<Catalogue />
		</Suspense>
	);
}
