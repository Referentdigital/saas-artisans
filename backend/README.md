# SaaS Artisans – Backend

## Installation

```bash
cd backend
npm install
```

## Variables d'environnement à créer (.env)

```
MONGODB_URI=mongodb://localhost/saas_artisans
TWILIO_SID=VotreSID
TWILIO_AUTH_TOKEN=VotreToken
TWILIO_PHONE_NUMBER=+33XXXXXXXXX
```

## Lancer le serveur

```bash
npm run dev
```

L'API tourne par défaut sur http://localhost:5000

## Routes principales

- `POST /api/assistant/schedule` — Prendre un rendez-vous
- `GET /api/assistant/agenda/:artisanId` — Voir l'agenda d'un artisan