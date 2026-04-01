# Documentation du Routage Centralisé - Formini

## Objectif
Ce système de routage centralisé permet de gérer toutes les routes de l'application depuis un seul fichier, améliorant la maintenabilité et évitant la duplication.

## Structure

### Fichier principal : `src/utils/routes.js`
- Contient toutes les constantes de routes
- Fonctions utilitaires pour les routes dynamiques
- Organisation par catégories (pages principales, utilisateur, formateur, etc.)

## Comment utiliser

### 1. Import dans vos composants
```javascript
import { ROUTES } from "../../utils/routes";
```

### 2. Utilisation avec useRouter
```javascript
const router = useRouter();

// Au lieu de :
router.push("/connexion");

// Utilisez :
router.push(ROUTES.SIGNUP);
```

### 3. Routes avec paramètres dynamiques
```javascript
import { buildRoute } from "../../utils/routes";

// Exemple pour une formation avec ID
const courseId = "123";
const courseRoute = buildRoute(ROUTES.COURSE_DETAIL, { id: courseId });
router.push(courseRoute); // /formation/123
```

### 4. Routes avec query parameters
```javascript
import { buildRouteWithQuery } from "../../utils/routes";

const searchRoute = buildRouteWithQuery(ROUTES.BROWSE_COURSES, { 
  category: "web", 
  level: "beginner" 
});
router.push(searchRoute); // /formations?category=web&level=beginner
```

## Avantages

✅ **Maintenabilité** : Changement d'URL en un seul endroit  
✅ **Éviter les erreurs** : Plus de typos dans les URLs  
✅ **Autocomplétion** : IDE propose les routes disponibles  
✅ **Refactoring sûr** : Renommage automatique des références  
✅ **Documentation** : Routes clairement organisées  

## Conventions

- Noms de constantes en SCREAMING_SNAKE_CASE
- Organisation par contexte métier
- Routes futures commentées pour la roadmap
- Fonctions utilitaires pour les cas complexes

## Fichiers mis à jour

Les composants suivants utilisent maintenant le routage centralisé :
- `src/composant/layout/header.jsx`
- `src/app/pages_common/home.jsx`
- `src/app/connexion/signup.jsx`

## Prochaines étapes

Lors de l'ajout de nouvelles pages :
1. Ajouter la route dans `ROUTES` en respectant la catégorisation
2. Utiliser la constante dans vos composants
3. Mettre à jour cette documentation si nécessaire