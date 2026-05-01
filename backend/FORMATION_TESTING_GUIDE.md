# Formation Management Testing Guide

## Prerequisites
- Backend running on ${process.env.NEXT_PUBLIC_API_URL}
- Valid JWT token for formateur (or admin for rejection endpoints)

## Test Steps

### Step 1: Get Available Options
```
GET ${process.env.NEXT_PUBLIC_API_URL}/api/formations/options
```

Expected Response:
```json
{
  "niveaux": ["debutant", "intermediaire", "avance"],
  "public_cible": [
    "Collégiens & Lycéens",
    "Étudiants en licence",
    "Demandeurs d'emploi",
    "Salariés",
    "Freelances & indépendants",
    "Fonctionnaires",
    "Jeune",
    "Personne âgée",
    "Sans diplôme",
    "Parent",
    "Femme au foyer"
  ],
  "statuts": ["brouillon", "en_attente_validation", "en_ligne", "rejetee", "archivea"],
  "languages": ["fr", "en", "es", "de"]
}
```

---

### Step 2: Create Formation with Niveau & Public Cible
```
POST ${process.env.NEXT_PUBLIC_API_URL}/api/formations
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "name": "Maîtriser React.js en 30 Jours",
  "categoryId": "813b5cb4-25f5-474b-b059-a80c3633107e",
  "subcategoryId": "38a422ba-71b0-4dd6-b4ce-8a2da0a77892",
  "image": "https://via.placeholder.com/500x300?text=React+Formation",
  "niveau": "intermediaire",
  "public_cible": ["Salariés", "Freelances & indépendants"]
}
```

Expected Response (201):
```json
{
  "message": "Formation created successfully",
  "formation": {
    "id": "692e19fb-7b37-444f-ab2a-82ad2b572930",
    "name": "Maîtriser React.js en 30 Jours",
    "niveau": "intermediaire",
    "public_cible": ["Salariés", "Freelances & indépendants"],
    "statut": "brouillon",
    ...
  }
}
```

---

### Step 3: Add Pricing - Free Formation
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "duree_totale_minutes": 1800,
  "est_gratuite": true,
  "description_longue": "Une formation complète pour maîtriser React...",
  "ce_que_vous_apprendrez": ["JSX", "Hooks", "State Management", "Redux"],
  "prerequis": "Connaissances basiques en JavaScript ES6"
}
```

---

### Step 4: Add Pricing - Paid with Promo
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "duree_totale_minutes": 1800,
  "est_gratuite": false,
  "prix_normal": 149.99,
  "prix_promo": 99.99,
  "date_debut_promo": "2026-04-20",
  "date_fin_promo": "2026-05-20",
  "pourcentage_commission": 10,
  "description_longue": "Une formation complète pour maîtriser React...",
  "ce_que_vous_apprendrez": ["JSX", "Hooks", "State Management", "Redux"],
  "prerequis": "Connaissances basiques en JavaScript ES6"
}
```

Expected Response (200):
```json
{
  "message": "Formation updated",
  "formation": {
    "id": "692e19fb-7b37-444f-ab2a-82ad2b572930",
    "prix_normal": "149.99",
    "prix_promo": "99.99",
    "date_debut_promo": "2026-04-20T00:00:00.000Z",
    "date_fin_promo": "2026-05-20T00:00:00.000Z",
    "est_gratuite": false,
    "statut": "brouillon",
    ...
  }
}
```

---

### Step 5: Validation Test - Invalid Pricing
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "est_gratuite": false,
  "prix_normal": 50,
  "prix_promo": 150  // ERROR: promo > normal
}
```

Expected Error Response (400):
```json
{
  "error": "Pricing validation failed",
  "errors": [
    "Le prix promo doit être inférieur au prix normal"
  ]
}
```

---

### Step 6: Validation Test - Missing Promo Dates
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "est_gratuite": false,
  "prix_normal": 100,
  "prix_promo": 80  // Missing date_debut_promo and date_fin_promo
}
```

Expected Error Response (400):
```json
{
  "error": "Pricing validation failed",
  "errors": [
    "Les dates de début et fin de la promo sont requises si un prix promo est défini"
  ]
}
```

---

### Step 7: Create Modules (After Steps 1-6)
```
POST ${process.env.NEXT_PUBLIC_API_URL}/api/modules
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "formationId": "692e19fb-7b37-444f-ab2a-82ad2b572930",
  "titre": "Module 1: Fondamentaux",
  "ordre": 1
}
```

Expected Response (201):
```json
{
  "Module Creation Response": {
    "id": "module-id",
    "formationId": "692e19fb-7b37-444f-ab2a-82ad2b572930",
    "titre": "Module 1: Fondamentaux",
    "ordre": 1
  }
}
```

