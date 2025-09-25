const mongoose = require('mongoose');

const RendezVousSchema = new mongoose.Schema({
    artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RendezVous', RendezVousSchema);