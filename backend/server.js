const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const databaseConnection = require('./config/db.js');
const userRoutes = require('./routes/user-routes.js');
const todoRoutes = require('./routes/todo-routes.js');

const app = express();
const PORT = process.env.PORT || 4000;

databaseConnection();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

app.listen(PORT, () => {
  console.log(`Successfully connected to PORT ${PORT}`);
});