---

### Step 8: Publish Formation (After adding Modules)
```
PATCH ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930/publish
Authorization: Bearer {FORMATEUR_TOKEN}
```

Expected Response (200):
```json
{
  "message": "Formation published successfully",
  "formation": {
    "id": "692e19fb-7b37-444f-ab2a-82ad2b572930",
    "statut": "en_ligne",
    "published_at": "2026-04-12T15:30:00.000Z",
    ...
  }
}
```

**Error if no modules:**
```json
{
  "error": "Formation must have at least one module"
}
```

---

### Step 9: Try Publish Without Pricing
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "est_gratuite": false,
  "prix_normal": null
}
```

Then try to publish - should fail:
```
PATCH ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930/publish
Authorization: Bearer {FORMATEUR_TOKEN}
```

Expected Error (400):
```json
{
  "error": "Formation must have pricing information"
}
```

---

### Step 10: Admin Rejection
```
PATCH ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930/reject
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json

{
  "motif_rejet": "La description est incomplète"
}
```

Expected Response (200):
```json
{
  "message": "Formation rejected",
  "formation": {
    "id": "692e19fb-7b37-444f-ab2a-82ad2b572930",
    "statut": "rejetee",
    "motif_rejet": "La description est incomplète",
    ...
  }
}
```

---

### Step 11: Validation Test - Invalid Niveau
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "niveau": "expert"  // Invalid!
}
```

Expected Error Response (400):
```json
{
  "error": "Invalid niveau value",
  "validValues": ["debutant", "intermediaire", "avance"]
}
```

---

### Step 12: Validation Test - Invalid Public Cible
```
PUT ${process.env.NEXT_PUBLIC_API_URL}/api/formations/692e19fb-7b37-444f-ab2a-82ad2b572930
Authorization: Bearer {FORMATEUR_TOKEN}
Content-Type: application/json

{
  "public_cible": ["Salariés", "Unicorns"]  // "Unicorns" is invalid!
}
```

Expected Error Response (400):
```json
{
  "error": "Invalid public_cible values",
  "validValues": [...]
}
```

---

## Thunder Client Collection Template

Save this as a Thunder Client collection for easy testing:

```json
{
  "client": "Thunder Client",
  "collectionName": "Formation Management",
  "dateExport": "2026-04-12",
  "version": "1.1",
  "folders": [],
  "requests": [
    {
      "name": "Get Formation Options",
      "method": "GET",
      "url": "{{BASE_URL}}/api/formations/options"
    },
    {
      "name": "Create Formation",
      "method": "POST",
      "url": "{{BASE_URL}}/api/formations",
      "headers": {
        "Authorization": "Bearer {{TOKEN}}"
      },
      "body": "json"
    },
    {
      "name": "Update Formation - Add Pricing",
      "method": "PUT",
      "url": "{{BASE_URL}}/api/formations/{{FORMATION_ID}}",
      "headers": {
        "Authorization": "Bearer {{TOKEN}}"
      }
    },
    {
      "name": "Publish Formation",
      "method": "PATCH",
      "url": "{{BASE_URL}}/api/formations/{{FORMATION_ID}}/publish",
      "headers": {
        "Authorization": "Bearer {{TOKEN}}"
      }
    },
    {
      "name": "Reject Formation (Admin)",
      "method": "PATCH",
      "url": "{{BASE_URL}}/api/formations/{{FORMATION_ID}}/reject",
      "headers": {
        "Authorization": "Bearer {{ADMIN_TOKEN}}"
      }
    }
  ]
}
```

---

## Environment Variables for Thunder Client

```
BASE_URL = ${process.env.NEXT_PUBLIC_API_URL}
TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0ZjU1YTBkLTc2YWYtNDg0My04ZGEyLWQ1MDhjMDU1NzBiMyIsImVtYWlsIjoib3Vtb3VAZ21haWwuY29tIiwicm9sZSI6ImZvcm1hdGV1ciIsImlhdCI6MTc3NTk1OTg4NywiZXhwIjoxNzc2NTY0Njg3fQ.VU3MVQfY17Qrb0loTPU32WjoGzOWNl-NykHOFPVEuQY
ADMIN_TOKEN = {ADMIN_JWT_TOKEN}
FORMATION_ID = 692e19fb-7b37-444f-ab2a-82ad2b572930
```

---

## MIgration Steps Before Testing

1. **Apply Migration:**
   ```bash
   cd backend
   npm run migrate
   ```

2. **Restart Backend:**
   ```bash
   npm run dev
   ```

3. **Verify Database:**
   - public_cible should now be JSON type
   - statut ENUM should include 'en_ligne' (not 'publiee')
