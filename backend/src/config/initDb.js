// const db = require('../models');
// const createOrdersTable = require('../migrations/create-orders-table');

// async function initializeDatabase() {
//   try {
//     await db.sequelize.authenticate();
//     console.log('✅ PostgreSQL connected successfully');
    
//     // Create Orders table if it doesn't exist
//     await createOrdersTable();

//     // Try to sync with alter first
//     // try {
//     //   await db.sequelize.sync({ alter: true });
//     //   console.log('✅ Database synced (alter mode)');
//     // } catch (alterError) {
//     //   // If alter fails due to complex types, force recreate
//     //   // console.warn('⚠️ Alter failed, forcing recreate for dev...');
//     //   await db.sequelize.sync({ force: true });
//     //   console.log('✅ Database synced (force mode)');
//     // }

//     // Seed default categories if empty
//     const categoryCount = await db.Category.count();
//     if (categoryCount === 0) {
//       console.log('📝 Seeding 12 categories and 92 subcategories...');
      
//       const categories = await db.Category.bulkCreate([
//         { name: 'Développement & Tech', description: 'Apprenez à programmer et maîtriser les technologies' },
//         { name: 'Design & Créativité', description: 'Développez vos compétences en création visuelle' },
//         { name: 'Création d\'entreprise & Startup', description: 'Lancez et gérez votre propre business' },
//         { name: 'Marketing & Communication', description: 'Maîtrisez les stratégies de marketing moderne' },
//         { name: 'Finance & Investissement', description: 'Gérez vos finances et investissements' },
//         { name: 'Langues', description: 'Apprenez de nouvelles langues' },
//         { name: 'Développement personnel', description: 'Améliorez vos compétences personnelles' },
//         { name: 'Éducation & Soutien scolaire', description: 'Réussissez votre parcours scolaire' },
//         { name: 'Santé & Bien-être', description: 'Prenez soin de votre santé et bien-être' },
//         { name: 'Métiers pratiques', description: 'Apprenez des métiers pratiques et artisanaux' },
//         { name: 'Droit & Juridique', description: 'Comprenez les aspects juridiques' },
//         { name: 'Médias & Création de contenu', description: 'Créez et produisez du contenu' }
//       ]);

//       const categoryMap = {
//         'Développement & Tech': categories[0].id,
//         'Design & Créativité': categories[1].id,
//         'Création d\'entreprise & Startup': categories[2].id,
//         'Marketing & Communication': categories[3].id,
//         'Finance & Investissement': categories[4].id,
//         'Langues': categories[5].id,
//         'Développement personnel': categories[6].id,
//         'Éducation & Soutien scolaire': categories[7].id,
//         'Santé & Bien-être': categories[8].id,
//         'Métiers pratiques': categories[9].id,
//         'Droit & Juridique': categories[10].id,
//         'Médias & Création de contenu': categories[11].id
//       };

