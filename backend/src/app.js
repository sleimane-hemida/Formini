const express = require('express');
const cors = require('cors');
require('dotenv').config();
const initializeDatabase = require('./config/initDb');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '✅ Formini Backend is running', version: '1.0.0' });
});

app.use('/api', routes);
app.use(errorHandler);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;

