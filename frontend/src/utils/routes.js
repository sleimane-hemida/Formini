/**
 * Routage centralisé de l'application Formini
 * Toutes les routes sont définies ici pour une meilleure maintenabilité
 */

export const ROUTES = {
  // Pages principales
  HOME: "/",
  SIGNUP: "/connexion",
  LOGIN: "/login", // À créer plus tard si besoin
  
  // Pages utilisateur (futures)
  PROFILE: "/profil",
  DASHBOARD: "/dashboard",
  SETTINGS: "/parametres",
  
  // Pages formateur (futures)
  TRAINER_DASHBOARD: "/formateur/tableau-de-bord",
  CREATE_COURSE: "/formateur/creer-formation",
  MY_COURSES: "/formateur/mes-formations",
  
  // Pages apprenant (futures)
  LEARNER_DASHBOARD: "/apprenant/tableau-de-bord",
  MY_LEARNING: "/apprenant/mes-formations",
  BROWSE_COURSES: "/formations",
  COURSE_DETAIL: "/formation", // + ID dynamique
  
  // Pages utilitaires (futures)
  ABOUT: "/a-propos",
  CONTACT: "/contact",
  HELP: "/aide",
  PRIVACY: "/confidentialite",
  TERMS: "/conditions",
  
  // Pages d'erreur
  NOT_FOUND: "/404",
  ERROR: "/erreur"
};

/**
 * Fonction utilitaire pour construire des routes dynamiques
 */
export const buildRoute = (baseRoute, params = {}) => {
  let route = baseRoute;
  Object.entries(params).forEach(([key, value]) => {
    route += `/${value}`;
  });
  return route;
};

/**
 * Fonction utilitaire pour construire des routes avec query params
 */
export const buildRouteWithQuery = (baseRoute, queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  return queryString ? `${baseRoute}?${queryString}` : baseRoute;
};

export default ROUTES;