// "use client";
// import React, { useState, useEffect } from 'react';
// import { FiSave } from 'react-icons/fi';
// import { useAutoSave } from '../../../../../hooks/useAutoSave';
// import dynamic from 'next/dynamic';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Sidebar from '../../../sidebar/sidebar';
// import PageHeader from '../../../dash_principale/PageHeader';
// import Footer from '../../../../../composant/layout/footer';
// import ProgressStepper from '../../../../../composant/common/ProgressStepper';
// import { FiX } from 'react-icons/fi';

// const Header = dynamic(
// 	() => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
// 	{ ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
// );

// export default function ContenueLecon() {
// 	const params = useSearchParams();
// 	const router = useRouter();
// 	const fId = params ? params.get('fId') : null;
// 	const moduleId = params ? params.get('moduleId') : null;
// 	const lessonId = params ? params.get('lessonId') : null;

// 	const [videoFile, setVideoFile] = useState(null);
// 	const [pdfFile, setPdfFile] = useState(null);
// 	const [videoUrl, setVideoUrl] = useState(null);
// 	const [pdfUrl, setPdfUrl] = useState(null);
// 	const [videoMeta, setVideoMeta] = useState(null);
// 	const [pdfMeta, setPdfMeta] = useState(null);
// 	const [uploadMessage, setUploadMessage] = useState(null);
// 	const [videoResourceId, setVideoResourceId] = useState(null);
// 	const [pdfResourceId, setPdfResourceId] = useState(null);
// 	const [hasChanges, setHasChanges] = useState(false);
// 	const [saving, setSaving] = useState(false);

// 	const autoSaveTimer = useAutoSave(hasChanges, () => handleSave(), 30);

// 	useEffect(() => {
// 		if (!lessonId) return;

// 		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// 		if (!token) {
// 			console.error('❌ No token found');
// 			return;
// 		}

// 		console.log('📥 Loading resources for lesson:', lessonId);

// 		// Load resources from backend
// 		fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${encodeURIComponent(lessonId)}/resources`, {
// 			headers: {
// 				'Authorization': `Bearer ${token}`
// 			}
// 		})
// 			.then(res => {
// 				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// 				return res.json();
// 			})
// 			.then(resources => {
// 				console.log('✅ Resources loaded:', resources);

// 				// Find video and PDF resources
// 				const videoResource = resources.find(r => r.type === 'video');
// 				const pdfResource = resources.find(r => r.type === 'pdf');

// 				if (videoResource) {
// 					setVideoMeta(videoResource.titre || videoResource.url);
// 					setVideoUrl(`${process.env.NEXT_PUBLIC_API_URL}${videoResource.url}`);
// 					setVideoResourceId(videoResource.id);
// 					setUploadMessage(`✅ Vidéo chargée: "${videoResource.titre}"`);
// 				}

// 				if (pdfResource) {
// 					setPdfMeta(pdfResource.titre || pdfResource.url);
// 					setPdfUrl(`${process.env.NEXT_PUBLIC_API_URL}${pdfResource.url}`);
// 					setPdfResourceId(pdfResource.id);
// 					setUploadMessage(`✅ PDF chargé: "${pdfResource.titre}"`);
// 				}
// 				setHasChanges(false);
// 			})
// 			.catch(err => {
// 				console.error('❌ Error loading resources:', err);
// 				// Fallback - no resources yet
// 			});

// 		return () => {
// 			if (videoUrl) URL.revokeObjectURL(videoUrl);
// 			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
// 		};
// 	}, [lessonId, videoUrl, pdfUrl]);

