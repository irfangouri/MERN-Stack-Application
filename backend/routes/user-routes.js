const express = require('express');
const userController = require('../controllers/user-controllers');

const user = express();

user.post('/', userController.registerUser);
user.post('/access-token', userController.loginUser);

module.exports = user;
