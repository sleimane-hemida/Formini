"use client";
import React, { useState, useEffect } from 'react';
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

	useEffect(() => {
		if (!lessonId) return;

		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			console.error('❌ No token found');
			return;
		}

		console.log('📥 Loading resources for lesson:', lessonId);

		// Load resources from backend
		fetch(`http://localhost:5000/api/lessons/${encodeURIComponent(lessonId)}/resources`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
			.then(res => {
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				return res.json();
			})
			.then(resources => {
				console.log('✅ Resources loaded:', resources);
				
				// Find video and PDF resources
				const videoResource = resources.find(r => r.type === 'video');
				const pdfResource = resources.find(r => r.type === 'pdf');
				
				if (videoResource) {
					setVideoMeta(videoResource.titre || videoResource.url);
					setVideoUrl(`http://localhost:5000${videoResource.url}`);
					setVideoResourceId(videoResource.id);
					setUploadMessage(`✅ Vidéo chargée: "${videoResource.titre}"`);
				}
				
				if (pdfResource) {
					setPdfMeta(pdfResource.titre || pdfResource.url);
					setPdfUrl(`http://localhost:5000${pdfResource.url}`);
					setPdfResourceId(pdfResource.id);
					setUploadMessage(`✅ PDF chargé: "${pdfResource.titre}"`);
				}
			})
			.catch(err => {
				console.error('❌ Error loading resources:', err);
				// Fallback - no resources yet
			});

		return () => {
			if (videoUrl) URL.revokeObjectURL(videoUrl);
			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
		};
	}, [lessonId, videoUrl, pdfUrl]);

	const persistToDraft = (videoName, videoSize, pdfName, pdfSize) => {
		try {
			const key = `formation_draft_${fId || 'temp'}`;
			const raw = localStorage.getItem(key);
			const draft = raw ? JSON.parse(raw) : {};
			if (!draft.modules) draft.modules = [];
			const mId = Number(moduleId) || 1;
			let mod = draft.modules.find(x => Number(x.id) === Number(mId));
			if (!mod) {
				mod = { id: mId, title: `Module ${mId}`, lessons: [] };
				draft.modules.push(mod);
			}
			let lesson = (mod.lessons && mod.lessons.find && mod.lessons.find(x => String(x.id) === String(lessonId)));
			if (!lesson) {
				lesson = { id: Number(lessonId || 0), contents: {} };
				mod.lessons = mod.lessons || [];
				mod.lessons.push(lesson);
			}
			lesson.contents = lesson.contents || {};
			// Store only metadata, NOT the full file data
			if (videoName !== undefined) lesson.contents.video = videoName ? { name: videoName, size: videoSize } : undefined;
			if (pdfName !== undefined) lesson.contents.pdf = pdfName ? { name: pdfName, size: pdfSize } : undefined;
			localStorage.setItem(key, JSON.stringify(draft));
			console.log('✅ Metadata saved to localStorage');
		} catch (err) {
			console.error('❌ Error persisting to draft:', err);
		}
	};

	const removeVideo = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (e && e.stopPropagation) e.stopPropagation();
		
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) return;
		
		if (!videoResourceId) {
			// No saved resource, just clear local state
			if (videoUrl) URL.revokeObjectURL(videoUrl);
			setVideoUrl(null);
			setVideoFile(null);
			setVideoMeta(null);
			setVideoResourceId(null);
			setUploadMessage(null);
			return;
		}
		
		try {
			// Delete from backend
			const response = await fetch(`http://localhost:5000/api/resources/${videoResourceId}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			console.log('✅ Video resource deleted');
			if (videoUrl) URL.revokeObjectURL(videoUrl);
			setVideoUrl(null);
			setVideoFile(null);
			setVideoMeta(null);
			setVideoResourceId(null);
			setUploadMessage('✅ Vidéo supprimée');
		} catch (err) {
			console.error('❌ Error deleting video:', err);
			setUploadMessage(`❌ Erreur lors de la suppression: ${err.message}`);
		}
	};

	const removePdf = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (e && e.stopPropagation) e.stopPropagation();
		
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) return;
		
		if (!pdfResourceId) {
			// No saved resource, just clear local state
			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
			setPdfUrl(null);
			setPdfFile(null);
			setPdfMeta(null);
			setPdfResourceId(null);
			setUploadMessage(null);
			return;
		}
		
		try {
			// Delete from backend
			const response = await fetch(`http://localhost:5000/api/resources/${pdfResourceId}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			console.log('✅ PDF resource deleted');
			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
			setPdfUrl(null);
			setPdfFile(null);
			setPdfMeta(null);
			setPdfResourceId(null);
			setUploadMessage('✅ PDF supprimé');
		} catch (err) {
			console.error('❌ Error deleting PDF:', err);
			setUploadMessage(`❌ Erreur lors de la suppression: ${err.message}`);
		}
	};

	const handleVideoChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			alert('Vous devez être connecté.');
			return;
		}

		// Get formation ID and module ID from query params
		const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
		const formationId = params.get('fId');
		const moduleId = params.get('moduleId');

		setUploadMessage(`📤 Uploading vidéo "${file.name}"...`);

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('lessonId', lessonId);
			formData.append('formationId', formationId);
			formData.append('moduleId', moduleId);
			formData.append('type', 'video');
			formData.append('titre', file.name);
			// Don't append duree_minutes - let backend set it to NULL

			// Upload to backend (NO JSON content-type, let browser set it with boundary)
			fetch('http://localhost:5000/api/resources', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				},
				body: formData
			})
				.then(res => {
					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
					return res.json();
				})
				.then(resource => {
					console.log('✅ Video resource created:', resource);
					setVideoFile(file);
					setVideoUrl(`http://localhost:5000${resource.url}`);
					setVideoResourceId(resource.id);
					setVideoMeta(file.name);
					setUploadMessage(`✅ Vidéo "${file.name}" uploadée avec succès!`);
				})
				.catch(err => {
					console.error('❌ Error uploading video:', err);
					setUploadMessage(`❌ Erreur upload vidéo: ${err.message}`);
				});
		} catch (err) {
			console.error('❌ Error preparing video upload:', err);
			setUploadMessage(`❌ Erreur: ${err.message}`);
		}
	};

	const handlePdfChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			alert('Vous devez être connecté.');
			return;
		}

		// Get formation ID and module ID from query params
		const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
		const formationId = params.get('fId');
		const moduleId = params.get('moduleId');

		setUploadMessage(`📤 Uploading PDF "${file.name}"...`);

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('lessonId', lessonId);
			formData.append('formationId', formationId);
			formData.append('moduleId', moduleId);
			formData.append('type', 'pdf');
			formData.append('titre', file.name);
			// Don't append duree_minutes - let backend set it to NULL

			// Upload to backend (NO JSON content-type, let browser set it with boundary)
			fetch('http://localhost:5000/api/resources', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				},
				body: formData
			})
				.then(res => {
					if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
					return res.json();
				})
				.then(resource => {
					console.log('✅ PDF resource created:', resource);
					setPdfFile(file);
					setPdfUrl(`http://localhost:5000${resource.url}`);
					setPdfResourceId(resource.id);
					setPdfMeta(file.name);
					setUploadMessage(`✅ PDF "${file.name}" uploadé avec succès!`);
				})
				.catch(err => {
					console.error('❌ Error uploading PDF:', err);
					setUploadMessage(`❌ Erreur upload PDF: ${err.message}`);
				});
		} catch (err) {
			console.error('❌ Error preparing PDF upload:', err);
			setUploadMessage(`❌ Erreur: ${err.message}`);
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
								<div className="container mx-auto px-4 py-8 pt-6 max-w-5xl">
									<ProgressStepper current={3} fId={fId} />
									<PageHeader title="Contenu" actions={<></>} />

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
											<label className="border-2 border-dashed border-blue-200 rounded-md p-4 flex flex-col gap-3 cursor-pointer transition hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
												<div className="flex items-center justify-between">
													<div className="text-sm font-medium">Importer une vidéo</div>
													{videoMeta && (
														<button onClick={removeVideo} className="text-sm text-red-600 hover:underline" aria-label="Retirer la vidéo"><FiX className="inline-block mr-1"/>Retirer</button>
													)}
												</div>
												<input type="file" accept="video/*" onChange={handleVideoChange} className="mt-2" />
												<div className="text-xs text-gray-500">{videoMeta || 'Aucun fichier sélectionné'}</div>
											</label>

											<label className="border-2 border-dashed border-blue-200 rounded-md p-4 flex flex-col gap-3 cursor-pointer transition hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
												<div className="flex items-center justify-between">
													<div className="text-sm font-medium">Importer un PDF</div>
													{pdfMeta && (
														<button onClick={removePdf} className="text-sm text-red-600 hover:underline" aria-label="Retirer le PDF"><FiX className="inline-block mr-1"/>Retirer</button>
													)}
												</div>
												<input type="file" accept="application/pdf" onChange={handlePdfChange} className="mt-2" />
												<div className="text-xs text-gray-500">{pdfMeta || 'Aucun fichier sélectionné'}</div>
											</label>
										</div>

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
													<div className="border rounded-md overflow-hidden">
														<embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
													</div>
												</div>
											)}
											{!videoUrl && !pdfUrl && (<div className="text-xs text-gray-500">Aucun aperçu disponible. Importez un fichier pour le visualiser.</div>)}
											</div>
										</div>

										<div className="mt-6 flex items-center justify-between">
											<div>
												<button onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">Retour</button>
											</div>
											<div>
												<button onClick={() => router.back()} className="ml-3 bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">Enregistrer et revenir</button>
											</div>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
