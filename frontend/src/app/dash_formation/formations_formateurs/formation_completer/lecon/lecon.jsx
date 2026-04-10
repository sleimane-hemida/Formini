"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '../../../sidebar/sidebar';
import PageHeader from '../../../dash_principale/PageHeader';
import Footer from '../../../../../composant/layout/footer';
import ProgressStepper from '../../../../../composant/common/ProgressStepper';
import { FiEdit, FiTrash2, FiCamera } from 'react-icons/fi';

const Header = dynamic(
	() => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
	{ ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);

export default function LeconPage() {
	const params = useSearchParams();
	const router = useRouter();
	const fId = params ? params.get('fId') : null;
	const moduleId = params ? params.get('moduleId') : null;

	const [lessons, setLessons] = useState([]);
	const [moduleTitle, setModuleTitle] = useState('');
	const [editingLessonId, setEditingLessonId] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteTargetId, setDeleteTargetId] = useState(null);

	const openDeleteModal = (id) => {
		setDeleteTargetId(id);
		setShowDeleteModal(true);
	};

	const cancelDelete = () => {
		setDeleteTargetId(null);
		setShowDeleteModal(false);
	};

	const confirmDelete = () => {
		setLessons(prev => {
			const next = prev.filter(x => x.id !== deleteTargetId);
			saveLessonsDraft(next);
			return next;
		});
		setShowDeleteModal(false);
		setDeleteTargetId(null);
		if (editingLessonId === deleteTargetId) setEditingLessonId(null);
	};

	const addLesson = () => {
		const nextId = lessons.length ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
		const next = [...lessons, { id: nextId, title: `Leçon ${nextId}` }];
		setLessons(next);
		saveLessonsDraft(next);
		setEditingLessonId(nextId);
	};

	const saveLessonsDraft = (updatedLessons) => {
		try {
			const key = `formation_draft_${fId || 'temp'}`;
			const raw = localStorage.getItem(key);
			const draft = raw ? JSON.parse(raw) : {};
			if (!draft.modules) draft.modules = [];
			const mId = Number(moduleId) || 1;
			const idx = draft.modules.findIndex(x => Number(x.id) === Number(mId));
			if (idx >= 0) {
				draft.modules[idx].lessons = updatedLessons;
			} else {
				draft.modules.push({ id: mId, title: moduleTitle || `Module ${mId}`, lessons: updatedLessons });
			}
			localStorage.setItem(key, JSON.stringify(draft));
		} catch (err) {
			// ignore
		}
	};

	const handlePhotoChange = (e, id) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = reader.result;
			setLessons(prev => {
				const next = prev.map(x => x.id === id ? { ...x, bg: dataUrl } : x);
				saveLessonsDraft(next);
				return next;
			});
		};
		reader.readAsDataURL(file);
		e.target.value = '';
	};

	useEffect(() => {
		try {
			const key = `formation_draft_${fId || 'temp'}`;
			const raw = localStorage.getItem(key);
			if (raw) {
				const draft = JSON.parse(raw);
				const mId = Number(moduleId) || 1;
				const mod = (draft.modules && draft.modules.find && draft.modules.find(x => Number(x.id) === Number(mId))) || (draft.modules && draft.modules[0]);
				const lessonsArr = (mod && mod.lessons && mod.lessons.length) ? mod.lessons : [
					{ id: 1, title: 'Leçon 1' },
					{ id: 2, title: 'Leçon 2' },
					{ id: 3, title: 'Leçon 3' },
				];
				setLessons(lessonsArr);
				setModuleTitle((mod && mod.title) ? mod.title : `Module ${mId}`);
				return;
			}
		} catch (err) {
			// ignore
		}

		setLessons([
			{ id: 1, title: 'Leçon 1' },
			{ id: 2, title: 'Leçon 2' },
		]);
		setModuleTitle(`Module ${moduleId || 1}`);
	}, [fId, moduleId]);

	return (
		<>
			<div className="min-h-screen bg-white pt-24 text-black">
				<Header />
				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-5xl">
									<ProgressStepper current={3} fId={fId} />
									<PageHeader title={moduleTitle || 'Leçons'} actions={<></>} />

									<div className="bg-white p-6 rounded-2xl w-full text-black shadow-sm">
										<div className="mb-4 flex items-center justify-between">
											<button type="button" onClick={addLesson} className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm bg-white hover:bg-gray-50">+ Ajouter une leçon</button>
											<div className="text-sm text-gray-500">{lessons.length} leçon(s)</div>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
											{lessons.map((l) => (
												<div
													key={l.id}
													onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/contenue_lecon?fId=${fId || ''}&moduleId=${moduleId || ''}&lessonId=${l.id}`)}
													className={`relative border border-blue-200 rounded-md p-4 ${l.bg ? 'bg-cover bg-center' : 'bg-white'} shadow-sm hover:shadow-md cursor-pointer min-h-[120px] flex flex-col justify-between min-w-0 overflow-hidden`}
													style={ l.bg ? { backgroundImage: `url(${l.bg})` } : undefined }
												>
													<div className="min-w-0">
														{editingLessonId === l.id ? (
															<input
																autoFocus
																value={l.title}
																onChange={(e) => {
																	const val = e.target.value;
																	setLessons(prev => {
																		const next = prev.map(x => x.id === l.id ? { ...x, title: val } : x);
																		saveLessonsDraft(next);
																		return next;
																	});
																}}
																onBlur={() => setEditingLessonId(null)}
																onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
																className={`w-full text-sm font-semibold focus:outline-none truncate bg-transparent ${l.bg ? 'text-white' : 'text-gray-900'}`}
																/>
														) : (
															<div className={`text-sm font-semibold truncate ${l.bg ? 'text-white' : 'text-gray-900'}`} title={l.title || `Leçon ${l.id}`}>{l.title || `Leçon ${l.id}`}</div>
														)}
														{l.duration && <div className={`${l.bg ? 'text-white/90' : 'text-xs text-gray-500'} mt-3`}>{l.duration} min</div>}
													</div>

													{/* bottom-centered action buttons (photo / edit / delete) */}
													<div className="absolute left-1/2 bottom-3 transform -translate-x-1/2 flex items-center gap-2">
														<input
															id={`photo-input-${l.id}`}
															type="file"
															accept="image/*"
															className="hidden"
															onClick={(e) => e.stopPropagation()}
															onPointerDown={(e) => e.stopPropagation()}
															onChange={(e) => { e.stopPropagation(); handlePhotoChange(e, l.id); }}
														/>
														<button type="button" onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); document.getElementById(`photo-input-${l.id}`)?.click(); }} className="p-2 rounded-full bg-white/90 hover:bg-white shadow">
															<FiCamera className="w-4 h-4 text-gray-700" />
														</button>
														<button type="button" onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setEditingLessonId(l.id); }} className="p-2 rounded-full bg-white/90 hover:bg-white shadow">
															<FiEdit className={`w-4 h-4 ${l.bg ? 'text-gray-700' : 'text-gray-600'}`} />
														</button>
														<button type="button" onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); openDeleteModal(l.id); }} className="p-2 rounded-full bg-white/90 hover:bg-red-50 shadow">
															<FiTrash2 className="w-4 h-4 text-red-600" />
														</button>
													</div>
												</div>
											))}
										</div>

										<div className="mt-6 flex items-center justify-between">
											<div>
												<button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition">Retour</button>
											</div>
											<div>
												<button onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/tarification?page=1${fId?`&fId=${fId}`:''}`)} className="bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">Enregistrer</button>
											</div>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>

			{showDeleteModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black opacity-40" onClick={cancelDelete} />
					<div className="relative bg-white rounded-lg p-6 max-w-sm mx-4 text-black shadow-lg">
						<div className="text-lg font-semibold mb-2">Supprimer la leçon</div>
						<div className="text-sm text-gray-700 mb-4">Voulez-vous vraiment supprimer la leçon "{lessons.find(x => x.id === deleteTargetId)?.title || ''}" ?</div>
						<div className="flex justify-end gap-3">
							<button onClick={cancelDelete} className="px-4 py-2 rounded border border-gray-200">Annuler</button>
							<button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-600 text-white">Supprimer</button>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</>
	);
}