// 	const persistToDraft = (videoName, videoSize, pdfName, pdfSize) => {
// 		try {
// 			const key = `formation_draft_${fId || 'temp'}`;
// 			const raw = localStorage.getItem(key);
// 			const draft = raw ? JSON.parse(raw) : {};
// 			if (!draft.modules) draft.modules = [];
// 			const mId = Number(moduleId) || 1;
// 			let mod = draft.modules.find(x => Number(x.id) === Number(mId));
// 			if (!mod) {
// 				mod = { id: mId, title: `Module ${mId}`, lessons: [] };
// 				draft.modules.push(mod);
// 			}
// 			let lesson = (mod.lessons && mod.lessons.find && mod.lessons.find(x => String(x.id) === String(lessonId)));
// 			if (!lesson) {
// 				lesson = { id: Number(lessonId || 0), contents: {} };
// 				mod.lessons = mod.lessons || [];
// 				mod.lessons.push(lesson);
// 			}
// 			lesson.contents = lesson.contents || {};
// 			// Store only metadata, NOT the full file data
// 			if (videoName !== undefined) lesson.contents.video = videoName ? { name: videoName, size: videoSize } : undefined;
// 			if (pdfName !== undefined) lesson.contents.pdf = pdfName ? { name: pdfName, size: pdfSize } : undefined;
// 			localStorage.setItem(key, JSON.stringify(draft));
// 			console.log('✅ Metadata saved to localStorage');
// 		} catch (err) {
// 			console.error('❌ Error persisting to draft:', err);
// 		}
// 	};

// 	const removeVideo = async (e) => {
// 		if (e && e.preventDefault) e.preventDefault();
// 		if (e && e.stopPropagation) e.stopPropagation();

// 		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// 		if (!token) return;

// 		if (!videoResourceId) {
// 			// No saved resource, just clear local state
// 			if (videoUrl) URL.revokeObjectURL(videoUrl);
// 			setVideoUrl(null);
// 			setVideoFile(null);
// 			setVideoMeta(null);
// 			setVideoResourceId(null);
// 			setUploadMessage(null);
// 			return;
// 		}

// 		try {
// 			// Delete from backend
// 			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/${videoResourceId}`, {
// 				method: 'DELETE',
// 				headers: {
// 					'Authorization': `Bearer ${token}`
// 				}
// 			});

// 			if (!response.ok) {
// 				throw new Error(`HTTP error! status: ${response.status}`);
// 			}

// 			console.log('✅ Video resource deleted');
// 			if (videoUrl) URL.revokeObjectURL(videoUrl);
// 			setVideoUrl(null);
// 			setVideoFile(null);
// 			setVideoMeta(null);
// 			setVideoResourceId(null);
// 			setUploadMessage('✅ Vidéo supprimée');
// 			setHasChanges(true);
// 		} catch (err) {
// 			console.error('❌ Error deleting video:', err);
// 			setUploadMessage(`❌ Erreur lors de la suppression: ${err.message}`);
// 		}
// 	};

// 	const removePdf = async (e) => {
// 		if (e && e.preventDefault) e.preventDefault();
// 		if (e && e.stopPropagation) e.stopPropagation();

// 		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// 		if (!token) return;

// 		if (!pdfResourceId) {
// 			// No saved resource, just clear local state
// 			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
// 			setPdfUrl(null);
// 			setPdfFile(null);
// 			setPdfMeta(null);
// 			setPdfResourceId(null);
// 			setUploadMessage(null);
// 			return;
// 		}

// 		try {
// 			// Delete from backend
// 			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/${pdfResourceId}`, {
// 				method: 'DELETE',
// 				headers: {
// 					'Authorization': `Bearer ${token}`
// 				}
// 			});

// 			if (!response.ok) {
// 				throw new Error(`HTTP error! status: ${response.status}`);
// 			}

// 			console.log('✅ PDF resource deleted');
// 			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
// 			setPdfUrl(null);
// 			setPdfFile(null);
// 			setPdfMeta(null);
// 			setPdfResourceId(null);
// 			setUploadMessage('✅ PDF supprimé');
// 			setHasChanges(true);
// 		} catch (err) {
// 			console.error('❌ Error deleting PDF:', err);
// 			setUploadMessage(`❌ Erreur lors de la suppression: ${err.message}`);
// 		}
// 	};

// 	const handleVideoChange = (e) => {
// 		const file = e.target.files && e.target.files[0];
// 		if (!file) return;

// 		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// 		if (!token) {
// 			alert('Vous devez être connecté.');
// 			return;
// 		}

// 		// Get formation ID and module ID from query params
// 		const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
// 		const formationId = params.get('fId');
// 		const moduleId = params.get('moduleId');

// 		setUploadMessage(`📤 Uploading vidéo "${file.name}"...`);

