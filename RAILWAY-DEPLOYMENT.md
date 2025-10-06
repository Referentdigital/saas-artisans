# 🚀 Déploiement LYS Artisans sur Railway

## Configuration Terminée ✅

Votre projet est **prêt pour Railway** avec :
- ✅ **Dockerfile** optimisé (Frontend React + Backend Express)
- ✅ **railway.json** configuré 
- ✅ **Server production** avec données de démonstration
- ✅ **Optimisations Railway** (trust proxy, port dynamique)

## 🎯 Déploiement en 3 Étapes

### 1️⃣ Installation Railway CLI
```powershell
npm install -g @railway/cli
```

### 2️⃣ Initialisation du projet
```powershell
railway login
railway init
# Nom suggéré: lys-artisans-prod
```

### 3️⃣ Déploiement
```powershell
railway up
```

## 🌐 Résultat Attendu

**URL de production** : `https://lys-artisans-prod.up.railway.app`

### 🔧 APIs Disponibles
- `GET /api/health` - Santé du serveur
- `GET /api/dashboard/electricien` - Dashboard électricien avec données
- `GET /` - Interface React (demo client)

### 📊 Données de Démonstration
- **Jean Électricien** : 2 interventions, stock d'alertes
- **API complète** avec données business réalistes
- **Interface client professionnelle**

## 💰 Coût Railway

- **Gratuit** : Jusqu'à 500h/mois
- **Pro** : 5$/mois pour utilisation intensive
- **Inclus** : PostgreSQL, Redis, monitoring

## 🔄 Workflow de Développement

1. **Développement local** → VS Code
2. **Git push** → Déclenchement auto Railway
3. **Tests production** → URL Railway
4. **Démos clients** → Interface stable

## 🎪 Script Automatisé

Exécutez `deploy-railway.ps1` pour un déploiement assisté !

---

**Votre SaaS LYS Artisans sera accessible 24/7 sur Railway !** 🚀