const express = require('express');
const router = express.Router();
const RendezVous = require('../models/RendezVous');
const { sendSMS } = require('../utils/twilio');

// Route pour créer un rendez-vous
router.post('/schedule', async (req, res) => {
  try {
    const { artisanId, date, time, clientName, clientPhone } = req.body;
    const rdv = new RendezVous({ artisanId, date, time, clientName, clientPhone });
    await rdv.save();
    // Envoi SMS de confirmation
    await sendSMS(clientPhone, `Bonjour ${clientName}, votre rendez-vous est confirmé pour le ${date} à ${time}.`);
    res.status(201).json(rdv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour voir l'agenda d'un artisan
router.get('/agenda/:artisanId', async (req, res) => {
  try {
    const { artisanId } = req.params;
    const rdvs = await RendezVous.find({ artisanId }).sort({ date: 1 });
    res.json(rdvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;