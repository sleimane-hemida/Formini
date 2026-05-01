"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

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
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [form, setForm] = useState({
    name: '',
    descriptionCourt: '',
    descriptionLong: '',
    niveau: 'debutant',
    coverImages: [],
    language: 'fr',
    price: '',
    categoryId: '',
    subcategoryId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Récupérer les catégories au montage du composant
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        // Pré-sélectionner la première catégorie
        if (data.length > 0) {
          setForm(prev => ({ ...prev, categoryId: data[0].id }));
        }
        setLoadingCategories(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des catégories:', err);
        setLoadingCategories(false);
      });
  }, []);

  // Récupérer les sous-catégories quand la catégorie change
  useEffect(() => {
    if (!form.categoryId) {
      setSubcategories([]);
      return;
    }
    
    fetch(`${ process.env.NEXT_PUBLIC_API_URL }/api/subcategories?categoryId=${form.categoryId}`)
      .then(res => res.json())
      .then(data => {
        setSubcategories(data);
        // Réinitialiser la sous-catégorie
        setForm(prev => ({ ...prev, subcategoryId: '' }));
      })
      .catch(err => console.error('Erreur lors du chargement des sous-catégories:', err));
  }, [form.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setForm(prev => ({ ...prev, categoryId, subcategoryId: '' }));
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
    if (!form.categoryId) return 'Veuillez sélectionner une catégorie.';
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
        description_longue: form.descriptionLong,
        niveau: form.niveau,
        image: form.coverImages[0] || null,
        categoryId: form.categoryId,
        subcategoryId: form.subcategoryId || null,
        language: form.language,
        price: form.price || null
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/formations`, {
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

  // Get the newly created formation ID
  const newFormationId = data.formation?.id || data.id;
  console.log('📊 Backend response:', data);
  console.log('✅ Formation créée avec ID:', newFormationId);

  if (!newFormationId) {
    setError('Erreur : ID de formation non reçu du serveur');
    setIsSubmitting(false);
    return;
  }

  setSuccess(true);

  // Redirect to step 1 (general_forma) to complete the formation
  setTimeout(() => {
    const redirectUrl = `/dash_formation/formations_formateurs/formation_completer/general_forma?fId=${encodeURIComponent(newFormationId)}`;
    console.log('🔄 Redirection vers:', redirectUrl);
    router.push(redirectUrl);
  }, 900);
} catch (err) {
  console.error(err);
  setError('Erreur réseau.');
} finally {
  setIsSubmitting(false);
}
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
              <div className="container mx-auto px-4 py-8 pt-6 max-w-6xl">
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

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Description détaillée</label>
                      <textarea name="descriptionLong" value={form.descriptionLong} onChange={handleChange} rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Entrez la description complète de la formation..." />
                      <div className={`text-xs mt-1 ${form.descriptionLong.length >= 500 ? 'text-green-600' : 'text-red-600'}`}>{form.descriptionLong.length} caractères (minimum 500)</div>
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
                      <label className="block text-sm font-semibold mb-2">Niveau</label>
                      <select name="niveau" value={form.niveau} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm">
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="avance">Avancé</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Catégorie</label>
                      <select value={form.categoryId} onChange={handleCategoryChange} disabled={loadingCategories} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed">
                        {loadingCategories ? (
                          <option>Chargement...</option>
                        ) : (
                          categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Sous-catégorie</label>
                      <select name="subcategoryId" value={form.subcategoryId} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm">
                        <option value="">-- Aucune --</option>
                        {subcategories.map(sub => (
                          <option key={sub.id} value={sub.id}>{sub.name}</option>
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
