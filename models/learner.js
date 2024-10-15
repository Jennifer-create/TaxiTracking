const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentContact: { type: String, required: true },
  station: { type: String, required: true },
  paymentStatus: { type: String, default: 'unpaid' }, // Can be 'paid' or 'unpaid'
  signInRecords: [
    {
      time: { type: Date, default: Date.now },
      station: { type: String },
      type: { type: String, enum: ['sign-in', 'sign-out'], required: true }  // Track sign-in or sign-out
    }
  ]
});

const Learner = mongoose.model('Learner', LearnerSchema);
module.exports = Learner;
