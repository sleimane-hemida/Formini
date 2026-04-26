import { Suspense } from 'react';
import ContenueLecon from './contenue_lecon';

export default function Page(props) {
	return (
		<Suspense fallback={<div>Chargement...</div>}>
			<ContenueLecon {...props} />
		</Suspense>
	);
}
