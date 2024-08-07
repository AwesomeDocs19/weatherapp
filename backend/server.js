const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const preferencesRoutes = require('./routes/preferences');

// Middleware
app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferencesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