// 		try {
// 			const formData = new FormData();
// 			formData.append('file', file);
// 			formData.append('lessonId', lessonId);
// 			formData.append('formationId', formationId);
// 			formData.append('moduleId', moduleId);
// 			formData.append('type', 'video');
// 			formData.append('titre', file.name);
// 			// Don't append duree_minutes - let backend set it to NULL

// 			// Upload to backend (NO JSON content-type, let browser set it with boundary)
// 			fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`, {
// 				method: 'POST',
// 				headers: {
// 					'Authorization': `Bearer ${token}`
// 				},
// 				body: formData
// 			})
// 				.then(res => {
// 					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// 					return res.json();
// 				})
// 				.then(resource => {
// 					console.log('✅ Video resource created:', resource);
// 					setVideoFile(file);
// 					setVideoUrl(`${process.env.NEXT_PUBLIC_API_URL}${resource.url}`);
// 					setVideoResourceId(resource.id);
// 					setVideoMeta(file.name);
// 					setUploadMessage(`✅ Vidéo "${file.name}" uploadée avec succès!`);
// 					setHasChanges(true);
// 				})
// 				.catch(err => {
// 					console.error('❌ Error uploading video:', err);
// 					setUploadMessage(`❌ Erreur upload vidéo: ${err.message}`);
// 				});
// 		} catch (err) {
// 			console.error('❌ Error preparing video upload:', err);
// 			setUploadMessage(`❌ Erreur: ${err.message}`);
// 		}
// 	};

// 	const handlePdfChange = (e) => {
// 		const file = e.target.files && e.target.files[0];
// 		if (!file) return;

// 		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// 		if (!token) {
// 			alert('Vous devez être connecté.');
// 			return;
// 		}

// 		// Get formation ID and module ID from query params
// 		const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
// 		const formationId = params.get('fId');
// 		const moduleId = params.get('moduleId');

// 		setUploadMessage(`📤 Uploading PDF "${file.name}"...`);

// 		try {
// 			const formData = new FormData();
// 			formData.append('file', file);
// 			formData.append('lessonId', lessonId);
// 			formData.append('formationId', formationId);
// 			formData.append('moduleId', moduleId);
// 			formData.append('type', 'pdf');
// 			formData.append('titre', file.name);
// 			// Don't append duree_minutes - let backend set it to NULL

// 			// Upload to backend (NO JSON content-type, let browser set it with boundary)
// 			fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`, {
// 				method: 'POST',
// 				headers: {
// 					'Authorization': `Bearer ${token}`
// 				},
// 				body: formData
// 			})
// 				.then(res => {
// 					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// 					return res.json();
// 				})
// 				.then(resource => {
// 					console.log('✅ PDF resource created:', resource);
// 					setPdfFile(file);
// 					setPdfUrl(`${process.env.NEXT_PUBLIC_API_URL}${resource.url}`);
// 					setPdfResourceId(resource.id);
// 					setPdfMeta(file.name);
// 					setUploadMessage(`✅ PDF "${file.name}" uploadé avec succès!`);
// 					setHasChanges(true);
// 				})
// 				.catch(err => {
// 					console.error('❌ Error uploading PDF:', err);
// 					setUploadMessage(`❌ Erreur upload PDF: ${err.message}`);
// 				});
// 		} catch (err) {
// 			console.error('❌ Error preparing PDF upload:', err);
// 			setUploadMessage(`❌ Erreur: ${err.message}`);
// 		}
// 	};

