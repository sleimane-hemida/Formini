"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../../sidebar/sidebar';
import PageHeader from '../../../dash_principale/PageHeader';
import Footer from '../../../../../composant/layout/footer';
import { categories } from '../../../../../composant/layout/categorie';
import ProgressStepper from '../../../../../composant/common/ProgressStepper';

const Header = dynamic(
	() => import("../../../../../composant/layout/header").then((mod) => mod.default || mod),
	{ ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);

export default function GeneralForma() {
	const router = useRouter();
	const params = useSearchParams();
	const fId = params ? params.get('fId') : null;

	const [form, setForm] = useState({
		name: '',
		descriptionCourt: '',
		descriptionLong: '',
		language: 'fr',
		niveau: 'debutant',
		categoryKey: (categories && categories.length) ? categories[0].key : '',
		subcategory: '',
		coverImages: []
	});
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState(null);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (fId) {
			// Placeholder: fetch real data from backend here
			setForm(prev => ({ ...prev, name: `Formation ${fId}`, descriptionCourt: 'Description courte (à remplacer)' }));
		}
	}, [fId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (e) => {
		const key = e.target.value;
		const cat = categories.find(c => c.key === key);
		const defaultSub = cat?.subcategories?.length ? cat.subcategories[0] : '';
		setForm(prev => ({ ...prev, categoryKey: key, subcategory: defaultSub }));
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
			// TODO: persist to backend
			await new Promise(res => setTimeout(res, 600));
			setMessage('Modifications enregistrées (local).');
		} catch (err) {
			setMessage('Erreur lors de l’enregistrement.');
		} finally {
			setSaving(false);
		}
	};

	useEffect(() => {
		// Ensure a default subcategory exists for the selected category
		const cat = categories.find(c => c.key === form.categoryKey);
		const subs = cat?.subcategories || [];
		if (subs.length && !form.subcategory) {
			setForm(prev => ({ ...prev, subcategory: subs[0] }));
		} else if (!subs.length && form.subcategory) {
			setForm(prev => ({ ...prev, subcategory: '' }));
		}
	}, [form.categoryKey, form.subcategory]);

	const currentSubcategories = categories.find(c => c.key === form.categoryKey)?.subcategories || [];

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
												<select name="categoryKey" value={form.categoryKey} onChange={handleCategoryChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
													{categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
												</select>
											</div>

											<div>
												<label className="block text-sm font-semibold mb-2">Sous-catégorie</label>
												{currentSubcategories.length ? (
													<select name="subcategory" value={form.subcategory} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
														{currentSubcategories.map((s, i) => (
															<option key={i} value={s}>{s}</option>
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
												<button type="submit" disabled={saving} className="bg-[#0C8CE9] hover:bg-[#096bb3] text-white px-5 py-2 rounded-lg">{saving ? 'Enregistrement...' : 'Suivant'}</button>
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

