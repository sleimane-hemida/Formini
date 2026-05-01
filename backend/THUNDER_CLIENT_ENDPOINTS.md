# 🧪 THUNDER CLIENT - TOUS LES 44 ENDPOINTS

**Base URL:** `${process.env.NEXT_PUBLIC_API_URL}/api`

---

## 🔐 1. AUTH - REGISTER
```
POST /auth/register
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "Password123!",
  "role": "acheteur"
}
```
**Réponse:** `{ user: {...}, token: "eyJhbGc..." }`

---

## 🔐 2. AUTH - LOGIN
```
POST /auth/login
Content-Type: application/json

{
  "email": "jean@example.com",
  "password": "Password123!"
}
```
**Réponse:** `{ user: {...}, token: "eyJhbGc..." }`

⚠️ **Garde le token pour les autres requêtes!**

---

## 👤 3. GET USER PROFILE
```
GET /user/profile
Authorization: Bearer YOUR_TOKEN_HERE
```
**Pas de body**

---

## 👤 4. UPDATE USER PROFILE
```
PUT /user/profile
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "prenom": "Jean",
  "nom_de_famille": "Dupont",
  "telephone": "+33612345678",
  "date_naissance": "1990-05-15",
  "localisation": "Paris, France",
  "biographie": "Je suis développeur web passionné",
  "loisirs_centres_interet": "Programmation, Musique"
}
```

---

## 👤 5. UPLOAD AVATAR
```
POST /user/avatar
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

[FORM DATA]
avatar: [Sélectionner une image PNG/JPG]
```

---

## 👤 6. GET USER BY ID
```
GET /users/:id
Authorization: Bearer YOUR_TOKEN_HERE

Remplace :id par l'ID de l'utilisateur
```

---

## 👤 7. GET ALL USERS (Admin only)
```
GET /users
Authorization: Bearer ADMIN_TOKEN_HERE
```

---

## 👤 8. DELETE USER (Admin only)
```
DELETE /users/:id
Authorization: Bearer ADMIN_TOKEN_HERE

Remplace :id par l'ID à supprimer
```

---

## 👤 9. TOGGLE USER ACTIVE (Admin only)
```
PATCH /users/:id/toggle-active
Authorization: Bearer ADMIN_TOKEN_HERE
Content-Type: application/json

{
  "isActive": true
}
```

---

## 📂 10. GET ALL CATEGORIES
```
GET /categories
```
**Pas de token requis**

---

## 📂 11. GET SUBCATEGORIES (Optionnel: filtrer par catégorie)
```
GET /subcategories
GET /subcategories?categoryId=YOUR_CATEGORY_ID
```

---

## 📂 12. DELETE CATEGORY (Admin only)
```
DELETE /categories/:id
Authorization: Bearer ADMIN_TOKEN_HERE

Remplace :id par l'ID de la catégorie
```

---

## 📚 13. GET FORMATION OPTIONS
```
GET /formations/options
```

---

## 📚 14. GET ALL FORMATIONS
```
GET /formations
Authorization: Bearer YOUR_TOKEN_HERE

Optionnel:
GET /formations?page=1&limit=10&categoryId=XXX&niveau=debutant
```

---

## 📚 15. GET FORMATION BY ID
```
GET /formations/:id
Authorization: Bearer YOUR_TOKEN_HERE

Remplace :id par l'ID de la formation
```

---

## 📚 16. CREATE FORMATION (Formateur only)
```
POST /formations
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "React Basics 2024",
  "categoryId": "CATEGORY_ID_HERE",
  "subcategoryId": "SUBCATEGORY_ID_HERE",
  "image": "https://example.com/image.jpg",
  "niveau": "debutant",
  "public_cible": ["Salariés", "Indépendants"],
  "description": "Apprenez React de zéro",
  "description_longue": "Une formation complète sur React...",
  "language": "fr",
  "price": 49.99
}
```

---

## 📚 17. UPDATE FORMATION
```
PUT /formations/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "React Basics - Updated",
  "description": "Version mise à jour",
  "price": 59.99
}
```

