# 🚀 GUIDE COMPLET - CRÉER UNE FORMATION DE A À Z

**Date**: 12 Avril 2026  
**Status**: ✅ PRÊT À TESTER

---

## 📊 VOS IDS RÉELS

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw",
  "formateur_id": "b2c2dc31-e0b8-4477-9392-b37ac86376c7",
  "category_web_id": "813b5cb4-25f5-474b-b059-a80c3633107e",
  "subcategory_react_id": "38a422ba-71b0-4dd6-b4ce-8a2da0a77892"
}
```

---

## ⚙️ DÉMARRER LE SERVEUR

```bash
cd backend
node src/app.js
# ou avec nodemon si vous fixez package.json
```

Le serveur lancera sur `http://localhost:5000`

---

## 🧪 18 ÉTAPES DE TEST (dans Thunder Client)

### **ÉTAPE 1: POST Créer Formation**
```http
POST http://localhost:5000/api/formations
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "name": "Maîtriser React.js en 30 Jours",
  "description": "Apprenez React from scratch",
  "description_longue": "Une formation complète pour maîtriser React.js, couvrant les hooks, le state management, Redux, et les meilleures pratiques.",
  "image": "https://via.placeholder.com/500x300?text=React+Formation",
  "niveau": "intermediaire",
  "language": "fr",
  "categoryId": "813b5cb4-25f5-474b-b059-a80c3633107e",
  "subcategoryId": "38a422ba-71b0-4dd6-b4ce-8a2da0a77892",
  "trainerId": "b2c2dc31-e0b8-4477-9392-b37ac86376c7"
}
```
**→ Copie le `formationId` du résultat**

---

### **ÉTAPE 2: PUT Ajouter Contenu**
```http
PUT http://localhost:5000/api/formations/{FORMATION_ID}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "duree_totale_minutes": 1800,
  "ce_que_vous_apprendrez": ["JSX", "Hooks", "State Management", "Redux", "Context API", "Performance"],
  "prerequis": "Connaissances basiques en JavaScript ES6",
  "public_cible": "Développeurs JavaScript qui veulent maîtriser React"
}
```

---

### **ÉTAPE 3: POST Créer Module 1**
```http
POST http://localhost:5000/api/modules
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "formationId": "{FORMATION_ID}",
  "titre": "Module 1: Fondamentaux de React",
  "ordre": 1
}
```
**→ Copie le `moduleId`**

---

### **ÉTAPE 4: POST Créer Module 2**
```http
POST http://localhost:5000/api/modules
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "formationId": "{FORMATION_ID}",
  "titre": "Module 2: État et Props",
  "ordre": 2
}
```
**→ Copie le `moduleId`**

---

### **ÉTAPE 5: POST Créer Leçon 1.1**
```http
POST http://localhost:5000/api/lessons
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "moduleId": "{MODULE_1_ID}",
  "titre": "Leçon 1.1: Qu'est-ce que React?",
  "ordre": 1,
  "image_couverture": "https://via.placeholder.com/300x200?text=React+Intro"
}
```
**→ Copie le `lessonId`**

---

### **ÉTAPE 6: POST Créer Leçon 1.2**
```http
POST http://localhost:5000/api/lessons
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "moduleId": "{MODULE_1_ID}",
  "titre": "Leçon 1.2: Composants et JSX",
  "ordre": 2,
  "image_couverture": "https://via.placeholder.com/300x200?text=JSX"
}
```
**→ Copie le `lessonId`**

---

### **ÉTAPE 7: POST Créer Leçon 2.1**
```http
POST http://localhost:5000/api/lessons
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "moduleId": "{MODULE_2_ID}",
  "titre": "Leçon 2.1: State Basics",
  "ordre": 1,
  "image_couverture": "https://via.placeholder.com/300x200?text=State"
}
```
**→ Copie le `lessonId`**

---

### **ÉTAPE 8-11: POST Créer 4 Ressources**

