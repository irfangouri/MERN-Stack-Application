const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const databaseConnection = require('./config/db');

const indexRoutes = require('./routes/indexRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

databaseConnection();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', indexRoutes);

app.listen(PORT, () => {
  console.log(`Successfully connected to PORT ${PORT}`);
});
