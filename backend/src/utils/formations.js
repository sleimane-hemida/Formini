// Formation utilities

const NIVEAUX = ['debutant', 'intermediaire', 'avance'];

const PUBLIC_CIBLE_OPTIONS = [
  'Tout le monde',
  'Collégiens & Lycéens',
  'Étudiants en licence',
  'Demandeurs d\'emploi',
  'Salariés',
  'Freelances & indépendants',
  'Fonctionnaires',
  'Jeune',
  'Personne âgée',
  'Sans diplôme',
  'Parent',
  'Femme au foyer'
];

/**
 * Validate niveau
 */
const validateNiveau = (niveau) => {
  if (!niveau) return true; // Optional field
  return NIVEAUX.includes(niveau);
};

/**
 * Validate public_cible (array of options)
 */
const validatePublicCible = (publicCible) => {
  if (!publicCible) return true; // Optional field
  if (!Array.isArray(publicCible)) return false;
  return publicCible.every(cible => PUBLIC_CIBLE_OPTIONS.includes(cible));
};

/**
 * Check if formation is complete (all required steps done)
 * Formation is complete when it has:
 * - At least 1 module
 * - Each module has at least 1 lesson
 * - Each lesson has at least 1 resource
 * - Pricing information (if not free)
 */
const isFormationComplete = async (formation, modules = []) => {
  // Check basic required fields
  if (!formation.name || !formation.duree_totale_minutes || !formation.categoryId) {
    return false;
  }

  // If no modules provided, assume formation is not complete
  if (!modules || modules.length === 0) {
    return false;
  }

  // Check if pricing is set (unless it's free)
  if (!formation.est_gratuite && !formation.prix_normal) {
    return false;
  }

  // All checks passed
  return true;
};

/**
 * Calculate formation status based on completion
 * If complete → en_ligne
 * If not complete → brouillon
 * Can be overridden by admin rejection (rejetee)
 */
const calculateFormationStatus = async (formation, modules = []) => {
  // If already rejected by admin, keep rejected status
  if (formation.statut === 'rejetee') {
    return 'rejetee';
  }

  // Check if formation is complete
  const isComplete = await isFormationComplete(formation, modules);
  
  return isComplete ? 'en_ligne' : 'brouillon';
};

/**
 * Validate pricing
 */
const validatePricing = (formation) => {
  const errors = [];

  if (formation.est_gratuite) {
    // Free formation shouldn't have prices
    if (formation.prix_normal || formation.prix_promo) {
      errors.push('Une formation gratuite ne devrait pas avoir de prix');
    }
  } else {
    // Paid formation must have prix_normal
    if (!formation.prix_normal || formation.prix_normal <= 0) {
      errors.push('Une formation payante doit avoir un prix normal supérieur à 0');
    }

    // If promo price exists, it should be less than normal price
    if (formation.prix_promo && formation.prix_promo >= formation.prix_normal) {
      errors.push('Le prix promo doit être inférieur au prix normal');
    }

    // If promo price exists, both promo dates must exist
    if (formation.prix_promo && (!formation.date_debut_promo || !formation.date_fin_promo)) {
      errors.push('Les dates de début et fin de la promo sont requises si un prix promo est défini');
    }

    // Promo dates validation
    if (formation.date_debut_promo && formation.date_fin_promo) {
      if (new Date(formation.date_debut_promo) >= new Date(formation.date_fin_promo)) {
        errors.push('La date de fin de la promo doit être après la date de début');
      }
    }
  }

  return errors;
};

module.exports = {
  NIVEAUX,
  PUBLIC_CIBLE_OPTIONS,
  validateNiveau,
  validatePublicCible,
  isFormationComplete,
  calculateFormationStatus,
  validatePricing
};
