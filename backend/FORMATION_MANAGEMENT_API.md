# Guide Backend - Formation Management API

## Overview
This document outlines the backend implementation for formation management with validation, pricing, and status management.

## Formation Model Status

### Status Values
- **brouillon** (Draft): Formation is being created/edited
- **en_attente_validation** (Pending Review): Formation waiting for admin review
- **en_ligne** (Published): Formation is live and published
- **rejetee** (Rejected): Formation was rejected by admin with a reason
- **archivea** (Archived): Formation is archived

### Auto-Status Logic
- Formations start as **brouillon**
- Formateur can publish to **en_ligne** only if:
  - Formation has at least 1 module
  - Pricing is set (prix_normal if not free, or est_gratuite = true)
  - All required fields are filled
- Admin can update statut to any value
- Admin rejection requires `motif_rejet`

## New Field Validations

### Niveau (Level)
Valid values: `debutant`, `intermediaire`, `avance`

Example:
```json
{
  "niveau": "intermediaire"
}
```

### Public Cible (Target Audience)
Must be a JSON array of values from:
- Collégiens & Lycéens
- Étudiants en licence
- Demandeurs d'emploi
- Salariés
- Freelances & indépendants
- Fonctionnaires
- Jeune
- Personne âgée
- Sans diplôme
- Parent
- Femme au foyer

Example:
```json
{
  "public_cible": [
    "Salariés",
    "Freelances & indépendants"
  ]
}
```

### Pricing Validation
**Rules:**
1. If `est_gratuite = true`:
   - `prix_normal` and `prix_promo` must be null/empty
   
2. If `est_gratuite = false`:
   - `prix_normal` is required and must be > 0
   - If `prix_promo` is provided:
     - Must be < `prix_normal`
     - `date_debut_promo` and `date_fin_promo` are required
     - `date_fin_promo` must be after `date_debut_promo`

Example (Paid):
```json
{
  "est_gratuite": false,
  "prix_normal": 99.99,
  "prix_promo": 79.99,
  "date_debut_promo": "2026-04-15",
  "date_fin_promo": "2026-05-15"
}
```

Example (Free):
```json
{
  "est_gratuite": true
}
```

## New Endpoints

### 1. Get Formation Options
```
GET /api/formations/options
```

Returns available values for dropdowns:
```json
{
  "niveaux": ["debutant", "intermediaire", "avance"],
  "public_cible": [
    "Collégiens & Lycéens",
    "Étudiants en licence",
    ...
  ],
  "statuts": ["brouillon", "en_attente_validation", "en_ligne", "rejetee", "archivea"],
  "languages": ["fr", "en", "es", "de"]
}
```

### 2. Publish Formation (Formateur)
```
PATCH /api/formations/:id/publish
Authorization: Bearer {token}
```

Requirements:
- Formateur must be the creator
- Formation must have at least 1 module
- Formation must have pricing info (free or paid)

Response: Published formation object with `statut: "en_ligne"`

**Error Examples:**
```json
{
  "error": "Formation must have at least one module"
}
```

### 3. Reject Formation (Admin only)
```
PATCH /api/formations/:id/reject
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "motif_rejet": "Les prérequis ne sont pas clairement définis"
}
```

Response: Rejected formation with `motif_rejet` and `statut: "rejetee"`

## Updated Endpoints

### Create Formation
```
POST /api/formations
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Maîtriser React.js en 30 Jours",
  "categoryId": "813b5cb4-25f5-474b-b059-a80c3633107e",
  "subcategoryId": "38a422ba-71b0-4dd6-b4ce-8a2da0a77892",
  "image": "https://...",
  "niveau": "intermediaire",
  "public_cible": ["Salariés", "Freelances & indépendants"]
}
```

### Update Formation
```
PUT /api/formations/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "niveau": "avance",
  "public_cible": ["Étudiants en licence", "Demandeurs d'emploi"],
  "prix_normal": 149.99,
  "prix_promo": 99.99,
  "date_debut_promo": "2026-04-20",
  "date_fin_promo": "2026-05-20",
  "est_gratuite": false,
  "description_longue": "...",
  "prerequis": "JavaScript ES6+",
  "ce_que_vous_apprendrez": ["React Hooks", "Redux", "Testing"]
}
```

**Validation Notes:**
- `niveau` must be one of valid values
- `public_cible` array items must match valid options
- Pricing validation applies as per rules above
- Only admin can change `statut` (not formateur)

## Error Responses

### Invalid Niveau
```json
{
  "error": "Invalid niveau value",
  "validValues": ["debutant", "intermediaire", "avance"]
}
```

### Invalid Public Cible
```json
{
  "error": "Invalid public_cible values",
  "validValues": [...]
}
```

### Pricing Validation Errors
```json
{
  "error": "Pricing validation failed",
  "errors": [
    "Une formation payante doit avoir un prix normal supérieur à 0",
    "Le prix promo doit être inférieur au prix normal"
  ]
}
```

### Rejection Without Reason
```json
{
  "error": "motif_rejet is required"
}
```

## Database Migration

A new migration `20240412-update-formation-enums.js` was created to:
1. Change `public_cible` from STRING to JSON
2. Update `statut` ENUM from `publiee` to `en_ligne`

To apply:
```bash
npm run migrate
```

## Formation Workflow Example

1. **Create Formation**
   ```
   POST /api/formations
   ```
   Status: `brouillon`

2. **Add Formation Details**
   ```
   PUT /api/formations/{id}
   ```
   Update: niveau, public_cible, description, pricing, etc.

3. **Add Modules**
   ```
   POST /api/modules
   ```

4. **Add Lessons & Resources**
   ```
   POST /api/lessons
   POST /api/resources
   ```

5. **Publish Formation**
   ```
   PATCH /api/formations/{id}/publish
   ```
   Status: `en_ligne` (if all requirements met)

6. **Admin Review & Rejection (if needed)**
   ```
   PATCH /api/formations/{id}/reject
   ```
   Status: `rejetee`

## Utility Functions

Located in `backend/src/utils/formations.js`:

- `validateNiveau(niveau)` - Validates level
- `validatePublicCible(publicCible)` - Validates target audience array
- `validatePricing(formation)` - Returns array of pricing errors
- `isFormationComplete(formation, modules)` - Checks if formation is complete
- `calculateFormationStatus(formation, modules)` - Calculates auto-status

Constants:
- `NIVEAUX` - Array of valid levels
- `PUBLIC_CIBLE_OPTIONS` - Array of valid audience options
