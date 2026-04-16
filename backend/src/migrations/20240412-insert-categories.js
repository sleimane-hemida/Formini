const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('📥 Insertion des catégories et sous-catégories...');

    const categories = [
      { id: uuidv4(), name: 'Développement & Tech', description: 'Apprenez à programmer et maîtriser les technologies' },
      { id: uuidv4(), name: 'Design & Créativité', description: 'Développez vos compétences en création visuelle' },
      { id: uuidv4(), name: 'Création d\'entreprise & Startup', description: 'Lancez et gérez votre propre business' },
      { id: uuidv4(), name: 'Marketing & Communication', description: 'Maîtrisez les stratégies de marketing moderne' },
      { id: uuidv4(), name: 'Finance & Investissement', description: 'Gérez vos finances et investissements' },
      { id: uuidv4(), name: 'Langues', description: 'Apprenez de nouvelles langues' },
      { id: uuidv4(), name: 'Développement personnel', description: 'Améliorez vos compétences personnelles' },
      { id: uuidv4(), name: 'Éducation & Soutien scolaire', description: 'Réussissez votre parcours scolaire' },
      { id: uuidv4(), name: 'Santé & Bien-être', description: 'Prenez soin de votre santé et bien-être' },
      { id: uuidv4(), name: 'Métiers pratiques', description: 'Apprenez des métiers pratiques et artisanaux' },
      { id: uuidv4(), name: 'Droit & Juridique', description: 'Comprenez les aspects juridiques' },
      { id: uuidv4(), name: 'Médias & Création de contenu', description: 'Créez et produisez du contenu' }
    ];

    await queryInterface.bulkInsert('Categories', categories);

    const categoryMap = {
      'Développement & Tech': categories[0].id,
      'Design & Créativité': categories[1].id,
      'Création d\'entreprise & Startup': categories[2].id,
      'Marketing & Communication': categories[3].id,
      'Finance & Investissement': categories[4].id,
      'Langues': categories[5].id,
      'Développement personnel': categories[6].id,
      'Éducation & Soutien scolaire': categories[7].id,
      'Santé & Bien-être': categories[8].id,
      'Métiers pratiques': categories[9].id,
      'Droit & Juridique': categories[10].id,
      'Médias & Création de contenu': categories[11].id
    };

    const subcategories = [
      // Développement & Tech
      { id: uuidv4(), name: 'Développement web', categoryId: categoryMap['Développement & Tech'] },
      { id: uuidv4(), name: 'Développement mobile', categoryId: categoryMap['Développement & Tech'] },
      { id: uuidv4(), name: 'Intelligence artificielle & Machine learning', categoryId: categoryMap['Développement & Tech'] },
      { id: uuidv4(), name: 'Cybersécurité & Ethical hacking', categoryId: categoryMap['Développement & Tech'] },
      { id: uuidv4(), name: 'Bases de données', categoryId: categoryMap['Développement & Tech'] },
      { id: uuidv4(), name: 'DevOps & Cloud', categoryId: categoryMap['Développement & Tech'] },
      { id: uuidv4(), name: 'Programmation générale', categoryId: categoryMap['Développement & Tech'] },
      
      // Design & Créativité
      { id: uuidv4(), name: 'UI/UX Design', categoryId: categoryMap['Design & Créativité'] },
      { id: uuidv4(), name: 'Graphic Design', categoryId: categoryMap['Design & Créativité'] },
      { id: uuidv4(), name: 'Montage vidéo', categoryId: categoryMap['Design & Créativité'] },
      { id: uuidv4(), name: 'Motion design & Animation', categoryId: categoryMap['Design & Créativité'] },
      { id: uuidv4(), name: 'Photographie & Retouche', categoryId: categoryMap['Design & Créativité'] },
      { id: uuidv4(), name: 'Modélisation 3D', categoryId: categoryMap['Design & Créativité'] },
      { id: uuidv4(), name: 'Illustration digitale', categoryId: categoryMap['Design & Créativité'] },
      
      // Création d'entreprise & Startup
      { id: uuidv4(), name: 'Gestion de projet', categoryId: categoryMap['Création d\'entreprise & Startup'] },
      { id: uuidv4(), name: 'Leadership & Management', categoryId: categoryMap['Création d\'entreprise & Startup'] },
      { id: uuidv4(), name: 'E-commerce & Vente en ligne', categoryId: categoryMap['Création d\'entreprise & Startup'] },
      { id: uuidv4(), name: 'Rédaction de business plan', categoryId: categoryMap['Création d\'entreprise & Startup'] },
      { id: uuidv4(), name: 'Comptabilité & Gestion d\'entreprise', categoryId: categoryMap['Création d\'entreprise & Startup'] },
      { id: uuidv4(), name: 'Import / Export & Commerce international', categoryId: categoryMap['Création d\'entreprise & Startup'] },
      
      // Marketing & Communication
      { id: uuidv4(), name: 'Marketing digital', categoryId: categoryMap['Marketing & Communication'] },
      { id: uuidv4(), name: 'Réseaux sociaux', categoryId: categoryMap['Marketing & Communication'] },
      { id: uuidv4(), name: 'SEO & Référencement naturel', categoryId: categoryMap['Marketing & Communication'] },
      { id: uuidv4(), name: 'Publicité en ligne', categoryId: categoryMap['Marketing & Communication'] },
      { id: uuidv4(), name: 'Email marketing & Automation', categoryId: categoryMap['Marketing & Communication'] },
      { id: uuidv4(), name: 'Copywriting & Rédaction web', categoryId: categoryMap['Marketing & Communication'] },
      { id: uuidv4(), name: 'Community management', categoryId: categoryMap['Marketing & Communication'] },
      
      // Finance & Investissement
      { id: uuidv4(), name: 'Finance personnelle & Épargne', categoryId: categoryMap['Finance & Investissement'] },
      { id: uuidv4(), name: 'Comptabilité pratique', categoryId: categoryMap['Finance & Investissement'] },
      { id: uuidv4(), name: 'Bourse & Trading', categoryId: categoryMap['Finance & Investissement'] },
      { id: uuidv4(), name: 'Cryptomonnaies & Blockchain', categoryId: categoryMap['Finance & Investissement'] },
      { id: uuidv4(), name: 'Gestion budgétaire', categoryId: categoryMap['Finance & Investissement'] },
      { id: uuidv4(), name: 'Fiscalité & Impôts', categoryId: categoryMap['Finance & Investissement'] },
      { id: uuidv4(), name: 'Investissement immobilier', categoryId: categoryMap['Finance & Investissement'] },
      
      // Langues
      { id: uuidv4(), name: 'Anglais', categoryId: categoryMap['Langues'] },
      { id: uuidv4(), name: 'Français', categoryId: categoryMap['Langues'] },
      { id: uuidv4(), name: 'Arabe', categoryId: categoryMap['Langues'] },
      { id: uuidv4(), name: 'Espagnol', categoryId: categoryMap['Langues'] },
      { id: uuidv4(), name: 'Chinois mandarin', categoryId: categoryMap['Langues'] },
      { id: uuidv4(), name: 'Allemand', categoryId: categoryMap['Langues'] },
      { id: uuidv4(), name: 'Autres langues', categoryId: categoryMap['Langues'] },
      
      // Développement personnel
      { id: uuidv4(), name: 'Productivité & Organisation', categoryId: categoryMap['Développement personnel'] },
      { id: uuidv4(), name: 'Prise de parole en public', categoryId: categoryMap['Développement personnel'] },
      { id: uuidv4(), name: 'Gestion du stress & Émotions', categoryId: categoryMap['Développement personnel'] },
      { id: uuidv4(), name: 'Confiance en soi & Motivation', categoryId: categoryMap['Développement personnel'] },
      { id: uuidv4(), name: 'Mémoire & Techniques d\'apprentissage', categoryId: categoryMap['Développement personnel'] },
      { id: uuidv4(), name: 'Méditation & Pleine conscience', categoryId: categoryMap['Développement personnel'] },
      { id: uuidv4(), name: 'Relations interpersonnelles', categoryId: categoryMap['Développement personnel'] },
      
      // Éducation & Soutien scolaire
      { id: uuidv4(), name: 'Mathématiques', categoryId: categoryMap['Éducation & Soutien scolaire'] },
      { id: uuidv4(), name: 'Sciences', categoryId: categoryMap['Éducation & Soutien scolaire'] },
      { id: uuidv4(), name: 'Français & Littérature', categoryId: categoryMap['Éducation & Soutien scolaire'] },
      { id: uuidv4(), name: 'Histoire & Géographie', categoryId: categoryMap['Éducation & Soutien scolaire'] },
      { id: uuidv4(), name: 'Préparation aux examens', categoryId: categoryMap['Éducation & Soutien scolaire'] },
      { id: uuidv4(), name: 'Méthodes d\'apprentissage & Prise de notes', categoryId: categoryMap['Éducation & Soutien scolaire'] },
      
      // Santé & Bien-être
      { id: uuidv4(), name: 'Nutrition & Alimentation saine', categoryId: categoryMap['Santé & Bien-être'] },
      { id: uuidv4(), name: 'Fitness & Musculation', categoryId: categoryMap['Santé & Bien-être'] },
      { id: uuidv4(), name: 'Yoga & Stretching', categoryId: categoryMap['Santé & Bien-être'] },
      { id: uuidv4(), name: 'Psychologie & Santé mentale', categoryId: categoryMap['Santé & Bien-être'] },
      { id: uuidv4(), name: 'Premiers secours & Urgences', categoryId: categoryMap['Santé & Bien-être'] },
      { id: uuidv4(), name: 'Médecine naturelle & Plantes', categoryId: categoryMap['Santé & Bien-être'] },
      
      // Métiers pratiques
      { id: uuidv4(), name: 'Électricité & Installations', categoryId: categoryMap['Métiers pratiques'] },
      { id: uuidv4(), name: 'Plomberie & Sanitaire', categoryId: categoryMap['Métiers pratiques'] },
      { id: uuidv4(), name: 'Menuiserie & Ébénisterie', categoryId: categoryMap['Métiers pratiques'] },
      { id: uuidv4(), name: 'Couture, Mode & Broderie', categoryId: categoryMap['Métiers pratiques'] },
      { id: uuidv4(), name: 'Cuisine & Pâtisserie', categoryId: categoryMap['Métiers pratiques'] },
      { id: uuidv4(), name: 'Agriculture & Élevage', categoryId: categoryMap['Métiers pratiques'] },
      { id: uuidv4(), name: 'Mécanique automobile', categoryId: categoryMap['Métiers pratiques'] },
      
      // Droit & Juridique
      { id: uuidv4(), name: 'Droit des affaires', categoryId: categoryMap['Droit & Juridique'] },
      { id: uuidv4(), name: 'Droit du travail', categoryId: categoryMap['Droit & Juridique'] },
      { id: uuidv4(), name: 'Droit civil & Famille', categoryId: categoryMap['Droit & Juridique'] },
      { id: uuidv4(), name: 'Rédaction de contrats', categoryId: categoryMap['Droit & Juridique'] },
      { id: uuidv4(), name: 'Propriété intellectuelle', categoryId: categoryMap['Droit & Juridique'] },
      
      // Médias & Création de contenu
      { id: uuidv4(), name: 'Création de contenu YouTube', categoryId: categoryMap['Médias & Création de contenu'] },
      { id: uuidv4(), name: 'Podcasting', categoryId: categoryMap['Médias & Création de contenu'] },
      { id: uuidv4(), name: 'Journalisme & Rédaction', categoryId: categoryMap['Médias & Création de contenu'] },
      { id: uuidv4(), name: 'Radio & Audio', categoryId: categoryMap['Médias & Création de contenu'] },
      { id: uuidv4(), name: 'Relations publiques & Communication', categoryId: categoryMap['Médias & Création de contenu'] }
    ];

    await queryInterface.bulkInsert('Subcategories', subcategories);

    console.log('✅ 12 catégories insérées');
    console.log('✅ 92 sous-catégories insérées');
    console.log('✨ Insertion complète!');
  },

  async down(queryInterface, Sequelize) {
    console.log('⚠️  Rollback - suppression des catégories...');
    await queryInterface.sequelize.query('DELETE FROM "Subcategories"');
    await queryInterface.sequelize.query('DELETE FROM "Categories"');
  }
};