#### Ressource 1 (Vidéo Leçon 1.1):
```http
POST http://localhost:5000/api/resources
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "lessonId": "{LESSON_1_1_ID}",
  "type": "video",
  "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
  "titre": "Vidéo: Qu'est-ce que React?",
  "duree_minutes": 12
}
```

#### Ressource 2 (PDF Leçon 1.1):
```http
POST http://localhost:5000/api/resources

{
  "lessonId": "{LESSON_1_1_ID}",
  "type": "pdf",
  "url": "https://example.com/Introduction_to_React.pdf",
  "titre": "Support: Introduction à React",
  "duree_minutes": null
}
```

#### Ressource 3 (Vidéo Leçon 1.2):
```http
POST http://localhost:5000/api/resources

{
  "lessonId": "{LESSON_1_2_ID}",
  "type": "video",
  "url": "https://youtube.com/watch?v=iLhxKH2F76w",
  "titre": "Tutoriel JSX",
  "duree_minutes": 18
}
```

#### Ressource 4 (Vidéo Leçon 2.1):
```http
POST http://localhost:5000/api/resources

{
  "lessonId": "{LESSON_2_1_ID}",
  "type": "video",
  "url": "https://youtube.com/watch?v=sI3IWe1Q-R8",
  "titre": "Comprendre le State en React",
  "duree_minutes": 20
}
```

---

### **ÉTAPE 12: PUT Finaliser (TARIFICATION + STATUT)**
```http
PUT http://localhost:5000/api/formations/{FORMATION_ID}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5N2E5ODdmLTE4YmEtNDFiMS04MmQ4LTgwZjAzMjcxMmUwYSIsImVtYWlsIjoiZm9ybWF0ZXVyQGdtYWlsLmNvbSIsInJvbGUiOiJmb3JtYXRldXIiLCJpYXQiOjE3NzU5NTI5MTQsImV4cCI6MTc3NjU1NzcxNH0.9hw4LFS3s7ec2p0PXAx4YbrH1oNOo3BhGTBAfDbB2vw
Content-Type: application/json

{
  "prix_normal": 99.99,
  "prix_promo": 49.99,
  "date_debut_promo": "2026-04-12",
  "date_fin_promo": "2026-04-30",
  "est_gratuite": false,
  "pourcentage_commission": 10,
  "statut": "en_attente_validation"
}
```

✅ **Formation soumise pour validation!**

---

### **ÉTAPES 13-16: VÉRIFICATIONS (GET)**

#### Vérif 1: Récupérer formation
```http
GET http://localhost:5000/api/formations/{FORMATION_ID}
```

#### Vérif 2: Lister modules
```http
GET http://localhost:5000/api/formations/{FORMATION_ID}/modules
```

#### Vérif 3: Lister leçons
```http
GET http://localhost:5000/api/modules/{MODULE_1_ID}/lessons
```

#### Vérif 4: Lister ressources
```http
GET http://localhost:5000/api/lessons/{LESSON_1_1_ID}/resources
```

---

## 📦 STRUCTURE CRÉÉE

```
🎓 Formation: Maîtriser React.js en 30 Jours (99.99€ / 49.99€)
├── 📚 Module 1: Fondamentaux de React
│   ├── 📖 Leçon 1.1: Qu'est-ce que React?
│   │   ├── 🎥 Vidéo (12 min)
│   │   └── 📄 PDF
│   └── 📖 Leçon 1.2: Composants et JSX
│       └── 🎥 Vidéo (18 min)
└── 📚 Module 2: État et Props
    └── 📖 Leçon 2.1: State Basics
        └── 🎥 Vidéo (20 min)
```

---

## ✅ STATUS

- ✅ Base de données: PRÊTE
- ✅ Migrations: 10 APPLIQUÉES
- ✅ Seeds: CRÉÉES
- ✅ APIs: 27+ ENDPOINTS ACTIFS
- ✅ Module/Lesson/Resource: COMPLET

**Prêt à tester! 🚀**