---

## 📚 18. DELETE FORMATION
```
DELETE /formations/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
```

---

## 📚 19. PUBLISH FORMATION
```
PATCH /formations/:id/publish
Authorization: Bearer FORMATEUR_TOKEN_HERE
```

---

## 📚 20. REJECT FORMATION (Admin only)
```
PATCH /formations/:id/reject
Authorization: Bearer ADMIN_TOKEN_HERE
Content-Type: application/json

{
  "reason": "Contenu non approuvé"
}
```

---

## 📚 21. DISABLE FORMATION (Admin only)
```
PATCH /formations/:id/disable
Authorization: Bearer ADMIN_TOKEN_HERE
```

---

## 🎓 22. REQUEST FORMATION ACCESS (Acheteur only)
```
POST /formations-access/request
Authorization: Bearer ACHETEUR_TOKEN_HERE
Content-Type: application/json

{
  "formationId": "FORMATION_ID_HERE"
}
```

---

## 🎓 23. GET MY FORMATIONS (Acheteur)
```
GET /my-formations
Authorization: Bearer ACHETEUR_TOKEN_HERE
```

---

## 🎓 24. GET PENDING REQUESTS (Admin only)
```
GET /formations-access/pending
Authorization: Bearer ADMIN_TOKEN_HERE
```

---

## 🎓 25. APPROVE ACCESS (Admin only)
```
PATCH /formations-access/:accessId/approve
Authorization: Bearer ADMIN_TOKEN_HERE
```

---

## 🎓 26. REJECT ACCESS (Admin only)
```
PATCH /formations-access/:accessId/reject
Authorization: Bearer ADMIN_TOKEN_HERE
Content-Type: application/json

{
  "reason": "Accès refusé"
}
```

---

## 📖 27. CREATE MODULE (Formateur only)
```
POST /modules
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "formationId": "FORMATION_ID_HERE",
  "title": "Module 1: Fondamentaux",
  "description": "Les bases de React",
  "order": 1
}
```

---

## 📖 28. GET MODULES BY FORMATION
```
GET /formations/:formationId/modules

Remplace :formationId par l'ID
```

---

## 📖 29. GET MODULE BY ID
```
GET /modules/:id

Remplace :id par l'ID du module
```

---

## 📖 30. UPDATE MODULE
```
PUT /modules/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Module 1: Fondamentaux - Updated",
  "description": "Version mise à jour",
  "order": 1
}
```

---

## 📖 31. DELETE MODULE
```
DELETE /modules/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
```

---

## 🎯 32. CREATE LESSON (Formateur only)
```
POST /lessons
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "moduleId": "MODULE_ID_HERE",
  "title": "Leçon 1: Introduction à React",
  "description": "Qu'est-ce que React?",
  "duration": 45,
  "videoUrl": "https://youtube.com/watch?v=...",
  "order": 1
}
```

---

## 🎯 33. GET LESSONS BY MODULE
```
GET /modules/:moduleId/lessons

Remplace :moduleId par l'ID
```

---

## 🎯 34. GET LESSON BY ID
```
GET /lessons/:id

Remplace :id par l'ID de la leçon
```

---

## 🎯 35. UPDATE LESSON
```
PUT /lessons/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Leçon 1: Introduction à React - v2",
  "description": "Version mise à jour",
  "duration": 50
}
```

---

## 🎯 36. DELETE LESSON
```
DELETE /lessons/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
```

---

## 🎯 37. UPLOAD LESSON COVER
```
POST /lesson-cover
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: multipart/form-data

[FORM DATA]
file: [Sélectionner une image PNG/JPG]
```

---

## 📦 38. CREATE RESOURCE (Formateur only)
```
POST /resources
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: multipart/form-data

[FORM DATA]
file: [Sélectionner un PDF, ZIP, ou autre document]

+ Body (JSON):
{
  "lessonId": "LESSON_ID_HERE",
  "name": "Support de cours React",
  "description": "PDF avec tous les exemples"
}
```

