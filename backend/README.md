# Formini Backend

API REST Express.js pour l'application Formini.

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env` et configurer les variables:

```bash
cp .env.example .env
```

## Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Architecture

```
src/
├── app.js              Point d'entrée
├── config/             Configuration
├── constants/          Constantes
├── controllers/        Logique métier
├── middleware/         Middlewares
├── models/             Modèles données
├── routes/             Routes API
├── services/           Services
└── utils/              Utilitaires
```

## API Endpoints

Voir la documentation API dans les fichiers routes.

## Tests

```bash
npm test
```
