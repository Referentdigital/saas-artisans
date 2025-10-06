const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration pour Railway
app.set('trust proxy', 1);

// ===== SIMULATION BASE DE DONNÉES =====
// Données simulées mais structurées comme une vraie BDD
let USERS_DB = [];
let INTERVENTIONS_DB = [];
let STOCKS_DB = [];
let CLIENTS_DB = [];

// Fonction pour générer des données réalistes
const generateDemoData = () => {
  // Utilisateurs par métier
  const users = [
    {
      _id: '1',
      prenom: 'Jean',
      nom: 'Électricien',
      email: 'jean.electricien@lys.com',
      metier: 'electricien',
      entreprise: 'Électricité Jean',
      stats: { totalInterventions: 156, chiffreAffaireMensuel: 4850 }
    },
    {
      _id: '2', 
      prenom: 'Pierre',
      nom: 'Plombier',
      email: 'pierre.plombier@lys.com',
      metier: 'plombier',
      entreprise: 'Plomberie Pierre',
      stats: { totalInterventions: 203, chiffreAffaireMensuel: 5420 }
    },
    {
      _id: '3',
      prenom: 'Marie',
      nom: 'Coiffeuse',
      email: 'marie.coiffure@lys.com',
      metier: 'coiffeur',
      entreprise: 'Salon Marie',
      stats: { totalInterventions: 89, chiffreAffaireMensuel: 2840 }
    }
  ];

  // Interventions réalistes
  const interventions = [
    {
      _id: '1',
      artisan: '1',
      type: 'Installation tableau électrique',
      client: { nom: 'Mme Martin', telephone: '06.12.34.56.78', adresse: '15 rue Victor Hugo, Paris' },
      priorite: 'haute',
      statut: 'planifie',
      dateIntervention: new Date(),
      prix: { estimation: 480, final: 520 },
      description: 'Mise aux normes installation électrique'
    },
    {
      _id: '2',
      artisan: '1',
      type: 'Dépannage panne électrique',
      client: { nom: 'M. Rousseau', telephone: '06.87.65.43.21', adresse: '28 boulevard Haussmann, Paris' },
      priorite: 'critique',
      statut: 'en_route',
      dateIntervention: new Date(),
      prix: { estimation: 180 },
      description: 'Disjoncteur qui saute en permanence'
    },
    {
      _id: '3',
      artisan: '2',
      type: 'Réparation fuite',
      client: { nom: 'Mme Dubois', telephone: '06.45.78.91.23', adresse: '12 rue de la Paix, Lyon' },
      priorite: 'haute',
      statut: 'en_cours',
      dateIntervention: new Date(),
      prix: { estimation: 250, final: 280 },
      description: 'Fuite sous évier cuisine'
    }
  ];

  // Stock réaliste
  const stocks = [
    {
      _id: '1',
      artisan: '1',
      nom: 'Disjoncteurs 16A',
      categorie: 'electricite',
      quantite: 3,
      seuilAlerte: 10,
      prixAchat: 25,
      prixVente: 35,
      statut: 'disponible'
    },
    {
      _id: '2',
      artisan: '1',
      nom: 'Câbles 2.5mm²',
      categorie: 'electricite',
      quantite: 2,
      seuilAlerte: 15,
      prixAchat: 8,
      prixVente: 15,
      statut: 'disponible'
    },
    {
      _id: '3',
      artisan: '2',
      nom: 'Tubes PVC 32mm',
      categorie: 'plomberie',
      quantite: 1,
      seuilAlerte: 8,
      prixAchat: 12,
      prixVente: 20,
      statut: 'disponible'
    }
  ];

  // Clients
  const clients = [
    {
      _id: '1',
      artisan: '1',
      prenom: 'Marie',
      nom: 'Martin',
      telephone: '06.12.34.56.78',
      email: 'marie.martin@email.com',
      statut: 'actif',
      stats: { nombreInterventions: 3, montantTotal: 1240 }
    },
    {
      _id: '2',
      artisan: '1',
      prenom: 'Paul',
      nom: 'Rousseau',
      telephone: '06.87.65.43.21',
      email: 'paul.rousseau@email.com',
      statut: 'vip',
      stats: { nombreInterventions: 8, montantTotal: 2850 }
    }
  ];

  USERS_DB = users;
  INTERVENTIONS_DB = interventions;
  STOCKS_DB = stocks;
  CLIENTS_DB = clients;
};

// Initialiser les données au démarrage
generateDemoData();

// ===== CONFIGURATION =====
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://lys-artisans.com'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== ROUTES API AVEC DONNÉES RÉALISTES =====

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'LYS Artisans API',
    version: '2.0.0',
    database: 'Simulation (données réalistes)'
  });
});

