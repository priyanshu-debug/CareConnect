// backend/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  mode: { type: String, enum: ['Video', 'Chat'], required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
  razorpayOrderId: String,
  prescription: {
    medicines: [{ name: String, dosage: String, frequency: String, duration: String }],
    instructions: String,
    createdAt: { type: Date, default: Date.now }
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);