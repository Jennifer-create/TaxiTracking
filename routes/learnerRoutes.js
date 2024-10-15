const express = require('express');
const router = express.Router();
const Learner = require('../models/learner');

// Route to register a new learner
router.post('/register', async (req, res) => {
  const { name, parentContact, station } = req.body;

  try {
    const newLearner = new Learner({ name, parentContact, station });
    await newLearner.save();
    res.json({ message: 'Learner registered successfully!', learner: newLearner });
  } catch (err) {
    res.status(500).json({ message: 'Error registering learner', error: err.message });
  }
});

// Route for learner sign-in
router.post('/sign-in', async (req, res) => {
  const { learnerId, station } = req.body;

  try {
    const learner = await Learner.findById(learnerId);
    if (!learner) return res.status(404).json({ message: 'Learner not found' });

    if (learner.paymentStatus === 'unpaid') {
      return res.status(400).json({ message: 'Payment required before sign-in.' });
    }

    learner.signInRecords.push({ station, type: 'sign-in' });
    await learner.save();
    res.json({ message: 'Learner signed in successfully!', learner });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in learner', error: err.message });
  }
});

// Route to handle payments
router.post('/pay', async (req, res) => {
  const { learnerId } = req.body;

  try {
    const learner = await Learner.findById(learnerId);
    if (!learner) return res.status(404).json({ message: 'Learner not found' });

    learner.paymentStatus = 'paid';
    await learner.save();
    res.json({ message: 'Payment successful!', learner });
  } catch (err) {
    res.status(500).json({ message: 'Error processing payment', error: err.message });
  }
});

module.exports = router;