// API Dashboard - Données réelles simulées
app.get('/api/dashboard/:metier', (req, res) => {
  try {
    const { metier } = req.params;
    
    // Trouver l'utilisateur du métier
    const user = USERS_DB.find(u => u.metier === metier);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: `Aucun utilisateur trouvé pour le métier: ${metier}`
      });
    }

    // Récupérer les données liées
    const interventions = INTERVENTIONS_DB.filter(i => i.artisan === user._id);
    const stocks = STOCKS_DB.filter(s => s.artisan === user._id);
    const clients = CLIENTS_DB.filter(c => c.artisan === user._id);

    // Calculer les statistiques réelles
    const stats = {
      interventionsTotal: interventions.length,
      interventionsUrgentes: interventions.filter(i => 
        ['haute', 'critique'].includes(i.priorite) && 
        ['planifie', 'en_route'].includes(i.statut)
      ).length,
      caSemaine: interventions.reduce((sum, i) => 
        sum + (i.prix?.final || i.prix?.estimation || 0), 0
      ),
      stockCritique: stocks.filter(s => s.quantite <= s.seuilAlerte).length,
      clientsActifs: clients.filter(c => c.statut === 'actif').length,
      clientsVIP: clients.filter(c => c.statut === 'vip').length
    };

    // Données spécifiques par métier
    let metierData = {};
    if (metier === 'electricien') {
      metierData.certificatsEnAttente = 3;
      metierData.normesConformite = 98;
    } else if (metier === 'plombier') {
      metierData.fuitesUrgentes = interventions.filter(i => 
        i.type.toLowerCase().includes('fuite')
      ).length;
    }

    res.json({
      success: true,
      metier,
      user: {
        nom: user.nom,
        prenom: user.prenom,
        entreprise: user.entreprise
      },
      stats,
      interventions: interventions.slice(0, 5),
      stocks: stocks.filter(s => s.quantite <= s.seuilAlerte),
      clients: clients.slice(0, 10),
      metierData,
      timestamp: new Date().toISOString(),
      dataSource: 'realistic_simulation'
    });

  } catch (error) {
    console.error('❌ Erreur API Dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// API Analytics avec données calculées
app.get('/api/analytics/:metier', (req, res) => {
  try {
    const { metier } = req.params;
    const user = USERS_DB.find(u => u.metier === metier);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'Métier non trouvé' });
    }

    // Générer des données analytics réalistes sur 30 jours
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Variations réalistes selon le métier
      const baseCA = metier === 'electricien' ? 200 : metier === 'plombier' ? 250 : 80;
      const variation = Math.sin(i * 0.1) * 50 + Math.random() * 100;
      
      last30Days.push({
        date: date.toISOString().split('T')[0],
        ca: Math.max(0, Math.floor(baseCA + variation)),
        interventions: Math.floor(Math.random() * 6) + 1,
        nouveaux_clients: Math.floor(Math.random() * 3)
      });
    }

    const summary = {
      ca_total: last30Days.reduce((sum, day) => sum + day.ca, 0),
      interventions_total: last30Days.reduce((sum, day) => sum + day.interventions, 0),
      ca_moyen: Math.floor(last30Days.reduce((sum, day) => sum + day.ca, 0) / 30),
      tendance: 'hausse' // Calculé selon les derniers jours
    };

    res.json({
      success: true,
      metier,
      periode: 'last_30_days',
      data: last30Days,
      summary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur API Analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur analytics',
      message: error.message
    });
  }
});

// API pour créer une nouvelle intervention
app.post('/api/interventions', (req, res) => {
  try {
    const intervention = {
      _id: String(INTERVENTIONS_DB.length + 1),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    INTERVENTIONS_DB.push(intervention);
    
    res.json({
      success: true,
      intervention,
      message: 'Intervention créée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur création intervention',
      message: error.message
    });
  }
});

// ===== SERVIR LE FRONTEND =====
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== GESTION D'ERREURS =====
app.use((err, req, res, next) => {
  console.error('🚨 Erreur serveur:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

// ===== DÉMARRAGE SERVEUR =====
const server = app.listen(PORT, () => {
  console.log('\n🚀 =====================================');
  console.log('✅ SERVEUR LYS ARTISANS V2.0 DÉMARRÉ !');
  console.log('🌐 URL: http://localhost:' + PORT);
  console.log('📊 API Health: http://localhost:' + PORT + '/api/health');
  console.log('💾 Base de données: Simulation réaliste');
  console.log(`📈 Données: ${USERS_DB.length} utilisateurs, ${INTERVENTIONS_DB.length} interventions`);
  console.log('⚡ Serveur prêt pour les tests !');
  console.log('=====================================\n');
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Signal SIGTERM reçu, arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté proprement');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 Signal SIGINT reçu, arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté proprement');
    process.exit(0);
  });
});

module.exports = app;