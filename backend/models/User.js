// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], required: true },
  gender: String,
  age: Number,
  // Patient Specific Fields
  bloodGroup: String,
  allergies: [String],
  existingConditions: [String],
  // Doctor Specific Fields
  specialisation: String,
  licenseNumber: String,
  experience: Number,
  languages: [String],
  consultationFee: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false }, // Admin verify karega
  availability: [{ day: String, slots: [String] }] // e.g., Monday: ["10:00 AM", "11:00 AM"]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);