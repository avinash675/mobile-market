const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Mobixa Backend API is running' });
});

// Setup Mock Mode Flag
let isMockMode = false;

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('⚠️ MongoDB Connection Error:', err.message);
    console.warn('🚀 SWITCHING TO MOCK MODE: Backend will run without persistent database.');
    isMockMode = true;
  });

// Start Server regardless of DB connection
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  if (isMockMode) {
    console.warn('⚠️ Server is in MOCK MODE.');
  }
});
