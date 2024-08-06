const express = require('express');

const todoRoutes = require('./todoRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Centralizing all the routes in one file
router.use('/todo', todoRoutes);
router.use('/user', userRoutes);

module.exports = router;
