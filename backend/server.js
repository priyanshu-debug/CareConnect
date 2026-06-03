// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Environment Variables configuration
dotenv.config();

const app = express();

// 2. Global Middlewares
app.use(express.json()); // Inbound JSON payloads ko parse karne ke liye
app.use(cors());         // Frontend aur Backend ke beech Cross-Origin Requests allow karne ke liye

// 3. MongoDB Connection
// process.env.MONGO_URI aapki .env file se connection string uthayega
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully to CareConnect!'))
  .catch((err) => {
    console.error('❌ Database connection error:');
    console.error(err);
  });

// 4. API Routes Integration
// Isse register aur login ke endpoints active ho jayenge
app.use('/api/auth', require('./routes/authRoutes'));

// 5. Base Health-Check Route
app.get('/', (req, res) => {
  res.send('🚀 CareConnect Backend Server is Running Smoothly...');
});

// 6. Global 404 Error Handler (For undefined routes)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// 7. Server Port Activation
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is blasting off on port ${PORT}`);
});