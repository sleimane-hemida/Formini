"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { categories } from '../../../../composant/layout/categorie';

// Dynamic Header import with fallback (match pattern used in profile.jsx / liste_forma.jsx)
const Header = dynamic(
  () =>
    import("../../../../composant/layout/header")
      .then((mod) => mod.default || mod)
      .catch((err) => {
        console.error("Failed to load Header:", err);
        return () => (
          <div className="w-full bg-red-100 text-red-700 p-4">Header indisponible</div>
        );
      }),
  { ssr: false, loading: () => <div className="w-full bg-gray-200 p-4">Chargement header...</div> }
);
import Sidebar from '../../sidebar/sidebar';
import PageHeader from '../../dash_principale/PageHeader';
import Footer from '../../../../composant/layout/footer';

export default function NewFormation() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    descriptionCourt: '',
    coverImages: [],
    language: 'fr',
    price: '',
    categoryKey: (categories && categories.length) ? categories[0].key : '',
    subcategory: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!form.categoryKey) return;
    const cat = categories.find(c => c.key === form.categoryKey);
    const subs = cat?.subcategories || [];
    if (subs.length && !subs.includes(form.subcategory)) {
      setForm(prev => ({ ...prev, subcategory: subs[0] }));
    }
    if (!subs.length && form.subcategory) {
      setForm(prev => ({ ...prev, subcategory: '' }));
    }
  }, [form.categoryKey]);

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
      setForm(prev => ({ ...prev, coverImages: [...prev.coverImages, ...images] }));
    } catch (err) {
      console.error('Image read error', err);
    }
  };

  const removeImage = (index) => {
    setForm(prev => ({ ...prev, coverImages: prev.coverImages.filter((_, i) => i !== index) }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Le titre est requis.';
    if (form.name.length > 40) return 'Le titre doit contenir au maximum 40 caractères.';
    if (!form.descriptionCourt.trim()) return 'La description courte est requise.';
    if (form.descriptionCourt.length > 70) return 'La description courte doit contenir au maximum 70 caractères.';
    if (!form.categoryKey) return 'Veuillez sélectionner une catégorie.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return setError('Vous devez être connecté.');

    setIsSubmitting(true);
    try {
      const payload = {
        name: form.name,
        description: form.descriptionCourt,
        image: form.coverImages[0] || null,
        images: form.coverImages,
        language: form.language,
        price: form.price || null,
        categoryKey: form.categoryKey,
        subcategory: form.subcategory || null
      };

      const res = await fetch('http://localhost:5000/api/formations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error || data?.message || 'Erreur lors de la création.';
        setError(msg);
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/dash_formation/formations_formateurs/formations_liste'), 900);
    } catch (err) {
      console.error(err);
      setError('Erreur réseau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSubcategories = categories.find(c => c.key === form.categoryKey)?.subcategories || [];

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
                  <PageHeader title="Ajouter une formation" actions={(<></>)} />

                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full text-black">
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          {success && <div className="mb-4 text-sm text-green-600">Formation créée avec succès.</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Titre <span className="text-gray-400 text-xs">({form.name.length}/40)</span></label>
              <input name="name" maxLength={40} value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm" placeholder="Titre de la formation" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Langue</label>
              <select name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm">
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Description courte <span className="text-gray-400 text-xs">({form.descriptionCourt.length}/70)</span></label>
              <textarea name="descriptionCourt" maxLength={70} value={form.descriptionCourt} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm resize-none" placeholder="Courte description (70 caractères max)" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Images de couverture</label>
              <input id="coverUpload" type="file" accept="image/*" multiple onChange={handleCoverImagesUpload} className="hidden" />
              <label htmlFor="coverUpload" className="w-full block cursor-pointer border-dashed border-2 border-gray-200 hover:border-blue-300 transition-colors rounded-lg p-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">📤</span>
                  <div>
                    <div className="font-medium">Cliquez pour ajouter des images</div>
                    <div className="text-xs text-gray-400">ou glissez-déposez ici (PNG, JPG). Max 5 images.</div>
                  </div>
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
              <label className="block text-sm font-semibold mb-2">Prix</label>
              <input name="price" value={form.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm" placeholder="ex: 899 MRU" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Catégorie</label>
              <select value={form.categoryKey} onChange={handleCategoryChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm">
                {categories.map(cat => (
                  <option key={cat.key} value={cat.key}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Sous-catégorie</label>
              <select name="subcategory" value={form.subcategory} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm">
                <option value="">-- Aucune --</option>
                {currentSubcategories.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <button type="button" onClick={() => router.push('/dash_formation/formations_formateurs/formations_liste')} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">Annuler</button>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting} className="bg-[#0C8CE9] hover:bg-[#096bb3] active:scale-95 transform text-white px-5 py-2 rounded-lg shadow hover:shadow-md transition">
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer la formation'}
              </button>
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
