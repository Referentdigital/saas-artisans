# Script de déploiement Railway pour LYS Artisans
# Exécutez ce script pour déployer automatiquement sur Railway

Write-Host "🚀 DÉPLOIEMENT LYS ARTISANS SUR RAILWAY" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Yellow

# Étape 1: Installation Railway CLI
Write-Host "`n📦 Installation Railway CLI..." -ForegroundColor Cyan
try {
    # Vérifier si Railway CLI est déjà installé
    $railwayVersion = railway --version 2>$null
    if ($railwayVersion) {
        Write-Host "✅ Railway CLI déjà installé: $railwayVersion" -ForegroundColor Green
    } else {
        throw "Railway CLI non trouvé"
    }
} catch {
    Write-Host "⚠️ Installation Railway CLI via npm..." -ForegroundColor Yellow
    npm install -g @railway/cli
    Write-Host "✅ Railway CLI installé !" -ForegroundColor Green
}

# Étape 2: Configuration du projet
Write-Host "`n🔧 Préparation du projet..." -ForegroundColor Cyan
Write-Host "📁 Répertoire: $(Get-Location)" -ForegroundColor White

# Vérification des fichiers essentiels
$requiredFiles = @("Dockerfile", "railway.json", ".dockerignore")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file présent" -ForegroundColor Green
    } else {
        Write-Host "❌ $file manquant !" -ForegroundColor Red
        exit 1
    }
}

# Étape 3: Login Railway (si nécessaire)
Write-Host "`n🔐 Connexion Railway..." -ForegroundColor Cyan
try {
    $authStatus = railway status 2>$null
    Write-Host "✅ Déjà connecté à Railway" -ForegroundColor Green
} catch {
    Write-Host "🌐 Ouverture de la page de connexion Railway..." -ForegroundColor Yellow
    railway login
    Write-Host "✅ Connexion Railway établie !" -ForegroundColor Green
}

# Étape 4: Création/Sélection du projet
Write-Host "`n🎯 Configuration du projet Railway..." -ForegroundColor Cyan
Write-Host "Nom du projet suggéré: lys-artisans-prod" -ForegroundColor White

# Étape 5: Instructions finales
Write-Host "`n🚀 PRÊT POUR LE DÉPLOIEMENT !" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Yellow
Write-Host "Commandes à exécuter:" -ForegroundColor Cyan
Write-Host "1. railway init" -ForegroundColor White
Write-Host "2. railway up" -ForegroundColor White
Write-Host ""
Write-Host "💡 Votre application sera accessible sur:" -ForegroundColor Yellow
Write-Host "   https://lys-artisans-prod.up.railway.app" -ForegroundColor Blue
Write-Host ""
Write-Host "📊 Monitoring:" -ForegroundColor Yellow
Write-Host "   https://railway.app/dashboard" -ForegroundColor Blue

Write-Host "`n✨ Script terminé ! Exécutez les commandes ci-dessus." -ForegroundColor Green