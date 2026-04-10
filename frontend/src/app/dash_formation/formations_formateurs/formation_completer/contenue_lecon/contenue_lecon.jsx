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

	useEffect(() => {
		// load previously saved metadata (file names) from draft if present
		try {
			const key = `formation_draft_${fId || 'temp'}`;
			const raw = localStorage.getItem(key);
			if (raw) {
				const draft = JSON.parse(raw);
				const mId = Number(moduleId) || 1;
				const mod = (draft.modules && draft.modules.find && draft.modules.find(x => Number(x.id) === Number(mId))) || (draft.modules && draft.modules[0]);
				if (mod) {
					const lesson = (mod.lessons && mod.lessons.find && mod.lessons.find(x => String(x.id) === String(lessonId)));
					if (lesson && lesson.contents) {
						if (lesson.contents.video && lesson.contents.video.name) setVideoMeta(lesson.contents.video.name);
						if (lesson.contents.pdf && lesson.contents.pdf.name) setPdfMeta(lesson.contents.pdf.name);
					}
				}
			}
		} catch (err) {
			// ignore
		}

		return () => {
			if (videoUrl) URL.revokeObjectURL(videoUrl);
			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
		};
	}, []);

	const persistToDraft = (videoName, pdfName) => {
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
			if (videoName !== undefined) lesson.contents.video = videoName ? { name: videoName } : undefined;
			if (pdfName !== undefined) lesson.contents.pdf = pdfName ? { name: pdfName } : undefined;
			localStorage.setItem(key, JSON.stringify(draft));
		} catch (err) {
			// ignore
		}
	};

	const removeVideo = (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (e && e.stopPropagation) e.stopPropagation();
		if (videoUrl) URL.revokeObjectURL(videoUrl);
		setVideoUrl(null);
		setVideoFile(null);
		setVideoMeta(null);
		persistToDraft('', undefined);
	};

	const removePdf = (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (e && e.stopPropagation) e.stopPropagation();
		if (pdfUrl) URL.revokeObjectURL(pdfUrl);
		setPdfUrl(null);
		setPdfFile(null);
		setPdfMeta(null);
		persistToDraft(undefined, '');
	};

	const handleVideoChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		if (videoUrl) URL.revokeObjectURL(videoUrl);
		const url = URL.createObjectURL(file);
		setVideoFile(file);
		setVideoUrl(url);
		setVideoMeta(file.name);
		persistToDraft(file.name, undefined);
	};

	const handlePdfChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		if (pdfUrl) URL.revokeObjectURL(pdfUrl);
		const url = URL.createObjectURL(file);
		setPdfFile(file);
		setPdfUrl(url);
		setPdfMeta(file.name);
		persistToDraft(undefined, file.name);
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
									<PageHeader title={`Contenu — Leçon ${lessonId || ''}`} actions={<></>} />

									<div className="bg-white p-6 rounded-2xl w-full text-black shadow-sm">
										<div className="mb-4">
											<div className="text-sm text-gray-500">Importer des fichiers pour la leçon</div>
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
												<button onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/tarification?page=1${fId?`&fId=${fId}`:''}`)} className="ml-3 bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">Enregistrer</button>
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
