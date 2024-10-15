const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON data from requests

// Example route
app.get('/', (req, res) => {
  res.send('Bus Tracking API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://jenniferpolelo321:<ILoveMyself22>@cluster0.osp77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });
  
 //connecting routes to express server 
  const learnerRoutes = require('./routes/learnerRoutes');

// Use learner routes
app.use('/api/learners', learnerRoutes);

