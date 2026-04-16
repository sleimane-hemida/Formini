"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../../sidebar/sidebar';
import PageHeader from '../../../dash_principale/PageHeader';
import Footer from '../../../../../composant/layout/footer';
import ProgressStepper from '../../../../../composant/common/ProgressStepper';

const Header = dynamic(
	() => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
	{ ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);

export default function GeneralForma() {
	const router = useRouter();
	const params = useSearchParams();
	const fId = params ? params.get('fId') : null;
	
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);

	const [form, setForm] = useState({
		name: '',
		descriptionCourt: '',
		descriptionLong: '',
		language: 'fr',
		niveau: 'debutant',
		categoryId: '',
		subcategoryId: '',
		coverImages: []
	});
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState(null);
	const [errors, setErrors] = useState({});

	// Récupérer les catégories et sous-catégories au montage
	useEffect(() => {
		Promise.all([
			fetch('http://localhost:5000/api/categories').then(res => res.json()),
			fetch('http://localhost:5000/api/subcategories').then(res => res.json())
		])
			.then(([cats, subcats]) => {
				setCategories(cats || []);
				setSubcategories(subcats || []);
			})
			.catch(err => console.error('Erreur lors du chargement des catégories:', err));
	}, []);

	useEffect(() => {
		if (fId) {
			const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			if (!token) {
				console.error('❌ No token found');
				return;
			}

			// Récupérer les données de la formation depuis le backend
			fetch(`http://localhost:5000/api/formations/${fId}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
				.then(res => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json();
				})
				.then(data => {
					console.log('🔍 Formation raw data:', {
						categoryId: data.categoryId,
						subcategoryId: data.subcategoryId,
						Category: data.Category,
						Subcategory: data.subcategory,
						description_longue: data.description_longue,
						niveau: data.niveau
					});
					
					// Gérer les images: si cover_images existe et est un array, l'utiliser; sinon utiliser image
					const images = data.cover_images && Array.isArray(data.cover_images) && data.cover_images.length > 0
						? data.cover_images
						: (data.image ? [data.image] : []);
					
					setForm(prev => ({
						...prev,
						name: data.name || '',
						descriptionCourt: data.description || '',
						descriptionLong: data.description_longue || '',
						language: data.language || 'fr',
						niveau: data.niveau || 'debutant',
						categoryId: data.categoryId || (data.Category?.id || ''),
						subcategoryId: data.subcategoryId || (data.subcategory?.id || ''),
						coverImages: images
					}));
					
					console.log('✅ Form updated:', {
						description_longue: data.description_longue,
						niveau: data.niveau,
						categoryId: data.categoryId || data.Category?.id,
						subcategoryId: data.subcategoryId || data.subcategory?.id
					});
				})
				.catch(err => console.error('❌ Erreur lors du chargement:', err));
		}
	}, [fId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (e) => {
		const categoryId = e.target.value;
		// Récupérer les sous-catégories de la catégorie sélectionnée
		const selectedSubs = subcategories.filter(s => s.categoryId === categoryId);
		const defaultSubId = selectedSubs.length > 0 ? selectedSubs[0].id : '';
		setForm(prev => ({ ...prev, categoryId, subcategoryId: defaultSubId }));
	};

	const validateForm = () => {
		const errs = {};
		if ((form.descriptionCourt || '').length > 70) {
			errs.descriptionCourt = 'La description courte doit contenir au maximum 70 caractères.';
		}
		if ((form.descriptionLong || '').length < 500) {
			errs.descriptionLong = 'La description détaillée doit contenir au moins 500 caractères.';
		}
		return { ok: Object.keys(errs).length === 0, errors: errs };
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const { ok, errors } = validateForm();
		if (!ok) {
			setErrors(errors);
			return;
		}
		setErrors({});
		setSaving(true);
		setMessage(null);
		try {
			const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			if (!token) {
				setMessage('Vous devez être connecté.');
				return;
			}

			// Séparer les images existantes (URLs) des nouvelles (base64)
			const existingImages = form.coverImages.filter(img => !img.startsWith('data:'));
			const newImages = form.coverImages.filter(img => img.startsWith('data:'));
			
			// Pour l'instant, on envoie juste les URLs existantes
			const payload = {
				description: form.descriptionCourt,
				description_longue: form.descriptionLong,
				niveau: form.niveau,
				language: form.language,
				categoryId: form.categoryId,
				subcategoryId: form.subcategoryId,
				cover_images: existingImages.length > 0 ? existingImages : undefined
			};

			console.log('📤 Sending payload:', payload);

			const res = await fetch(`http://localhost:5000/api/formations/${fId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});

			if (!res.ok) {
				const text = await res.text();
				console.error('❌ Backend error response:', text);
				try {
					const data = JSON.parse(text);
					setMessage(data?.error || 'Erreur lors de l\'enregistrement.');
				} catch (e) {
					setMessage('Erreur serveur - vérifiez la console backend');
				}
				return;
			}

			setMessage('✅ Modifications enregistrées avec succès!');
			
			// Redirect to next step after 1 second
			setTimeout(() => {
				router.push(`/dash_formation/formations_formateurs/formation_completer/detail_forma?fId=${fId}`);
			}, 1000);
		} catch (err) {
			console.error('❌ Error:', err);
			setMessage('Erreur réseau lors de l\'enregistrement.');
		} finally {
			setSaving(false);
		}
	};

	useEffect(() => {
		// Ensure a default subcategory exists for the selected category
		if (form.categoryId && subcategories.length > 0 && !form.subcategoryId) {
			const subs = subcategories.filter(s => s.categoryId === form.categoryId);
			if (subs.length > 0) {
				setForm(prev => ({ ...prev, subcategoryId: subs[0].id }));
			}
		}
	}, [form.categoryId, subcategories]);

	const currentSubcategories = subcategories.filter(s => s.categoryId === form.categoryId);

	const handleCoverImagesUpload = async (e) => {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;
		try {
			const promises = files.map(file => new Promise((res, rej) => {
				const reader = new FileReader();
				reader.onload = () => res(reader.result);
				reader.onerror = rej;
				reader.readAsDataURL(file);
			}));
			const images = await Promise.all(promises);
			// Garder les images existantes et ajouter les nouvelles
			setForm(prev => ({ ...prev, coverImages: [...prev.coverImages, ...images].slice(0,5) }));
		} catch (err) {
			console.error('Image read error', err);
		}
	};

	const removeImage = (index) => {
		setForm(prev => ({ ...prev, coverImages: prev.coverImages.filter((_, i) => i !== index) }));
	};

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
								<div className="container mx-auto px-4 py-8 pt-6 max-w-4xl">
									<ProgressStepper current={1} fId={fId} />
									<PageHeader title="Informations générales" actions={<></>} />

									<form onSubmit={handleSave} className="bg-white p-8 rounded-2xl shadow-sm w-full text-black">
										{message && <div className="mb-4 text-sm text-gray-700">{message}</div>}

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-semibold mb-2">Titre</label>
												<input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
											</div>

											<div>
												<label className="block text-sm font-semibold mb-2">Langue</label>
												<select name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
													<option value="en">English</option>
													<option value="fr">Français</option>
													<option value="ar">العربية</option>
												</select>
											</div>

											<div className="md:col-span-2">
												<label className="block text-sm font-semibold mb-2">Description courte</label>
												<textarea name="descriptionCourt" maxLength={70} value={form.descriptionCourt} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
												<div className="text-xs text-gray-500 mt-1">({form.descriptionCourt.length} caractères (maximum 70))</div>
												{errors.descriptionCourt && <div className="text-xs text-red-600 mt-1">{errors.descriptionCourt}</div>}
											</div>

											<div className="md:col-span-2">
												<label className="block text-sm font-semibold mb-2">Description détaillée</label>
												<textarea name="descriptionLong" value={form.descriptionLong} onChange={handleChange} rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Entrez la description complète de la formation..." />
												<div className={`text-xs mt-1 ${form.descriptionLong.length >= 500 ? 'text-green-600' : 'text-red-600'}`}>{form.descriptionLong.length} caractères (minimum 500)</div>
												{errors.descriptionLong && <div className="text-xs text-red-600 mt-1">{errors.descriptionLong}</div>}
											</div>

											<div>
												<label className="block text-sm font-semibold mb-2">Images de couverture</label>
												<input id="coverUpload" type="file" accept="image/*" multiple onChange={handleCoverImagesUpload} className="hidden" />
												<label htmlFor="coverUpload" className="w-full cursor-pointer border-dashed border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center gap-3 hover:border-blue-300 transition-colors focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500">
													<div className="text-2xl">📤</div>
													<div className="text-sm text-gray-600">
														<div className="font-medium">Cliquez pour ajouter des images</div>
														<div className="text-xs text-gray-400">PNG, JPG — max 5 images</div>
													</div>
												</label>
												<div className="flex gap-3 flex-wrap mt-3">
													{form.coverImages.map((img, idx) => (
														<div key={idx} className="relative w-32 h-20 bg-gray-100 rounded overflow-hidden transform hover:scale-105 transition-shadow duration-150 shadow-sm hover:shadow-md">
															<img src={img} alt={`cover-${idx}`} className="w-full h-full object-cover" />
															<button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-red-600 hover:bg-red-50">✕</button>
														</div>
													))}
												</div>
											</div>

											<div>
												<label className="block text-sm font-semibold mb-2">Niveau</label>
												<select name="niveau" value={form.niveau} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
													<option value="debutant">Débutant</option>
													<option value="intermediaire">Intermédiaire</option>
													<option value="avance">Avancé</option>
												</select>
											</div>

											<div>
												<label className="block text-sm font-semibold mb-2">Catégorie</label>
												<select name="categoryId" value={form.categoryId} onChange={handleCategoryChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
													<option value="">Sélectionner une catégorie</option>
													{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
												</select>
											</div>

											<div>
												<label className="block text-sm font-semibold mb-2">Sous-catégorie</label>
												{currentSubcategories.length ? (
													<select name="subcategoryId" value={form.subcategoryId} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
														<option value="">Sélectionner une sous-catégorie</option>
														{currentSubcategories.map((s) => (
															<option key={s.id} value={s.id}>{s.name}</option>
														))}
													</select>
												) : (
													<div className="text-sm text-gray-500">Aucune sous-catégorie</div>
												)}
											</div>
										</div>

										<div className="mt-6 flex items-center justify-between">
											<div>
												<button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-800 transition">Retour</button>
											</div>
											<div>
												<button type="submit" disabled={saving} className="bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
											</div>
										</div>
									</form>
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