// 	const handleSave = async (e) => {
// 		if (e && e.preventDefault) e.preventDefault();
// 		setSaving(true);
// 		try {
// 			await new Promise(resolve => setTimeout(resolve, 500));
// 			setHasChanges(false);
// 		} finally {
// 			setSaving(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="min-h-screen bg-white pt-24 text-black">
// 				<Header />
// 				<div className="flex w-full">
// 					<div className="pl-[17px] sm:pl-[17px]"><Sidebar /></div>
// 					<div className="flex-1">
// 						<div className="max-w-7xl mx-auto px-4 sm:px-6">
// 							<main>
// 								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
// 									<ProgressStepper current={3} fId={fId} />
// 									<PageHeader title="Contenu" actions={
// 										hasChanges ? (
// 											<div className="flex items-center gap-3">
// 												{autoSaveTimer !== null && autoSaveTimer > 0 && (
// 													<span className="text-sm font-medium text-gray-500 animate-pulse">
// 														Enregistrement automatique dans {autoSaveTimer} s
// 													</span>
// 												)}
// 												<button onClick={handleSave} disabled={saving} className={`flex items-center justify-center w-10 h-10 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white rounded-full transition-all shadow-md active:scale-95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`} title="Enregistrer les modifications">
// 													<FiSave className="w-5 h-5" />
// 												</button>
// 											</div>
// 										) : <></>
// 									} />

// 									<div className="bg-white p-6 rounded-2xl w-full text-black shadow-sm">
// 										<div className="mb-4">
// 											<div className="text-sm text-gray-500">Importer des fichiers pour la leçon</div>
// 											{uploadMessage && (
// 												<div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
// 													{uploadMessage}
// 												</div>
// 											)}
// 										</div>

// 										<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// 											<label className="border-2 border-dashed border-blue-200 rounded-md p-4 flex flex-col gap-3 cursor-pointer transition hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
// 												<div className="flex items-center justify-between">
// 													<div className="text-sm font-medium">Importer une vidéo</div>
// 													{videoMeta && (
// 														<button onClick={removeVideo} className="text-sm text-red-600 hover:underline" aria-label="Retirer la vidéo"><FiX className="inline-block mr-1"/>Retirer</button>
// 													)}
// 												</div>
// 												<input type="file" accept="video/*" onChange={handleVideoChange} className="mt-2" />
// 												<div className="text-xs text-gray-500">{videoMeta || 'Aucun fichier sélectionné'}</div>
// 											</label>

// 											<label className="border-2 border-dashed border-blue-200 rounded-md p-4 flex flex-col gap-3 cursor-pointer transition hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
// 												<div className="flex items-center justify-between">
// 													<div className="text-sm font-medium">Importer un PDF</div>
// 													{pdfMeta && (
// 														<button onClick={removePdf} className="text-sm text-red-600 hover:underline" aria-label="Retirer le PDF"><FiX className="inline-block mr-1"/>Retirer</button>
// 													)}
// 												</div>
// 												<input type="file" accept="application/pdf" onChange={handlePdfChange} className="mt-2" />
// 												<div className="text-xs text-gray-500">{pdfMeta || 'Aucun fichier sélectionné'}</div>
// 											</label>
// 										</div>

// 											<div className="mt-6">
// 											<div className="text-sm font-semibold mb-2">Aperçu</div>
// 											<div className="space-y-6">
// 											{videoUrl && (
// 												<div>
// 													<div className="text-sm text-gray-700 mb-2">{videoMeta}</div>
// 													<video controls src={videoUrl} className="w-full rounded-md" />
// 												</div>
// 											)}
// 											{pdfUrl && (
// 												<div>
// 													<div className="text-sm text-gray-700 mb-2">{pdfMeta}</div>
// 													<div className="border rounded-md overflow-hidden">
// 														<embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
// 													</div>
// 												</div>
// 											)}
// 											{!videoUrl && !pdfUrl && (<div className="text-xs text-gray-500">Aucun aperçu disponible. Importez un fichier pour le visualiser.</div>)}
// 											</div>
// 										</div>

// 										<div className="mt-6 flex items-center justify-between">
// 											<div>
// 												<button onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">Retour</button>
// 											</div>
// 											<div className="flex items-center gap-3">
// 												<button type="button" onClick={() => router.back()} className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg transition-colors">Terminer</button>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</main>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<Footer />
// 		</>
// 	);
// }



