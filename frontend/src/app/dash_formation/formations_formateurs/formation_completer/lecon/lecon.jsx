"use client";
import React, { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useAutoSave } from '../../../../../hooks/useAutoSave';
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
	const [hasChanges, setHasChanges] = useState(false);
	const [saving, setSaving] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	const autoSaveTimer = useAutoSave(hasChanges, () => handleSave(), 30);

	const openDeleteModal = (id) => {
		setDeleteTargetId(id);
		setShowDeleteModal(true);
	};

	const cancelDelete = () => {
		setDeleteTargetId(null);
		setShowDeleteModal(false);
	};

	const confirmDelete = async () => {
		const id = deleteTargetId;
		if (!id) {
			cancelDelete();
			return;
		}

		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (token && id) {
			try {
				await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${id}`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
			} catch (err) {
				console.error('❌ Error deleting lesson:', err);
			}
		}

		setLessons(prev => {
			const next = prev.filter(x => x.id !== id);
			saveLessonsDraft(next);
			return next;
		});
		setHasChanges(true);
		setShowDeleteModal(false);
		setDeleteTargetId(null);
		if (editingLessonId === id) setEditingLessonId(null);
	};

	const addLesson = async () => {
		if (isAdding) return;
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			alert('Vous devez être connecté.');
			return;
		}

		setIsAdding(true);
		try {
			const nextOrder = lessons.length + 1;
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					moduleId: moduleId,
					titre: `Leçon ${nextOrder}`,
					ordre: nextOrder
				})
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const newLesson = await response.json();
			console.log('✅ Lesson created:', newLesson);

			setLessons(prev => [...prev, newLesson]);
			setEditingLessonId(newLesson.id);
		} catch (err) {
			console.error('❌ Error creating lesson:', err);
			alert('Erreur lors de la création de la leçon');
		} finally {
			setIsAdding(false);
		}
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

	const handlePhotoChange = (e, lessonId) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			alert('Vous devez être connecté.');
			return;
		}

		const reader = new FileReader();
		reader.onload = async () => {
			const dataUrl = reader.result;

			// Show preview immediately
			setLessons(prev => {
				const next = prev.map(x => x.id === lessonId ? { ...x, bg: dataUrl } : x);
				return next;
			});

			// Upload to backend
			try {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('lessonId', lessonId);

				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lesson-cover`, {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${token}`
					},
					body: formData
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				console.log('✅ Photo saved:', result);

				// Update with actual server URL
				setLessons(prev => {
					const next = prev.map(x => x.id === lessonId ? { ...x, bg: `${process.env.NEXT_PUBLIC_API_URL}${result.url}` } : x);
					return next;
				});
			} catch (err) {
				console.error('❌ Error uploading photo:', err);
				alert('Erreur lors de l\'upload de la photo');
			}
		};
		reader.readAsDataURL(file);
		e.target.value = '';
	};

	const handleSave = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		setSaving(true);
		try {
			const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			if (token) {
				for (const l of lessons) {
					if (l.title || l.titre) {
						await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${l.id}`, {
							method: 'PUT',
							headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
							body: JSON.stringify({ titre: l.title || l.titre })
						}).catch(() => { });
					}
				}
			}
			setHasChanges(false);
		} catch (e) {
			console.error(e);
		} finally {
			setSaving(false);
		}
	};

	useEffect(() => {
		if (!moduleId) return;

		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			console.error('❌ No token found');
			return;
		}

		console.log('📥 Loading lessons for module:', moduleId);

		// Load lessons from backend
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules/${encodeURIComponent(moduleId)}/lessons`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
			.then(res => {
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				return res.json();
			})
			.then(data => {
				console.log('✅ Lessons loaded:', data);
				const lessonsArr = Array.isArray(data) ? data : [];

				// Map lessons and set cover images from backend
				const mappedLessons = lessonsArr.map(lesson => ({
					...lesson,
					bg: lesson.image_couverture ? (lesson.image_couverture.startsWith('http') ? lesson.image_couverture : `${process.env.NEXT_PUBLIC_API_URL}${lesson.image_couverture}`) : undefined
				}));

				setLessons(mappedLessons);
				setHasChanges(false);

				// Fetch module title directly from module endpoint
				fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/modules/${encodeURIComponent(moduleId)}`, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
					.then(res => res.ok ? res.json() : null)
					.then(data => {
						if (data) {
							setModuleTitle(data.titre || data.title || data.name || '');
						}
					})
					.catch(err => console.error('Error loading module title:', err));
			})
			.catch(err => {
				console.error('❌ Error loading lessons:', err);
				setLessons([]);
			});
	}, [fId, moduleId]);

	return (
		<>
			<div className="min-h-screen bg-white pt-24 text-black">
				<Header />
				<div className="flex w-full">
					<div className="pl-[17px] sm:pl-[17px]">
						<Sidebar />
					</div>

					<div className="flex-1 min-w-0">
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<main>
								<div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
									<ProgressStepper current={3} fId={fId} />
									<PageHeader title={moduleTitle || 'Leçons'} actions={
										hasChanges ? (
											<div className="flex items-center gap-3">
												{autoSaveTimer !== null && autoSaveTimer > 0 && (
													<span className="text-sm font-medium text-gray-500 animate-pulse">
														Enregistrement automatique dans {autoSaveTimer} s
													</span>
												)}
												<button onClick={handleSave} disabled={saving} className={`flex items-center justify-center w-10 h-10 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white rounded-full transition-all shadow-md active:scale-95 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`} title="Enregistrer les modifications">
													<FiSave className="w-5 h-5" />
												</button>
											</div>
										) : <></>
									} />

									<div className="bg-white p-4 sm:p-6 rounded-2xl w-full text-black shadow-sm overflow-hidden">
										<div className="mb-4 flex items-center justify-between">
											<button type="button" onClick={addLesson} disabled={isAdding} className={`inline-flex items-center gap-2 px-3 py-2 border rounded text-sm bg-white hover:bg-gray-50 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}>
												{isAdding ? 'Ajout...' : '+ Ajouter une leçon'}
											</button>
											<div className="text-sm text-gray-500">{lessons.length} leçon(s)</div>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
											{lessons.map((l) => (
												<div
													key={l.id}
													onClick={() => router.push(`/dash_formation/formations_formateurs/formation_completer/contenue_lecon?fId=${fId || ''}&moduleId=${moduleId || ''}&lessonId=${l.id}`)}
													className={`relative border border-blue-200 rounded-md p-4 ${l.bg ? 'bg-cover bg-center' : 'bg-white'} shadow-sm hover:shadow-md cursor-pointer min-h-[120px] flex flex-col justify-between min-w-0 overflow-hidden`}
													style={l.bg ? { backgroundImage: `url(${l.bg})` } : undefined}
												>
													<div className="min-w-0">
														{editingLessonId === l.id ? (
															<input
																autoFocus
																value={l.titre || ''}
																onChange={(e) => {
																	const val = e.target.value;
																	setLessons(prev => {
																		const next = prev.map(x => x.id === l.id ? { ...x, titre: val } : x);
																		saveLessonsDraft(next);
																		return next;
																	});
																	setHasChanges(true);
																}}
																onBlur={() => setEditingLessonId(null)}
																onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
																className={`w-full text-sm font-semibold focus:outline-none truncate bg-transparent ${l.bg ? 'text-white' : 'text-gray-900'}`}
															/>
														) : (
															<div className={`text-sm font-semibold truncate ${l.bg ? 'text-white' : 'text-gray-900'}`} title={l.titre || `Leçon ${lessons.indexOf(l) + 1}`}>{l.titre || `Leçon ${lessons.indexOf(l) + 1}`}</div>
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

										<div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
											<button type="button" onClick={() => router.back()} className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:text-gray-800 transition text-center">Retour aux modules</button>
											<div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
												<button onClick={() => router.back()} disabled={saving} className="w-full sm:w-auto bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-lg transition-colors font-bold text-center">Terminer</button>
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