---

## 📦 39. GET RESOURCES BY LESSON
```
GET /lessons/:lessonId/resources

Remplace :lessonId par l'ID
```

---

## 📦 40. GET RESOURCE BY ID
```
GET /resources/:id

Remplace :id par l'ID de la ressource
```

---

## 📦 41. UPDATE RESOURCE
```
PUT /resources/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Support de cours React - v2",
  "description": "Version mise à jour avec plus d'exemples"
}
```

---

## 📦 42. DELETE RESOURCE
```
DELETE /resources/:id
Authorization: Bearer FORMATEUR_TOKEN_HERE
```

---

## 📁 43. DOWNLOAD RESOURCE FILE
```
GET /file/:formationId/:moduleId/:lessonId/:filename

Remplace les paramètres par les vrais IDs et nom de fichier
```

---

## 📁 44. DOWNLOAD LESSON COVER IMAGE
```
GET /file-cover/:filename

Remplace :filename par le nom de l'image
```

---

## 📁 45. DOWNLOAD USER AVATAR
```
GET /avatar/:filename

Remplace :filename par le nom de l'avatar
```

---

## 📋 ORDRE RECOMMANDÉ DE TEST:

1. **POST /auth/register** → Créer un compte
2. **POST /auth/login** → Se connecter (récupérer token)
3. **GET /categories** → Voir les catégories
4. **GET /subcategories** → Voir les sous-catégories
5. **GET /formations/options** → Voir les options
6. **POST /formations** → Créer une formation
7. **POST /modules** → Créer un module
8. **POST /lessons** → Créer une leçon
9. **POST /resources** → Uploader une ressource
10. **GET /formations/:id** → Vérifier les données

---

## 📊 RÉSUMÉ PAR CATÉGORIE

| Catégorie | Nombre | Fonction |
|-----------|--------|----------|
| 🔐 Auth | 2 | Connexion/Inscription |
| 👤 User | 8 | Gestion profils utilisateurs |
| 📂 Catégories | 3 | Gestion catégories/sous-catégories |
| 📚 Formations | 8 | Gestion complète formations |
| 🎓 Accès | 4 | Demandes d'accès formations |
| 📖 Modules | 5 | Organisation des formations |
| 🎯 Leçons | 6 | Contenu des modules |
| 📦 Ressources | 5 | Fichiers/documents |
| 📁 Fichiers | 3 | Téléchargement fichiers |
| **TOTAL** | **44** | **Tous les endpoints** |

---

## 🔐 TOKENS D'EXEMPLE POUR TESTS

### Compte Acheteur
```
Email: acheteur@example.com
Password: Password123!
Role: acheteur
```

### Compte Formateur
```
Email: formateur@example.com
Password: Password123!
Role: formateur
```

### Compte Admin
```
Email: admin@example.com
Password: Password123!
Role: administrateur
```

---

## ✅ CHECKLIST DE TEST COMPLÈTE

- [ ] 1. Enregistrer un nouvel utilisateur
- [ ] 2. Se connecter et récupérer le token
- [ ] 3. Charger le profil utilisateur
- [ ] 4. Mettre à jour le profil
- [ ] 5. Uploader un avatar
- [ ] 6. Récupérer la liste des catégories
- [ ] 7. Récupérer les sous-catégories
- [ ] 8. Créer une formation
- [ ] 9. Modifier la formation
- [ ] 10. Créer un module
- [ ] 11. Créer une leçon
- [ ] 12. Uploader une couverture de leçon
- [ ] 13. Uploader une ressource
- [ ] 14. Récupérer les ressources
- [ ] 15. Publier la formation
- [ ] 16. Demander l'accès à une formation (acheteur)
- [ ] 17. Approuver la demande (admin)
- [ ] 18. Charger les formations achetées
- [ ] 19. Télécharger un fichier
- [ ] 20. Télécharger un avatar

---

**Créé le:** 18/04/2026
**Dernière mise à jour:** 18/04/2026
**Total endpoints:** 44
