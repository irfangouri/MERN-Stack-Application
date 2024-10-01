const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const user = express.Router({ mergeParams: true });

user.post('/', userController.registerUser);
user.post('/access-token', userController.loginUser);
user.get('/:userId', authMiddleware, userController.getUser);
user.delete('/:userId', authMiddleware, userController.deleteUser);
user.patch('/:userId/reset-password', authMiddleware, userController.resetPassword);

module.exports = user;
