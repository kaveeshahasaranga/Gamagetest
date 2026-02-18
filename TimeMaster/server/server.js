const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/timemaster')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes Placeholder
app.get('/', (req, res) => {
  res.send('TimeMaster API is running');
});

// Import Routes (To be added later)
// const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
