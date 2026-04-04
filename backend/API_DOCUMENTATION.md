# 📚 API Documentation - Formini Backend

## Database Models

### User
- `id` (UUID) - Primary Key
- `name` - Full name
- `email` - Unique email
- `password` - Hashed password (bcrypt)
- `role` - ENUM: 'administrateur', 'formateur', 'acheteur'
- `isActive` - Boolean (default: true)

### Category
- `id` (UUID)
- `name` - Unique category name
- `description` - Optional description

### Formation
- `id` (UUID)
- `name` - Formation title
- `description` - Optional description
- `image` - Image URL
- `categoryId` - Foreign key to Category
- `trainerId` - Foreign key to User (formateur)
- `isActive` - Boolean (default: true)

### FormationAccess
- `id` (UUID)
- `userId` - Foreign key to User (acheteur)
- `formationId` - Foreign key to Formation
- `status` - ENUM: 'pending', 'approved', 'rejected'
- `requestedAt` - Timestamp
- `approvedAt` - Timestamp (null if not approved)
- `approvedBy` - Foreign key to User (administrateur)

---

## Authentication Endpoints

### Register
```
POST /api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "acheteur" (optional, default: acheteur)
}
```

### Login
```
POST /api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}
Response:
{
  "token": "jwt_token_here",
  "user": { id, name, email, role }
}
```

### Get Profile
```
GET /api/auth/profile
Headers:
{
  "Authorization": "Bearer <token>"
}
```

---

## Formation Endpoints

### List All Formations (Public)
```
GET /api/formations
Response: Array of active formations with trainer and category info
```

### Get Formation by ID (Public)
```
GET /api/formations/:id
```

### Create Formation (Formateur only)
```
POST /api/formations
Headers:
{
  "Authorization": "Bearer <formateur_token>"
}
Body:
{
  "name": "React Basics",
  "categoryId": "category-uuid",
  "image": "https://example.com/image.jpg"
}
```

### Update Formation (Formateur or Admin)
```
PUT /api/formations/:id
Headers:
{
  "Authorization": "Bearer <formateur_or_admin_token>"
}
Body: { name, categoryId, image }
```

### Delete Formation (Formateur or Admin)
```
DELETE /api/formations/:id
Headers:
{
  "Authorization": "Bearer <formateur_or_admin_token>"
}
```

### Disable Formation (Admin only)
```
PATCH /api/formations/:id/disable
Headers:
{
  "Authorization": "Bearer <admin_token>"
}
```

---

## Formation Access Endpoints

### Request Access to Formation (Acheteur)
```
POST /api/formations-access/request
Headers:
{
  "Authorization": "Bearer <acheteur_token>"
}
Body:
{
  "formationId": "formation-uuid"
}
```

### Get My Formations (Acheteur)
```
GET /api/my-formations
Headers:
{
  "Authorization": "Bearer <acheteur_token>"
}
```

### Get Pending Requests (Admin)
```
GET /api/formations-access/pending
Headers:
{
  "Authorization": "Bearer <admin_token>"
}
```

### Approve Access (Admin)
```
PATCH /api/formations-access/:accessId/approve
Headers:
{
  "Authorization": "Bearer <admin_token>"
}
```

### Reject Access (Admin)
```
PATCH /api/formations-access/:accessId/reject
Headers:
{
  "Authorization": "Bearer <admin_token>"
}
```

---

## Roles & Permissions

### Acheteur (Buyer)
- ✅ View list of formations
- ✅ Request access to formation
- ✅ View approved formations in personal space
- ❌ Create/modify/delete formations

### Formateur (Trainer)
- ✅ Create formation
- ✅ Update own formations
- ✅ Delete own formations
- ✅ View list of formations
- ❌ Approve access requests
- ❌ Modify other trainers' formations

### Administrateur (Admin)
- ✅ View all formations
- ✅ Approve/reject access requests
- ✅ Disable formations
- ✅ Delete any formation
- ✅ Modify any formation

---

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure PostgreSQL in `.env`:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=formini_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
```

3. Start server:
```bash
npm run dev
```

4. Server will auto-sync database on startup