"use client";
import React, { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import { useAutoSave } from '../../../../../hooks/useAutoSave';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '../../../sidebar/sidebar';
import PageHeader from '../../../dash_principale/PageHeader';
import Footer from '../../../../../composant/layout/footer';
import ProgressStepper from '../../../../../composant/common/ProgressStepper';
import { FiX } from 'react-icons/fi';

const Header = dynamic(
	() => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
	{ ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);

// ✅ Helper : l'URL est-elle déjà absolue (Cloudinary) ou relative (ancien système) ?
const resolveUrl = (url) => {
	if (!url) return null;
	if (url.startsWith('http://') || url.startsWith('https://')) return url;
	return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

export default function ContenueLecon() {
	const params = useSearchParams();
	const router = useRouter();
	const fId = params ? params.get('fId') : null;
	const moduleId = params ? params.get('moduleId') : null;
	const lessonId = params ? params.get('lessonId') : null;

	const [videoFile, setVideoFile] = useState(null);
	const [pdfFile, setPdfFile] = useState(null);
	const [videoUrl, setVideoUrl] = useState(null);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [videoMeta, setVideoMeta] = useState(null);
	const [pdfMeta, setPdfMeta] = useState(null);
	const [uploadMessage, setUploadMessage] = useState(null);
	const [videoResourceId, setVideoResourceId] = useState(null);
	const [pdfResourceId, setPdfResourceId] = useState(null);
	const [hasChanges, setHasChanges] = useState(false);
	const [saving, setSaving] = useState(false);
	// ✅ Progression upload
	const [videoProgress, setVideoProgress] = useState(0);
	const [pdfProgress, setPdfProgress] = useState(0);
	const [videoUploading, setVideoUploading] = useState(false);
	const [pdfUploading, setPdfUploading] = useState(false);

	const autoSaveTimer = useAutoSave(hasChanges, () => handleSave(), 30);

	useEffect(() => {
		if (!lessonId) return;
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) return;

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${encodeURIComponent(lessonId)}/resources`, {
			headers: { 'Authorization': `Bearer ${token}` }
		})
			.then(res => { if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); return res.json(); })
			.then(resources => {
				const videoResource = resources.find(r => r.type === 'video');
				const pdfResource = resources.find(r => r.type === 'pdf');

				if (videoResource) {
					setVideoMeta(videoResource.titre || videoResource.url);
					// ✅ resolveUrl gère les URLs Cloudinary et les anciennes URLs locales
					setVideoUrl(resolveUrl(videoResource.url));
					setVideoResourceId(videoResource.id);
				}

				if (pdfResource) {
					setPdfMeta(pdfResource.titre || pdfResource.url);
					// ✅ resolveUrl gère les URLs Cloudinary et les anciennes URLs locales
					setPdfUrl(resolveUrl(pdfResource.url));
					setPdfResourceId(pdfResource.id);
				}
				setHasChanges(false);
			})
			.catch(err => console.error('❌ Error loading resources:', err));
	}, [lessonId]);

	// ✅ Upload avec XMLHttpRequest pour avoir la progression + timeout long
	const uploadFile = (file, type, onProgress, onSuccess, onError) => {
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) { onError('Non connecté'); return; }

		const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
		const formationId = searchParams.get('fId');
		const currentModuleId = searchParams.get('moduleId');

		const formData = new FormData();
		formData.append('file', file);
		formData.append('lessonId', lessonId);
		formData.append('formationId', formationId);
		formData.append('moduleId', currentModuleId);
		formData.append('type', type);
		formData.append('titre', file.name);

		const xhr = new XMLHttpRequest();

		// ✅ Timeout de 30 minutes pour les grosses vidéos
		xhr.timeout = 30 * 60 * 1000;

		// ✅ Progression
		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				const percent = Math.round((e.loaded / e.total) * 100);
				onProgress(percent);
			}
		};

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				try {
					const resource = JSON.parse(xhr.responseText);
					onSuccess(resource);
				} catch (e) {
					onError('Réponse invalide du serveur');
				}
			} else {
				onError(`Erreur serveur: ${xhr.status}`);
			}
		};

		xhr.onerror = () => onError('Erreur réseau');
		xhr.ontimeout = () => onError('Timeout — fichier trop lourd ou connexion trop lente');

		xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/api/resources`);
		xhr.setRequestHeader('Authorization', `Bearer ${token}`);
		xhr.send(formData);
	};

	const handleVideoChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		setVideoUploading(true);
		setVideoProgress(0);
		setUploadMessage(`📤 Uploading vidéo "${file.name}"...`);

		uploadFile(
			file,
			'video',
			(percent) => setVideoProgress(percent),
			(resource) => {
				setVideoFile(file);
				// ✅ L'URL vient directement de Cloudinary, pas besoin de préfixer
				setVideoUrl(resolveUrl(resource.url));
				setVideoResourceId(resource.id);
				setVideoMeta(file.name);
				setUploadMessage(`✅ Vidéo "${file.name}" uploadée avec succès!`);
				setVideoUploading(false);
				setVideoProgress(100);
				setHasChanges(true);
			},
			(err) => {
				console.error('❌ Error uploading video:', err);
				setUploadMessage(`❌ Erreur upload vidéo: ${err}`);
				setVideoUploading(false);
				setVideoProgress(0);
			}
		);
	};

	const handlePdfChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		setPdfUploading(true);
		setPdfProgress(0);
		setUploadMessage(`📤 Uploading PDF "${file.name}"...`);

		uploadFile(
			file,
			'pdf',
			(percent) => setPdfProgress(percent),
			(resource) => {
				setPdfFile(file);
				// ✅ L'URL vient directement de Cloudinary
				setPdfUrl(resolveUrl(resource.url));
				setPdfResourceId(resource.id);
				setPdfMeta(file.name);
				setUploadMessage(`✅ PDF "${file.name}" uploadé avec succès!`);
				setPdfUploading(false);
				setPdfProgress(100);
				setHasChanges(true);
			},
			(err) => {
				console.error('❌ Error uploading PDF:', err);
				setUploadMessage(`❌ Erreur upload PDF: ${err}`);
				setPdfUploading(false);
				setPdfProgress(0);
			}
		);
	};

	const removeVideo = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (e && e.stopPropagation) e.stopPropagation();
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) return;
		if (!videoResourceId) {
			setVideoUrl(null); setVideoFile(null); setVideoMeta(null);
			setVideoResourceId(null); setUploadMessage(null); return;
		}
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/${videoResourceId}`, {
				method: 'DELETE',
				headers: { 'Authorization': `Bearer ${token}` }
			});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			setVideoUrl(null); setVideoFile(null); setVideoMeta(null);
			setVideoResourceId(null); setUploadMessage('✅ Vidéo supprimée'); setHasChanges(true);
		} catch (err) {
			setUploadMessage(`❌ Erreur lors de la suppression: ${err.message}`);
		}
	};

	const removePdf = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (e && e.stopPropagation) e.stopPropagation();
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) return;
		if (!pdfResourceId) {
			setPdfUrl(null); setPdfFile(null); setPdfMeta(null);
			setPdfResourceId(null); setUploadMessage(null); return;
		}
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/${pdfResourceId}`, {
				method: 'DELETE',
				headers: { 'Authorization': `Bearer ${token}` }
			});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			setPdfUrl(null); setPdfFile(null); setPdfMeta(null);
			setPdfResourceId(null); setUploadMessage('✅ PDF supprimé'); setHasChanges(true);
		} catch (err) {
			setUploadMessage(`❌ Erreur lors de la suppression: ${err.message}`);
		}
	};

	const handleSave = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		setSaving(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 500));
			setHasChanges(false);
		} finally {
			setSaving(false);
		}
	};

	return (
		<>
			<div className="min-h-screen bg-white pt-24 text-black">
				<Header />
				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]"><Sidebar /></div>
					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
									<ProgressStepper current={3} fId={fId} />
									<PageHeader title="Contenu" actions={
										hasChanges ? (
											<div className="flex items-center gap-3">
												{autoSaveTimer !== null && autoSaveTimer > 0 && (
													<span className="text-sm font-medium text-gray-500 animate-pulse">
														Enregistrement automatique dans {autoSaveTimer} s
													</span>
												)}
												<button onClick={handleSave} disabled={saving} className={`flex items - center justify - center w - 10 h - 10 bg - [#0C8CE9] hover: bg - [#0A71BC] text - white rounded - full transition - all shadow - md active: scale - 95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`} title="Enregistrer les modifications">
													<FiSave className="w-5 h-5" />
												</button>
											</div>
										) : <></>
									} />

									<div className="bg-white p-6 rounded-2xl w-full text-black shadow-sm">
										<div className="mb-4">
											<div className="text-sm text-gray-500">Importer des fichiers pour la leçon</div>
											{uploadMessage && (
												<div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
													{uploadMessage}
												</div>
											)}
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
											{/* Upload Vidéo */}
											<label className="border-2 border-dashed border-blue-200 rounded-md p-4 flex flex-col gap-3 cursor-pointer transition hover:border-blue-400">
												<div className="flex items-center justify-between">
													<div className="text-sm font-medium">Importer une vidéo</div>
													{videoMeta && (
														<button onClick={removeVideo} className="text-sm text-red-600 hover:underline">
															<FiX className="inline-block mr-1" />Retirer
														</button>
													)}
												</div>
												<input type="file" accept="video/*" onChange={handleVideoChange} className="mt-2" disabled={videoUploading} />
												<div className="text-xs text-gray-500">{videoMeta || 'Aucun fichier sélectionné'}</div>
												{/* ✅ Barre de progression vidéo */}
												{videoUploading && (
													<div className="w-full">
														<div className="flex justify-between text-xs text-gray-500 mb-1">
															<span>Upload en cours...</span>
															<span>{videoProgress}%</span>
														</div>
														<div className="w-full bg-gray-200 rounded-full h-2">
															<div
																className="bg-blue-500 h-2 rounded-full transition-all duration-300"
																style={{ width: `${videoProgress} % ` }}
															/>
														</div>
													</div>
												)}
											</label>

											{/* Upload PDF */}
											<label className="border-2 border-dashed border-blue-200 rounded-md p-4 flex flex-col gap-3 cursor-pointer transition hover:border-blue-400">
												<div className="flex items-center justify-between">
													<div className="text-sm font-medium">Importer un PDF</div>
													{pdfMeta && (
														<button onClick={removePdf} className="text-sm text-red-600 hover:underline">
															<FiX className="inline-block mr-1" />Retirer
														</button>
													)}
												</div>
												<input type="file" accept="application/pdf" onChange={handlePdfChange} className="mt-2" disabled={pdfUploading} />
												<div className="text-xs text-gray-500">{pdfMeta || 'Aucun fichier sélectionné'}</div>
												{/* ✅ Barre de progression PDF */}
												{pdfUploading && (
													<div className="w-full">
														<div className="flex justify-between text-xs text-gray-500 mb-1">
															<span>Upload en cours...</span>
															<span>{pdfProgress}%</span>
														</div>
														<div className="w-full bg-gray-200 rounded-full h-2">
															<div
																className="bg-blue-500 h-2 rounded-full transition-all duration-300"
																style={{ width: `${pdfProgress} % ` }}
															/>
														</div>
													</div>
												)}
											</label>
										</div>

										{/* Aperçu */}
										<div className="mt-6">
											<div className="text-sm font-semibold mb-2">Aperçu</div>
											<div className="space-y-6">
												{videoUrl && (
													<div>
														<div className="text-sm text-gray-700 mb-2">{videoMeta}</div>
														<video controls src={videoUrl} className="w-full rounded-md" />
													</div>
												)}
												{pdfUrl && (
													<div>
														<div className="text-sm text-gray-700 mb-2">{pdfMeta}</div>
														{/* ✅ Cloudinary raw files : on utilise un iframe + lien de téléchargement */}
														<div className="border rounded-md overflow-hidden">
															<iframe
																src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
																width="100%"
																height="600px"
																className="rounded-md"
																title={pdfMeta}
															/>
														</div >
														<a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
															📄 Ouvrir le PDF dans un nouvel onglet
														</a>
													</div >
												)
												}
												{
													!videoUrl && !pdfUrl && (
														<div className="text-xs text-gray-500">Aucun aperçu disponible. Importez un fichier pour le visualiser.</div>
													)
												}
											</div >
										</div >

										<div className="mt-6 flex items-center justify-between">
											<button onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">Retour</button>
											<button type="button" onClick={() => router.back()} className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg transition-colors">Terminer</button>
										</div>
									</div >
								</div >
							</main >
						</div >
					</div >
				</div >
			</div >
			<Footer />
		</>
	);
}
