const express = require('express');
const mongoose = require('mongoose');
const assistantRoutes = require('./routes/assistant');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/saas_artisans', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/assistant', assistantRoutes);

app.get('/', (req, res) => {
  res.send('SaaS Artisans Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));