//       const subcategories = [
//         // Développement & Tech
//         { name: 'Développement web', categoryId: categoryMap['Développement & Tech'] },
//         { name: 'Développement mobile', categoryId: categoryMap['Développement & Tech'] },
//         { name: 'Intelligence artificielle & Machine learning', categoryId: categoryMap['Développement & Tech'] },
//         { name: 'Cybersécurité & Ethical hacking', categoryId: categoryMap['Développement & Tech'] },
//         { name: 'Bases de données', categoryId: categoryMap['Développement & Tech'] },
//         { name: 'DevOps & Cloud', categoryId: categoryMap['Développement & Tech'] },
//         { name: 'Programmation générale', categoryId: categoryMap['Développement & Tech'] },
//         // Design & Créativité
//         { name: 'UI/UX Design', categoryId: categoryMap['Design & Créativité'] },
//         { name: 'Graphic Design', categoryId: categoryMap['Design & Créativité'] },
//         { name: 'Montage vidéo', categoryId: categoryMap['Design & Créativité'] },
//         { name: 'Motion design & Animation', categoryId: categoryMap['Design & Créativité'] },
//         { name: 'Photographie & Retouche', categoryId: categoryMap['Design & Créativité'] },
//         { name: 'Modélisation 3D', categoryId: categoryMap['Design & Créativité'] },
//         { name: 'Illustration digitale', categoryId: categoryMap['Design & Créativité'] },
//         // Création d'entreprise & Startup
//         { name: 'Gestion de projet', categoryId: categoryMap['Création d\'entreprise & Startup'] },
//         { name: 'Leadership & Management', categoryId: categoryMap['Création d\'entreprise & Startup'] },
//         { name: 'E-commerce & Vente en ligne', categoryId: categoryMap['Création d\'entreprise & Startup'] },
//         { name: 'Rédaction de business plan', categoryId: categoryMap['Création d\'entreprise & Startup'] },
//         { name: 'Comptabilité & Gestion d\'entreprise', categoryId: categoryMap['Création d\'entreprise & Startup'] },
//         { name: 'Import / Export & Commerce international', categoryId: categoryMap['Création d\'entreprise & Startup'] },
//         // Marketing & Communication
//         { name: 'Marketing digital', categoryId: categoryMap['Marketing & Communication'] },
//         { name: 'Réseaux sociaux', categoryId: categoryMap['Marketing & Communication'] },
//         { name: 'SEO & Référencement naturel', categoryId: categoryMap['Marketing & Communication'] },
//         { name: 'Publicité en ligne', categoryId: categoryMap['Marketing & Communication'] },
//         { name: 'Email marketing & Automation', categoryId: categoryMap['Marketing & Communication'] },
//         { name: 'Copywriting & Rédaction web', categoryId: categoryMap['Marketing & Communication'] },
//         { name: 'Community management', categoryId: categoryMap['Marketing & Communication'] },
//         // Finance & Investissement
//         { name: 'Finance personnelle & Épargne', categoryId: categoryMap['Finance & Investissement'] },
//         { name: 'Comptabilité pratique', categoryId: categoryMap['Finance & Investissement'] },
//         { name: 'Bourse & Trading', categoryId: categoryMap['Finance & Investissement'] },
//         { name: 'Cryptomonnaies & Blockchain', categoryId: categoryMap['Finance & Investissement'] },
//         { name: 'Gestion budgétaire', categoryId: categoryMap['Finance & Investissement'] },
//         { name: 'Fiscalité & Impôts', categoryId: categoryMap['Finance & Investissement'] },
//         { name: 'Investissement immobilier', categoryId: categoryMap['Finance & Investissement'] },
//         // Langues
//         { name: 'Anglais', categoryId: categoryMap['Langues'] },
//         { name: 'Français', categoryId: categoryMap['Langues'] },
//         { name: 'Arabe', categoryId: categoryMap['Langues'] },
//         { name: 'Espagnol', categoryId: categoryMap['Langues'] },
//         { name: 'Chinois mandarin', categoryId: categoryMap['Langues'] },
//         { name: 'Allemand', categoryId: categoryMap['Langues'] },
//         { name: 'Autres langues', categoryId: categoryMap['Langues'] },
//         // Développement personnel
//         { name: 'Productivité & Organisation', categoryId: categoryMap['Développement personnel'] },
//         { name: 'Prise de parole en public', categoryId: categoryMap['Développement personnel'] },
//         { name: 'Gestion du stress & Émotions', categoryId: categoryMap['Développement personnel'] },
//         { name: 'Confiance en soi & Motivation', categoryId: categoryMap['Développement personnel'] },
//         { name: 'Mémoire & Techniques d\'apprentissage', categoryId: categoryMap['Développement personnel'] },
//         { name: 'Méditation & Pleine conscience', categoryId: categoryMap['Développement personnel'] },
//         { name: 'Relations interpersonnelles', categoryId: categoryMap['Développement personnel'] },
//         // Éducation & Soutien scolaire
//         { name: 'Mathématiques', categoryId: categoryMap['Éducation & Soutien scolaire'] },
//         { name: 'Sciences', categoryId: categoryMap['Éducation & Soutien scolaire'] },
//         { name: 'Français & Littérature', categoryId: categoryMap['Éducation & Soutien scolaire'] },
//         { name: 'Histoire & Géographie', categoryId: categoryMap['Éducation & Soutien scolaire'] },
//         { name: 'Préparation aux examens', categoryId: categoryMap['Éducation & Soutien scolaire'] },
//         { name: 'Méthodes d\'apprentissage & Prise de notes', categoryId: categoryMap['Éducation & Soutien scolaire'] },
//         // Santé & Bien-être
//         { name: 'Nutrition & Alimentation saine', categoryId: categoryMap['Santé & Bien-être'] },
//         { name: 'Fitness & Musculation', categoryId: categoryMap['Santé & Bien-être'] },
//         { name: 'Yoga & Stretching', categoryId: categoryMap['Santé & Bien-être'] },
//         { name: 'Psychologie & Santé mentale', categoryId: categoryMap['Santé & Bien-être'] },
//         { name: 'Premiers secours & Urgences', categoryId: categoryMap['Santé & Bien-être'] },
//         { name: 'Médecine naturelle & Plantes', categoryId: categoryMap['Santé & Bien-être'] },
//         // Métiers pratiques
//         { name: 'Électricité & Installations', categoryId: categoryMap['Métiers pratiques'] },
//         { name: 'Plomberie & Sanitaire', categoryId: categoryMap['Métiers pratiques'] },
//         { name: 'Menuiserie & Ébénisterie', categoryId: categoryMap['Métiers pratiques'] },
//         { name: 'Couture, Mode & Broderie', categoryId: categoryMap['Métiers pratiques'] },
//         { name: 'Cuisine & Pâtisserie', categoryId: categoryMap['Métiers pratiques'] },
//         { name: 'Agriculture & Élevage', categoryId: categoryMap['Métiers pratiques'] },
//         { name: 'Mécanique automobile', categoryId: categoryMap['Métiers pratiques'] },
//         // Droit & Juridique
//         { name: 'Droit des affaires', categoryId: categoryMap['Droit & Juridique'] },
//         { name: 'Droit du travail', categoryId: categoryMap['Droit & Juridique'] },
//         { name: 'Droit civil & Famille', categoryId: categoryMap['Droit & Juridique'] },
//         { name: 'Rédaction de contrats', categoryId: categoryMap['Droit & Juridique'] },
//         { name: 'Propriété intellectuelle', categoryId: categoryMap['Droit & Juridique'] },
//         // Médias & Création de contenu
//         { name: 'Création de contenu YouTube', categoryId: categoryMap['Médias & Création de contenu'] },
//         { name: 'Podcasting', categoryId: categoryMap['Médias & Création de contenu'] },
//         { name: 'Journalisme & Rédaction', categoryId: categoryMap['Médias & Création de contenu'] },
//         { name: 'Radio & Audio', categoryId: categoryMap['Médias & Création de contenu'] },
//         { name: 'Relations publiques & Communication', categoryId: categoryMap['Médias & Création de contenu'] }
//       ];

