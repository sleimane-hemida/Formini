const db = require('./src/models');
const { User, Category, Subcategory } = db;

(async () => {
  try {
    console.log('🌱 Seeders: Initialisation des données...');

    // Créer l'utilisateur formateur
    const formateur = await User.create({
      name: 'Formateur',
      email: 'formateur@gmail.com',
      password: 'password123', // dans un vrai projet, hasher le mot de passe
      role: 'formateur'
    });
    console.log('✅ Formateur créé:', formateur.id);

    // Créer les catégories
    const categories = await Category.bulkCreate([
      { name: 'Développement Web', description: 'Apprenez le web' },
      { name: 'Data Science', description: 'Analysez les données' },
      { name: 'Mobile', description: 'Développement mobile' },
      { name: 'DevOps', description: 'Infrastructure et déploiement' }
    ]);
    console.log('✅ Catégories créées:', categories.length);

    // Créer les sous-catégories
    const subcategories = await Subcategory.bulkCreate([
      { name: 'React', description: 'Framework JavaScript', categoryId: categories[0].id },
      { name: 'Vue.js', description: 'Framework JavaScript progressif', categoryId: categories[0].id },
      { name: 'Python', description: 'Langage de programmation', categoryId: categories[1].id },
      { name: 'Machine Learning', description: 'Apprentissage automatique', categoryId: categories[1].id },
      { name: 'Flutter', description: 'Framework mobile cross-platform', categoryId: categories[2].id },
      { name: 'Docker', description: 'Containerisation', categoryId: categories[3].id }
    ]);
    console.log('✅ Sous-catégories créées:', subcategories.length);

    console.log('\n✅ Seeds terminés!');
    console.log('\n📊 IDs créés:');
    console.log('- Formateur ID:', formateur.id);
    console.log('- Category 1 ID (Web):', categories[0].id);
    console.log('- Subcategory 1 ID (React):', subcategories[0].id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
})();