//       await db.Subcategory.bulkCreate(subcategories);
      
//       console.log('✅ 12 catégories et 92 sous-catégories ajoutées!');
//     }
    
//     return true;
//   } catch (error) {
//     console.error('❌ Database connection error:', error.message);
//     throw error;
//   }
// }

// module.exports = initializeDatabase;
const db = require('../models');
const createOrdersTable = require('../migrations/create-orders-table');

async function initializeDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    // Create Orders table if it doesn't exist
    await createOrdersTable();

    // ✅ Sync ciblé uniquement sur les modèles avec nouveaux champs Cloudinary
    // On évite le sync global qui casse le tableau d'ENUMs de Formation
    await db.User.sync({ alter: true });
    await db.Lesson.sync({ alter: true });
    await db.Resource.sync({ alter: true });
    console.log('✅ Database synced (User, Lesson, Resource)');

    // Seed default categories if empty
    const categoryCount = await db.Category.count();
    if (categoryCount === 0) {
      console.log('📝 Seeding 12 categories and 92 subcategories...');
      
      const categories = await db.Category.bulkCreate([
        { name: 'Développement & Tech', description: 'Apprenez à programmer et maîtriser les technologies' },
        { name: 'Design & Créativité', description: 'Développez vos compétences en création visuelle' },
        { name: 'Création d\'entreprise & Startup', description: 'Lancez et gérez votre propre business' },
        { name: 'Marketing & Communication', description: 'Maîtrisez les stratégies de marketing moderne' },
        { name: 'Finance & Investissement', description: 'Gérez vos finances et investissements' },
        { name: 'Langues', description: 'Apprenez de nouvelles langues' },
        { name: 'Développement personnel', description: 'Améliorez vos compétences personnelles' },
        { name: 'Éducation & Soutien scolaire', description: 'Réussissez votre parcours scolaire' },
        { name: 'Santé & Bien-être', description: 'Prenez soin de votre santé et bien-être' },
        { name: 'Métiers pratiques', description: 'Apprenez des métiers pratiques et artisanaux' },
        { name: 'Droit & Juridique', description: 'Comprenez les aspects juridiques' },
        { name: 'Médias & Création de contenu', description: 'Créez et produisez du contenu' }
      ]);

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
        { name: 'Développement web', categoryId: categoryMap['Développement & Tech'] },
        { name: 'Développement mobile', categoryId: categoryMap['Développement & Tech'] },
        { name: 'Intelligence artificielle & Machine learning', categoryId: categoryMap['Développement & Tech'] },
        { name: 'Cybersécurité & Ethical hacking', categoryId: categoryMap['Développement & Tech'] },
        { name: 'Bases de données', categoryId: categoryMap['Développement & Tech'] },
        { name: 'DevOps & Cloud', categoryId: categoryMap['Développement & Tech'] },
        { name: 'Programmation générale', categoryId: categoryMap['Développement & Tech'] },
        // Design & Créativité
        { name: 'UI/UX Design', categoryId: categoryMap['Design & Créativité'] },
        { name: 'Graphic Design', categoryId: categoryMap['Design & Créativité'] },
        { name: 'Montage vidéo', categoryId: categoryMap['Design & Créativité'] },
        { name: 'Motion design & Animation', categoryId: categoryMap['Design & Créativité'] },
        { name: 'Photographie & Retouche', categoryId: categoryMap['Design & Créativité'] },
        { name: 'Modélisation 3D', categoryId: categoryMap['Design & Créativité'] },
        { name: 'Illustration digitale', categoryId: categoryMap['Design & Créativité'] },
        // Création d'entreprise & Startup
        { name: 'Gestion de projet', categoryId: categoryMap['Création d\'entreprise & Startup'] },
        { name: 'Leadership & Management', categoryId: categoryMap['Création d\'entreprise & Startup'] },
        { name: 'E-commerce & Vente en ligne', categoryId: categoryMap['Création d\'entreprise & Startup'] },
        { name: 'Rédaction de business plan', categoryId: categoryMap['Création d\'entreprise & Startup'] },
        { name: 'Comptabilité & Gestion d\'entreprise', categoryId: categoryMap['Création d\'entreprise & Startup'] },
        { name: 'Import / Export & Commerce international', categoryId: categoryMap['Création d\'entreprise & Startup'] },
        // Marketing & Communication
        { name: 'Marketing digital', categoryId: categoryMap['Marketing & Communication'] },
        { name: 'Réseaux sociaux', categoryId: categoryMap['Marketing & Communication'] },
        { name: 'SEO & Référencement naturel', categoryId: categoryMap['Marketing & Communication'] },
        { name: 'Publicité en ligne', categoryId: categoryMap['Marketing & Communication'] },
        { name: 'Email marketing & Automation', categoryId: categoryMap['Marketing & Communication'] },
        { name: 'Copywriting & Rédaction web', categoryId: categoryMap['Marketing & Communication'] },
        { name: 'Community management', categoryId: categoryMap['Marketing & Communication'] },
        // Finance & Investissement
        { name: 'Finance personnelle & Épargne', categoryId: categoryMap['Finance & Investissement'] },
        { name: 'Comptabilité pratique', categoryId: categoryMap['Finance & Investissement'] },
        { name: 'Bourse & Trading', categoryId: categoryMap['Finance & Investissement'] },
        { name: 'Cryptomonnaies & Blockchain', categoryId: categoryMap['Finance & Investissement'] },
        { name: 'Gestion budgétaire', categoryId: categoryMap['Finance & Investissement'] },
        { name: 'Fiscalité & Impôts', categoryId: categoryMap['Finance & Investissement'] },
        { name: 'Investissement immobilier', categoryId: categoryMap['Finance & Investissement'] },
        // Langues
        { name: 'Anglais', categoryId: categoryMap['Langues'] },
        { name: 'Français', categoryId: categoryMap['Langues'] },
        { name: 'Arabe', categoryId: categoryMap['Langues'] },
        { name: 'Espagnol', categoryId: categoryMap['Langues'] },
        { name: 'Chinois mandarin', categoryId: categoryMap['Langues'] },
        { name: 'Allemand', categoryId: categoryMap['Langues'] },
        { name: 'Autres langues', categoryId: categoryMap['Langues'] },
        // Développement personnel
        { name: 'Productivité & Organisation', categoryId: categoryMap['Développement personnel'] },
        { name: 'Prise de parole en public', categoryId: categoryMap['Développement personnel'] },
        { name: 'Gestion du stress & Émotions', categoryId: categoryMap['Développement personnel'] },
        { name: 'Confiance en soi & Motivation', categoryId: categoryMap['Développement personnel'] },
        { name: 'Mémoire & Techniques d\'apprentissage', categoryId: categoryMap['Développement personnel'] },
        { name: 'Méditation & Pleine conscience', categoryId: categoryMap['Développement personnel'] },
        { name: 'Relations interpersonnelles', categoryId: categoryMap['Développement personnel'] },
        // Éducation & Soutien scolaire
        { name: 'Mathématiques', categoryId: categoryMap['Éducation & Soutien scolaire'] },
        { name: 'Sciences', categoryId: categoryMap['Éducation & Soutien scolaire'] },
        { name: 'Français & Littérature', categoryId: categoryMap['Éducation & Soutien scolaire'] },
        { name: 'Histoire & Géographie', categoryId: categoryMap['Éducation & Soutien scolaire'] },
        { name: 'Préparation aux examens', categoryId: categoryMap['Éducation & Soutien scolaire'] },
        { name: 'Méthodes d\'apprentissage & Prise de notes', categoryId: categoryMap['Éducation & Soutien scolaire'] },
        // Santé & Bien-être
        { name: 'Nutrition & Alimentation saine', categoryId: categoryMap['Santé & Bien-être'] },
        { name: 'Fitness & Musculation', categoryId: categoryMap['Santé & Bien-être'] },
        { name: 'Yoga & Stretching', categoryId: categoryMap['Santé & Bien-être'] },
        { name: 'Psychologie & Santé mentale', categoryId: categoryMap['Santé & Bien-être'] },
        { name: 'Premiers secours & Urgences', categoryId: categoryMap['Santé & Bien-être'] },
        { name: 'Médecine naturelle & Plantes', categoryId: categoryMap['Santé & Bien-être'] },
        // Métiers pratiques
        { name: 'Électricité & Installations', categoryId: categoryMap['Métiers pratiques'] },
        { name: 'Plomberie & Sanitaire', categoryId: categoryMap['Métiers pratiques'] },
        { name: 'Menuiserie & Ébénisterie', categoryId: categoryMap['Métiers pratiques'] },
        { name: 'Couture, Mode & Broderie', categoryId: categoryMap['Métiers pratiques'] },
        { name: 'Cuisine & Pâtisserie', categoryId: categoryMap['Métiers pratiques'] },
        { name: 'Agriculture & Élevage', categoryId: categoryMap['Métiers pratiques'] },
        { name: 'Mécanique automobile', categoryId: categoryMap['Métiers pratiques'] },
        // Droit & Juridique
        { name: 'Droit des affaires', categoryId: categoryMap['Droit & Juridique'] },
        { name: 'Droit du travail', categoryId: categoryMap['Droit & Juridique'] },
        { name: 'Droit civil & Famille', categoryId: categoryMap['Droit & Juridique'] },
        { name: 'Rédaction de contrats', categoryId: categoryMap['Droit & Juridique'] },
        { name: 'Propriété intellectuelle', categoryId: categoryMap['Droit & Juridique'] },
        // Médias & Création de contenu
        { name: 'Création de contenu YouTube', categoryId: categoryMap['Médias & Création de contenu'] },
        { name: 'Podcasting', categoryId: categoryMap['Médias & Création de contenu'] },
        { name: 'Journalisme & Rédaction', categoryId: categoryMap['Médias & Création de contenu'] },
        { name: 'Radio & Audio', categoryId: categoryMap['Médias & Création de contenu'] },
        { name: 'Relations publiques & Communication', categoryId: categoryMap['Médias & Création de contenu'] }
      ];

      await db.Subcategory.bulkCreate(subcategories);
      console.log('✅ 12 catégories et 92 sous-catégories ajoutées!');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw error;
  }
}

module.exports = initializeDatabase;